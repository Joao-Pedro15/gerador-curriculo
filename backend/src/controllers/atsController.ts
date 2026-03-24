import { Request, Response } from 'express';
import { atsService } from '../services/ATSService';
import { ATSRequest } from '../types/ats';

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

export async function analyzeATS(req: Request, res: Response): Promise<void> {
  const errors = validateATSRequest(req.body);

  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  try {
    const result = await atsService.analyze(req.body as ATSRequest);
    res.json(result);
  } catch (err) {
    console.error('Error analyzing ATS:', err);
    res.status(500).json({ error: 'Failed to analyze ATS compatibility' });
  }
}
