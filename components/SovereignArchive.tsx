import React, { useState, useEffect } from 'react';
import { Search, FileText, Download, ShieldCheck, Folder, Plus, Bookmark, Eye, HardDrive } from 'lucide-react';

export interface SovereignArtifact {
  id: string;
  title: string;
  category: string;
  description: string;
  fileSize: string;
  format: 'PDF' | 'DOCX' | 'JSON' | 'CERT';
  downloadUrl?: string;
  dateAdded: string;
  verifiedBy: string;
  tags: string[];
}

const DEFAULT_ARTIFACTS: SovereignArtifact[] = [
  {
    id: 'art-001',
    title: 'Grade 12 EAES National Examination Blueprint (2025/2026)',
    category: 'National Curricula',
    description: 'Official Ministry of Education framework detailing question weightage, cognitive levels, and scoring key for Natural & Social Sciences.',
    fileSize: '2.4 MB',
    format: 'PDF',
    dateAdded: '2025-01-15',
    verifiedBy: 'National Academic Board',
    tags: ['EAES', 'Grade 12', 'Official', 'Curriculum']
  },
  {
    id: 'art-002',
    title: 'Pan-African Sovereign Digital Education Charter',
    category: 'Sovereign Blueprints',
    description: 'A comprehensive document establishing the sovereign guidelines for localized digital proctoring, AI proctoring, and data protection.',
    fileSize: '1.8 MB',
    format: 'PDF',
    dateAdded: '2025-02-01',
    verifiedBy: 'IFTU Sovereign Council',
    tags: ['Sovereignty', 'Digital Security', 'Charter']
  },
  {
    id: 'art-003',
    title: 'Grade 11 & 12 Quantum Physics & Kinematics Lab Manual',
    category: 'STEM Technical Artifacts',
    description: 'Hands-on laboratory experiment guide covering wave-particle duality, optics, vectors, and circuit analysis.',
    fileSize: '4.1 MB',
    format: 'PDF',
    dateAdded: '2025-02-10',
    verifiedBy: 'STEM Science Directorate',
    tags: ['Physics', 'Grade 11', 'Grade 12', 'Labs']
  },
  {
    id: 'art-004',
    title: 'TVET Automotive Level 3 Diagnostic Standard Operating Procedures',
    category: 'STEM Technical Artifacts',
    description: 'Technical wiring diagrams, hybrid ECU troubleshooting procedures, and oral exam scoring rubrics.',
    fileSize: '3.5 MB',
    format: 'PDF',
    dateAdded: '2025-02-18',
    verifiedBy: 'Federal TVET Institute',
    tags: ['TVET', 'Automotive', 'Level 3']
  },
  {
    id: 'art-005',
    title: 'Cryptographic Certificate Verification Key Registry',
    category: 'Digital Certificates & Credentials',
    description: 'Public verification hash log for student diploma authentication and digital transcript validation.',
    fileSize: '850 KB',
    format: 'JSON',
    dateAdded: '2025-02-20',
    verifiedBy: 'National Registrar',
    tags: ['Security', 'Verification', 'Hashes']
  }
];

