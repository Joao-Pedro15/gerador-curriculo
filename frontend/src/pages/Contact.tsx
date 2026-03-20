import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: in a real implementation, send to an API endpoint or email service
    setSent(true);
  }

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue transition';

  return (
    <>
      <Helmet>
        <title>Contato | CurrículoPro</title>
        <meta name="description" content="Entre em contato com a equipe do CurrículoPro. Tire suas dúvidas, envie sugestões ou relate problemas com nosso gerador de currículo online." />
      </Helmet>

      <main className="min-h-screen bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Fale conosco
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Tem alguma dúvida, sugestão ou quer reportar um problema? Estamos aqui para ajudar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Info cards */}
            <div className="space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'E-mail',
                  content: 'contato@curriculopro.com.br',
                  sub: 'Respondemos em até 48h',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Suporte',
                  content: 'Central de Ajuda',
                  sub: 'Dúvidas frequentes e tutoriais',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: 'Legal',
                  content: 'Privacidade e Termos',
                  sub: 'Veja nossas políticas',
                },
              ].map(({ icon, title, content, sub }) => (
                <div key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-0.5">{title}</div>
                    <div className="text-slate-300 text-sm">{content}</div>
                    <div className="text-slate-600 text-xs mt-0.5">{sub}</div>
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-slate-400 text-sm mb-3">Links úteis</p>
                <div className="space-y-2">
                  <Link to="/privacy-policy" className="block text-sm text-brand-blue hover:underline">
                    → Política de Privacidade
                  </Link>
                  <Link to="/terms" className="block text-sm text-brand-blue hover:underline">
                    → Termos de Uso
                  </Link>
                  <Link to="/plans" className="block text-sm text-brand-blue hover:underline">
                    → Ver planos
                  </Link>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="rounded-2xl border border-emerald-800/40 bg-emerald-950/30 p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-3xl mx-auto mb-4">
                    ✓
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2">Mensagem enviada!</h2>
                  <p className="text-slate-400 text-sm">
                    Obrigado pelo contato. Retornaremos em breve para o e-mail informado.
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
                  <h2 className="text-lg font-bold text-white mb-6">Envie sua mensagem</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                          Nome <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                          E-mail <span className="text-brand-blue">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        Assunto <span className="text-brand-blue">*</span>
                      </label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        required
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="duvida">Dúvida sobre o serviço</option>
                        <option value="bug">Reportar um problema</option>
                        <option value="sugestao">Sugestão de melhoria</option>
                        <option value="parceria">Parceria ou colaboração</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                        Mensagem <span className="text-brand-blue">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Descreva sua dúvida ou mensagem..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-brand-blue hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/20"
                    >
                      Enviar mensagem
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
