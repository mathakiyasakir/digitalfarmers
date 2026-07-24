'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'gu' | 'hi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// सभी भाषाओं के शब्द (Translations Dictionary)
const translations: Record<Language, Record<string, string>> = {
  gu: {
    home: 'હોમ',
    mandiRates: 'મંડી ભાવ',
    products: 'પાક/પાકો',
    about: 'અમારા વિશે',
    seller: 'ખેડૂત (વેચનાર)',
    buyer: 'વેપારી (ખરીદનાર)',
    login: 'લોગિન / સાઇનઅપ',
    heroTag: 'ખેડૂત અને વેપારીનું પોતાનું ડિજિટલ બજાર',
    heroTitle1: 'તમારા પાકના મેળવો ',
    heroTitle2: 'સાચા ભાવ',
    heroTitle3: ', સીધા વેપારી સાથે!',
    heroDesc: 'વચેટિયાઓ (Middlemen) વગર તમારો પાક વેચો કે ખરીદો. મંડીના લાઈવ ભાવ જુઓ અને સીધો વેપાર કરો.',
    sellCrop: 'પાક વેચો (ખેડૂત)',
    buyCrop: 'પાક ખરીદો (વેપારી)',
    liveMandiHeading: 'આજના તાજા મંડી ભાવ (Live Mandi Rates)',
    refreshRates: 'રિફ્રેશ કરો',
  },
  hi: {
    home: 'होम',
    mandiRates: 'मंडी भाव',
    products: 'फसलें',
    about: 'हमारे बारे में',
    seller: 'खेधूत (विक्रेता)',
    buyer: 'व्यापारी (खरीदार)',
    login: 'लॉगिन / साइनअप',
    heroTag: 'खेधूत और व्यापारी का अपना भरोसेमंद डिजिटल बाजार',
    heroTitle1: 'अपनी फसल का पाएँ ',
    heroTitle2: 'सही दाम',
    heroTitle3: ', सीधे व्यापारी के साथ!',
    heroDesc: 'बिना किसी बिचौलिए के अपनी उपज बेचें या खरीदें। मंडी के लाइव भाव देखें और सीधा व्यापार करें।',
    sellCrop: 'फसल बेचें (खेधूत)',
    buyCrop: 'फसल खरीदें (व्यापारी)',
    liveMandiHeading: 'आज के ताजा मंडी भाव (Live Mandi Rates)',
    refreshRates: 'भाव रिफ्रेश करें',
  },
  en: {
    home: 'Home',
    mandiRates: 'Mandi Rates',
    products: 'Crops',
    about: 'About Us',
    seller: 'Farmer (Seller)',
    buyer: 'Trader (Buyer)',
    login: 'Login / Signup',
    heroTag: "Farmers & Traders' Own Digital Market",
    heroTitle1: 'Get the ',
    heroTitle2: 'Best Price',
    heroTitle3: ' for Your Crops, Directly from Traders!',
    heroDesc: 'Sell or buy crops without any middlemen. Check live APMC mandi rates and trade directly.',
    sellCrop: 'Sell Crop (Farmer)',
    buyCrop: 'Buy Crop (Trader)',
    liveMandiHeading: 'Today Live APMC Mandi Rates',
    refreshRates: 'Refresh Rates',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('gu'); // Default Gujarati

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