export const SovereignArchive: React.FC = () => {
  const [artifacts, setArtifacts] = useState<SovereignArtifact[]>(() => {
    const saved = localStorage.getItem('iftu_sovereign_archive');
    return saved ? JSON.parse(saved) : DEFAULT_ARTIFACTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArtifact, setActiveArtifact] = useState<SovereignArtifact | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // New artifact form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('National Curricula');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['All', 'National Curricula', 'EAES Official Syllabi', 'STEM Technical Artifacts', 'Digital Certificates & Credentials', 'Sovereign Blueprints'];

  useEffect(() => {
    localStorage.setItem('iftu_sovereign_archive', JSON.stringify(artifacts));
  }, [artifacts]);

  const filteredArtifacts = artifacts.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesQuery = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleAddArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: SovereignArtifact = {
      id: `art-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      description: newDescription || 'User archived national document artifact.',
      fileSize: '1.2 MB',
      format: 'PDF',
      dateAdded: new Date().toISOString().split('T')[0],
      verifiedBy: 'Verified User Artifact',
      tags: [newCategory, 'Archived']
    };

    setArtifacts([created, ...artifacts]);
    setNewTitle('');
    setNewDescription('');
    setIsUploading(false);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <HardDrive size={180} />
        </div>
        
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#009b44] text-white rounded-xl border-2 border-black text-xs font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-[#ffcd00]" />
            National Digital Repository & Persistent Archive
          </div>

          <h1 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight">
            SOVEREIGN ARCHIVE
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Curated repository storing official national curricula, EAES exam blueprints, verified STEM lab manuals, and cryptographic diploma keys for Ethiopia’s digital education network.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button 
              onClick={() => setIsUploading(!isUploading)}
              className="flex items-center gap-2 px-5 py-3 bg-[#ffcd00] text-black font-black uppercase text-xs rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-105 active:translate-y-0.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              Archive New Document
            </button>
            <div className="text-xs font-mono text-emerald-400 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Vault Status: SECURE & VERIFIED ({artifacts.length} Items)
            </div>
          </div>
        </div>
      </div>

      {/* Upload Drawer */}
      {isUploading && (
        <form onSubmit={handleAddArtifact} className="bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 animate-fadeIn">
          <h3 className="text-xl font-black uppercase italic text-gray-900 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
            <Folder className="w-5 h-5 text-emerald-600" />
            Archive Document Entry
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Document Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Grade 10 Civics and Ethics Guide" 
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-black text-sm font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Category</label>
              <select 
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-black text-sm font-medium focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {categories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Description / Notes</label>
            <textarea 
              rows={2}
              placeholder="Brief summary of document contents and national relevance..." 
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="w-full p-3 rounded-xl border-2 border-black text-sm font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => setIsUploading(false)}
              className="px-4 py-2 border-2 border-black rounded-xl font-bold uppercase text-xs hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-emerald-600 text-white border-2 border-black rounded-xl font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-700"
            >
              Save to Archive
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-black ${
                selectedCategory === cat 
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,155,68,1)]' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search artifacts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border-2 border-black text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Artifact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtifacts.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border-4 border-black text-center space-y-3">
            <FileText className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="text-lg font-bold text-gray-800 uppercase">No Artifacts Found</h3>
            <p className="text-xs text-gray-500">Try adjusting your search filters or category selection.</p>
          </div>
        ) : (
          filteredArtifacts.map(art => (
            <div 
              key={art.id}
              className="bg-white border-4 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:-translate-y-1 transition-all"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-black uppercase border border-emerald-300">
                    {art.category}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-mono font-bold">
                    {art.format}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {art.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {art.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t-2 border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-medium text-gray-500">
                  <span>Size: {art.fileSize}</span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {art.verifiedBy}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setActiveArtifact(art)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-slate-900 text-white rounded-xl border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Inspect
                  </button>
                  <a 
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(art, null, 2))}`}
                    download={`${art.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${art.format.toLowerCase()}`}
                    className="p-2 bg-emerald-500 text-white rounded-xl border-2 border-black flex items-center justify-center hover:bg-emerald-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    title="Download Sovereign Artifact"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Artifact Viewer Modal */}
      {activeArtifact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white border-8 border-black rounded-3xl p-6 max-w-2xl w-full shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] space-y-6 relative animate-scaleIn">
            <button 
              onClick={() => setActiveArtifact(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black text-white rounded-full font-black text-lg flex items-center justify-center hover:bg-rose-600 transition-colors"
            >
              ✕
            </button>

            <div className="space-y-2 pr-8">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black uppercase">
                {activeArtifact.category}
              </span>
              <h2 className="text-2xl font-black text-gray-900 italic">
                {activeArtifact.title}
              </h2>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
              <p className="font-sans text-sm font-semibold text-gray-800 mb-2">{activeArtifact.description}</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
                <div><strong>Format:</strong> {activeArtifact.format}</div>
                <div><strong>Size:</strong> {activeArtifact.fileSize}</div>
                <div><strong>Archived Date:</strong> {activeArtifact.dateAdded}</div>
                <div><strong>Verification:</strong> {activeArtifact.verifiedBy}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setActiveArtifact(null)}
                className="px-5 py-2.5 border-2 border-black rounded-xl font-bold uppercase text-xs hover:bg-gray-100"
              >
                Close
              </button>
              <a 
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(activeArtifact, null, 2))}`}
                download={`${activeArtifact.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${activeArtifact.format.toLowerCase()}`}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl border-2 border-black font-black uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-700"
              >
                <Download className="w-4 h-4" />
                Download Verified Artifact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SovereignArchive;
