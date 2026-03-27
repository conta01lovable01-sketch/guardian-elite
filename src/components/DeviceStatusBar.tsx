import { Battery, Wifi, Smartphone, Clock, Signal } from 'lucide-react';
import { deviceStatus } from '@/data/mockData';

const DeviceStatusBar = () => {
  const { battery, signal, systemVersion, deviceName, lastSync, isOnline } = deviceStatus;

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Smartphone className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-foreground">{deviceName}</span>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${isOnline ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? 'bg-success animate-pulse-gold' : 'bg-destructive'}`} />
          {isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Battery className="h-4 w-4" />
          <span className="text-xs">{battery}%</span>
          <div className="w-8 h-2.5 rounded-full bg-muted overflow-hidden ml-1">
            <div
              className={`h-full rounded-full transition-all ${battery > 50 ? 'bg-success' : battery > 20 ? 'bg-warning' : 'bg-destructive'}`}
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Signal className="h-4 w-4" />
          <span className="text-xs">{signal}</span>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wifi className="h-4 w-4" />
          <span className="text-xs">{systemVersion}</span>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span className="text-xs">Sync: {lastSync}</span>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatusBar;
