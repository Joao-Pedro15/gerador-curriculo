import { Request, Response } from 'express';
import { IdealResumeService } from '../services/IdealResumeService';
import { ResumePdfService } from '../services/ResumePdfService';
import { IdealResumeRequest } from '../types/ats';

let idealService: IdealResumeService | null = null;
const pdfService = new ResumePdfService();

function getService(): IdealResumeService {
  if (!idealService) {
    idealService = new IdealResumeService();
  }
  return idealService;
}

function validateRequest(body: Partial<IdealResumeRequest>): string[] {
  const errors: string[] = [];
  if (!body.jobDescription || typeof body.jobDescription !== 'string' || body.jobDescription.trim() === '') {
    errors.push('jobDescription is required');
  }
  if (!body.insights || typeof body.insights !== 'object') {
    errors.push('insights is required');
  }
  return errors;
}

export async function generateIdealResume(req: Request, res: Response): Promise<void> {
  const errors = validateRequest(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  try {
    const service = getService();
    const idealData = await service.generate(req.body as IdealResumeRequest);
    const pdfBuffer = await pdfService.generatePdf(idealData);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="curriculo-ideal-referencia.pdf"');
    res.send(pdfBuffer);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error generating ideal resume:', message);

    if (message.includes('GROQ_API_KEY')) {
      res.status(503).json({ error: 'AI unavailable: GROQ_API_KEY not configured' });
    } else {
      res.status(500).json({ error: 'Failed to generate ideal resume', details: message });
    }
  }
}
