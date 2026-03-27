import { useState } from 'react';
import { Globe, Package, Download, Trash2, EyeOff, Clock, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { browserHistory, appInventory } from '@/data/newMockData';

const BrowserHistoryPage = () => {
  const [tab, setTab] = useState('browser');
  const [search, setSearch] = useState('');

  const filteredBrowser = browserHistory.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApps = appInventory.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Navegação & Inventário de Apps</h1>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="browser"><Globe className="h-3.5 w-3.5 mr-1" /> Histórico Web</TabsTrigger>
          <TabsTrigger value="apps"><Package className="h-3.5 w-3.5 mr-1" /> Apps Instalados</TabsTrigger>
        </TabsList>

        <TabsContent value="browser">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {filteredBrowser.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="card-premium rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground truncate">{entry.title}</p>
                        {entry.incognito && (
                          <Badge variant="outline" className="text-[10px] border-destructive/40 text-destructive shrink-0">
                            <EyeOff className="h-3 w-3 mr-1" /> Anônimo
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">{entry.url}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-foreground">{entry.timestamp}</p>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {entry.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="apps">
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {filteredApps.map((app, i) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="card-premium rounded-xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{app.name}</p>
                        {app.status === 'removed' ? (
                          <Badge variant="destructive" className="text-[10px]"><Trash2 className="h-3 w-3 mr-1" /> Removido</Badge>
                        ) : (
                          <Badge className="bg-green-500/20 text-green-400 text-[10px]"><Download className="h-3 w-3 mr-1" /> Instalado</Badge>
                        )}
                        <Badge variant="outline" className="text-[10px] gold-border text-muted-foreground">{app.category}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{app.packageName} • v{app.version}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-foreground">{app.size}</p>
                      <p className="text-[10px] text-muted-foreground">Uso hoje: {app.usageToday}</p>
                      {app.removedDate && <p className="text-[10px] text-destructive">Removido: {app.removedDate}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowserHistoryPage;
