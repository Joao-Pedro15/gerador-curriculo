import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-blue' : 'text-slate-400 hover:text-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/30">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-bold text-white text-lg tracking-tight">
            Currículo<span className="text-brand-blue">Pro</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/builder" className={navLinkClass}>
            Criar Currículo
          </NavLink>
          <NavLink to="/plans" className={navLinkClass}>
            Planos
          </NavLink>
          <a
            href="/#sobre"
            className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
          >
            Sobre
          </a>
        </nav>

        {/* Desktop CTA */}
        <Link
          to="/builder"
          className="hidden md:inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-brand-blue/20"
        >
          Criar currículo grátis
        </Link>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-slate-400 hover:text-slate-100 p-1 transition-colors"
          aria-label="Abrir menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 flex flex-col gap-4">
          <NavLink
            to="/"
            end
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/builder"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Criar Currículo
          </NavLink>
          <NavLink
            to="/plans"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Planos
          </NavLink>
          <a
            href="/#sobre"
            className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Sobre
          </a>
          <Link
            to="/builder"
            className="mt-1 w-full text-center bg-brand-blue hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Criar currículo grátis
          </Link>
        </div>
      )}
    </header>
  );
}
