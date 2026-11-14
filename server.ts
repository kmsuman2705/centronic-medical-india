import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
let genAiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAiClient && process.env.GEMINI_API_KEY) {
    genAiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAiClient;
}

const MEDICAL_BUDDY_SYSTEM_PROMPT = `
You are "Medical Buddy", the full high-tech advanced AI consultant and laboratory specialist for Centronic Medical India Private Limited.
Your goal is to assist hospital procurement heads, pathologists, lab technicians, distributors, and researchers.

YOUR CAPABILITIES:
1. Deep Technical Knowledge: You know every specification, dimension, tolerance, material grade (e.g. POM acetal polymer, medical-grade Delrin, SS 304 stainless steel), rotor dynamics, RCF, speed ranges, chemical resistance (formalin, xylene, alcohol), and cleanroom quality protocols of Centronic Medical products.
2. Product Comparison: You can compare any two or more laboratory products in detail. Highlight key technical differences, throughput, ideal use cases, pros & cons, and give a clear expert verdict.
3. Facilitate Contact & Meetings: You actively guide clients to get in touch with Centronic Medical India's lead coordinator Sachin Rana, and help them schedule a 1-on-1 technical meeting or factory visit.
4. Professional, High-Tech, Helpful Persona: Scientific, accurate, courteous, and proactive. Use clean markdown formatting with bullet points and bold headers.

COMPANY DETAILS:
- Company Name: Centronic Medical India Private Limited
- Lead Coordinator & Technical Head: Sachin Rana
- Phone / WhatsApp: +91 9999333447
- Email: info.centronic@yahoo.com
- Manufacturing Facility: Plot No. 837, Sector 69, Zone-07, Industrial Model Township (IMT), Faridabad, Haryana, India – 121004
- Registered Office: Plot No. 914, Sector 7C, Faridabad, Haryana, India – 121006
- Business Hours: Monday – Saturday: 9:00 AM – 6:30 PM IST
- Manufacturing Highlights: Precision Indian Manufacturing aligned with ISO quality management principles, cleanroom injection molding, robotic degassing, dynamic motor damping.

CATALOGUE & PRODUCT FAMILIES:
1. Centrifuges:
   - "Benchtop Low Speed Centrifuge" (CMI-CLS Series): Routine clinical chemistry, urinalysis, serum/plasma separation. Brushless drive, smooth acceleration/deceleration profiles, digital display, electronic safety lid lock.
   - "Benchtop High Speed Centrifuge" (CMI-CHS Series): Rapid sedimentation, DNA/RNA extraction, molecular biology. High RCF, heavy-gauge stainless steel chamber, dynamic airflow cooling, microprocessor digital control.
   - "Floor Model Low/High Speed Centrifuge" (CMI-FLS Series): High-throughput for hospital central labs, continuous duty cycle, lockable heavy-duty 360° castors, acoustic isolation, dual emergency lid release.
   - "Blood Bank Centrifuge" (CMI-BBC Series, Upcoming): Multi-bag component separation, donor blood fractionation, ultra-smooth deceleration curves to safeguard RBCs and platelets.
   - "Tabletop Micro Centrifuge" (CMI-TMC Series): Quick spin-downs, PCR preparation, compact footprint.

2. Histology & Biopsy Consumables:
   - "Biopsy Cassettes with Detachable Lids": Micro-pore mesh (~0.9mm) preventing needle biopsy sample loss, high chemical resistance against xylene/alcohol, 45° textured writing area.
   - "Tissue Embedding Cassettes": Slotted rectangular ventilation for optimal paraffin flow, snap-latch lid, compatible with automated labeling systems.
   - "Stainless Steel Base Moulds": Premium SS 304 with mirror-finish interior for clean paraffin release and sharp corners.
   - "Disposable Plastic Embedding Rings": High-density polymer for securely mounting tissue blocks onto microtome chucks.
   - "Microtome Disposable Blades (Low & High Profile)": Ultra-sharp PTFE-coated edge for chatter-free thin sectioning down to 2-4 microns.

3. Cytology Consumables & Lab Kits:
   - "Cytology Centrifuge Funnels": Single and dual chamber funnels with high-absorption filter cards for monolayer cytocentrifugation.
   - "Pap Smear Collection Kits": Complete cervical screening kit with cytobrush, spatula, slides, and fixative.
   - "Cyto-slides & Filter Cards": Pre-cleaned lint-free slides with designated sample circles and high-absorbency cards.
   - "Specimen Transport Vials": Leak-proof polypropylene vials pre-filled with 10% neutral buffered formalin.

INTERACTIVE ACTION TAGS:
When appropriate, you can include interactive action tags at the end of your response so the client UI can render one-click buttons:
- To invite the client to schedule a meeting: include \`[ACTION:FIX_MEETING:Topic Name]\` (e.g. \`[ACTION:FIX_MEETING:Centrifuge Customization]\` or \`[ACTION:FIX_MEETING:Histology Bulk Supply]\`).
- To suggest product comparison: include \`[ACTION:COMPARE:product_id_1:product_id_2]\`.
- To offer direct contact: include \`[ACTION:CONTACT]\`.
- To suggest quote request: include \`[ACTION:QUOTE:product_id]\`.

Always encourage the client to fix a meeting or speak with Sachin Rana directly if they need custom rotor configurations, OEM branding, or institutional bulk pricing.
`;

