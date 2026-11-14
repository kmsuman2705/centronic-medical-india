import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  Calendar,
  Phone,
  MessageCircle,
  Scale,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Minimize2,
  Maximize2,
  HelpCircle,
  FileText
} from 'lucide-react';
import { COMPANY_DETAILS } from '../data/companyData';
import { PRODUCTS } from '../data/productsData';
import { ProductItem } from '../types';

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

interface MedicalBuddyWidgetProps {
  onOpenMeetingModal: (preselectedTopic?: string) => void;
  onOpenCompareModal: (initialProductA?: ProductItem, initialProductB?: ProductItem) => void;
  onSelectProduct?: (product: ProductItem) => void;
  onAddToQuote?: (product: ProductItem) => void;
  isOpen: boolean;
  onToggle: () => void;
  currentProduct?: ProductItem | null;
}

const INITIAL_GREETING = `### 👋 Greetings! I am Medical Buddy.
I am Centronic Medical India's **Precision Laboratory AI Specialist**.

I can assist you with:
- **🔬 Side-by-Side Product Comparisons** (e.g. Low Speed vs High Speed Centrifuges, Biopsy vs Embedding Cassettes)
- **📋 Deep Technical Specifications** (RPM, RCF, acetal POM polymer grades, 304 stainless steel moulds)
- **📞 Direct Contact Access** with our Technical Sales Desk
- **📅 Fixing a 1-on-1 Meeting** or Faridabad manufacturing plant audit

How can I assist your laboratory or procurement team today?`;

const PROMPT_SUGGESTIONS = [
  'Compare Benchtop Low vs High Speed Centrifuges',
  'What is the difference between Biopsy & Tissue Cassettes?',
  'Schedule a 1-on-1 technical meeting with our technical team',
  'Give me company contact details & Faridabad address',
  'Which centrifuge is best for blood component separation?'
];

