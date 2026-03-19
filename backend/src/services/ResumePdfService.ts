import PDFDocument from 'pdfkit';
import { ResumeData } from '../types/resume';

// Colors matching the reference template
const COLORS = {
  name: '#1A1A2E',
  title: '#4CAAAA',
  sectionHeader: '#4CAAAA',
  body: '#2C2C2C',
  secondary: '#555555',
  accent: '#4CAAAA',
};

// ATS-safe section names: use widely recognized labels
const SECTION_LABELS = {
  summary: 'RESUMO PROFISSIONAL',
  experience: 'EXPERIENCIA PROFISSIONAL',
  education: 'FORMACAO ACADEMICA',
  courses: 'CURSOS E CERTIFICACOES',
  skills: 'COMPETENCIAS E HABILIDADES',
};

const FONTS = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  oblique: 'Helvetica-Oblique',
};

const MARGIN = {
  left: 55,
  right: 55,
  top: 55,
  bottom: 55,
};

export class ResumePdfService {
  generatePdf(data: ResumeData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      // PDF metadata: ATS crawlers read these fields for keyword matching
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: MARGIN.top,
          bottom: MARGIN.bottom,
          left: MARGIN.left,
          right: MARGIN.right,
        },
        bufferPages: true,
        info: {
          Title: `Curriculo - ${data.name}`,
          Author: data.name,
          Subject: data.title ?? 'Curriculo Profissional',
          Keywords: data.skills.join(', '),
        },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const contentWidth = doc.page.width - MARGIN.left - MARGIN.right;

      // Render in template order
      this.renderHeader(doc, data, contentWidth);
      this.renderContactInfo(doc, data, contentWidth);
      this.renderSummary(doc, data, contentWidth);
      this.renderExperience(doc, data, contentWidth);
      this.renderEducation(doc, data, contentWidth);
      this.renderCourses(doc, data, contentWidth);
      this.renderSkills(doc, data, contentWidth);

