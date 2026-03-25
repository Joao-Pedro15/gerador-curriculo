import { useState } from 'react';
import { ResumeFormData } from '../types/resume';

/* ─── Types ─── */
interface ATSResult {
  score: number;
  level: 'baixo' | 'médio' | 'alto';
  keywordsFound: string[];
  keywordsMissing: string[];
  strengths: string[];
  improvements: string[];
}

type Mode = 'basic' | 'ai';

/* ─── Score circle SVG ─── */
function ScoreCircle({ score, level }: { score: number; level: ATSResult['level'] }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  const colorMap = {
    baixo: { stroke: '#ef4444', text: 'text-red-400' },
    médio: { stroke: '#f59e0b', text: 'text-yellow-400' },
    alto:  { stroke: '#10b981', text: 'text-emerald-400' },
  };
  const labelMap = { baixo: 'Baixo', médio: 'Médio', alto: 'Alto' };
  const { stroke, text } = colorMap[level];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle
            cx="60" cy="60" r={r}
            fill="none" stroke={stroke} strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-extrabold ${text}`}>{score}%</span>
        </div>
      </div>
      <span className={`text-sm font-semibold ${text}`}>Compatibilidade {labelMap[level]}</span>
    </div>
  );
}

/* ─── Mode selector ─── */
function ModeSelector({ mode, onChange }: { mode: Mode; onChange: (m: Mode) => void }) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange('basic')}
        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${
          mode === 'basic'
            ? 'bg-purple-500/15 border-purple-500/50 text-purple-300'
            : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
        }`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        Análise rápida
      </button>

      <button
        type="button"
        onClick={() => onChange('ai')}
        className={`flex-1 flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold transition-all ${
          mode === 'ai'
            ? 'bg-violet-500/15 border-violet-500/50 text-violet-300'
            : 'border-slate-700 text-slate-500 hover:border-slate-600 hover:text-slate-400'
        }`}
      >
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        Análise com IA
        <span className="text-[10px] bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full leading-none">
          Groq
        </span>
      </button>
    </div>
  );
}

/* ─── Main component ─── */
interface Props {
  form: ResumeFormData;
}