export const MedicalBuddyWidget: React.FC<MedicalBuddyWidgetProps> = ({
  onOpenMeetingModal,
  onOpenCompareModal,
  onSelectProduct,
  onAddToQuote,
  isOpen,
  onToggle,
  currentProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: INITIAL_GREETING,
      timestamp: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Contextual prompt if a product is currently viewed
  useEffect(() => {
    if (currentProduct && isOpen && messages.length === 1) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ctx-${currentProduct.id}`,
          role: 'assistant',
          content: `I see you are viewing **${currentProduct.name}** (${currentProduct.series || currentProduct.categoryLabel}). Would you like me to explain its rotor compatibility, material specifications, or compare it with another model?`,
          timestamp: 'Just now'
        }
      ]);
    }
  }, [currentProduct, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/medical-buddy/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          currentProductId: currentProduct?.id
        })
      });

      if (!res.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await res.json();
      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.response || 'I am ready to assist you. Please ask any technical or procurement question.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Medical Buddy chat error:', err);
      // Fallback message
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `I am here to support your technical inquiry. You can also connect directly with our technical team at **${COMPANY_DETAILS.phone}** or schedule an appointment.\n\n[ACTION:FIX_MEETING:General Technical Consultation]\n[ACTION:CONTACT]`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: INITIAL_GREETING,
        timestamp: 'Just now'
      }
    ]);
  };

  // Render text with interactive action tags
  const renderMessageContent = (content: string) => {
    // Extract action tags
    const meetingActionRegex = /\[ACTION:FIX_MEETING:(.*?)\]/g;
    const compareActionRegex = /\[ACTION:COMPARE:(.*?):(.*?)\]/g;
    const contactActionRegex = /\[ACTION:CONTACT\]/g;
    const quoteActionRegex = /\[ACTION:QUOTE:(.*?)\]/g;

    const meetingMatches: string[] = [];
    let match;
    while ((match = meetingActionRegex.exec(content)) !== null) {
      meetingMatches.push(match[1]);
    }

    const compareMatches: { p1: string; p2: string }[] = [];
    while ((match = compareActionRegex.exec(content)) !== null) {
      compareMatches.push({ p1: match[1], p2: match[2] });
    }

    const hasContactAction = contactActionRegex.test(content);
    const quoteMatches: string[] = [];
    while ((match = quoteActionRegex.exec(content)) !== null) {
      quoteMatches.push(match[1]);
    }

    // Clean text without raw action tags for display
    const cleanText = content
      .replace(/\[ACTION:FIX_MEETING:.*?\]/g, '')
      .replace(/\[ACTION:COMPARE:.*?:.*?\]/g, '')
      .replace(/\[ACTION:CONTACT\]/g, '')
      .replace(/\[ACTION:QUOTE:.*?\]/g, '')
      .trim();

    return (
      <div className="space-y-3">
        <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap font-sans text-slate-800">
          {cleanText.split('\n').map((line, i) => {
            if (line.startsWith('### ')) {
              return (
                <div key={i} className="font-extrabold text-sm sm:text-base text-slate-900 mt-2 mb-1 flex items-center gap-1.5">
                  {line.replace('### ', '')}
                </div>
              );
            }
            if (line.startsWith('#### ')) {
              return (
                <div key={i} className="font-bold text-xs sm:text-sm text-indigo-950 mt-2 mb-0.5">
                  {line.replace('#### ', '')}
                </div>
              );
            }
            if (line.startsWith('- ') || line.startsWith('* ')) {
              const itemText = line.substring(2);
              // Handle bolding within bullet
              return (
                <div key={i} className="flex items-start gap-1.5 pl-1 my-0.5 text-slate-700">
                  <span className="text-indigo-500 font-bold">•</span>
                  <span>{renderFormattedInline(itemText)}</span>
                </div>
              );
            }
            if (line.trim() === '') {
              return <div key={i} className="h-1" />;
            }
            return (
              <p key={i} className="my-1">
                {renderFormattedInline(line)}
              </p>
            );
          })}
        </div>

        {/* Interactive Action Buttons */}
        {(meetingMatches.length > 0 || compareMatches.length > 0 || hasContactAction || quoteMatches.length > 0) && (
          <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-2">
            {meetingMatches.map((topic, idx) => (
              <button
                key={`meet-${idx}`}
                onClick={() => onOpenMeetingModal(topic)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Fix a Meeting ({topic})</span>
              </button>
            ))}

            {compareMatches.map((pair, idx) => {
              const p1Obj = PRODUCTS.find((p) => p.id === pair.p1);
              const p2Obj = PRODUCTS.find((p) => p.id === pair.p2);
              return (
                <button
                  key={`comp-${idx}`}
                  onClick={() => onOpenCompareModal(p1Obj, p2Obj)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Launch Side-by-Side Comparison</span>
                </button>
              );
            })}

            {hasContactAction && (
              <div className="flex flex-wrap gap-1.5 w-full pt-1">
                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-semibold transition-colors"
                >
                  <Phone className="w-3 h-3 text-indigo-600" />
                  <span>Call {COMPANY_DETAILS.contactPerson} ({COMPANY_DETAILS.phone})</span>
                </a>

                <a
                  href={COMPANY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Helper for bold text in lines
  const renderFormattedInline = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Trigger Beacon (Bottom Right) with High-Tech Spring Entrance/Exit */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="medical-buddy-beacon"
            id="medical-buddy-beacon-wrapper"
            initial={{ opacity: 0, scale: 0.82, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 16, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 26,
              mass: 0.8
            }}
            className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
          >
            <motion.button
              id="medical-buddy-toggle-button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onToggle}
              className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl hover:shadow-2xl border border-indigo-500/40 hover:border-indigo-400 transition-shadow duration-300 cursor-pointer overflow-hidden"
              aria-label="Open Medical Buddy AI"
            >
              {/* High-tech subtle light beam sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />

              {/* Pulsing indicator */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>

              <div className="w-6 h-6 rounded-full bg-indigo-600/80 flex items-center justify-center text-white shadow-inner">
                <Bot className="w-4 h-4" />
              </div>

              <div className="text-left">
                <div className="text-xs font-black tracking-tight flex items-center gap-1 text-white">
                  <span>Medical Buddy</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500 text-white font-bold">AI</span>
                </div>
                <div className="text-[10px] text-slate-300 font-medium">
                  Lab Specs & Compare
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Modal Window with Responsive High-Tech Entrance & Exit */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="medical-buddy-modal-window"
            id="medical-buddy-chat-panel"
            initial={{
              opacity: 0,
              scale: 0.88,
              y: 24,
              transformOrigin: 'bottom right'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
              transition: {
                duration: 0.2,
                ease: [0.32, 0, 0.67, 0]
              }
            }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 27,
              mass: 0.85
            }}
            className={`fixed z-50 shadow-2xl rounded-2xl bg-white border border-slate-200/90 flex flex-col overflow-hidden ring-1 ring-slate-900/10 ${
              isExpanded
                ? 'inset-3 sm:inset-6 md:inset-10 transition-all duration-300'
                : 'bottom-4 right-4 w-[92vw] sm:w-[460px] h-[580px] max-h-[90vh]'
            }`}
          >
            {/* Top High-Tech Accent Telemetry Beam */}
            <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 shrink-0" />

            {/* Header */}
            <div className="bg-slate-950 text-white px-4 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-sm font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black text-white tracking-tight">
                      Medical Buddy
                    </h3>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                      High-Tech AI
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Centronic Precision Lab & Product Comparison Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                {/* Compare products shortcut */}
                <button
                  onClick={() => {
                    onOpenCompareModal();
                  }}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="Open Product Comparison Studio"
                >
                  <Scale className="w-4 h-4" />
                </button>

                {/* Fix a meeting shortcut */}
                <button
                  onClick={() => onOpenMeetingModal()}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-amber-400 transition-colors cursor-pointer"
                  title="Schedule 1-on-1 Meeting"
                >
                  <Calendar className="w-4 h-4" />
                </button>

                {/* Clear chat */}
                <button
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                {/* Expand / Minimize */}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer hidden sm:block"
                  title={isExpanded ? 'Restore size' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                {/* Close */}
                <motion.button
                  id="medical-buddy-close-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggle}
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer ml-1"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

          {/* Quick Tool Navigation Bar */}
          <div className="bg-slate-900/90 text-slate-200 px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800 shrink-0 overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Quick Actions:</span>
              <button
                onClick={() => onOpenCompareModal()}
                className="px-2 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Scale className="w-3 h-3" />
                <span>Compare Products</span>
              </button>

              <button
                onClick={() => onOpenMeetingModal()}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-3 h-3" />
                <span>Fix a Meeting</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-400 font-medium pl-2 whitespace-nowrap hidden sm:block">
              Faridabad, India
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200/80 rounded-tl-xs'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                  ) : (
                    renderMessageContent(msg.content)
                  )}

                  <div
                    className={`text-[9px] mt-1 text-right font-medium ${
                      msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-3.5 shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-xs text-slate-500 font-medium ml-1">
                    Medical Buddy is analyzing technical specifications...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          {messages.length < 4 && (
            <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto shrink-0 flex items-center gap-1.5 scrollbar-none">
              <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0">Try asking:</span>
              {PROMPT_SUGGESTIONS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-[11px] font-medium whitespace-nowrap shadow-2xs transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about specs, compare models, fix a meeting, or get contacts..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors cursor-pointer shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-1.5 px-1 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-indigo-500" />
                Medical Buddy AI • Centronic Medical India
              </span>
              <span>Helpdesk: +91 9999333447</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
);
};
