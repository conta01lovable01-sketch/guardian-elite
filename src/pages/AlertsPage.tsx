import { useState } from 'react';
import { Bell, ShieldAlert, Plus, Trash2, ToggleLeft, ToggleRight, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { keywordAlerts, watchlistKeywords, WatchlistKeyword, KeywordAlert } from '@/data/newMockData';

const severityColors: Record<string, string> = {
  high: 'bg-destructive/20 text-destructive',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-blue-500/20 text-blue-400',
};

const AlertsPage = () => {
  const [keywords, setKeywords] = useState<WatchlistKeyword[]>(watchlistKeywords);
  const [alerts] = useState<KeywordAlert[]>(keywordAlerts);
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    setKeywords([...keywords, {
      id: `wk${Date.now()}`,
      keyword: newKeyword.trim().toLowerCase(),
      active: true,
      createdAt: '27/03/2026',
      matchCount: 0,
    }]);
    setNewKeyword('');
    toast({ title: '✅ Palavra-chave adicionada', description: `"${newKeyword}" será monitorada.` });
  };

  const toggleKeyword = (id: string) => {
    setKeywords(keywords.map((k) => k.id === id ? { ...k, active: !k.active } : k));
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter((k) => k.id !== id));
    toast({ title: '🗑️ Palavra-chave removida' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Bell className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Centro de Notificações Críticas</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-destructive" />
            Alertas Recentes
          </h3>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`card-premium rounded-xl p-4 ${!alert.read ? 'border-l-2 border-l-destructive' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-[10px] ${severityColors[alert.severity]}`}>
                          {alert.severity === 'high' ? <AlertTriangle className="h-3 w-3 mr-1" /> : <Info className="h-3 w-3 mr-1" />}
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.source}</span>
                      </div>
                      <p className="text-sm text-foreground">
                        Palavra-chave: <span className="font-bold text-primary">"{alert.keyword}"</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 bg-secondary/50 px-3 py-1.5 rounded italic">{alert.context}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-foreground">{alert.timestamp}</p>
                      <p className="text-[10px] text-muted-foreground">{alert.date}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Watchlist */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Watchlist de Palavras-Chave</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Nova palavra-chave..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addKeyword()}
              className="bg-secondary border-border"
            />
            <Button size="icon" onClick={addKeyword}><Plus className="h-4 w-4" /></Button>
          </div>

          <ScrollArea className="h-[calc(100vh-380px)]">
            <div className="space-y-2">
              {keywords.map((kw) => (
                <div key={kw.id} className="card-premium rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleKeyword(kw.id)}>
                      {kw.active ? <ToggleRight className="h-5 w-5 text-green-400" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${kw.active ? 'text-foreground' : 'text-muted-foreground line-through'}`}>"{kw.keyword}"</p>
                      <p className="text-[10px] text-muted-foreground">{kw.matchCount} ocorrência(s)</p>
                    </div>
                  </div>
                  <button onClick={() => removeKeyword(kw.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;
