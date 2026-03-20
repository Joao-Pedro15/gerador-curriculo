import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | CurrículoPro</title>
        <meta name="description" content="Leia a política de privacidade do CurrículoPro. Saiba como tratamos seus dados e garantimos sua privacidade ao usar nosso gerador de currículo." />
      </Helmet>

      <main className="min-h-screen bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Política de Privacidade
            </h1>
            <p className="text-slate-500 text-sm">Última atualização: março de 2025</p>
          </header>

          <div className="prose prose-invert max-w-none space-y-8 text-slate-400 leading-relaxed">

            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Introdução</h2>
              <p>
                Bem-vindo ao <strong className="text-white">CurrículoPro</strong>. Levamos sua privacidade muito a sério.
                Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar
                nosso serviço de geração de currículos profissionais em PDF.
              </p>
              <p className="mt-3">
                Ao utilizar nosso site, você concorda com os termos descritos nesta política. Recomendamos a leitura
                completa antes de usar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Dados que coletamos</h2>
              <p>
                Para gerar o currículo em PDF, você fornece voluntariamente informações como:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Nome completo e título profissional</li>
                <li>Endereço de e-mail e telefone</li>
                <li>Localização (cidade/estado)</li>
                <li>Links de perfis profissionais (LinkedIn, GitHub)</li>
                <li>Informações sobre experiência profissional, formação e habilidades</li>
              </ul>
              <p className="mt-3">
                <strong className="text-white">Importante:</strong> Esses dados são utilizados exclusivamente para gerar
                o arquivo PDF do seu currículo. Não armazenamos suas informações pessoais em nossos servidores após a
                geração do documento.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Como usamos seus dados</h2>
              <p>Os dados fornecidos são usados somente para:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Gerar o arquivo PDF do seu currículo profissional</li>
                <li>Nomear o arquivo com base no seu nome</li>
              </ul>
              <p className="mt-3">
                Não utilizamos suas informações para fins de marketing, não as compartilhamos com terceiros e
                não as vendemos sob nenhuma circunstância.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Cookies e rastreamento</h2>
              <p>
                Nosso site pode utilizar cookies técnicos essenciais para o funcionamento correto da plataforma.
                Podemos também utilizar ferramentas de análise de tráfego (como Google Analytics) para
                entender melhor como os usuários interagem com o site, com o objetivo de melhorar a experiência.
              </p>
              <p className="mt-3">
                Dados coletados por ferramentas de análise são anônimos e não permitem a identificação pessoal
                dos usuários.
              </p>
              <p className="mt-3">
                Este site pode exibir anúncios do <strong className="text-white">Google AdSense</strong>. O Google
                pode usar cookies para personalizar anúncios com base em visitas anteriores a este e outros sites.
                Você pode desativar o uso de cookies para publicidade personalizada visitando as{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline"
                >
                  Configurações de anúncios do Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">5. Segurança dos dados</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger as informações fornecidas durante
                o uso do nosso serviço. Como os dados não são persistidos em nossos servidores, o risco de
                exposição de dados pessoais é minimizado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">6. Direitos do usuário</h2>
              <p>Você tem os seguintes direitos em relação aos seus dados:</p>
              <ul className="list-disc list-inside mt-3 space-y-2 ml-2">
                <li>Direito de saber quais dados são coletados</li>
                <li>Direito de solicitar a exclusão de quaisquer dados armazenados</li>
                <li>Direito de não fornecer dados pessoais (o que inviabilizará o uso do serviço)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">7. Alterações nesta política</h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos revisitá-la
                regularmente. Mudanças significativas serão comunicadas através do próprio site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">8. Contato</h2>
              <p>
                Em caso de dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados,
                entre em contato conosco através da nossa{' '}
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
