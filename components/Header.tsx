'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import { ShoppingBag, Sprout, Menu, X, LogIn, LogOut, User, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useSession, signOut } from 'next-auth/react';
import AuthModal from './AuthModal';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<'khedut' | 'vyapari'>('khedut');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Language & Auth Session Hooks
  const { language, setLanguage, t } = useLanguage();
  const { data: session } = useSession();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <Logo className="h-10 sm:h-12" />
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
              <a href="#" className="hover:text-emerald-600 transition-colors">{t('home')}</a>
              <a href="#mandi-rates" className="hover:text-emerald-600 transition-colors">{t('mandiRates')}</a>
              <a href="#products" className="hover:text-emerald-600 transition-colors">{t('products')}</a>
              <a href="#about" className="hover:text-emerald-600 transition-colors">{t('about')}</a>
            </nav>

            {/* Actions: Language Selector + Role Toggle + Login */}
            <div className="hidden lg:flex items-center space-x-4">
              
              {/* 🌐 Language Switcher Dropdown */}
              <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700">
                <Globe className="w-4 h-4 text-emerald-600" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'gu' | 'hi' | 'en')}
                  className="bg-transparent focus:outline-none cursor-pointer font-bold text-gray-800"
                >
                  <option value="gu">ગુજરાતી</option>
                  <option value="hi">हिंदी</option>
                  <option value="en">English</option>
                </select>
              </div>

              {/* Role Switcher */}
              <div className="bg-gray-100 p-1 rounded-full flex items-center border border-gray-200">
                <button
                  onClick={() => setActiveRole('khedut')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    activeRole === 'khedut' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600'
                  }`}
                >
                  <Sprout className="w-4 h-4" />
                  {t('seller')}
                </button>
                <button
                  onClick={() => setActiveRole('vyapari')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    activeRole === 'vyapari' ? 'bg-teal-700 text-white shadow-md' : 'text-gray-600'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t('buyer')}
                </button>
              </div>

              {/* Login / Profile Section */}
              {session?.user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-xl text-emerald-800 font-bold text-sm">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>{session.user.name || 'User'}</span>
                    <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">
                      {(session.user as any).role || 'khedut'}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-colors cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  {t('login')}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Language Switcher */}
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'gu' | 'hi' | 'en')}
                className="bg-gray-100 text-xs font-bold p-2 rounded-lg border border-gray-200"
              >
                <option value="gu">GU</option>
                <option value="hi">HI</option>
                <option value="en">EN</option>
              </select>

              {/* Mobile Auth Button */}
              {!session?.user && (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg"
                >
                  {t('login')}
                </button>
              )}

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal Popup */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;
