import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function IconCheck({ colored = false }: { colored?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 shrink-0 ${colored ? 'text-brand-blue' : 'text-brand-teal'}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconSoon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Plans() {
  return (
    <>
      <Helmet>
        <title>Planos | CurrículoPro — Gerador de Currículo Profissional</title>
        <meta
          name="description"
          content="Conheça os planos do CurrículoPro. Crie seu currículo grátis ou acesse recursos premium com IA para análise e geração de currículos profissionais."
        />
      </Helmet>

      <main className="min-h-screen bg-slate-950">
        {/* Hero */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-blue/8 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Escolha o plano ideal para você
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Comece grátis e evolua conforme suas necessidades. Recursos premium com IA chegando em breve.
            </p>
          </div>
        </section>

        {/* Plans grid */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* ─── FREE PLAN ─── */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 flex flex-col">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Disponível agora
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Plano Free</h2>
                <p className="text-slate-500 text-sm">Para quem quer criar um currículo profissional sem custo.</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">R$0</span>
                <span className="text-slate-500 text-sm ml-2">/ para sempre</span>
              </div>

              <ul className="space-y-3.5 flex-1 mb-8">
                {[
                  { text: 'Gerador de currículo completo', available: true },
                  { text: 'Download em PDF de alta qualidade', available: true },
                  { text: 'Seções: experiência, formação, cursos, skills', available: true },
                  { text: 'Layout profissional otimizado', available: true },
                  { text: 'Sem cadastro necessário', available: true },
                  { text: 'Geração ilimitada de PDFs', available: true },
                  { text: 'Análise ATS (em breve)', available: false },
                ].map(({ text, available }) => (
                  <li key={text} className="flex items-center gap-3">
                    {available ? <IconCheck /> : <IconSoon />}
                    <span className={`text-sm ${available ? 'text-slate-300' : 'text-slate-600'}`}>
                      {text}
                      {!available && (
                        <span className="ml-2 text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">em breve</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/builder"
                className="w-full text-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all"
              >
                Criar meu currículo grátis
              </Link>
            </div>

            {/* ─── PREMIUM PLAN ─── */}
            <div className="relative rounded-2xl border-2 border-brand-blue bg-gradient-to-b from-slate-900 to-slate-950 p-8 flex flex-col shadow-2xl shadow-brand-blue/10">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-brand-blue text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-brand-blue/40">
                ✨ Em breve
              </div>

              <div className="mb-6 mt-2">
                <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold px-3 py-1 rounded-full mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                  Coming Soon
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">Plano Premium</h2>
                <p className="text-slate-500 text-sm">IA avançada para criar e analisar currículos com precisão.</p>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">R$29</span>
                <span className="text-slate-500 text-sm ml-2">/ mês</span>
                <div className="mt-2 text-xs text-slate-500">Preço estimado — sujeito a alteração no lançamento</div>
              </div>

              <ul className="space-y-3.5 flex-1 mb-8">
                {/* Free features */}
                <li className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Tudo do Free, mais:
                </li>
                {[
                  { text: 'IA para geração de currículo completo', soon: false },
                  { text: 'Geração por cargo/setor com IA', soon: false },
                  { text: 'Análise ATS automática', soon: false },
                  { text: 'Análise de compatibilidade com vaga', soon: false },
                  { text: 'Identificação de pontos fortes', soon: false },
                  { text: 'Sugestões de melhoria personalizadas', soon: false },
                  { text: 'Análise humana (até 3x por mês)', soon: false },
                  { text: 'Suporte prioritário', soon: false },
                ].map(({ text, soon: _ }) => (
                  <li key={text} className="flex items-center gap-3">
                    <IconCheck colored />
                    <span className="text-sm text-slate-300">{text}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled
                className="w-full text-center bg-brand-blue/30 border border-brand-blue/40 text-brand-blue font-semibold px-6 py-3.5 rounded-xl text-sm cursor-not-allowed opacity-70"
              >
                Em breve — Aguarde o lançamento
              </button>
            </div>
          </div>

          {/* FAQ teaser */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Perguntas frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-8 max-w-3xl mx-auto">
              {[
                {
                  q: 'O plano Free é realmente gratuito?',
                  a: 'Sim, 100% gratuito e sem cadastro. Você pode gerar quantos currículos quiser sem nenhum custo.',
                },
                {
                  q: 'Meus dados ficam salvos?',
                  a: 'Não. Por questões de privacidade, seus dados não são armazenados em servidores. O currículo é gerado e entregue como PDF diretamente.',
                },
                {
                  q: 'Quando o plano Premium será lançado?',
                  a: 'Estamos desenvolvendo os recursos de IA. O lançamento está previsto para os próximos meses. Fique atento às novidades!',
                },
                {
                  q: 'O currículo gerado passa por filtros ATS?',
                  a: 'O layout atual é limpo e textual, o que favorece a leitura por sistemas ATS. A análise ATS completa será um recurso do plano Premium.',
                },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <h3 className="text-white font-semibold text-sm mb-2">{q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 border-t border-slate-800 py-16">
          <div className="max-w-xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Comece agora com o plano gratuito
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Sem cartão de crédito, sem cadastro. Crie e baixe seu currículo profissional em PDF agora mesmo.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/20"
            >
              Criar meu currículo grátis
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
