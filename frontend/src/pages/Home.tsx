import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* ─── Icons (inline SVG) ─── */
function IconClipboard() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-5 h-5 text-brand-teal shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
    </svg>
  );
}
function IconShield() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconTrend() {
  return (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CurrículoPro — Crie seu Currículo Profissional Online Grátis</title>
        <meta
          name="description"
          content="Crie seu currículo profissional online de forma gratuita e rápida. Gere um PDF perfeito em minutos, sem cadastro. O melhor gerador de currículo do Brasil."
        />
        <meta name="keywords" content="gerador de currículo, currículo profissional, criar currículo online grátis, currículo em PDF, modelo de currículo" />
      </Helmet>

      <main>
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-slate-950 pt-16 pb-24 sm:pt-24 sm:pb-32">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              100% Gratuito — Sem cadastro
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Crie seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">
                currículo profissional
              </span>{' '}
              em minutos
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Preencha seus dados, clique em gerar e baixe um PDF pronto para enviar aos recrutadores.
              Sem templates genéricos, sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all shadow-2xl shadow-brand-blue/30 hover:shadow-brand-blue/50 hover:-translate-y-0.5"
              >
                Criar meu currículo grátis
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/plans"
                className="text-slate-400 hover:text-slate-200 font-medium text-base transition-colors underline underline-offset-4"
              >
                Ver planos e recursos
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <IconStar key={i} />)}
                <span className="ml-1">4.9/5 de satisfação</span>
              </div>
              <span className="hidden sm:block text-slate-700">•</span>
              <span>+2.000 currículos gerados</span>
              <span className="hidden sm:block text-slate-700">•</span>
              <span>Download em PDF instantâneo</span>
            </div>

            {/* Mockup placeholder */}
            <div className="mt-14 relative mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950/50">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-slate-600 text-xs font-mono">curriculo-profissional.pdf</span>
              </div>
              <div className="p-8 flex flex-col items-center justify-center gap-3 min-h-[200px] bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-sm">Seu currículo profissional em PDF</p>
                <div className="flex gap-2 mt-2">
                  {['Nome', 'Experiência', 'Skills', 'Formação'].map((tag) => (
                    <span key={tag} className="text-xs bg-slate-800 text-slate-500 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMO FUNCIONA ─── */}
        <section className="bg-slate-900 py-20 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Como funciona
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                Em três passos simples, você terá um currículo pronto para impressionar recrutadores.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <IconClipboard />,
                  step: '01',
                  title: 'Preencha seus dados',
                  desc: 'Informe suas experiências, formação, habilidades e dados pessoais no formulário intuitivo. Sem burocracia.',
                },
                {
                  icon: <IconZap />,
                  step: '02',
                  title: 'Gere o currículo',
                  desc: 'Clique em "Gerar PDF" e nosso sistema monta automaticamente um currículo profissional e bem formatado.',
                },
                {
                  icon: <IconDownload />,
                  step: '03',
                  title: 'Baixe o PDF',
                  desc: 'O download inicia automaticamente. Seu currículo pronto para enviar por e-mail ou WhatsApp.',
                },
              ].map(({ icon, step, title, desc }) => (
                <div key={step} className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-slate-800 bg-slate-950 hover:border-slate-700 transition-colors">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
                    {icon}
                  </div>
                  <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-700">{step}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/20"
              >
                Começar agora — é grátis
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CONTEÚDO RICO (AdSense) ─── */}
        <section className="bg-slate-950 py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              O que é um currículo profissional e por que ele é essencial
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              O currículo é o seu cartão de visitas no mercado de trabalho. É o primeiro contato que um recrutador terá
              com você, e em muitos casos, a única oportunidade de causar uma boa impressão antes de uma entrevista.
              Entender o que faz um currículo ser realmente eficaz pode ser a diferença entre ser chamado para a vaga
              dos seus sonhos ou ser ignorado.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
              {[
                { icon: <IconTarget />, color: 'text-brand-blue', title: 'Clareza e Objetividade', desc: 'Um bom currículo comunica sua história profissional de forma clara, sem informações desnecessárias. Recrutadores analisam dezenas de currículos por dia e valorizam aqueles que vão direto ao ponto.' },
                { icon: <IconShield />, color: 'text-brand-teal', title: 'Confiabilidade', desc: 'Informações corretas, datas precisas e uma apresentação consistente transmitem profissionalismo e seriedade. Erros de digitação ou dados inconsistentes podem desqualificar um candidato imediatamente.' },
                { icon: <IconTrend />, color: 'text-purple-400', title: 'Impacto Imediato', desc: 'Os primeiros 6 segundos são decisivos. Um layout limpo, bem estruturado e com as informações certas em destaque aumenta suas chances de passar para a próxima etapa do processo seletivo.' },
              ].map(({ icon, color, title, desc }) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                  <div className={`mb-4 ${color}`}>{icon}</div>
                  <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* Long form content */}
            <div className="prose prose-invert max-w-none space-y-10 text-slate-400 leading-relaxed">

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">A importância do currículo no mercado de trabalho brasileiro</h3>
                <p>
                  No Brasil, o mercado de trabalho está cada vez mais competitivo. Com milhões de profissionais
                  disputando as mesmas vagas, um currículo bem elaborado não é um diferencial — é uma necessidade.
                  Estudos mostram que recrutadores dedicam entre 6 e 10 segundos para uma primeira análise de currículo.
                  Nesse curto intervalo, eles buscam informações-chave como cargo atual, empresa anterior, nível de
                  experiência e formação acadêmica.
                </p>
                <p className="mt-4">
                  Por isso, a organização visual e a clareza das informações são tão cruciais quanto o próprio conteúdo.
                  Um currículo confuso ou mal formatado pode desclassificar um candidato excelente antes mesmo que suas
                  qualificações sejam lidas. Um currículo bem estruturado, por outro lado, aumenta exponencialmente as
                  chances de avançar para a fase de entrevistas.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">O que deve ter em um currículo profissional completo</h3>
                <p>
                  Um currículo eficaz geralmente é composto por seções bem definidas. Conhecer cada uma delas
                  e saber o que incluir é fundamental para criar um documento que realmente represente o seu valor
                  como profissional.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    { label: 'Dados pessoais e contato:', text: 'Nome completo, e-mail profissional, telefone, cidade e links para LinkedIn e GitHub (para profissionais de tecnologia).' },
                    { label: 'Título ou objetivo profissional:', text: 'Uma linha clara que define quem você é e para qual área está se candidatando.' },
                    { label: 'Resumo profissional:', text: 'Parágrafo curto (3 a 5 linhas) destacando suas principais habilidades, experiências e o valor que você entrega.' },
                    { label: 'Experiência profissional:', text: 'Listada em ordem cronológica inversa (mais recente primeiro), com empresa, cargo, período e principais realizações.' },
                    { label: 'Formação acadêmica:', text: 'Cursos de graduação, pós-graduação ou técnicos, com instituição e período.' },
                    { label: 'Habilidades técnicas:', text: 'Ferramentas, tecnologias, idiomas e outros conhecimentos relevantes para a vaga.' },
                    { label: 'Cursos e certificações:', text: 'Treinamentos complementares que reforçam sua qualificação para o cargo desejado.' },
                  ].map(({ label, text }) => (
                    <li key={label} className="flex gap-3">
                      <IconCheck />
                      <span><strong className="text-slate-300">{label}</strong> {text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Como um currículo bem feito impacta nas suas contratações</h3>
                <p>
                  Muitas empresas utilizam sistemas ATS (Applicant Tracking System) — softwares que filtram
                  currículos automaticamente antes de chegarem ao recrutador humano. Esses sistemas buscam
                  palavras-chave relacionadas à vaga, como linguagens de programação, ferramentas específicas
                  ou competências descritas no anúncio. Um currículo sem essas palavras-chave pode ser eliminado
                  automaticamente, mesmo que o candidato seja plenamente qualificado.
                </p>
                <p className="mt-4">
                  Além dos filtros automáticos, a apresentação visual do documento continua sendo determinante.
                  Currículos com fonte legível, boa hierarquia de informações e espaçamento adequado são muito
                  mais bem recebidos do que documentos sobrecarregados. O objetivo é facilitar o trabalho do
                  recrutador, não dificultar.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Dicas práticas para um currículo que se destaca</h3>
                <ul className="space-y-3">
                  {[
                    'Use verbos de ação para descrever suas experiências: "Implementei", "Reduzi", "Aumentei", "Liderai".',
                    'Inclua métricas e resultados sempre que possível: "Reduzi o tempo de resposta da API em 40%".',
                    'Adapte o currículo para cada vaga, incluindo palavras-chave da própria descrição do cargo.',
                    'Mantenha o currículo em no máximo 1 a 2 páginas — seja conciso e relevante.',
                    'Evite informações pessoais desnecessárias como foto, estado civil ou RG (salvo quando solicitado).',
                    'Revise cuidadosamente antes de enviar: erros de português são um dos principais motivos de eliminação.',
                    'Salve e envie sempre em PDF para garantir que a formatação seja preservada em qualquer dispositivo.',
                  ].map((tip) => (
                    <li key={tip} className="flex gap-3">
                      <IconCheck />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Por que usar um gerador de currículo online</h3>
                <p>
                  Criar um currículo do zero pode ser um processo demorado e frustrante — especialmente quando
                  você não sabe ao certo como estruturar as informações ou qual formato usar. Um gerador de
                  currículo online resolve esse problema ao oferecer uma estrutura pronta, profissional e
                  validada por especialistas em RH.
                </p>
                <p className="mt-4">
                  Com o <strong className="text-white">CurrículoPro</strong>, você não precisa se preocupar com
                  margens, tipografia, hierarquia visual ou tamanho de fonte. Basta inserir seus dados e o sistema
                  cuida da formatação automaticamente, gerando um PDF pronto para envio. O resultado é um currículo
                  com visual profissional em questão de minutos — sem precisar de habilidades em design ou conhecimento
                  em ferramentas como Word ou Canva.
                </p>
                <p className="mt-4">
                  Além disso, ao usar um gerador online, você garante consistência: o documento terá sempre o
                  mesmo padrão de qualidade, independentemente de quantas vezes você o editar ou atualizar.
                  Isso é especialmente útil para quem está em busca ativa de emprego e precisa personalizar
                  o currículo para diferentes vagas com frequência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURES / DIFERENCIAIS ─── */}
        <section className="bg-slate-900 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-white mb-4">Por que escolher o CurrículoPro</h2>
              <p className="text-slate-400 text-base max-w-xl mx-auto">
                Tudo que você precisa para criar um currículo profissional, em um lugar só.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: '⚡', title: 'Rápido e simples', desc: 'Preencha o formulário e gere o PDF em menos de 5 minutos.' },
                { emoji: '🎨', title: 'Layout profissional', desc: 'Design clean, tipografia adequada e formatação aprovada por RHs.' },
                { emoji: '📄', title: 'PDF de alta qualidade', desc: 'Arquivo gerado pronto para impressão ou envio digital.' },
                { emoji: '🔒', title: 'Privacidade garantida', desc: 'Seus dados não são armazenados. A geração é feita localmente.' },
                { emoji: '📱', title: 'Responsivo', desc: 'Funciona perfeitamente em computador, tablet e celular.' },
                { emoji: '💰', title: '100% gratuito', desc: 'O gerador básico é grátis para sempre. Sem cartão de crédito.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border border-slate-800 bg-slate-950 hover:border-slate-700 transition-colors">
                  <span className="text-2xl shrink-0">{emoji}</span>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SOBRE ─── */}
        <section id="sobre" className="bg-slate-950 py-20 sm:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Sobre o CurrículoPro
                </h2>
                <p className="text-slate-400 leading-relaxed mb-5">
                  O <strong className="text-white">CurrículoPro</strong> nasceu de uma necessidade real: ajudar
                  profissionais brasileiros a se apresentarem melhor no mercado de trabalho, sem complicação e
                  sem custo.
                </p>
                <p className="text-slate-400 leading-relaxed mb-5">
                  Nossa missão é democratizar o acesso a ferramentas de qualidade para quem busca uma oportunidade
                  de emprego. Acreditamos que um bom currículo não deve ser privilégio de quem pode pagar por um
                  designer gráfico ou por softwares caros.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Com o CurrículoPro, qualquer pessoa — seja um jovem em busca do primeiro emprego, um profissional
                  em transição de carreira ou um especialista em busca de novos desafios — pode criar um currículo
                  profissional de alta qualidade em poucos minutos.
                </p>
                <div className="mt-8">
                  <Link
                    to="/builder"
                    className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-brand-blue/20"
                  >
                    Criar meu currículo agora
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '+2.000', label: 'Currículos gerados' },
                  { value: '100%', label: 'Gratuito' },
                  { value: '< 5min', label: 'Para criar o seu' },
                  { value: '4.9★', label: 'Satisfação dos usuários' },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                    <div className="text-3xl font-extrabold text-brand-blue mb-1">{value}</div>
                    <div className="text-slate-500 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA FINAL ─── */}
        <section className="bg-gradient-to-r from-brand-navy to-brand-blue py-16 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Pronto para se destacar no mercado?
            </h2>
            <p className="text-blue-100/80 text-lg mb-8">
              Crie seu currículo profissional agora. Grátis, sem cadastro, em menos de 5 minutos.
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-white text-brand-blue hover:bg-blue-50 font-bold px-8 py-4 rounded-xl text-base transition-all shadow-2xl"
            >
              Começar a criar meu currículo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
