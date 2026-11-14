import React, { useState } from 'react';
import { COMPANY_DETAILS } from '../data/companyData';
import {
  X,
  Calendar,
  Clock,
  Video,
  Phone,
  Building2,
  CheckCircle2,
  User,
  Mail,
  FileText,
  MapPin,
  ExternalLink,
  MessageCircle,
  CalendarPlus,
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface FixMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTopic?: string;
  onMeetingBooked?: (refId: string, topic: string) => void;
}

export type MeetingMode = 'video' | 'in-person' | 'phone';

interface MeetingSlot {
  time: string;
  label: string;
  period: 'morning' | 'afternoon' | 'evening';
}

const MEETING_TOPICS = [
  'Centrifuge Customization & Rotor Specs',
  'Histology & Biopsy Cassettes OEM / Bulk Supply',
  'Tissue Embedding Moulds & Microtome Blades',
  'Cytology Consumables & Lab Kits',
  'Institutional Dealership & Regional Distribution',
  'Faridabad Plant Tour & Cleanroom Quality Audit',
  'General Technical Consultation'
];

const TIME_SLOTS: MeetingSlot[] = [
  { time: '10:30 AM - 11:15 AM', label: '10:30 AM', period: 'morning' },
  { time: '11:45 AM - 12:30 PM', label: '11:45 AM', period: 'morning' },
  { time: '02:30 PM - 03:15 PM', label: '02:30 PM', period: 'afternoon' },
  { time: '03:45 PM - 04:30 PM', label: '03:45 PM', period: 'afternoon' },
  { time: '05:00 PM - 05:45 PM', label: '05:00 PM', period: 'evening' },
];