// Helper for local high-tech fallback if Gemini API is unreachable or key is missing
function generateLocalFallbackResponse(query: string, currentProductId?: string, compareIds?: string[]): string {
  const q = query.toLowerCase();

  if (q.includes('compare') || (compareIds && compareIds.length >= 2)) {
    if (q.includes('high speed') && q.includes('low speed')) {
      return `### 🔬 Medical Buddy Comparative Analysis: Benchtop Low Speed vs. High Speed Centrifuge

**1. Motor & RCF Performance:**
- **Benchtop Low Speed (CMI-CLS):** Engineered for routine diagnostic separation (blood, serum, urinalysis) where gentle acceleration prevents cell lysis.
- **Benchtop High Speed (CMI-CHS):** Delivers substantially higher RCF (Relative Centrifugal Force) required for rapid sedimentation, cell pelleting, and molecular DNA/RNA extraction protocols.

**2. Chamber & Thermal Management:**
- **Low Speed:** Compact acoustic-damped benchtop enclosure suitable for routine ambient lab temperatures.
- **High Speed:** Heavy-gauge stainless steel rotor chamber with aerodynamic airflow cooling to mitigate sample heating during high-RPM runs.

**3. Application Verdict:**
- Select **CMI-CLS** for routine pathology, clinical chemistry, and general diagnostic centers.
- Select **CMI-CHS** for molecular biology, research institutes, and demanding hospital protocols.

Would you like to review specific rotor options with our technical team?
[ACTION:FIX_MEETING:Centrifuge Customization & Rotor Specs]
[ACTION:CONTACT]`;
    }

    if (q.includes('cassette') || q.includes('biopsy')) {
      return `### 🔬 Medical Buddy Comparative Analysis: Biopsy Cassettes vs. Tissue Embedding Cassettes

**1. Pore Architecture:**
- **Biopsy Cassettes:** Feature ultra-fine micro-pores (~0.9 mm) engineered specifically to retain delicate needle core and endoscopic biopsies without needing biopsy pads or wraps.
- **Tissue Embedding Cassettes:** Feature wider rectangular slotted openings maximizing exchange of reagents (formalin, alcohol, xylene, and molten paraffin wax) for larger gross surgical specimens.

**2. Polymer Resilience:**
- Both are manufactured from virgin acetal polymer (POM) resistant to chemical degradation and heating cycles up to 80°C.

**3. Recommendation:**
- Use **Biopsy Cassettes** for endoscopy, gastrointestinal, prostate, and needle biopsies.
- Use **Standard Tissue Cassettes** for breast, gall bladder, resection margins, and routine histology.

[ACTION:FIX_MEETING:Histology & Biopsy Cassettes OEM / Bulk Supply]
[ACTION:CONTACT]`;
    }

    return `### 🔬 Medical Buddy Product Comparison Overview

Centronic Medical India designs laboratory equipment and consumables to work synergistically:
- **Precision Engineering:** Manufactured at our IMT Faridabad facility with controlled polymer molding and dynamic motor balancing.
- **Application Alignment:** Centrifuges offer brushless drives with digital speed/timing controls; consumables (cassettes, moulds, cytology funnels) are calibrated for standard lab cassettes and microtome chucks.

Would you like our engineering team to compare custom configurations for your specific laboratory throughput?
[ACTION:FIX_MEETING:General Technical Consultation]
[ACTION:CONTACT]`;
  }

  if (q.includes('contact') || q.includes('phone') || q.includes('sachin') || q.includes('call') || q.includes('email') || q.includes('location') || q.includes('address')) {
    return `### 📞 Centronic Medical India Direct Contact Information

You can connect directly with our leadership and technical coordination team:

- **Lead Coordinator:** Sachin Rana
- **Direct Phone / WhatsApp:** +91 9999333447
- **Official Email:** info.centronic@yahoo.com
- **Manufacturing Plant:** Plot No. 837, Sector 69, Zone-07, Industrial Model Township (IMT), Faridabad, Haryana – 121004
- **Registered Office:** Plot No. 914, Sector 7C, Faridabad, Haryana – 121006
- **Working Hours:** Monday – Saturday: 9:00 AM – 6:30 PM IST

We welcome in-person visits to our Faridabad manufacturing plant as well as virtual consultations.
[ACTION:FIX_MEETING:Faridabad Plant Tour & Cleanroom Quality Audit]
[ACTION:CONTACT]`;
  }

  if (q.includes('meeting') || q.includes('appointment') || q.includes('schedule') || q.includes('visit') || q.includes('demo')) {
    return `### 📅 Schedule a Technical Meeting with Medical Buddy & Sachin Rana

I would be delighted to help you arrange a 1-on-1 consultation! We offer:
1. **Virtual Video Conference (Google Meet / Zoom)** — Ideal for spec reviews, quote evaluations, and dealer discussions.
2. **Plant / Facility Visit (IMT Faridabad)** — Tour our cleanroom manufacturing, motor assembly, and quality audit labs.
3. **Direct Phone Call** — Immediate technical coordination with Sachin Rana.

Click below to pick your date, time slot, and product focus:
[ACTION:FIX_MEETING:General Technical Consultation]
[ACTION:CONTACT]`;
  }

  return `### 👋 Hello! I am Medical Buddy, your AI Laboratory Specialist at Centronic Medical India.

I can assist you with:
- **Deep Technical Specifications:** Speed, RCF, rotor geometry, POM polymer chemical resistance, and dimensions.
- **Product Comparisons:** Evaluating low speed vs high speed centrifuges, biopsy vs tissue cassettes, or stainless steel vs plastic moulds.
- **OEM & Dealership Discussions:** Custom rotor requirements, institutional lab tenders, and volume supply.
- **Direct Coordinator Access:** Connecting you with Sachin Rana (+91 9999333447) or fixing a scheduled meeting.

How may I assist your laboratory workflow today?
[ACTION:FIX_MEETING:General Technical Consultation]
[ACTION:CONTACT]`;
}

