'use client';

import React, { useState } from 'react';
import { X, Sprout, ShoppingBag, Phone, Lock, User, LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'khedut' | 'vyapari'>('khedut');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      // Login Logic
      const res = await signIn('credentials', {
        phone,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        setLoading(false);
        onClose();
        window.location.reload();
      }
    } else {
      // Signup Logic
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, password, role }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'साइनअप विफल रहा');
          setLoading(false);
        } else {
          // Auto login after signup
          await signIn('credentials', { phone, password, redirect: false });
          setLoading(false);
          onClose();
          window.location.reload();
        }
      } catch (err) {
        setError('कुछ गलत हो गया, कृपया दोबारा प्रयास करें।');
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-emerald-100 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
          <h3 className="text-2xl font-bold">
            {isLogin ? 'डिजिटल फार्मर्स में लॉगिन करें' : 'नया अकाउंट बनाएं'}
          </h3>
          <p className="text-emerald-100 text-sm mt-1">
            {isLogin ? 'अपनी फसल बेचें या खरीदें' : 'खेधूत और व्यापारी का अपना बाजार'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          {/* Role Selection (Only on Signup) */}
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">आप क्या हैं?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('khedut')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                    role === 'khedut'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  <Sprout className="w-4 h-4" /> खेधूत (Seller)
                </button>
                <button
                  type="button"
                  onClick={() => setRole('vyapari')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm border transition-all ${
                    role === 'vyapari'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-md'
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" /> व्यापारी (Buyer)
                </button>
              </div>
            </div>
          )}

          {/* Name Input (Only on Signup) */}
          {!isLogin && (
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="पूरा नाम (Full Name)"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              />
            </div>
          )}

          {/* Phone Input */}
          <div className="relative">
            <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              placeholder="मोबाइल नंबर (Phone Number)"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="पासवर्ड (Password)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all cursor-pointer mt-2"
          >
            <LogIn className="w-5 h-5" />
            {loading ? 'कृपया प्रतीक्षा करें...' : isLogin ? 'लॉगिन करें' : 'साइनअप करें'}
          </button>

          {/* Toggle Login/Signup */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              {isLogin ? 'नया अकाउंट बनाएं? (Sign Up)' : 'पहले से अकाउंट है? (Log In)'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AuthModal;
