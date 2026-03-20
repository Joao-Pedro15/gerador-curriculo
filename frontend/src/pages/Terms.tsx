import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Termos de Uso | CurrículoPro</title>
        <meta name="description" content="Leia os termos de uso do CurrículoPro. Entenda as regras e condições para utilização do nosso gerador de currículo profissional online." />
      </Helmet>

      <main className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Termos de Uso
            </h1>
            <p className="text-slate-500 text-sm">Última atualização: março de 2025</p>
          </header>

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e utilizar o <strong className="text-white">CurrículoPro</strong>, você concorda
                com estes Termos de Uso. Se não concordar com qualquer parte destes termos, por favor,
                não utilize nosso serviço.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Descrição do Serviço</h2>
              <p>
                O CurrículoPro é uma plataforma online gratuita que permite a geração de currículos
                profissionais em formato PDF. O usuário preenche um formulário com suas informações
                profissionais e o sistema gera um documento formatado pronto para uso.
              </p>
              <p className="mt-3">
                O serviço é fornecido "como está", sem garantias de disponibilidade ininterrupta.
                Reservamo-nos o direito de alterar, suspender ou descontinuar o serviço a qualquer momento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Uso Aceitável</h2>
              <p>Ao utilizar o CurrículoPro, você concorda em:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Fornecer informações verdadeiras e precisas no formulário de currículo</li>
                <li>Utilizar o serviço apenas para fins legais e legítimos</li>
                <li>Não tentar comprometer a segurança ou o funcionamento da plataforma</li>
                <li>Não utilizar o serviço para gerar conteúdo ofensivo, fraudulento ou enganoso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo do site, incluindo design, código, textos e logotipos, é propriedade
                do CurrículoPro e protegido por leis de direitos autorais. O currículo gerado com
                suas informações pessoais é de sua propriedade.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Limitação de Responsabilidade</h2>
              <p>
                O CurrículoPro não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>O conteúdo das informações inseridas pelo usuário no currículo</li>
                <li>Resultados de processos seletivos baseados nos currículos gerados</li>
                <li>Perdas ou danos decorrentes do uso ou impossibilidade de uso do serviço</li>
                <li>Interrupções temporárias no serviço por manutenção ou problemas técnicos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Publicidade</h2>
              <p>
                Este site pode exibir anúncios de terceiros, incluindo anúncios do Google AdSense.
                Esses anúncios são fornecidos por parceiros publicitários e não representam
                endosso do CurrículoPro aos produtos ou serviços anunciados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Modificações dos Termos</h2>
              <p>
                Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento.
                As alterações entram em vigor imediatamente após a publicação no site.
                O uso continuado do serviço após as alterações implica aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Contato</h2>
              <p>
                Para dúvidas sobre estes Termos de Uso, entre em contato conosco através da nossa{' '}
                <a href="/contact" className="text-brand-blue hover:underline">
                  página de contato
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