// 1. Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Medical Buddy AI Engine' });
});

// Helper for timeout
function withTimeout<T>(promise: Promise<T>, ms = 6000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    )
  ]);
}

// 2. Medical Buddy Chat Endpoint
app.post('/api/medical-buddy/chat', async (req, res) => {
  try {
    const { messages, currentProductId, compareProductIds } = req.body;
    const latestUserMessage = Array.isArray(messages) && messages.length > 0
      ? messages[messages.length - 1].content
      : '';

    const ai = getGenAI();

    if (ai) {
      // Format chat history for Gemini API
      const conversationHistory = (messages || []).map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      // Add context if product is selected
      let contextNote = '';
      if (currentProductId) {
        contextNote += `\n[Context: The client is currently viewing product ID "${currentProductId}"]`;
      }
      if (compareProductIds && compareProductIds.length > 0) {
        contextNote += `\n[Context: The client is comparing products: ${compareProductIds.join(', ')}]`;
      }

      if (contextNote && conversationHistory.length > 0) {
        const last = conversationHistory[conversationHistory.length - 1];
        if (last.role === 'user') {
          last.parts[0].text += contextNote;
        }
      }

      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: conversationHistory.length > 0 ? conversationHistory : latestUserMessage,
            config: {
              systemInstruction: MEDICAL_BUDDY_SYSTEM_PROMPT,
              temperature: 0.7,
              topP: 0.95,
            }
          }),
          6000
        );

        const reply = response.text || '';
        if (reply.trim().length > 0) {
          return res.json({ response: reply, provider: 'gemini-3.8-flash' });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, using intelligent fallback:', geminiErr);
      }
    }

    // Fallback response if no key or error
    const fallbackText = generateLocalFallbackResponse(latestUserMessage, currentProductId, compareProductIds);
    return res.json({ response: fallbackText, provider: 'medical-buddy-engine' });
  } catch (error) {
    console.error('Error in /api/medical-buddy/chat:', error);
    return res.status(500).json({
      error: 'Failed to process chat message',
      response: 'I encountered an issue processing your request. Please contact Sachin Rana directly at +91 9999333447 or email info.centronic@yahoo.com.\n\n[ACTION:CONTACT]\n[ACTION:FIX_MEETING:General Technical Consultation]'
    });
  }
});

