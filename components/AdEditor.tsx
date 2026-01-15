
import React, { useState, useRef } from 'react';
import { Button } from './Button.tsx';
import { AD_STYLES } from '../constants.tsx';
import { ProductData, AdGenerationState } from '../types.ts';
import { generateAdImage } from '../services/geminiService.ts';

export const AdEditor: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    image: null,
    prompt: '',
    styleId: AD_STYLES[0].id
  });

  const [generation, setGeneration] = useState<AdGenerationState>({
    isGenerating: false,
    error: null,
    resultImage: null
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!productData.image) {
      setGeneration(prev => ({ ...prev, error: "Please upload a product image first." }));
      return;
    }

    setGeneration({ isGenerating: true, error: null, resultImage: null });

    try {
      const selectedStyle = AD_STYLES.find(s => s.id === productData.styleId);
      const result = await generateAdImage(
        productData.image,
        productData.prompt,
        selectedStyle?.promptSuffix || ''
      );
      setGeneration({ isGenerating: false, error: null, resultImage: result });
    } catch (err: any) {
      let message = "An unexpected error occurred. Please try again.";
      if (err.message === "API_KEY_ERROR") {
        message = "Your API Key is invalid or not found. Please re-select your key.";
      } else if (err.message) {
        message = err.message;
      }
      setGeneration({ isGenerating: false, error: message, resultImage: null });
    }
  };

  const downloadResult = () => {
    if (!generation.resultImage) return;
    const link = document.createElement('a');
    link.href = generation.resultImage;
    link.download = `azhar-ad-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Configuration Column */}
      <div className="lg:col-span-5 space-y-8">
        <section className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="bg-indigo-600/20 text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-xs border border-indigo-500/30 font-mono">01</span>
            Base Asset
          </h2>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 group ${
              productData.image 
                ? 'border-indigo-500/50 bg-indigo-500/5' 
                : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/50'
            }`}
          >
            {productData.image ? (
              <div className="relative group">
                <img src={productData.image} alt="Product" className="max-h-56 mx-auto rounded-xl shadow-2xl" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-white text-sm font-bold px-4 py-2 bg-indigo-600 rounded-full shadow-lg">Change Asset</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-300 font-medium">Upload product photo</p>
                  <p className="text-xs text-slate-500 mt-1">High resolution PNG or JPG</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </section>

        <section className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="bg-indigo-600/20 text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-xs border border-indigo-500/30 font-mono">02</span>
            Style Engine
          </h2>
          <div className="grid grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {AD_STYLES.map((style) => (
              <div 
                key={style.id}
                onClick={() => setProductData(prev => ({ ...prev, styleId: style.id }))}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  productData.styleId === style.id ? 'border-indigo-500 ring-4 ring-indigo-500/10' : 'border-slate-800 grayscale hover:grayscale-0'
                }`}
              >
                <img src={style.previewUrl} alt={style.name} className="w-full h-20 object-cover" />
                <div className={`absolute inset-0 flex items-end p-2 transition-colors ${
                  productData.styleId === style.id ? 'bg-gradient-to-t from-indigo-900/90 to-transparent' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent'
                }`}>
                  <span className="text-white text-[10px] font-bold uppercase tracking-tighter leading-none">{style.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-800">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-3">
            <span className="bg-indigo-600/20 text-indigo-400 w-8 h-8 rounded-full flex items-center justify-center text-xs border border-indigo-500/30 font-mono">03</span>
            Creative Brief
          </h2>
          <textarea 
            value={productData.prompt}
            onChange={(e) => setProductData(prev => ({ ...prev, prompt: e.target.value }))}
            placeholder="Describe surroundings (e.g., 'floating in space', 'on a marble table')"
            className="w-full h-28 p-4 rounded-2xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none outline-none text-slate-300 text-sm placeholder:text-slate-600"
          />
        </section>

        <Button 
          onClick={handleGenerate} 
          isLoading={generation.isGenerating}
          className="w-full py-5 text-lg font-black tracking-wide uppercase shadow-2xl shadow-indigo-600/20 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
          disabled={!productData.image}
        >
          {generation.isGenerating ? 'Synthesizing...' : 'Generate Ad'}
        </Button>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-7">
        <div className="bg-slate-900 rounded-[2.5rem] p-6 lg:p-10 min-h-[700px] flex flex-col shadow-2xl border border-slate-800 sticky top-24">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <h3 className="text-slate-300 font-bold tracking-widest uppercase text-xs">Campaign Monitor</h3>
            </div>
            {generation.resultImage && (
              <Button 
                variant="outline" 
                onClick={downloadResult} 
                className="bg-slate-800/50 hover:bg-slate-700 text-white border-slate-700 py-2 px-6 rounded-full text-xs font-bold"
              >
                Export HD
              </Button>
            )}
          </div>

          <div className="flex-grow flex items-center justify-center bg-slate-950 rounded-[2rem] overflow-hidden border border-slate-800 relative group shadow-inner">
            {generation.isGenerating ? (
              <div className="text-center space-y-6 px-10">
                <div className="relative w-32 h-32 mx-auto">
                   <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10 scale-125"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                   <div className="absolute inset-4 rounded-full border-4 border-purple-500 border-b-transparent animate-spin-slow"></div>
                </div>
                <div className="animate-pulse">
                  <p className="text-white font-bold text-xl">Gemini is thinking...</p>
                  <p className="text-slate-500 text-sm mt-2 font-medium">Processing textures and lighting arrays</p>
                </div>
              </div>
            ) : generation.resultImage ? (
              <div className="w-full h-full p-4">
                <img 
                  src={generation.resultImage} 
                  alt="Generated Ad" 
                  className="w-full h-full object-contain rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-700" 
                />
              </div>
            ) : (
              <div className="text-center p-16 space-y-6 opacity-40">
                <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto border border-slate-700/50">
                   <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                   </svg>
                </div>
                <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">Complete the requirements on the left to initialize generation.</p>
              </div>
            )}

            {generation.error && (
              <div className="absolute bottom-8 left-8 right-8 bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-400 p-5 rounded-2xl flex items-center gap-4 animate-in slide-in-from-bottom-6">
                <div className="bg-red-500/20 p-2 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold tracking-tight">{generation.error}</p>
              </div>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">AI Engine</p>
                <p className="text-slate-300 text-xs font-bold font-mono">2.5-FLASH-IMAGE</p>
             </div>
             <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl">
                <p className="text-purple-400 text-[10px] font-black uppercase tracking-widest mb-1">Output</p>
                <p className="text-slate-300 text-xs font-bold font-mono">1024x1024 PNG</p>
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};
