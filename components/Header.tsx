'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import { User, ShoppingBag, Sprout, Menu, X, LogIn } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'khedut' | 'vyapari'>('khedut');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Component */}
          <div className="flex-shrink-0 cursor-pointer">
            <Logo className="h-10 sm:h-12" />
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              होम (Home)
            </a>
            <a href="#mandi-rates" className="hover:text-emerald-600 transition-colors">
              मंडी भाव (Mandi Rates)
            </a>
            <a href="#products" className="hover:text-emerald-600 transition-colors">
              फसलें (Products)
            </a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">
              हमारे बारे में
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Role Switcher (Khedut vs Vyapari Toggle) */}
            <div className="bg-gray-100 p-1 rounded-full flex items-center border border-gray-200">
              <button
                onClick={() => setActiveRole('khedut')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeRole === 'khedut'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sprout className="w-4 h-4" />
                खेधूत (Seller)
              </button>
              <button
                onClick={() => setActiveRole('vyapari')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                  activeRole === 'vyapari'
                    ? 'bg-teal-700 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                व्यापारी (Buyer)
              </button>
            </div>

            {/* Login Button */}
            <button className="flex items-center gap-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-5 py-2 rounded-xl font-medium transition-all cursor-pointer">
              <LogIn className="w-4 h-4" />
              लॉगिन / साइनअप
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 font-medium text-gray-700">
            <a href="#" className="py-2 hover:text-emerald-600">होम (Home)</a>
            <a href="#mandi-rates" className="py-2 hover:text-emerald-600">मंडी भाव (Mandi Rates)</a>
            <a href="#products" className="py-2 hover:text-emerald-600">फसलें (Products)</a>
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-3">
            {/* Mobile Role Switcher */}
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">आप क्या हैं?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveRole('khedut')}
                className={`flex justify-center items-center gap-1 py-2 rounded-lg text-sm font-bold ${
                  activeRole === 'khedut' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Sprout className="w-4 h-4" /> खेधूत
              </button>
              <button
                onClick={() => setActiveRole('vyapari')}
                className={`flex justify-center items-center gap-1 py-2 rounded-lg text-sm font-bold ${
                  activeRole === 'vyapari' ? 'bg-teal-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                <ShoppingBag className="w-4 h-4" /> व्यापारी
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-medium shadow-sm">
              <LogIn className="w-4 h-4" /> लॉगिन / साइनअप
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
