import React, { useState } from 'react';
import { Award, ShieldCheck, Lock, CheckCircle2, Star, Zap, Search, Trophy } from 'lucide-react';
import { Badge, User } from '../types';

export interface ExtendedBadge extends Badge {
  category: 'STEM' | 'EAES Exams' | 'Sovereign Leadership' | 'Daily Engagement';
  description: string;
  points: number;
  unlocked: boolean;
  progress: number; // 0 to 100
  criteria: string;
}

const ALL_BADGES: ExtendedBadge[] = [
  {
    id: 'b-adwa-pioneer',
    title: 'Adwa Digital Sovereign',
    category: 'Sovereign Leadership',
    description: 'Enrolled in the National Sovereign Education Network and verified digital ID.',
    points: 100,
    icon: '🇪🇹',
    earnedAt: '2025-01-10',
    unlocked: true,
    progress: 100,
    criteria: 'Register student profile with valid NID.'
  },
  {
    id: 'b-eaes-master',
    title: 'EAES Exam Master',
    category: 'EAES Exams',
    description: 'Scored 85%+ on Grade 12 National Mock Examination.',
    points: 250,
    icon: '🎓',
    earnedAt: '2025-02-14',
    unlocked: true,
    progress: 100,
    criteria: 'Achieve high distinction in any mock EAES paper.'
  },
  {
    id: 'b-stem-quantum',
    title: 'Quantum Physics Pioneer',
    category: 'STEM',
    description: 'Completed Grade 12 Advanced Physics & Electromagnetic Induction lab.',
    points: 150,
    icon: '🔬',
    earnedAt: '2025-02-01',
    unlocked: true,
    progress: 100,
    criteria: 'Finish all lessons in Grade 12 Advanced Physics.'
  },
  {
    id: 'b-tvet-autotech',
    title: 'Automotive Systems Specialist',
    category: 'STEM',
    description: 'Passed Level 3 Automotive Electronics AI Oral Interview.',
    points: 200,
    icon: '⚡',
    earnedAt: undefined,
    unlocked: false,
    progress: 75,
    criteria: 'Score 80%+ on TVET Automotive Oral Assessment.'
  },
  {
    id: 'b-streak-7',
    title: '7-Day Study Champion',
    category: 'Daily Engagement',
    description: 'Maintained a 7-day continuous learning streak on IFTU Portal.',
    points: 120,
    icon: '🔥',
    earnedAt: '2025-02-18',
    unlocked: true,
    progress: 100,
    criteria: 'Log in and complete at least 1 lesson daily for 7 days.'
  },
  {
    id: 'b-archive-scholar',
    title: 'Sovereign Archive Scholar',
    category: 'Sovereign Leadership',
    description: 'Downloaded and inspected 3+ national curriculum blueprints.',
    points: 90,
    icon: '📜',
    earnedAt: undefined,
    unlocked: false,
    progress: 66,
    criteria: 'Inspect or archive 3 official national curriculum documents.'
  },
  {
    id: 'b-math-genius',
    title: 'Grade 9 Linear Algebra Pro',
    category: 'STEM',
    description: 'Aced Grade 9 Mathematics set theory and algebra modules.',
    points: 110,
    icon: '📐',
    earnedAt: '2025-01-20',
    unlocked: true,
    progress: 100,
    criteria: 'Score 100% on Grade 9 Math mock test.'
  },
  {
    id: 'b-ai-tutor-partner',
    title: 'AI Academic Scholar',
    category: 'Daily Engagement',
    description: 'Asked 10+ curriculum queries to IFTU AI Tutor.',
    points: 80,
    icon: '🤖',
    earnedAt: undefined,
    unlocked: false,
    progress: 40,
    criteria: 'Consult IFTU AI Tutor on 10 distinct subject questions.'
  }
];

interface BadgesAchievementsProps {
  user?: User | null;
}

