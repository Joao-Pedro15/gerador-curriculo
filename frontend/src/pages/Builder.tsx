import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ResumeFormData, ExperienceEntry, EducationEntry, CourseEntry } from '../types/resume';
import ATSAnalyzer from '../components/ATSAnalyzer';

const EMPTY_EXPERIENCE: ExperienceEntry = {
  company: '',
  role: '',
  period: '',
  description: '',
  techStack: '',
};

const EMPTY_EDUCATION: EducationEntry = {
  institution: '',
  degree: '',
  period: '',
};

const EMPTY_COURSE: CourseEntry = {
  name: '',
  institution: '',
};

const INITIAL_FORM: ResumeFormData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  github: '',
  linkedin: '',
  summary: '',
  skills: '',
  experience: [{ ...EMPTY_EXPERIENCE }],
  education: [{ ...EMPTY_EDUCATION }],
  courses: [{ ...EMPTY_COURSE }],
};

type Status = 'idle' | 'loading' | 'error' | 'success';

export default function Builder() {
  const [form, setForm] = useState<ResumeFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleExperienceChange(index: number, field: keyof ExperienceEntry, value: string) {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp)),
    }));
  }
  function addExperience() {
    setForm((prev) => ({ ...prev, experience: [...prev.experience, { ...EMPTY_EXPERIENCE }] }));
  }
  function removeExperience(index: number) {
    setForm((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  }

  function handleEducationChange(index: number, field: keyof EducationEntry, value: string) {
    setForm((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
    }));
  }
  function addEducation() {
    setForm((prev) => ({ ...prev, education: [...prev.education, { ...EMPTY_EDUCATION }] }));
  }
  function removeEducation(index: number) {
    setForm((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
  }

  function handleCourseChange(index: number, field: keyof CourseEntry, value: string) {
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  }
  function addCourse() {
    setForm((prev) => ({ ...prev, courses: [...prev.courses, { ...EMPTY_COURSE }] }));
  }
  function removeCourse(index: number) {
    setForm((prev) => ({ ...prev, courses: prev.courses.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      name: form.name,
      title: form.title,
      email: form.email,
      phone: form.phone,
      location: form.location,
      github: form.github,
      linkedin: form.linkedin,
      summary: form.summary,
      skills: form.skills
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      experience: form.experience,
      education: form.education,
      courses: form.courses.filter((c) => c.name.trim()),
    };

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(err.error ?? 'Erro ao gerar currículo');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = `curriculo-${form.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado');
    }
  }

  return (
    <>
      <Helmet>
        <title>Criar Currículo Profissional Online Grátis | CurrículoPro</title>
        <meta
          name="description"
          content="Preencha seus dados e gere um currículo profissional em PDF em segundos. Gratuito, rápido e sem cadastro."
        />
      </Helmet>

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Gerador de Currículo</h1>
            <p className="text-slate-400 text-sm">
              Preencha os campos abaixo e baixe seu currículo em PDF gratuitamente.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 01 — Informações Pessoais */}
            <Section num="01" title="Informações Pessoais">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nome completo" required>
                  <Input name="name" value={form.name} onChange={handleField} required placeholder="João Pedro Silva" />
                </Field>
                <Field label="Título profissional">
                  <Input name="title" value={form.title} onChange={handleField} placeholder="Desenvolvedor Back-End" />
                </Field>
                <Field label="E-mail" required>
                  <Input name="email" type="email" value={form.email} onChange={handleField} required placeholder="joao@email.com" mono />
                </Field>
                <Field label="Telefone">
                  <Input name="phone" value={form.phone} onChange={handleField} placeholder="+55 11 99999-9999" />
                </Field>
                <Field label="Localização">
                  <Input name="location" value={form.location} onChange={handleField} placeholder="São Paulo, SP" />
                </Field>
                <Field label="GitHub">
                  <Input name="github" value={form.github} onChange={handleField} placeholder="github.com/usuario" mono />
                </Field>
                <Field label="LinkedIn" className="sm:col-span-2">
                  <Input name="linkedin" value={form.linkedin} onChange={handleField} placeholder="linkedin.com/in/usuario" mono />
                </Field>
              </div>
            </Section>

            {/* 02 — Perfil */}
            <Section num="02" title="Perfil">
              <Field label="Resumo profissional">
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleField}
                  rows={4}
                  placeholder="Especialista em desenvolvimento de aplicações..."
                  className={textareaClass}
                />
              </Field>
            </Section>

            {/* 03 — Experiência */}
            <Section num="03" title="Experiência Profissional">
              <div className="space-y-4">
                {form.experience.map((exp, i) => (
                  <EntryCard key={i} index={i} label="experiência" onRemove={form.experience.length > 1 ? removeExperience : undefined}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Empresa">
                        <Input value={exp.company} onChange={(e) => handleExperienceChange(i, 'company', e.target.value)} placeholder="Wake Creators" />
                      </Field>
                      <Field label="Cargo">
                        <Input value={exp.role} onChange={(e) => handleExperienceChange(i, 'role', e.target.value)} placeholder="Desenvolvedor Backend Pleno" />
                      </Field>
                      <Field label="Período" className="sm:col-span-2">
                        <Input value={exp.period} onChange={(e) => handleExperienceChange(i, 'period', e.target.value)} placeholder="10/2024 - atualmente" />
                      </Field>
                      <Field label="Atividades (uma por linha)" className="sm:col-span-2">
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                          rows={5}
                          placeholder={'Implementei serviços de pagamento com integração de PSPs...\nMigração de API legada de HapiJs para NestJs...\nCobertura de 80% de testes unitários com Jest'}
                          className={textareaClass}
                        />
                      </Field>
                      <Field label="Tech stack" className="sm:col-span-2">
                        <Input value={exp.techStack} onChange={(e) => handleExperienceChange(i, 'techStack', e.target.value)} placeholder="TypeScript, NestJs, MongoDB, Docker, GCP" mono />
                      </Field>
                    </div>
                  </EntryCard>
                ))}
                <AddButton onClick={addExperience} label="Adicionar experiência" />
              </div>
            </Section>

            {/* 04 — Educação */}
            <Section num="04" title="Educação">
              <div className="space-y-4">
                {form.education.map((edu, i) => (
                  <EntryCard key={i} index={i} label="formação" onRemove={form.education.length > 1 ? removeEducation : undefined}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Instituição" className="sm:col-span-2">
                        <Input value={edu.institution} onChange={(e) => handleEducationChange(i, 'institution', e.target.value)} placeholder="Faculdade das Américas (FAM)" />
                      </Field>
                      <Field label="Curso / Grau">
                        <Input value={edu.degree} onChange={(e) => handleEducationChange(i, 'degree', e.target.value)} placeholder="Análise e desenvolvimento de sistemas" />
                      </Field>
                      <Field label="Período">
                        <Input value={edu.period} onChange={(e) => handleEducationChange(i, 'period', e.target.value)} placeholder="2023 – em formação" />
                      </Field>
                    </div>
                  </EntryCard>
                ))}
                <AddButton onClick={addEducation} label="Adicionar formação" />
              </div>
            </Section>

            {/* 05 — Cursos */}
            <Section num="05" title="Cursos Livres">
              <div className="space-y-4">
                {form.courses.map((course, i) => (
                  <EntryCard key={i} index={i} label="curso" onRemove={form.courses.length > 1 ? removeCourse : undefined}>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Field label="Nome do curso" className="sm:col-span-2">
                        <Input value={course.name} onChange={(e) => handleCourseChange(i, 'name', e.target.value)} placeholder="Javascript Expert" />
                      </Field>
                      <Field label="Instituição / Plataforma" className="sm:col-span-2">
                        <Input value={course.institution} onChange={(e) => handleCourseChange(i, 'institution', e.target.value)} placeholder="Erick Wendel" />
                      </Field>
                    </div>
                  </EntryCard>
                ))}
                <AddButton onClick={addCourse} label="Adicionar curso" />
              </div>
            </Section>

            {/* 06 — Qualificações */}
            <Section num="06" title="Qualificações">
              <Field label="Habilidades (uma por linha)">
                <textarea
                  name="skills"
                  value={form.skills}
                  onChange={handleField}
                  rows={5}
                  placeholder={'Node.js\nTypeScript\nDocker\nPostgreSQL\nKubernetes'}
                  className={`${textareaClass} font-mono`}
                />
              </Field>
            </Section>

            {/* Feedback */}
            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-950/60 border border-red-800/60 text-red-300 rounded-lg px-4 py-3 text-sm font-mono">
                <span className="text-red-500 shrink-0">✕</span>
                {errorMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 rounded-lg px-4 py-3 text-sm font-mono">
                <span className="text-emerald-500 shrink-0">✓</span>
                PDF gerado com sucesso! O download iniciou automaticamente.
              </div>
            )}

            {/* ATS Analyzer */}
            <ATSAnalyzer form={form} />

            {/* Submit */}
            <div className="flex justify-end pt-2 pb-10">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-brand-blue hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 text-sm shadow-lg shadow-brand-blue/20 flex items-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <span className="inline-block animate-spin">◌</span>
                    Gerando PDF...
                  </>
                ) : (
                  'Gerar Currículo em PDF'
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

/* ─── Reusable sub-components ─── */

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="border-b border-slate-800 px-5 py-3 flex items-center gap-3">
        <span className="text-xs font-mono text-slate-600">{num}</span>
        <h2 className="text-sm font-mono font-bold text-brand-teal tracking-widest uppercase">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, children, required, className }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
        {label}
        {required && <span className="text-brand-teal ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ mono, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { mono?: boolean }) {
  return (
    <input
      {...props}
      className={`w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition ${mono ? 'font-mono' : ''}`}
    />
  );
}

function EntryCard({ index, children, onRemove, label }: { index: number; children: React.ReactNode; onRemove?: (index: number) => void; label: string }) {
  return (
    <div className="border border-slate-700/60 rounded-lg p-4 bg-slate-800/40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          #{String(index + 1).padStart(2, '0')} {label}
        </span>
        {onRemove && (
          <button type="button" onClick={() => onRemove(index)} className="text-xs font-mono text-red-500/70 hover:text-red-400 transition-colors">
            remover
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-dashed border-slate-700 text-slate-500 hover:border-brand-teal hover:text-brand-teal rounded-lg py-2.5 text-sm font-mono transition-colors duration-150"
    >
      + {label}
    </button>
  );
}

const textareaClass =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-teal focus:border-brand-teal transition resize-none';
