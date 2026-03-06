import { useState } from 'react';
import { ResumeFormData, ExperienceEntry, EducationEntry } from './types/resume';

const EMPTY_EXPERIENCE: ExperienceEntry = {
  company: '',
  role: '',
  period: '',
  description: '',
};

const EMPTY_EDUCATION: EducationEntry = {
  institution: '',
  degree: '',
  period: '',
};

const INITIAL_FORM: ResumeFormData = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  skills: '',
  experience: [{ ...EMPTY_EXPERIENCE }],
  education: [{ ...EMPTY_EDUCATION }],
};

type Status = 'idle' | 'loading' | 'error';

export default function App() {
  const [form, setForm] = useState<ResumeFormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // --- Field handlers ---
  function handleField(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // --- Experience handlers ---
  function handleExperienceChange(
    index: number,
    field: keyof ExperienceEntry,
    value: string,
  ) {
    setForm((prev) => {
      const updated = prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp,
      );
      return { ...prev, experience: updated };
    });
  }

  function addExperience() {
    setForm((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...EMPTY_EXPERIENCE }],
    }));
  }

  function removeExperience(index: number) {
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  }

  // --- Education handlers ---
  function handleEducationChange(
    index: number,
    field: keyof EducationEntry,
    value: string,
  ) {
    setForm((prev) => {
      const updated = prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu,
      );
      return { ...prev, education: updated };
    });
  }

  function addEducation() {
    setForm((prev) => ({
      ...prev,
      education: [...prev.education, { ...EMPTY_EDUCATION }],
    }));
  }

  function removeEducation(index: number) {
    setForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  }

  // --- Submit ---
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
      summary: form.summary,
      skills: form.skills
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      experience: form.experience,
      education: form.education,
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
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Erro inesperado');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-brand-navy text-white py-6 shadow-lg">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold tracking-wide">Gerador de Currículo</h1>
          <p className="text-blue-200 text-sm mt-1">
            Preencha o formulário e baixe seu currículo em PDF
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Informações Pessoais */}
          <Section title="Informações Pessoais">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Nome completo *" required>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleField}
                  required
                  placeholder="Ex: João Silva"
                  className={inputClass}
                />
              </Field>
              <Field label="Título profissional">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleField}
                  placeholder="Ex: Desenvolvedor Backend"
                  className={inputClass}
                />
              </Field>
              <Field label="E-mail *" required>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleField}
                  required
                  placeholder="joao@email.com"
                  className={inputClass}
                />
              </Field>
              <Field label="Telefone">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleField}
                  placeholder="+55 11 99999-9999"
                  className={inputClass}
                />
              </Field>
              <Field label="Localização" className="sm:col-span-2">
                <input
                  name="location"
                  value={form.location}
                  onChange={handleField}
                  placeholder="São Paulo, SP"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* Objetivo Profissional */}
          <Section title="Objetivo Profissional">
            <Field label="Resumo">
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleField}
                rows={4}
                placeholder="Descreva seu objetivo profissional..."
                className={inputClass}
              />
            </Field>
          </Section>

          {/* Qualificações */}
          <Section title="Qualificações">
            <Field label="Habilidades (uma por linha)">
              <textarea
                name="skills"
                value={form.skills}
                onChange={handleField}
                rows={5}
                placeholder={`Node.js\nTypeScript\nDocker\nPostgreSQL`}
                className={inputClass}
              />
            </Field>
          </Section>

          {/* Experiência Profissional */}
          <Section title="Experiência Profissional">
            <div className="space-y-4">
              {form.experience.map((exp, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white relative">
                  {form.experience.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperience(i)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm font-medium"
                    >
                      Remover
                    </button>
                  )}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Empresa">
                      <input
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(i, 'company', e.target.value)}
                        placeholder="TechCorp"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Cargo">
                      <input
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(i, 'role', e.target.value)}
                        placeholder="Backend Engineer"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Período" className="sm:col-span-2">
                      <input
                        value={exp.period}
                        onChange={(e) => handleExperienceChange(i, 'period', e.target.value)}
                        placeholder="2021 - Atual"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Descrição das atividades" className="sm:col-span-2">
                      <textarea
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(i, 'description', e.target.value)}
                        rows={3}
                        placeholder="Descreva suas principais atividades e conquistas..."
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addExperience}
                className={addButtonClass}
              >
                + Adicionar experiência
              </button>
            </div>
          </Section>

          {/* Formação Acadêmica */}
          <Section title="Formação Acadêmica">
            <div className="space-y-4">
              {form.education.map((edu, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white relative">
                  {form.education.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEducation(i)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-600 text-sm font-medium"
                    >
                      Remover
                    </button>
                  )}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field label="Instituição" className="sm:col-span-2">
                      <input
                        value={edu.institution}
                        onChange={(e) => handleEducationChange(i, 'institution', e.target.value)}
                        placeholder="Universidade de Tecnologia"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Curso / Grau">
                      <input
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(i, 'degree', e.target.value)}
                        placeholder="Bacharel em Ciência da Computação"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Período">
                      <input
                        value={edu.period}
                        onChange={(e) => handleEducationChange(i, 'period', e.target.value)}
                        placeholder="2017 - 2021"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addEducation}
                className={addButtonClass}
              >
                + Adicionar formação
              </button>
            </div>
          </Section>

          {/* Error message */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-brand-navy hover:bg-brand-blue disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 text-base shadow-md"
            >
              {status === 'loading' ? 'Gerando PDF...' : 'Gerar Currículo'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

// --- Small reusable components ---

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-brand-navy px-5 py-3">
        <h2 className="text-white font-semibold text-sm uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  className,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition';

const addButtonClass =
  'w-full border-2 border-dashed border-brand-blue text-brand-blue rounded-lg py-2.5 text-sm font-medium hover:bg-blue-50 transition-colors duration-150';