export const BadgesAchievements: React.FC<BadgesAchievementsProps> = ({ user }) => {
  const [badgeList, setBadgeList] = useState<ExtendedBadge[]>(ALL_BADGES);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBadge, setActiveBadge] = useState<ExtendedBadge | null>(null);

  const categories = ['All', 'STEM', 'EAES Exams', 'Sovereign Leadership', 'Daily Engagement'];

  const filteredBadges = badgeList.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPoints = badgeList
    .filter(b => b.unlocked)
    .reduce((acc, curr) => acc + curr.points, 0);

  const unlockedCount = badgeList.filter(b => b.unlocked).length;

  const handleUnlockSimulate = (badgeId: string) => {
    setBadgeList(prev =>
      prev.map(b =>
        b.id === badgeId
          ? {
              ...b,
              unlocked: true,
              progress: 100,
              earnedAt: new Date().toISOString().split('T')[0]
            }
          : b
      )
    );
    if (activeBadge && activeBadge.id === badgeId) {
      setActiveBadge(prev => prev ? { ...prev, unlocked: true, progress: 100, earnedAt: new Date().toISOString().split('T')[0] } : null);
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-3xl p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-black text-white p-6 rounded-2xl border-4 border-black flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-black uppercase text-[#ffcd00] tracking-wider">
            <Trophy className="w-4 h-4" />
            National Merit & Badges Registry
          </div>
          <h2 className="text-2xl sm:text-3xl font-black italic uppercase">
            Earned Honors & Badges
          </h2>
          <p className="text-xs text-slate-300">
            Track academic milestones, national EAES exam achievements, and STEM badges.
          </p>
        </div>

        <div className="flex gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
          <div>
            <div className="text-2xl font-black text-[#ffcd00]">{unlockedCount} / {badgeList.length}</div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Unlocked Badges</div>
          </div>
          <div className="w-px bg-slate-700"></div>
          <div>
            <div className="text-2xl font-black text-emerald-400">{totalPoints}</div>
            <div className="text-[10px] font-bold uppercase text-slate-400">Merit Points</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-black ${
                selectedCategory === cat 
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,155,68,1)]' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search badges..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border-2 border-black text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Interactive Badge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBadges.map(badge => (
          <div
            key={badge.id}
            onClick={() => setActiveBadge(badge)}
            className={`cursor-pointer border-4 border-black rounded-2xl p-4 transition-all relative flex flex-col justify-between ${
              badge.unlocked 
                ? 'bg-amber-50/60 hover:bg-amber-100/80 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-gray-50 opacity-75 hover:opacity-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]'
            }`}
          >
            {/* Status Ribbon */}
            <div className="flex justify-between items-start mb-3">
              <span className="text-3xl p-2 bg-white rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {badge.icon || '🏅'}
              </span>
              {badge.unlocked ? (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Earned
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full border border-gray-300">
                  <Lock className="w-3 h-3 text-gray-500" /> Locked
                </span>
              )}
            </div>

            {/* Badge Content */}
            <div className="space-y-1 mb-3">
              <h4 className="text-sm font-bold text-gray-900 leading-tight">{badge.title}</h4>
              <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">{badge.description}</p>
            </div>

            {/* Progress & Points */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex justify-between items-center text-[10px] font-bold text-gray-600">
                <span>{badge.unlocked ? `Earned: ${badge.earnedAt}` : `Progress: ${badge.progress}%`}</span>
                <span className="text-amber-700 font-extrabold">+{badge.points} PTS</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden border border-black">
                <div 
                  className={`h-full transition-all duration-500 ${badge.unlocked ? 'bg-amber-400' : 'bg-emerald-500'}`}
                  style={{ width: `${badge.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Badge Detail Modal */}
      {activeBadge && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white border-8 border-black rounded-3xl p-6 max-w-md w-full shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] space-y-5 relative animate-scaleIn">
            <button 
              onClick={() => setActiveBadge(null)}
              className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full font-black flex items-center justify-center hover:bg-rose-600 transition-colors text-sm"
            >
              ✕
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="inline-block p-4 bg-amber-100 rounded-2xl border-4 border-black text-5xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {activeBadge.icon || '🏅'}
              </div>
              <h3 className="text-xl font-black text-gray-900 italic uppercase">{activeBadge.title}</h3>
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase border border-emerald-300">
                {activeBadge.category}
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200 text-xs text-slate-700 space-y-2">
              <p><strong>Description:</strong> {activeBadge.description}</p>
              <p><strong>Criteria:</strong> {activeBadge.criteria}</p>
              <p><strong>Reward:</strong> +{activeBadge.points} National Merit Points</p>
              {activeBadge.unlocked && <p className="text-emerald-700 font-bold">Earned on: {activeBadge.earnedAt}</p>}
            </div>

            <div className="flex justify-end gap-2">
              {!activeBadge.unlocked && (
                <button 
                  onClick={() => handleUnlockSimulate(activeBadge.id)}
                  className="px-4 py-2 bg-emerald-600 text-white border-2 border-black rounded-xl font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-700"
                >
                  Simulate Unlock Milestone
                </button>
              )}
              <button 
                onClick={() => setActiveBadge(null)}
                className="px-4 py-2 border-2 border-black rounded-xl font-bold uppercase text-xs hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesAchievements;
