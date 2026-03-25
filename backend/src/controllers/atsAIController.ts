import { Request, Response } from 'express';
import { ATSService } from '../services/ATSService';
import { GroqProvider } from '../services/ats/GroqProvider';
import { ATSRequest } from '../types/ats';

// Instanciado aqui para falhar rápido se GROQ_API_KEY não estiver configurada
let atsAIService: ATSService | null = null;

function getService(): ATSService {
  if (!atsAIService) {
    atsAIService = new ATSService(new GroqProvider());
  }
  return atsAIService;
}

function validateATSRequest(body: Partial<ATSRequest>): string[] {
  const errors: string[] = [];
  if (!body.jobDescription || typeof body.jobDescription !== 'string' || body.jobDescription.trim() === '') {
    errors.push('jobDescription is required');
  }
  if (!body.resume || typeof body.resume !== 'object') {
    errors.push('resume is required');
  }
  return errors;
}

export async function analyzeATSWithAI(req: Request, res: Response): Promise<void> {
  const errors = validateATSRequest(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  try {
    const service = getService();
    const result = await service.analyze(req.body as ATSRequest);
    res.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error analyzing ATS with AI:', message);

    if (message.includes('GROQ_API_KEY')) {
      res.status(503).json({ error: 'AI analysis unavailable: GROQ_API_KEY not configured' });
    } else {
      res.status(500).json({ error: 'Failed to analyze ATS with AI' });
    }
  }
}
