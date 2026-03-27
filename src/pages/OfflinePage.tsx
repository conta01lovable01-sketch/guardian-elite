import { HardDrive, Mic, Video, CheckCircle2, Clock, Download, Play } from 'lucide-react';
import { offlineFiles } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const OfflinePage = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <HardDrive className="h-6 w-6 text-primary" />
            Arquivos Offline
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Gravações armazenadas e status de sincronização</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Sincronizados: {offlineFiles.filter(f => f.status === 'synced').length}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-warning" /> Pendentes: {offlineFiles.filter(f => f.status === 'pending').length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offlineFiles.map((file) => (
          <div key={file.id} className="card-premium rounded-xl p-4 hover:glow-gold transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${file.type === 'audio' ? 'bg-primary/15' : 'bg-secondary'}`}>
                  {file.type === 'audio' ? <Mic className="h-5 w-5 text-primary" /> : <Video className="h-5 w-5 text-primary" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.date}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                file.status === 'synced' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
              }`}>
                {file.status === 'synced' ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {file.status === 'synced' ? 'Sincronizado' : 'Pendente'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Duração: {file.duration}</span>
                <span>Tamanho: {file.size}</span>
              </div>
              <div className="flex gap-1.5">
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                  <Play className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflinePage;
