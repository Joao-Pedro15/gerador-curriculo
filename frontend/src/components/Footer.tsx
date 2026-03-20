import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center">
                <span className="text-white font-bold text-xs">C</span>
              </div>
              <span className="font-bold text-white">
                Currículo<span className="text-brand-blue">Pro</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Plataforma gratuita para criação de currículos profissionais em PDF.
              Ajudamos profissionais brasileiros a conquistar novas oportunidades no mercado de trabalho.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/builder" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Criar Currículo
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Planos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-slate-300 font-semibold text-sm mb-4 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy-policy" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-600 text-xs">
            © {currentYear} CurrículoPro. Todos os direitos reservados.
          </p>
          <p className="text-slate-600 text-xs">
            Feito com ❤️ para profissionais brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
}
