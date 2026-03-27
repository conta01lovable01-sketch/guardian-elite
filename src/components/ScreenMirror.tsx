import { Monitor, Maximize2 } from 'lucide-react';
import { useState } from 'react';

const ScreenMirror = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="card-premium rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Monitor className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Espelhamento de Tela</span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-success/20 text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-gold" />
            AO VIVO
          </span>
        </div>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative aspect-[9/16] max-h-[400px] bg-navy-deep flex items-center justify-center overflow-hidden">
        {/* Simulated phone screen */}
        <div className="absolute inset-0 flex flex-col">
          {/* Status bar mock */}
          <div className="flex items-center justify-between px-4 py-1 bg-background/20 text-[10px] text-foreground/60">
            <span>14:32</span>
            <div className="flex items-center gap-1">
              <span>LTE</span>
              <span>73%</span>
            </div>
          </div>

          {/* App content mock */}
          <div className="flex-1 p-3 space-y-2">
            <div className="h-8 bg-secondary/30 rounded-lg animate-pulse" />
            <div className="h-24 bg-secondary/20 rounded-lg" />
            <div className="space-y-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-secondary/30" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2.5 bg-secondary/25 rounded w-3/4" />
                    <div className="h-2 bg-secondary/15 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav bar mock */}
          <div className="flex items-center justify-around px-6 py-2 bg-background/10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-5 w-5 rounded bg-secondary/25" />
            ))}
          </div>
        </div>

        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 right-0 h-px bg-primary/30 animate-scan-line" />
        </div>
      </div>
    </div>
  );
};

export default ScreenMirror;
