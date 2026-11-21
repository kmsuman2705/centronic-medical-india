import { jsPDF } from 'jspdf';
import { COMPANY_DETAILS } from '../data/companyData';
import { QuoteCartItem } from '../types';

const LOGO_URL = '/assets/brand/centronic-logo.png';

const INQUIRY_LABELS: Record<string, string> = {
  pricing: 'Commercial Quotation & Volume Pricing',
  sample: 'Sample Request / Evaluation',
  dealership: 'Authorized Dealership / Distribution',
  technical: 'Technical Specifications & Custom OEM'
};

export interface QuotationPdfFormData {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  city: string;
  inquiryType: string;
  message: string;
}

export interface QuotationPdfInput {
  reference: string;
  items: QuoteCartItem[];
  customer: QuotationPdfFormData;
}

const INK = { r: 15, g: 23, b: 42 } as const;
const MUTED = { r: 100, g: 116, b: 139 } as const;
const ACCENT = { r: 79, g: 70, b: 229 } as const;
const LINE = { r: 226, g: 232, b: 240 } as const;
const PANEL = { r: 248, g: 250, b: 252 } as const;

function loadLogo(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = LOGO_URL;
  });
}

function text(doc: jsPDF, value: string, x: number, y: number, options?: {
  size?: number;
  bold?: boolean;
  color?: { r: number; g: number; b: number };
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
}) {
  const size = options?.size ?? 9;
  const color = options?.color ?? INK;
  doc.setFont('helvetica', options?.bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(color.r, color.g, color.b);
  if (options?.maxWidth) {
    const lines = doc.splitTextToSize(value, options.maxWidth) as string[];
    doc.text(lines, x, y, { align: options.align ?? 'left' });
    return lines.length * size * 0.42;
  }
  doc.text(value, x, y, { align: options.align ?? 'left' });
  return size * 0.42;
}

function rule(doc: jsPDF, y: number, color: { r: number; g: number; b: number } = LINE, width = 0.3) {
  doc.setDrawColor(color.r, color.g, color.b);
  doc.setLineWidth(width);
  doc.line(16, y, 194, y);
}

function panel(doc: jsPDF, x: number, y: number, w: number, h: number) {
  doc.setFillColor(PANEL.r, PANEL.g, PANEL.b);
  doc.setDrawColor(LINE.r, LINE.g, LINE.b);
  doc.setLineWidth(0.2);
  doc.roundedRect(x, y, w, h, 2, 2, 'FD');
}

function footer(doc: jsPDF, reference: string) {
  const pageHeight = doc.internal.pageSize.getHeight();
  rule(doc, pageHeight - 28);
  text(doc, 'CIN: U33100HR2021PTC094663  |  PAN: AAJCC4435B  |  GSTIN: 06AAJCC4435B1Z2  |  TAN: RTKC06491C', 16, pageHeight - 22, {
    size: 6.5,
    color: MUTED
  });
  text(doc, `UDYAM/MSME: UDYAM-HR-03-0015523  |  CDSCO: Centro Farid HR/M/IVD /020285  |  ${COMPANY_DETAILS.website}`, 16, pageHeight - 17, {
    size: 6.5,
    color: MUTED
  });
  text(doc, `RFQ ${reference}  •  Page ${doc.getCurrentPageInfo().pageNumber} of ${doc.getNumberOfPages()}`, 16, pageHeight - 10, {
    size: 6.5,
    color: MUTED
  });
  text(doc, 'System-generated request summary. Prices are confirmed by Centronic Medical India technical sales.', 194, pageHeight - 10, {
    size: 6.5,
    color: MUTED,
    align: 'right'
  });
}

export async function generateQuotationRequestPdf({ reference, items, customer }: QuotationPdfInput): Promise<void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
  const logo = await loadLogo();

  text(doc, 'QUOTATION REQUEST', 194, 18, { size: 9, bold: true, color: ACCENT, align: 'right' });
  text(doc, reference, 194, 24, { size: 8, color: MUTED, align: 'right' });

  if (logo) {
    const logoHeight = 17;
    const logoWidth = logoHeight * (logo.naturalWidth / logo.naturalHeight);
    doc.addImage(logo, 'PNG', 16, 13, logoWidth, logoHeight);
  } else {
    text(doc, COMPANY_DETAILS.name.toUpperCase(), 16, 20, { size: 13, bold: true });
  }

  rule(doc, 36, ACCENT, 0.6);
  text(doc, `${COMPANY_DETAILS.phone}  |  ${COMPANY_DETAILS.email}  |  www.${COMPANY_DETAILS.website}`, 16, 42, {
    size: 7.5,
    color: MUTED
  });
  text(doc, COMPANY_DETAILS.registeredOffice.address, 16, 47, { size: 7.5, color: MUTED });

  text(doc, 'Request for Quotation', 16, 62, { size: 18, bold: true });
  text(doc, 'Laboratory equipment & diagnostic consumables — manufacturer-direct enquiry', 16, 68, {
    size: 8.5,
    color: MUTED
  });

  panel(doc, 16, 74, 178, 32);
  text(doc, 'RFQ REFERENCE', 21, 81, { size: 6.5, bold: true, color: MUTED });
  text(doc, reference, 21, 87, { size: 9, bold: true });
  text(doc, 'DATE', 21, 98, { size: 6.5, bold: true, color: MUTED });
  text(doc, new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), 36, 98, { size: 8 });

  text(doc, 'PREPARED FOR', 106, 81, { size: 6.5, bold: true, color: MUTED });
  text(doc, customer.organization || '—', 106, 87, { size: 9, bold: true, maxWidth: 82 });
  text(doc, `${customer.fullName || '—'}  •  ${customer.city || '—'}`, 106, 98, { size: 8, color: MUTED, maxWidth: 82 });

  text(doc, 'CONTACT', 16, 115, { size: 6.5, bold: true, color: MUTED });
  text(doc, `${customer.email || '—'}  |  ${customer.phone || '—'}`, 16, 121, { size: 8.5 });

  text(doc, 'INQUIRY CATEGORY', 16, 130, { size: 6.5, bold: true, color: MUTED });
  text(doc, INQUIRY_LABELS[customer.inquiryType] ?? customer.inquiryType, 16, 136, { size: 8.5 });

  let y = 148;
  text(doc, 'REQUESTED ITEMS', 16, y, { size: 9, bold: true });
  y += 5;

  doc.setFillColor(ACCENT.r, ACCENT.g, ACCENT.b);
  doc.rect(16, y, 178, 9, 'F');
  text(doc, '#', 20, y + 6, { size: 7.5, bold: true, color: { r: 255, g: 255, b: 255 } });
  text(doc, 'PRODUCT', 30, y + 6, { size: 7.5, bold: true, color: { r: 255, g: 255, b: 255 } });
  text(doc, 'CATEGORY', 116, y + 6, { size: 7.5, bold: true, color: { r: 255, g: 255, b: 255 } });
  text(doc, 'QTY / PACK SIZE', 164, y + 6, { size: 7.5, bold: true, color: { r: 255, g: 255, b: 255 } });
  y += 9;

  items.forEach((item, index) => {
    const nameLines = doc.splitTextToSize(item.product.name, 82) as string[];
    const qtyLines = doc.splitTextToSize(item.quantityNote || 'To be advised', 42) as string[];
    const categoryLines = doc.splitTextToSize(item.product.categoryLabel, 44) as string[];
    const rowHeight = Math.max(11, Math.max(nameLines.length, qtyLines.length, categoryLines.length) * 4.5 + 5);

    if (y + rowHeight > 258) {
      footer(doc, reference);
      doc.addPage();
      y = 20;
    }

    if (index % 2 === 1) {
      doc.setFillColor(PANEL.r, PANEL.g, PANEL.b);
      doc.rect(16, y, 178, rowHeight, 'F');
    }
    text(doc, String(index + 1).padStart(2, '0'), 20, y + 6, { size: 8, bold: true, color: ACCENT });
    text(doc, nameLines.join('\n'), 30, y + 6, { size: 8 });
    text(doc, categoryLines.join('\n'), 116, y + 6, { size: 7.5, color: MUTED });
    text(doc, qtyLines.join('\n'), 164, y + 6, { size: 7.5 });
    rule(doc, y + rowHeight);
    y += rowHeight;
  });

  y += 8;
  if (y > 235) {
    footer(doc, reference);
    doc.addPage();
    y = 20;
  }
  text(doc, 'WORKFLOW REQUIREMENTS / NOTES', 16, y, { size: 9, bold: true });
  y += 6;
  if (customer.message?.trim()) {
    const noteLines = doc.splitTextToSize(customer.message.trim(), 174) as string[];
    text(doc, noteLines.join('\n'), 16, y, { size: 8, maxWidth: 174 });
    y += noteLines.length * 4 + 4;
  } else {
    text(doc, 'No additional requirements specified.', 16, y, { size: 8, color: MUTED });
    y += 8;
  }

  panel(doc, 16, y, 178, 22);
  text(doc, 'NEXT STEPS', 21, y + 7, { size: 7, bold: true, color: ACCENT });
  text(doc, 'Our technical sales team will review this request and revert with product-wise pricing,', 21, y + 13, { size: 7.5, color: MUTED });
  text(doc, 'availability and delivery timelines. Response expected within 4 business hours.', 21, y + 18, { size: 7.5, color: MUTED });

  footer(doc, reference);
  doc.save(`Centronic-RFQ-${reference}.pdf`);
}
