import { MapPin, AppWindow, AlertTriangle, Shield } from 'lucide-react';
import ScreenMirror from '@/components/ScreenMirror';
import CameraAudioControls from '@/components/CameraAudioControls';
import { activityLogs, routeHistory } from '@/data/mockData';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: '⚠️ Alerta de Zona Segura',
        description: 'Dispositivo monitorado saiu do perímetro "Escola Municipal".',
        variant: 'destructive',
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const recentLogs = activityLogs.slice(0, 4);
  const currentLocation = routeHistory[routeHistory.length - 1];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Dashboard de Comando
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoramento em tempo real</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main: Screen Mirror */}
        <div className="lg:col-span-2">
          <ScreenMirror />
        </div>

        {/* Side: Controls */}
        <div className="space-y-4">
          <CameraAudioControls />

          {/* Quick Stats */}
          <div className="card-premium rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Resumo Rápido</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Localização Atual</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentLocation.label}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/50">
                <AppWindow className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Apps Ativos</p>
                  <p className="text-sm font-medium text-foreground">WhatsApp, Instagram</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-4 w-4 text-destructive shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Alertas Recentes</p>
                  <p className="text-sm font-medium text-destructive">1 alerta crítico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-premium rounded-xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Atividade Recente</h3>
        <div className="space-y-2">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  log.type === 'geofence' ? 'bg-destructive/20 text-destructive' :
                  log.type === 'message' ? 'bg-primary/20 text-primary' :
                  'bg-secondary text-muted-foreground'
                }`}>
                  {log.type === 'app' ? 'APP' : log.type === 'message' ? 'MSG' : 'GEO'}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{log.title}</p>
                  <p className="text-xs text-muted-foreground">{log.detail}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
