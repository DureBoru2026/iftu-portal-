import React, { useEffect, useState } from 'react';
import { fetchWeeklyHistoryPulse } from '../services/geminiService';
import { Sparkles, History, RefreshCw } from 'lucide-react';

export const HistoryPulse: React.FC = () => {
  const [facts, setFacts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadHistoryPulse = async () => {
    setLoading(true);
    const result = await fetchWeeklyHistoryPulse();
    setFacts(result);
    setLoading(false);
  };

  useEffect(() => {
    loadHistoryPulse();
  }, []);

  return (
    <div className="w-full bg-slate-900 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 text-white overflow-hidden relative">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Badge / Label */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#009b44] text-white rounded-xl border-2 border-black font-black text-xs uppercase tracking-wider shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <History className="w-4 h-4 text-[#ffcd00] animate-spin-slow" />
          <span>Weekly History Pulse</span>
          <button 
            onClick={loadHistoryPulse} 
            disabled={loading} 
            title="Refresh AI Facts"
            className="hover:rotate-180 transition-transform p-0.5 ml-1 text-emerald-200 hover:text-white"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Marquee or Loading state */}
        <div className="flex-1 overflow-hidden relative w-full">
          {loading ? (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono italic animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-bounce text-[#ffcd00]" />
              Synthesizing National Historical Highlights via Gemini AI...
            </div>
          ) : (
            <div className="whitespace-nowrap flex animate-marquee space-x-8 text-xs font-medium text-slate-200">
              {facts.concat(facts).map((fact, index) => (
                <span key={index} className="inline-flex items-center gap-2 px-2 py-1 bg-slate-800/80 rounded-lg border border-slate-700">
                  <span className="text-[#ffcd00] font-bold">⚡</span>
                  <span>{fact}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPulse;
