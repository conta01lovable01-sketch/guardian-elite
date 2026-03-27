import { FileText, Search, Filter, AppWindow, MessageSquare, MapPin } from 'lucide-react';
import { useState } from 'react';
import { activityLogs, type ActivityLog } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const LogsPage = () => {
  const [filter, setFilter] = useState<'all' | 'app' | 'message' | 'geofence'>('all');
  const [search, setSearch] = useState('');

  const filtered = activityLogs.filter((log) => {
    if (filter !== 'all' && log.type !== filter) return false;
    if (search && !log.title.toLowerCase().includes(search.toLowerCase()) && !log.detail.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const typeIcon = (t: ActivityLog['type']) => {
    if (t === 'app') return <AppWindow className="h-4 w-4" />;
    if (t === 'message') return <MessageSquare className="h-4 w-4" />;
    return <MapPin className="h-4 w-4" />;
  };

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'Todos' },
    { key: 'app', label: 'Apps' },
    { key: 'message', label: 'Mensagens' },
    { key: 'geofence', label: 'Geofencing' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Logs de Atividade
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Registro completo de atividades do dispositivo</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar atividades..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card border-border" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f.key ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary text-muted-foreground hover:text-foreground border border-transparent'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-premium rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Tipo</TableHead>
              <TableHead className="text-muted-foreground">Atividade</TableHead>
              <TableHead className="text-muted-foreground">Detalhes</TableHead>
              <TableHead className="text-muted-foreground text-right">Horário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => (
              <TableRow key={log.id} className="border-border hover:bg-secondary/30 transition-colors">
                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
                    log.type === 'geofence' ? 'bg-destructive/15 text-destructive' :
                    log.type === 'message' ? 'bg-primary/15 text-primary' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {typeIcon(log.type)}
                    {log.type === 'app' ? 'App' : log.type === 'message' ? 'Msg' : 'Geo'}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-foreground">{log.title}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{log.detail}</TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">{log.timestamp}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhum registro encontrado</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LogsPage;
