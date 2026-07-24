import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12", showText = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG Icon Section */}
      <div className="relative h-full aspect-square">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Gradient for Leaf Border */}
            <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>

            {/* Gradient for D */}
            <linearGradient id="dGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>

            {/* Gradient for F */}
            <linearGradient id="fGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#115e59" />
            </linearGradient>

            {/* Gradient for Sprout Leaves */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>

          {/* Outer Leaf-Shaped Border Frame */}
          <path
            d="M 25 175 
               C 25 80, 80 25, 175 25 
               L 175 140 
               C 175 160, 160 175, 140 175 
               Z"
            stroke="url(#borderGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* 'D' Character */}
          <path
            d="M 45 60 H 80 C 105 60 105 130 80 130 H 45 V 60 Z M 62 76 V 114 H 78 C 88 114 88 76 78 76 Z"
            fill="url(#dGrad)"
          />

          {/* Top Sprout/Leaves merging out */}
          <path
            d="M 98 62 C 98 40, 115 30, 130 20 C 120 40, 105 50, 98 62 Z"
            fill="url(#leafGrad)"
          />
          <path
            d="M 98 62 C 85 45, 70 42, 60 40 C 75 52, 88 55, 98 62 Z"
            fill="url(#leafGrad)"
          />

          {/* 'F' Character with Wheat/Leaf motif */}
          <path
            d="M 115 60 H 160 V 75 H 132 V 88 H 155 V 103 H 132 V 130 H 115 V 60 Z"
            fill="url(#fGrad)"
          />

          {/* Wheat Grains / Small Sprout detail on F */}
          <path
            d="M 135 60 C 138 52, 145 50, 150 48 C 146 55, 140 58, 135 60 Z"
            fill="#22c55e"
          />
          <path
            d="M 148 75 C 153 68, 160 67, 165 65 C 160 72, 153 74, 148 75 Z"
            fill="#22c55e"
          />
        </svg>
      </div>

      {/* Brand Text Section */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-xl font-extrabold tracking-wider text-gray-800 uppercase font-sans">
            DIGITAL
          </span>
          <span className="text-xl font-black tracking-widest text-emerald-700 uppercase font-sans -mt-1">
            FARMERS
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
