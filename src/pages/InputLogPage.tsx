import { useState } from 'react';
import { Keyboard, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { inputLogs } from '@/data/newMockData';

const InputLogPage = () => {
  const [search, setSearch] = useState('');
  const [filterApp, setFilterApp] = useState<string>('all');

  const apps = Array.from(new Set(inputLogs.map((l) => l.app)));

  const filtered = inputLogs.filter((l) => {
    const matchApp = filterApp === 'all' || l.app === filterApp;
    const matchSearch = l.text.toLowerCase().includes(search.toLowerCase()) || l.app.toLowerCase().includes(search.toLowerCase());
    return matchApp && matchSearch;
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Keyboard className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Log de Atividade de Entrada</h1>
      </div>
      <p className="text-sm text-muted-foreground">Registro cronológico de interações de digitação por aplicativo</p>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar no log..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setFilterApp('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterApp === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
            Todos
          </button>
          {apps.map((app) => (
            <button key={app} onClick={() => setFilterApp(app)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterApp === app ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
              {app}
            </button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-2">
          {filtered.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="card-premium rounded-xl p-4 flex items-start gap-4"
            >
              <div className="text-2xl shrink-0">{entry.appIcon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">{entry.app}</span>
                  <Badge variant="outline" className="text-[10px] gold-border text-muted-foreground">{entry.field}</Badge>
                </div>
                <p className="text-sm text-foreground font-mono bg-secondary/50 px-3 py-2 rounded-lg break-all">
                  {entry.text}
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{entry.timestamp}</span>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default InputLogPage;
