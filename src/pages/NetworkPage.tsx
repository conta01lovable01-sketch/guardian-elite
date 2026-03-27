import { Wifi, WifiOff, Signal, Globe, Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { wifiConnections } from '@/data/newMockData';

const signalBars = (strength: number) => {
  const bars = Math.ceil(strength / 25);
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((b) => (
        <div key={b} className={`w-1 rounded-sm ${b <= bars ? 'bg-primary' : 'bg-muted'}`} style={{ height: `${b * 4}px` }} />
      ))}
    </div>
  );
};

const NetworkPage = () => {
  const current = wifiConnections.find((w) => w.current);
  const history = wifiConnections.filter((w) => !w.current);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Status de Conectividade</h1>
      </div>

      {/* Current Connection */}
      {current && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-premium rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="h-5 w-5 text-green-400" />
            <h3 className="text-sm font-semibold text-foreground">Conexão Atual</h3>
            <Badge className="bg-green-500/20 text-green-400 text-[10px]">Conectado</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">SSID</p>
              <p className="text-sm font-semibold text-foreground">{current.ssid}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Sinal</p>
              <div className="flex items-center gap-2">
                {signalBars(current.signalStrength)}
                <span className="text-sm font-semibold text-foreground">{current.signalStrength}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Segurança</p>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3 text-primary" />
                <span className="text-sm font-semibold text-foreground">{current.security}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">IP</p>
              <p className="text-sm font-mono text-foreground">{current.ipAddress}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">BSSID</p>
              <p className="text-sm font-mono text-muted-foreground">{current.bssid}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Conectado desde</p>
              <p className="text-sm text-foreground">{current.connectedAt}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Connection History */}
      <div className="card-premium rounded-xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Signal className="h-4 w-4 text-primary" />
          Histórico de Conexões
        </h3>
        <ScrollArea className="h-[calc(100vh-420px)]">
          <div className="space-y-3">
            {history.map((conn, i) => (
              <motion.div
                key={conn.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{conn.ssid}</span>
                    {conn.security === 'Aberta' && (
                      <Badge variant="destructive" className="text-[10px]">
                        <ShieldAlert className="h-3 w-3 mr-1" /> Rede Aberta
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {signalBars(conn.signalStrength)}
                    <span className="text-xs text-muted-foreground">{conn.signalStrength}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
                  <div><span className="text-muted-foreground/70">Segurança:</span> {conn.security}</div>
                  <div><span className="text-muted-foreground/70">IP:</span> {conn.ipAddress}</div>
                  <div><span className="text-muted-foreground/70">Conectou:</span> {conn.connectedAt}</div>
                  <div><span className="text-muted-foreground/70">Desconectou:</span> {conn.disconnectedAt}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default NetworkPage;