export default function ATSAnalyzer({ form }: Props) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('basic');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [usedMode, setUsedMode] = useState<Mode>('basic');
  const [error, setError] = useState('');

  async function handleAnalyze() {
    if (!jobDescription.trim()) return;
    setLoading(true);
    setResult(null);
    setError('');

    const endpoint = mode === 'ai' ? '/api/analyze-ats-ai' : '/api/analyze-ats';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume: form, jobDescription }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(err.error ?? 'Erro ao analisar compatibilidade');
      }

      const data: ATSResult = await res.json();
      setUsedMode(mode);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setJobDescription('');
    setError('');
  }

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900 overflow-hidden">
      {/* Header / trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-200">Verificar compatibilidade com a vaga</span>
            <span className="ml-2 text-xs bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-medium">
              Beta
            </span>
            <p className="text-xs text-slate-500 mt-0.5">
              Cole a descrição da vaga e veja o % de match com seu currículo
            </p>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-slate-800 p-5 space-y-4">
          {!result ? (
            <>
              {/* Mode selector */}
              <ModeSelector mode={mode} onChange={setMode} />

              {mode === 'ai' && (
                <div className="flex items-start gap-2 bg-violet-950/30 border border-violet-800/30 rounded-lg px-3 py-2.5 text-xs text-violet-300/80">
                  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  A IA gera insights contextualizados com base no conteúdo real da vaga. Pode levar alguns segundos a mais.
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  Descrição da vaga
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={7}
                  placeholder={`Cole aqui o texto completo da descrição da vaga...\n\nExemplo:\n"Buscamos um Desenvolvedor Backend com experiência em Node.js, TypeScript, PostgreSQL e Docker. Conhecimento em arquitetura de microsserviços, CI/CD e AWS é desejável..."`}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                />
                <p className="mt-1.5 text-xs text-slate-600">
                  Quanto mais detalhada a descrição, mais precisa será a análise.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-950/50 border border-red-800/50 text-red-300 rounded-lg px-3 py-2.5 text-xs font-mono">
                  <span className="text-red-500">✕</span>
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || loading}
                className={`flex items-center gap-2 font-semibold px-5 py-2.5 rounded-lg text-sm transition-all text-white disabled:opacity-40 disabled:cursor-not-allowed ${
                  mode === 'ai'
                    ? 'bg-violet-600 hover:bg-violet-500'
                    : 'bg-purple-600 hover:bg-purple-500'
                }`}
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">◌</span>
                    {mode === 'ai' ? 'Consultando IA...' : 'Analisando...'}
                  </>
                ) : (
                  <>
                    {mode === 'ai' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                        />
                      </svg>
                    )}
                    {mode === 'ai' ? 'Analisar com IA' : 'Analisar compatibilidade'}
                  </>
                )}
              </button>
            </>
          ) : (
            <ResultPanel result={result} usedMode={usedMode} onReset={handleReset} />
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Result panel ─── */
function ResultPanel({ result, usedMode, onReset }: { result: ATSResult; usedMode: Mode; onReset: () => void }) {
  const { score, level, keywordsFound, keywordsMissing, strengths, improvements } = result;

  const levelColors = {
    baixo: 'bg-red-950/40 border-red-800/40',
    médio: 'bg-yellow-950/30 border-yellow-800/40',
    alto:  'bg-emerald-950/30 border-emerald-800/40',
  };

  return (
    <div className="space-y-5">
      {/* Score header */}
      <div className={`rounded-xl border p-6 ${levelColors[level]}`}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ScoreCircle score={score} level={level} />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <h3 className="text-white font-bold text-lg">Análise de Compatibilidade ATS</h3>
              {usedMode === 'ai' && (
                <span className="text-[10px] bg-violet-500/20 text-violet-400 border border-violet-500/30 px-1.5 py-0.5 rounded-full leading-none font-semibold">
                  IA
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {score >= 65
                ? 'Seu currículo está bem alinhado com a vaga. Pequenos ajustes podem ainda aumentar o score.'
                : score >= 38
                ? 'Compatibilidade moderada. Há oportunidades de melhoria para aumentar suas chances.'
                : 'Baixa compatibilidade. Recomendamos adaptar o currículo com os termos desta vaga.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="text-xs bg-slate-800/60 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
                {keywordsFound.length} termos encontrados
              </span>
              <span className="text-xs bg-slate-800/60 text-slate-400 px-2.5 py-1 rounded-full border border-slate-700">
                {keywordsMissing.length} termos ausentes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-emerald-900/50 bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Palavras-chave encontradas</span>
          </div>
          {keywordsFound.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {keywordsFound.map((kw) => (
                <span key={kw} className="text-xs bg-emerald-900/40 border border-emerald-800/50 text-emerald-300 px-2 py-0.5 rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 text-xs">Nenhum termo encontrado. Preencha mais campos.</p>
          )}
        </div>

        <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Termos ausentes na vaga</span>
          </div>
          {keywordsMissing.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {keywordsMissing.map((kw) => (
                <span key={kw} className="text-xs bg-red-900/30 border border-red-800/40 text-red-300 px-2 py-0.5 rounded-full">
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-xs">Ótimo! Nenhum termo importante faltando.</p>
          )}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">💪</span>
            <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">Pontos fortes</span>
          </div>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                <span className="text-emerald-500 shrink-0 mt-0.5">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-800/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🔧</span>
            <span className="text-slate-300 text-xs font-bold uppercase tracking-wider">O que melhorar</span>
          </div>
          <ul className="space-y-2">
            {improvements.map((s, i) => (
              <li key={i} className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                <span className="text-yellow-500 shrink-0 mt-0.5">→</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reset */}
      <div className="flex justify-end pt-1">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors"
        >
          Analisar outra vaga
        </button>
      </div>
    </div>
  );
}
