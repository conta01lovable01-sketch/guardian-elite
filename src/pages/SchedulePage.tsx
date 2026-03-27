import { CalendarClock, Plus, Mic, Video, Clock, RotateCcw, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { scheduleItems, type ScheduleItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const SchedulePage = () => {
  const [items, setItems] = useState<ScheduleItem[]>(scheduleItems);
  const [date, setDate] = useState<Date>();
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState<'audio' | 'video'>('audio');
  const [newTime, setNewTime] = useState('18:00');
  const [newDuration, setNewDuration] = useState('15');
  const [newRecurrence, setNewRecurrence] = useState<'once' | 'daily' | 'weekly'>('once');

  const handleAdd = () => {
    if (!date) {
      toast({ title: 'Selecione uma data', variant: 'destructive' });
      return;
    }
    const item: ScheduleItem = {
      id: String(items.length + 1),
      type: newType,
      date: format(date, 'dd/MM/yyyy'),
      time: newTime,
      duration: `${newDuration} min`,
      recurrence: newRecurrence,
      status: 'active',
    };
    setItems([item, ...items]);
    setShowForm(false);
    toast({ title: 'Agendamento criado', description: `${newType === 'audio' ? 'Áudio' : 'Vídeo'} agendado para ${item.date} às ${item.time}` });
  };

  const statusIcon = (s: string) => {
    if (s === 'completed') return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (s === 'active') return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <CalendarClock className="h-6 w-6 text-primary" />
            Agendamento Inteligente
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Programar gravações de áudio e vídeo</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gold-gradient text-primary-foreground hover:opacity-90 transition-opacity">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {showForm && (
        <div className="card-premium rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Criar Agendamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Tipo</label>
              <div className="flex gap-2">
                <button onClick={() => setNewType('audio')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-all ${newType === 'audio' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                  <Mic className="h-4 w-4" /> Áudio
                </button>
                <button onClick={() => setNewType('video')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border text-sm transition-all ${newType === 'video' ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                  <Video className="h-4 w-4" /> Vídeo
                </button>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left text-sm", !date && "text-muted-foreground")}>
                    <CalendarClock className="h-4 w-4 mr-2" />
                    {date ? format(date, 'dd/MM/yyyy') : 'Selecionar'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Horário</label>
              <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground" />
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Duração (min)</label>
              <select value={newDuration} onChange={(e) => setNewDuration(e.target.value)} className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm text-foreground">
                <option value="5">5 min</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {(['once', 'daily', 'weekly'] as const).map((r) => (
                <button key={r} onClick={() => setNewRecurrence(r)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-all ${newRecurrence === r ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/40'}`}>
                  <RotateCcw className="h-3 w-3" />
                  {r === 'once' ? 'Uma vez' : r === 'daily' ? 'Diário' : 'Semanal'}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button size="sm" onClick={handleAdd} className="gold-gradient text-primary-foreground">Agendar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card-premium rounded-xl p-4 flex items-center justify-between hover:glow-gold transition-shadow">
            <div className="flex items-center gap-4">
              {statusIcon(item.status)}
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-secondary">
                {item.type === 'audio' ? <Mic className="h-5 w-5 text-primary" /> : <Video className="h-5 w-5 text-primary" />}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.type === 'audio' ? 'Gravação de Áudio' : 'Gravação de Vídeo'}</p>
                <p className="text-xs text-muted-foreground">{item.date} às {item.time} • {item.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                item.status === 'active' ? 'bg-primary/20 text-primary' :
                item.status === 'completed' ? 'bg-success/20 text-success' :
                'bg-muted text-muted-foreground'
              }`}>
                {item.status === 'active' ? 'Ativo' : item.status === 'completed' ? 'Concluído' : 'Pendente'}
              </span>
              <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                <RotateCcw className="h-3 w-3" />
                {item.recurrence === 'once' ? 'Uma vez' : item.recurrence === 'daily' ? 'Diário' : 'Semanal'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
