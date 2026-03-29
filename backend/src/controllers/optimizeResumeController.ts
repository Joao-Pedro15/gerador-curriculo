import { Request, Response } from 'express';
import { ResumeOptimizerService } from '../services/ResumeOptimizerService';
import { OptimizeResumeRequest } from '../types/ats';

let optimizerService: ResumeOptimizerService | null = null;

function getService(): ResumeOptimizerService {
  if (!optimizerService) {
    optimizerService = new ResumeOptimizerService();
  }
  return optimizerService;
}

function validateRequest(body: Partial<OptimizeResumeRequest>): string[] {
  const errors: string[] = [];
  if (!body.jobDescription || typeof body.jobDescription !== 'string' || body.jobDescription.trim() === '') {
    errors.push('jobDescription is required');
  }
  if (!body.resume || typeof body.resume !== 'object') {
    errors.push('resume is required');
  } else {
    if (!body.resume.name) errors.push('resume.name is required');
    if (!body.resume.email) errors.push('resume.email is required');
  }
  if (!body.insights || typeof body.insights !== 'object') {
    errors.push('insights is required');
  }
  return errors;
}

export async function optimizeResume(req: Request, res: Response): Promise<void> {
  const errors = validateRequest(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  try {
    const service = getService();
    const optimized = await service.optimize(req.body as OptimizeResumeRequest);
    res.json(optimized);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error optimizing resume:', message);

    if (message.includes('GROQ_API_KEY')) {
      res.status(503).json({ error: 'AI optimization unavailable: GROQ_API_KEY not configured' });
    } else {
      res.status(500).json({ error: 'Failed to optimize resume', details: message });
    }
  }
}
