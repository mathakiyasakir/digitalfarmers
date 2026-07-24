'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, RefreshCw, TrendingUp } from 'lucide-react';

interface MandiItem {
  district: string;
  market: string;
  commodity: string;
  minPrice: string;
  maxPrice: string;
  modalPrice: string;
  date: string;
}

export const MandiRates: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // सैंपल / फॉलबैक लाइव मंडी डेटा (जब तक एपीआई की (API Key) कनेक्ट नहीं होती)
  const [mandiData, setMandiData] = useState<MandiItem[]>([
    { district: 'Rajkot', market: 'Rajkot APMC', commodity: 'कपास (Cotton)', minPrice: '1450', maxPrice: '1680', modalPrice: '1580', date: 'आज' },
    { district: 'Rajkot', market: 'Gondal APMC', commodity: 'मूंगफली (Groundnut)', minPrice: '1200', maxPrice: '1420', modalPrice: '1350', date: 'आज' },
    { district: 'Amreli', market: 'Amreli APMC', commodity: 'गेहूं (Wheat)', minPrice: '450', maxPrice: '560', modalPrice: '510', date: 'आज' },
    { district: 'Patan', market: 'Patan APMC', commodity: 'जीरा (Cumin)', minPrice: '4800', maxPrice: '5400', modalPrice: '5100', date: 'आज' },
    { district: 'Junagadh', market: 'Junagadh APMC', commodity: 'तिल (Sesame)', minPrice: '2100', maxPrice: '2450', modalPrice: '2300', date: 'आज' },
  ]);

  const fetchLiveRates = async () => {
    setLoading(true);
    try {
      // यहाँ हम Data.gov.in या Agmarknet की सरकारी API से लाइव फेच करेंगे
      // const res = await fetch('https://api.data.gov.in/resource/...');
      // const data = await res.json();
      setTimeout(() => setLoading(false), 800); // Loader simulation
    } catch (error) {
      console.error("Failed to fetch live rates:", error);
      setLoading(false);
    }
  };

  const filteredData = mandiData.filter((item) => {
    const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
    const matchesSearch = item.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.market.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <section id="mandi-rates" className="py-12 bg-gray-50 border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm tracking-wider uppercase">
              <TrendingUp className="w-4 h-4" />
              <span>गुजरात APMC लाइव भाव</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              आज के ताजा मंडी भाव (Live Mandi Rates)
            </h2>
          </div>

          <button
            onClick={fetchLiveRates}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>भाव रिफ्रेश करें</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Search Box */}
          <div className="sm:col-span-2 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="फसल का नाम या मंडी खोजें (उदा. कपास, Gondal)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-gray-800"
            />
          </div>

          {/* District Filter */}
          <div className="relative">
            <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm text-gray-800 appearance-none font-medium cursor-pointer"
            >
              <option value="All">गुजरात के सभी जिले (All Districts)</option>
              <option value="Rajkot">राजकोट (Rajkot)</option>
              <option value="Amreli">अमरेली (Amreli)</option>
              <option value="Patan">पाटन (Patan)</option>
              <option value="Junagadh">जूनागढ़ (Junagadh)</option>
            </select>
          </div>
        </div>

        {/* Mandi Rates Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white text-sm font-semibold">
                  <th className="py-4 px-6">मंडी (Market)</th>
                  <th className="py-4 px-6">फसल (Crop)</th>
                  <th className="py-4 px-6">न्यूनतम भाव (Min)</th>
                  <th className="py-4 px-6">अधिकतम भाव (Max)</th>
                  <th className="py-4 px-6">औसत भाव (Modal)</th>
                  <th className="py-4 px-6">अपडेट</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        {item.market}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-800">{item.commodity}</td>
                      <td className="py-4 px-6 text-gray-600">₹{item.minPrice} / 20kg</td>
                      <td className="py-4 px-6 font-semibold text-emerald-700">₹{item.maxPrice} / 20kg</td>
                      <td className="py-4 px-6 font-bold text-gray-900 bg-emerald-50/80">₹{item.modalPrice} / 20kg</td>
                      <td className="py-4 px-6 text-xs text-gray-400 font-medium">{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      कोई मंडी भाव नहीं मिला।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MandiRates;
