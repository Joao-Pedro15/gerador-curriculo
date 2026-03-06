import PDFDocument from 'pdfkit';
import { ResumeData } from '../types/resume';

const COLORS = {
  name: '#1F3864',
  sectionHeader: '#4472C4',
  body: '#000000',
  accent: '#4472C4',
};

const FONTS = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
};

const MARGIN = {
  left: 60,
  right: 60,
  top: 60,
  bottom: 60,
};

export class ResumePdfService {
  generatePdf(data: ResumeData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: MARGIN.top,
          bottom: MARGIN.bottom,
          left: MARGIN.left,
          right: MARGIN.right,
        },
        bufferPages: true,
      });

      const chunks: Buffer[] = [];
      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const contentWidth = doc.page.width - MARGIN.left - MARGIN.right;

      this.renderName(doc, data, contentWidth);
      this.renderContactInfo(doc, data, contentWidth);
      this.renderSummary(doc, data, contentWidth);
      this.renderEducation(doc, data, contentWidth);
      this.renderExperience(doc, data, contentWidth);
      this.renderSkills(doc, data, contentWidth);

      doc.end();
    });
  }

  private renderName(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    doc
      .font(FONTS.bold)
      .fontSize(22)
      .fillColor(COLORS.name)
      .text(data.name.toUpperCase(), MARGIN.left, MARGIN.top, {
        width: contentWidth,
        align: 'center',
      });

    if (data.title) {
      doc
        .font(FONTS.regular)
        .fontSize(12)
        .fillColor(COLORS.accent)
        .text(data.title, MARGIN.left, doc.y + 2, {
          width: contentWidth,
          align: 'center',
        });
    }

    doc.moveDown(0.6);

    // Horizontal separator after name block
    doc
      .moveTo(MARGIN.left, doc.y)
      .lineTo(MARGIN.left + contentWidth, doc.y)
      .strokeColor(COLORS.accent)
      .lineWidth(0.5)
      .stroke();

    doc.moveDown(0.6);
  }

  private renderContactInfo(doc: PDFKit.PDFDocument, data: ResumeData, _contentWidth: number): void {
    doc.font(FONTS.regular).fontSize(10).fillColor(COLORS.body);

    if (data.location) {
      doc.text(data.location, MARGIN.left, doc.y);
    }
    if (data.phone) {
      doc.text(`Telefone: ${data.phone}`);
    }
    if (data.email) {
      doc.text(`E-mail: ${data.email}`);
    }

    doc.moveDown(1.2);
  }

  private renderSummary(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.summary) return;

    this.renderSectionHeader(doc, 'OBJETIVO PROFISSIONAL', contentWidth);

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

  private renderEducation(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.education?.length) return;

    this.renderSectionHeader(doc, 'FORMAÇÃO ACADÊMICA', contentWidth);

    for (const edu of data.education) {
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(edu.institution, MARGIN.left, doc.y);

      const degreeText = edu.period ? `${edu.degree} (${edu.period}).` : `${edu.degree}.`;
      doc
        .font(FONTS.regular)
        .fontSize(10)
        .text(degreeText, MARGIN.left, doc.y, { width: contentWidth });

      doc.moveDown(0.5);
    }

    doc.moveDown(0.7);
  }

  private renderExperience(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.experience?.length) return;

    this.renderSectionHeader(doc, 'EXPERIÊNCIA PROFISSIONAL', contentWidth);

    for (const exp of data.experience) {
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(exp.company, MARGIN.left, doc.y);

      const roleText = exp.period ? `Cargo – ${exp.role} | ${exp.period}` : `Cargo – ${exp.role}`;
      doc
        .font(FONTS.bold)
        .fontSize(10)
        .text(roleText, MARGIN.left, doc.y, { width: contentWidth });

      if (exp.description) {
        doc
          .font(FONTS.regular)
          .fontSize(10)
          .text(exp.description, MARGIN.left, doc.y, {
            width: contentWidth,
          });
      }

      doc.moveDown(0.6);
    }

    doc.moveDown(0.6);
  }

  private renderSkills(doc: PDFKit.PDFDocument, data: ResumeData, contentWidth: number): void {
    if (!data.skills?.length) return;

    this.renderSectionHeader(doc, 'QUALIFICAÇÕES', contentWidth);

    for (const skill of data.skills) {
      const bulletX = MARGIN.left + 10;
      const bulletWidth = contentWidth - 10;

      doc
        .font(FONTS.regular)
        .fontSize(10)
        .fillColor(COLORS.body)
        .text(`• ${skill}`, bulletX, doc.y, { width: bulletWidth });
    }

    doc.moveDown(1);
  }

  private renderSectionHeader(doc: PDFKit.PDFDocument, title: string, contentWidth: number): void {
    doc
      .font(FONTS.bold)
      .fontSize(11)
      .fillColor(COLORS.sectionHeader)
      .text(title, MARGIN.left, doc.y);

    const lineY = doc.y + 1;
    doc
      .moveTo(MARGIN.left, lineY)
      .lineTo(MARGIN.left + contentWidth, lineY)
      .strokeColor(COLORS.sectionHeader)
      .lineWidth(0.5)
      .stroke();

    doc.moveDown(0.4);
  }
}
