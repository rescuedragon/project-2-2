import React, { useEffect, useRef } from 'react';

interface ProgressBarProps {
  currentHours: number;
  targetHours?: number;
  color?: string;
  enabled?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentHours,
  targetHours = 8,
  color = '#10b981',
  enabled = false
}) => {
  const progressPercentage = Math.min(currentHours / 3600 / targetHours * 100, 100);
  const hours = (currentHours / 3600).toFixed(1);
  const remaining = Math.max(0, targetHours - currentHours / 3600).toFixed(1);
  
  const bubblesRef = useRef<HTMLDivElement>(null);
  
  // Generate bubbles
  useEffect(() => {
    if (!enabled || !bubblesRef.current) return;
    
    const createBubbles = () => {
      // Clear existing bubbles
      bubblesRef.current!.innerHTML = '';
      
      // Create bubbles proportional to progress
      const bubbleCount = Math.floor(progressPercentage / 5) + 8;
      
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'absolute rounded-full bg-white';
        
        // Random properties
        const size = Math.random() * 16 + 4;
        const left = Math.random() * progressPercentage;
        const top = Math.random() * 80 + 10;
        const delay = Math.random() * 5;
        const duration = Math.random() * 6 + 4;
        const opacity = Math.random() * 0.4 + 0.1;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.top = `${top}%`;
        bubble.style.opacity = `${opacity}`;
        bubble.style.animation = `rise ${duration}s ease-in-out ${delay}s infinite`;
        
        bubblesRef.current!.appendChild(bubble);
      }
    };
    
    createBubbles();
  }, [enabled, progressPercentage]);

  if (!enabled) {
    return (
      <div className="mb-6 p-4 bg-white dark:bg-gray-950 rounded-[28px] border border-gray-200/30 dark:border-gray-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out backdrop-blur-xl h-20">
        <div className="flex items-center justify-between h-full">
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">Total Time Today</div>
            <div className="flex items-baseline space-x-2">
              <div className="text-3xl font-thin text-gray-900 dark:text-gray-50 tracking-tight">{hours}</div>
              <div className="text-sm font-medium text-gray-400 dark:text-gray-500">hours</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Progress bar */}
            <div className="relative w-32">
              {/* Track */}
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                {/* Fill */}
                <div 
                  className="h-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
            
            {/* Circular progress indicator */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-gray-100 dark:text-gray-800"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progressPercentage / 100)}`}
                  className="text-gray-900 dark:text-gray-100 transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              {/* Center percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 shadow-2xl hover:shadow-2xl transition-all duration-500 animate-fade-in overflow-hidden relative backdrop-blur-sm h-44">
      {/* Background with subtle wave pattern for the whole area */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,30 C20,0 40,40 60,10 C80,40 100,0 100,30 L100,100 L0,100 Z" fill="${encodeURIComponent(color)}"/></svg>')`,
        backgroundSize: '200% 100%',
        animation: 'waveMove 25s linear infinite'
      }} />
      
      {/* Completed portion with rich features */}
      <div 
        className="absolute inset-y-0 left-0 overflow-hidden transition-all duration-1000 ease-out"
        style={{ 
          width: `${progressPercentage}%`,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        }}
      >
        {/* Water base with gradient */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{ 
            background: `linear-gradient(to right, 
              ${color}88, 
              ${color}bb)`,
          }}
        />
        
        {/* Main wave pattern */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{ 
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,40 C20,20 40,60 60,30 C80,60 100,20 100,40 L100,100 L0,100 Z" fill="${encodeURIComponent(color)}"/></svg>')`,
            backgroundSize: '200% 100%',
            animation: 'waveMove 15s linear infinite'
          }} 
        />
        
        {/* Secondary wave pattern */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,60 C15,40 35,70 50,50 C65,70 85,40 100,60 L100,100 L0,100 Z" fill="${encodeURIComponent(color)}"/></svg>')`,
            backgroundSize: '150% 100%',
            animation: 'waveMove 20s linear infinite reverse'
          }} 
        />
        
        {/* Bubble reflections */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 2px, transparent 4px),
                              radial-gradient(circle at 60% 70%, rgba(255,255,255,0.3) 1px, transparent 3px),
                              radial-gradient(circle at 40% 20%, rgba(255,255,255,0.5) 3px, transparent 5px)`,
            backgroundSize: '100px 100px, 150px 150px, 200px 200px',
            opacity: 0.3
          }}
        />
        
        {/* Dynamic bubbles */}
        <div ref={bubblesRef} className="absolute inset-0" />
        
        {/* Light reflections */}
        <div 
          className="absolute top-0 left-0 w-full h-20 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)`,
            opacity: 0.2,
            mixBlendMode: 'overlay'
          }}
        />
      </div>
      
      {/* Straight progress divider with wave accent */}
      <div 
        className="absolute top-0 bottom-0 transition-all duration-1000 ease-out"
        style={{ 
          left: `${progressPercentage}%`,
          width: '4px',
          marginLeft: '-2px',
          zIndex: 10,
          background: `linear-gradient(to bottom, 
            transparent, 
            ${color}cc 10%, 
            ${color}ee 50%, 
            ${color}cc 90%, 
            transparent)`,
          boxShadow: `0 0 8px ${color}88`
        }}
      >
        {/* Wave accent at top */}
        <div 
          className="absolute -top-4 -left-4 w-12 h-8"
          style={{ 
            background: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" preserveAspectRatio="none"><path d="M0,40 C15,25 30,35 45,20 C50,15 55,25 60,20 L60,40 L0,40 Z" fill="${encodeURIComponent(color)}dd"/></svg>')`,
            backgroundSize: '100% 100%',
            animation: 'waveBounce 3s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Progress highlight bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-1000 ease-out"
        style={{ 
          width: `${progressPercentage}%`,
          background: `linear-gradient(90deg, transparent, ${color}dd, ${color}ff)`,
          boxShadow: `0 0 10px ${color}88`,
          zIndex: 5
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Today's Progress</div>
          <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">{hours} hrs</div>
        </div>
        
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-500 dark:text-gray-400">
          </div>
          <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
            {Math.round(progressPercentage)}%
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        @keyframes waveMove {
          0% { background-position-x: 0; }
          100% { background-position-x: 100%; }
        }
        
        @keyframes rise {
          0% { 
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.1; }
          100% { 
            transform: translateY(-50px) scale(0.8);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() > 0.5 ? '-' : ''}10px, -10px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes waveBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;