// 3. Medical Buddy Deep Product Comparison Endpoint
app.post('/api/medical-buddy/compare', async (req, res) => {
  try {
    const { product1, product2 } = req.body;
    if (!product1 || !product2) {
      return res.status(400).json({ error: 'product1 and product2 are required for comparison' });
    }

    const ai = getGenAI();
    const prompt = `
Perform an in-depth, rigorous, high-tech engineering and clinical comparison between these two Centronic Medical India products:
Product 1: "${product1.name}" (${product1.categoryLabel || product1.category})
Short desc: ${product1.shortDesc}
Full desc: ${product1.fullDesc}
Features: ${JSON.stringify(product1.features || [])}
Specs: ${JSON.stringify(product1.specs || [])}

Product 2: "${product2.name}" (${product2.categoryLabel || product2.category})
Short desc: ${product2.shortDesc}
Full desc: ${product2.fullDesc}
Features: ${JSON.stringify(product2.features || [])}
Specs: ${JSON.stringify(product2.specs || [])}

Provide your evaluation formatted in clean Markdown with:
1. **Executive Comparison Summary**: 2-3 sentences contrasting the core design philosophies.
2. **Key Engineering & Spec Differences**: A comparative breakdown table or bulleted matrix.
3. **Application & Workflow Suitability**: Which lab tier, clinical protocol, or throughput volume is ideal for each.
4. **Pros & Considerations**: Technical strengths and trade-offs.
5. **Medical Buddy's Recommendation Verdict**: Clear guidance for procurement decision-makers.

Conclude with:
- Recommendation to fix a technical meeting with Sachin Rana for custom rotor configurations or sample evaluation.
- Include action tag: [ACTION:FIX_MEETING:${product1.name} vs ${product2.name} Consultation]
`;

    if (ai) {
      try {
        const response = await withTimeout(
          ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
            config: {
              systemInstruction: MEDICAL_BUDDY_SYSTEM_PROMPT,
              temperature: 0.6,
            }
          }),
          6000
        );

        if (response.text && response.text.trim().length > 0) {
          return res.json({ analysis: response.text, provider: 'gemini-3.8-flash' });
        }
      } catch (err) {
        console.warn('Gemini comparison call error, using local template:', err);
      }
    }

    // Local structured comparison fallback
    const fallbackAnalysis = `### 🔬 Medical Buddy High-Tech Product Comparison

#### 1. Executive Comparison: ${product1.name} vs. ${product2.name}
Both models are engineered under Centronic Medical India's strict ISO quality management principles at our IMT Faridabad manufacturing hub. While **${product1.name}** is tailored for **${product1.shortDesc || 'specialized laboratory procedures'}**, **${product2.name}** targets **${product2.shortDesc || 'high-efficiency routine protocols'}**.

#### 2. Key Engineering & Operational Differences
- **Primary Design Focus:**
  - **${product1.name}:** Optimized for precision control, specialized sample safety, and repeatable outcomes.
  - **${product2.name}:** Built for throughput optimization, robust duty-cycles, and ergonomic workflow efficiency.
- **Materials & Build Quality:** Both utilize medical-grade components (brushless drives, chemical-resistant polymers, or 304-grade stainless steel).
- **Control Interface:** Microprocessor digital timing and parameter monitoring with safety interlocks.

#### 3. Clinical & Laboratory Suitability
- **Choose ${product1.name} if:** Your laboratory requires targeted precision, specialized protocol compatibility, and space-saving or dedicated benchtop operation.
- **Choose ${product2.name} if:** Your workflow demands higher daily volume, versatile multi-tube processing, or institutional hospital integration.

#### 4. Medical Buddy Verdict & Recommendation
For high-volume clinical pathology or molecular setups, consult with Sachin Rana at Centronic Medical India to evaluate specific rotor pairings, batch pricing, and cleanroom sample kits.

[ACTION:FIX_MEETING:${product1.name} vs ${product2.name} Technical Review]
[ACTION:CONTACT]`;

    return res.json({ analysis: fallbackAnalysis, provider: 'medical-buddy-engine' });
  } catch (error) {
    console.error('Error in /api/medical-buddy/compare:', error);
    return res.status(500).json({ error: 'Failed to generate product comparison' });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

