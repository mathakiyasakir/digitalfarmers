'use client';

import React from 'react';
import { Sprout, ShoppingCart, TrendingUp, ShieldCheck, PhoneCall } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-emerald-50 via-teal-50/30 to-white pt-12 pb-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald-200/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-sm font-semibold border border-emerald-200 shadow-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>खेधूत और व्यापारी का अपना भरोसेमंद डिजिटल बाजार</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            अपनी फसल का पाएँ <span className="text-emerald-600 underline decoration-emerald-400 decoration-wavy underline-offset-8">सही दाम</span>, सीधे व्यापारी के साथ!
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
            बिना किसी बिचौलिए (Middleman) के अपनी उपज बेचें या खरीदें। मंडी के लाइव भाव देखें और सीधा व्यापार करें।
          </p>

          {/* CTA Buttons (Primary Action) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* For Khedut */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer">
              <Sprout className="w-6 h-6" />
              फसल बेचें (खेधूत)
            </button>

            {/* For Vyapari */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-teal-800/30 transition-all transform hover:-translate-y-0.5 cursor-pointer">
              <ShoppingCart className="w-6 h-6" />
              फसल खरीदें (व्यापारी)
            </button>
          </div>

          {/* Trust Badges */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-emerald-100 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">100% सुरक्षित</h4>
                <p className="text-xs text-gray-500">वेरिफाइड खेधूत व व्यापारी</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100">
              <div className="p-2 bg-teal-100 rounded-lg text-teal-700">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">ताजा मंडी भाव</h4>
                <p className="text-xs text-gray-500">रोजाना अपडेटेड रेट्स</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">सीधा संपर्क</h4>
                <p className="text-xs text-gray-500">कॉल या व्हाट्सएप करें</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