export const FixMeetingModal: React.FC<FixMeetingModalProps> = ({
  isOpen,
  onClose,
  preselectedTopic,
  onMeetingBooked
}) => {
  // Generate next 6 business days (skipping Sundays)
  const availableDates = React.useMemo(() => {
    const dates: { dateStr: string; displayDay: string; displayDate: string }[] = [];
    const curr = new Date();
    let count = 0;
    while (dates.length < 6 && count < 14) {
      curr.setDate(curr.getDate() + 1);
      count++;
      if (curr.getDay() === 0) continue; // Skip Sunday
      const yyyy = curr.getFullYear();
      const mm = String(curr.getMonth() + 1).padStart(2, '0');
      const dd = String(curr.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      const displayDay = curr.toLocaleDateString('en-US', { weekday: 'short' });
      const displayDate = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dates.push({ dateStr, displayDay, displayDate });
    }
    return dates;
  }, []);

  const [mode, setMode] = useState<MeetingMode>('video');
  const [topic, setTopic] = useState(preselectedTopic || MEETING_TOPICS[0]);
  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.dateStr || '');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0].time);
  
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',
    agendaNotes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [meetingRefId, setMeetingRefId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const ref = `CM-MTG-${Math.floor(10000 + Math.random() * 90000)}`;
    setMeetingRefId(ref);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingConfirmed(true);
      onMeetingBooked?.(ref, topic);
    }, 700);
  };

  const handleReset = () => {
    setBookingConfirmed(false);
    setFormData({
      fullName: '',
      organization: '',
      designation: '',
      email: '',
      phone: '',
      agendaNotes: ''
    });
    onClose();
  };

  const formattedSelectedDate = availableDates.find((d) => d.dateStr === selectedDate)
    ? `${availableDates.find((d) => d.dateStr === selectedDate)?.displayDay}, ${availableDates.find((d) => d.dateStr === selectedDate)?.displayDate}`
    : selectedDate;

  // Generate WhatsApp text for Technical Support
  const getWhatsAppMeetingUrl = () => {
    const text = `*New Meeting Request - Centronic Medical India*\n` +
      `*Reference:* ${meetingRefId}\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Organization:* ${formData.organization || 'N/A'}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Email:* ${formData.email}\n` +
      `*Mode:* ${mode === 'in-person' ? 'Factory Visit (Faridabad)' : mode === 'video' ? 'Virtual Video Conference' : 'Direct Phone Discussion'}\n` +
      `*Date & Time:* ${formattedSelectedDate} at ${selectedTime} IST\n` +
      `*Topic:* ${topic}\n` +
      (formData.agendaNotes ? `*Notes:* ${formData.agendaNotes}` : '');

    return `https://wa.me/919999333447?text=${encodeURIComponent(text)}`;
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Centronic Medical Technical Consultation: ${topic}`);
    const details = encodeURIComponent(
      `Technical consultation with Engineering Team at Centronic Medical India.\nReference: ${meetingRefId}\nAttendee: ${formData.fullName} (${formData.organization || ''})\nTopic: ${topic}\nContact: +91 9999333447 | info.centronic@yahoo.com`
    );
    const location = encodeURIComponent(
      mode === 'in-person'
        ? COMPANY_DETAILS.manufacturingPlant.address
        : mode === 'video'
        ? 'Google Meet (Link will be sent to email)'
        : 'Direct Phone Call (+91 9999333447)'
    );

    // Approximate ISO format for selected date
    const dateFormatted = selectedDate.replace(/-/g, '');
    const datesParam = `${dateFormatted}T100000Z/${dateFormatted}T110000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${datesParam}`;
  };

  // Generate .ics calendar file download
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Centronic Medical India//Meeting Scheduler//EN',
      'BEGIN:VEVENT',
      `UID:${meetingRefId}@centronicmedical.com`,
      `SUMMARY:Centronic Medical Technical Meeting - ${topic}`,
      `DESCRIPTION:Technical consultation with Centronic Medical India engineering team. Ref: ${meetingRefId}. Notes: ${formData.agendaNotes || 'None'}`,
      `LOCATION:${mode === 'in-person' ? COMPANY_DETAILS.manufacturingPlant.address : 'Virtual Video Meeting / Call'}`,
      `ORGANIZER;CN=Centronic Medical India:mailto:${COMPANY_DETAILS.email}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Centronic_Meeting_${meetingRefId}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Fix a Meeting
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-900/80 text-indigo-300 border border-indigo-700">
                  Direct Coordinator
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Schedule a 1-on-1 technical or procurement session with our Faridabad team.
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {bookingConfirmed ? (
            /* Booking Confirmation View */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-2 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Meeting Successfully Scheduled!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Thank you, <strong>{formData.fullName || 'Valued Partner'}</strong>. Your meeting has been logged with reference number{' '}
                  <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {meetingRefId}
                  </span>.
                </p>
              </div>

              {/* Scheduled Summary Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Meeting Details
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    {mode === 'in-person' ? 'Factory Visit' : mode === 'video' ? 'Virtual Video Call' : 'Phone Call'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5 font-medium">Date & Time</span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      {formattedSelectedDate} ({selectedTime} IST)
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-0.5 font-medium">Lead Technical Coordinator</span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-600" />
                      Technical Desk (+91 9999333447)
                    </span>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block mb-0.5 font-medium">Discussion Subject</span>
                    <span className="font-semibold text-slate-800">
                      {topic}
                    </span>
                  </div>

                  {mode === 'in-person' && (
                    <div className="sm:col-span-2 p-3 rounded-lg bg-white border border-slate-200">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        Meeting Location (Manufacturing Facility):
                      </span>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {COMPANY_DETAILS.manufacturingPlant.address}
                      </p>
                    </div>
                  )}

                  {mode === 'video' && (
                    <div className="sm:col-span-2 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100">
                      <span className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
                        <Video className="w-3.5 h-3.5 text-indigo-600" />
                        Virtual Video Conference Invitation:
                      </span>
                      <p className="text-[11px] text-indigo-800">
                        A Google Meet / Zoom link will be dispatched to <strong>{formData.email}</strong> 2 hours prior to the session.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons for Scheduled Meeting */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Confirm on WhatsApp button */}
                  <a
                    href={getWhatsAppMeetingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Directly on WhatsApp</span>
                  </a>

                  {/* Add to Google Calendar */}
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Add to Google Calendar</span>
                  </a>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                  <button
                    onClick={handleDownloadICS}
                    className="text-xs text-slate-700 hover:text-indigo-600 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Calendar File (.ics)</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Meeting Booking Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Step 1: Select Mode */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  1. Choose Meeting Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setMode('video')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      mode === 'video'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        mode === 'video' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Video className="w-4 h-4" />
                      </div>
                      {mode === 'video' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">Video Conference</div>
                      <div className="text-[11px] text-slate-500">Google Meet / Zoom</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('in-person')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      mode === 'in-person'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        mode === 'in-person' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      {mode === 'in-person' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">Plant / Facility Visit</div>
                      <div className="text-[11px] text-slate-500">IMT Faridabad, NCR</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('phone')}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      mode === 'phone'
                        ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-600 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        mode === 'phone' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Phone className="w-4 h-4" />
                      </div>
                      {mode === 'phone' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">Direct Phone Call</div>
                      <div className="text-[11px] text-slate-500">Technical specialist</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Topic Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. Discussion Subject / Product Line
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:bg-white transition-all"
                >
                  {MEETING_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Preferred Date & Time */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    3. Select Date & Slot (IST)
                  </label>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                    Live Working Hours (Mon–Sat)
                  </span>
                </div>

                {/* Date buttons */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((d) => {
                    const isSelected = selectedDate === d.dateStr;
                    return (
                      <button
                        key={d.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(d.dateStr)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold opacity-80">{d.displayDay}</div>
                        <div className="text-xs font-extrabold">{d.displayDate}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Time slot chips */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 ring-1 ring-indigo-600'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  4. Your Details
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Organization / Hospital / Lab *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Diagnostics Lab"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Official Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. procurement@apexlab.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention specific rotor capacities, cassette colors/quantities, or audit goals..."
                    value={formData.agendaNotes}
                    onChange={(e) => setFormData({ ...formData, agendaNotes: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Form Submission Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500">
                  Meeting coordinated by <strong>Technical Desk</strong> (+91 9999333447)
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Scheduling...</span>
                    ) : (
                      <>
                        <span>Confirm & Fix Meeting</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