      doc.end();
    });
  }

  // Name + title block
  private renderHeader(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    doc
      .font(FONTS.bold)
      .fontSize(26)
      .fillColor(COLORS.name)
      .text(data.name, MARGIN.left, MARGIN.top, {
        width: contentWidth,
        align: 'left',
      });

    if (data.title) {
      doc
        .font(FONTS.oblique)
        .fontSize(13)
        .fillColor(COLORS.title)
        .text(data.title, MARGIN.left, doc.y + 2, {
          width: contentWidth,
          align: 'left',
        });
    }

    doc.moveDown(0.8);
  }

  // Contact info: each field labeled so ATS classifiers can identify type
  private renderContactInfo(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    // Build labeled parts — ATS parsers recognize "E-mail:", "Tel.:", etc.
    const parts: string[] = [];
    if (data.location) parts.push(data.location);
    if (data.phone) parts.push(`Tel.: ${data.phone}`);
    if (data.email) parts.push(`E-mail: ${data.email}`);
    if (data.github) parts.push(`GitHub: ${data.github}`);
    if (data.linkedin) parts.push(`LinkedIn: ${data.linkedin}`);

    if (parts.length === 0) return;

    doc
      .font(FONTS.regular)
      .fontSize(9)
      .fillColor(COLORS.secondary)
      .text(parts.join('  |  '), MARGIN.left, doc.y, {
        width: contentWidth,
        align: 'left',
      });

    doc.moveDown(0.9);
  }

  // Resumo Profissional section
  private renderSummary(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.summary) return;

    this.renderSectionHeader(doc, SECTION_LABELS.summary, contentWidth);

    doc
      .font(FONTS.regular)
      .fontSize(10)
      .fillColor(COLORS.body)
      .text(data.summary, MARGIN.left, doc.y, {
        width: contentWidth,
        align: 'justify',
      });

    doc.moveDown(1.2);
  }

  // Experiencia Profissional section
  // ATS best practices: company and role on separate lines, plain-text bullets with hyphen
  private renderExperience(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.experience?.length) return;

    this.renderSectionHeader(doc, SECTION_LABELS.experience, contentWidth);

    for (const exp of data.experience) {
      // Line 1: Company name (bold) — own line so ATS maps it as employer
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(exp.company, MARGIN.left, doc.y, { width: contentWidth });

      // Line 2: Role | Period — separate line so ATS maps role correctly
      if (exp.role || exp.period) {
        const roleLine = [exp.role, exp.period].filter(Boolean).join('  |  ');
        doc
          .font(FONTS.regular)
          .fontSize(10)
          .fillColor(COLORS.secondary)
          .text(roleLine, MARGIN.left, doc.y, { width: contentWidth });
      }

      doc.moveDown(0.4);

      // Description bullets — use hyphen (-) instead of unicode bullet:
      // WinAnsiEncoding bullet (0x95) can be garbled by some ATS text extractors;
      // ASCII hyphen is universally safe.
      if (exp.description) {
        const lines = exp.description
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);

        for (const line of lines) {
          doc
            .font(FONTS.regular)
            .fontSize(10)
            .fillColor(COLORS.body)
            .text(`\u2022 ${line}`, MARGIN.left + 8, doc.y, {
              width: contentWidth - 8,
              align: 'justify',
            });
          doc.moveDown(0.5);
        }
      }

      // Tech stack — label in bold accent color + tech list in regular, visually set apart
      if (exp.techStack) {
        doc.moveDown(0.3);
        doc
          .font(FONTS.bold)
          .fontSize(9)
          .fillColor(COLORS.sectionHeader)
          .text('Tecnologias: ', MARGIN.left, doc.y, { continued: true });
        doc
          .font(FONTS.oblique)
          .fontSize(9)
          .fillColor(COLORS.secondary)
          .text(exp.techStack, { width: contentWidth });
      }

      doc.moveDown(0.9);
    }

    doc.moveDown(0.2);
  }

  // Formacao Academica section
  // ATS: institution, degree, and period each on its own line for reliable field mapping
  private renderEducation(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.education?.length) return;

    this.renderSectionHeader(doc, SECTION_LABELS.education, contentWidth);

    for (const edu of data.education) {
      // Institution (bold) — own line
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(edu.institution, MARGIN.left, doc.y, { width: contentWidth });

      // Degree — own line
      if (edu.degree) {
        doc
          .font(FONTS.regular)
          .fontSize(10)
          .fillColor(COLORS.body)
          .text(edu.degree, MARGIN.left, doc.y, { width: contentWidth });
      }

      // Period — own line
      if (edu.period) {
        doc
          .font(FONTS.regular)
          .fontSize(10)
          .fillColor(COLORS.secondary)
          .text(edu.period, MARGIN.left, doc.y, { width: contentWidth });
      }

      doc.moveDown(0.7);
    }

    doc.moveDown(0.3);
  }

  // Cursos e Certificacoes section
  private renderCourses(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.courses?.length) return;

    const validCourses = data.courses.filter((c) => c.name?.trim());
    if (!validCourses.length) return;

    this.renderSectionHeader(doc, SECTION_LABELS.courses, contentWidth);

    for (const course of validCourses) {
      // Course name bold
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(course.name, MARGIN.left, doc.y, { width: contentWidth });

      // Institution on separate line so ATS maps issuing org correctly
      if (course.institution) {
        doc
          .font(FONTS.regular)
          .fontSize(10)
          .fillColor(COLORS.secondary)
          .text(course.institution, MARGIN.left, doc.y, { width: contentWidth });
      }

      doc.moveDown(0.4);
    }

    doc.moveDown(0.5);
  }

  // Competencias e Habilidades section
  // ATS keyword optimization: emit a comma-separated aggregate line first (invisible to human
  // eye at 0pt would hide text, so we keep it at normal size but above the bullet list).
  // Keyword density matters: having skills as plain prose ensures they are indexed.
  private renderSkills(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.skills?.length) return;

    this.renderSectionHeader(doc, SECTION_LABELS.skills, contentWidth);

    // Comma-separated line — ATS keyword scanners index this efficiently
    doc
      .font(FONTS.regular)
      .fontSize(10)
      .fillColor(COLORS.body)
      .text(data.skills.join(', '), MARGIN.left, doc.y, {
        width: contentWidth,
        align: 'justify',
      });

    doc.moveDown(0.6);

    // Individual hyphen-bullets for human readability
    for (const skill of data.skills) {
      doc
        .font(FONTS.regular)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(`- ${skill}`, MARGIN.left, doc.y, { width: contentWidth });
    }

    doc.moveDown(1);
  }

  // Section header: teal bold ALL-CAPS — ATS parsers use heading text to identify sections;
  // ASCII-only labels in SECTION_LABELS avoid accented chars that some parsers mangle.
  private renderSectionHeader(doc: PDFKit.PDFDocument, title: string, contentWidth: number): void {
    doc
      .font(FONTS.bold)
      .fontSize(12)
      .fillColor(COLORS.sectionHeader)
      .text(title, MARGIN.left, doc.y, { width: contentWidth });

    doc.moveDown(0.7);
  }
}
