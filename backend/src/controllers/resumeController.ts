import { Request, Response } from 'express';
import { ResumePdfService } from '../services/ResumePdfService';
import { ResumeData } from '../types/resume';

const resumePdfService = new ResumePdfService();

function validateResumeData(body: Partial<ResumeData>): string[] {
  const errors: string[] = [];

  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('name is required');
  }
  if (!body.email || typeof body.email !== 'string' || body.email.trim() === '') {
    errors.push('email is required');
  }
  if (!Array.isArray(body.skills)) {
    errors.push('skills must be an array');
  }
  if (!Array.isArray(body.experience)) {
    errors.push('experience must be an array');
  }
  if (!Array.isArray(body.education)) {
    errors.push('education must be an array');
  }

  return errors;
}

export async function generateResume(req: Request, res: Response): Promise<void> {
  const errors = validateResumeData(req.body);

  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  const data: ResumeData = {
    name: req.body.name.trim(),
    title: req.body.title?.trim(),
    email: req.body.email.trim(),
    phone: req.body.phone?.trim() ?? '',
    location: req.body.location?.trim() ?? '',
    summary: req.body.summary?.trim() ?? '',
    skills: req.body.skills,
    experience: req.body.experience,
    education: req.body.education,
  };

  try {
    const pdfBuffer = await resumePdfService.generatePdf(data);

    const filename = `curriculo-${data.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF:', err);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
