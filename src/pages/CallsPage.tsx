import { useState } from 'react';
import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, Users, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { callRecords, contacts } from '@/data/newMockData';

const callTypeIcon = (type: string) => {
  switch (type) {
    case 'incoming': return <PhoneIncoming className="h-4 w-4 text-green-400" />;
    case 'outgoing': return <PhoneOutgoing className="h-4 w-4 text-blue-400" />;
    case 'missed': return <PhoneMissed className="h-4 w-4 text-red-400" />;
    default: return <Phone className="h-4 w-4" />;
  }
};

const CallsPage = () => {
  const [tab, setTab] = useState('calls');

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Phone className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Telemetria de Chamadas & Contatos</h1>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="calls"><Clock className="h-3.5 w-3.5 mr-1" /> Chamadas</TabsTrigger>
          <TabsTrigger value="contacts"><Users className="h-3.5 w-3.5 mr-1" /> Contatos</TabsTrigger>
        </TabsList>

        <TabsContent value="calls">
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="space-y-2">
              {callRecords.map((call, i) => (
                <motion.div
                  key={call.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="card-premium rounded-xl p-4 flex items-center gap-4"
                >
                  {callTypeIcon(call.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{call.name}</p>
                    <p className="text-xs text-muted-foreground">{call.number}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-foreground">{call.timestamp}</p>
                    <p className="text-[10px] text-muted-foreground">{call.date}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-xs text-muted-foreground">{call.duration === '0:00' ? 'Não atendida' : call.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="contacts">
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {contacts.map((contact, i) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="card-premium rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                    {contact.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                      {contact.favorite && <Star className="h-3 w-3 text-primary fill-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{contact.number}</p>
                    {contact.email && <p className="text-[10px] text-muted-foreground">{contact.email}</p>}
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

export default CallsPage;
