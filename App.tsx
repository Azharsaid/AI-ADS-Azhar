
import React from 'react';
import { AdEditor } from './components/AdEditor.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold italic shadow-lg shadow-indigo-600/20">A</div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI-ADS-Azhar
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a>
            <a href="#" className="bg-slate-800 text-slate-200 px-5 py-2 rounded-full hover:bg-slate-700 transition-all border border-slate-700">
              Pro Access
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-16 pb-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            AI-Powered Creativity
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ads that <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Stop the Scroll.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Transform product photos into professional advertising assets. Choose from 15+ cinematic styles and let Gemini 2.5 Flash handle the production.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <AdEditor />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 w-6 h-6 rounded flex items-center justify-center text-white font-bold italic text-xs">A</div>
                <span className="font-bold text-white text-lg tracking-tight">AI-ADS-Azhar</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Next-gen asset creation for digital-first brands. Scaling creativity through generative intelligence.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-6 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Library</a></li>
                <li><a href="#" className="hover:text-indigo-400">Batch Processing</a></li>
                <li><a href="#" className="hover:text-indigo-400">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-6 uppercase tracking-wider text-xs">Support</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Docs</a></li>
                <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs">© 2025 AI-ADS-Azhar. All assets AI-generated.</p>
            <div className="flex gap-8">
              <span className="text-slate-700 text-xs font-mono uppercase">Status: 2.5 Flash Enabled</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
