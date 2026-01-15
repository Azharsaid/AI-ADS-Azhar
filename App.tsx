
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
              AdGenius AI
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors">Showcase</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Enterprise</a>
            <a href="#" className="bg-slate-800 text-slate-200 px-5 py-2 rounded-full hover:bg-slate-700 transition-all border border-slate-700">
              Go Pro
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-16 pb-8 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            Next-Gen Creative Engine
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Ads that <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Stop the Scroll.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Transform product photos into high-converting assets in seconds using Gemini 2.5 Flash. Choose your style and let the AI handle the lighting, background, and mood.
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
                <span className="font-bold text-white text-lg tracking-tight">AdGenius AI</span>
              </div>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                Empowering modern brands with high-fidelity AI generation. From product launch to global campaign, scale your creative vision instantly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-6 uppercase tracking-wider text-xs">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Style Library</a></li>
                <li><a href="#" className="hover:text-indigo-400">Batch Processing</a></li>
                <li><a href="#" className="hover:text-indigo-400">Developer API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-6 uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-400">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-400">Prompt Guide</a></li>
                <li><a href="#" className="hover:text-indigo-400">Case Studies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-8 flex flex-col md:row justify-between items-center gap-6">
            <p className="text-slate-600 text-xs">© 2025 AdGenius AI. Designed for performance.</p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-600 hover:text-indigo-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a href="#" className="text-slate-600 hover:text-indigo-400 transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
