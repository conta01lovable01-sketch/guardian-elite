import { useState } from 'react';
import { MessageSquare, Search, Play, Pause, Image, Film, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatContacts, chatMessages, ChatContact } from '@/data/newMockData';

const platformColors: Record<string, string> = {
  whatsapp: 'bg-green-600',
  facebook: 'bg-blue-600',
  sms: 'bg-muted',
  viber: 'bg-purple-600',
};

const platformLabels: Record<string, string> = {
  whatsapp: 'WhatsApp',
  facebook: 'Facebook',
  sms: 'SMS',
  viber: 'Viber',
};

const MessagesPage = () => {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(chatContacts[0]);
  const [search, setSearch] = useState('');
  const [platform, setPlatform] = useState<string>('all');
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const filteredContacts = chatContacts.filter((c) => {
    const matchesPlatform = platform === 'all' || c.platform === platform;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const messages = selectedContact
    ? chatMessages.filter((m) => m.contactId === selectedContact.id)
    : [];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Mensagens Integradas</h1>
      </div>

      <Tabs value={platform} onValueChange={setPlatform}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="viber">Viber</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-260px)]">
        {/* Contact List */}
        <div className="card-premium rounded-xl flex flex-col">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar contato..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {filteredContacts.map((contact) => (
                <motion.button
                  key={contact.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                    selectedContact?.id === contact.id
                      ? 'bg-primary/15 border border-primary/30'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="ml-2 h-5 min-w-5 px-1 flex items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat View */}
        <div className="lg:col-span-2 card-premium rounded-xl flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedContact.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${platformColors[selectedContact.platform]}`} />
                    <span className="text-xs text-muted-foreground">{platformLabels[selectedContact.platform]}</span>
                    <span className="text-xs text-muted-foreground">• {selectedContact.online ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  <AnimatePresence>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                            msg.sent
                              ? 'bg-primary/20 text-foreground rounded-br-md'
                              : 'bg-secondary text-foreground rounded-bl-md'
                          }`}
                        >
                          {msg.type === 'text' && <p className="text-sm">{msg.text}</p>}
                          {msg.type === 'audio' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setPlayingAudio(playingAudio === msg.id ? null : msg.id)}
                                className="h-8 w-8 rounded-full bg-primary/30 flex items-center justify-center"
                              >
                                {playingAudio === msg.id ? (
                                  <Pause className="h-3.5 w-3.5 text-primary" />
                                ) : (
                                  <Play className="h-3.5 w-3.5 text-primary" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="h-1 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary/60 rounded-full w-1/3" />
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-1">{msg.duration}</p>
                              </div>
                              <Mic className="h-3 w-3 text-muted-foreground" />
                            </div>
                          )}
                          {msg.type === 'image' && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Image className="h-4 w-4" />
                              <span className="text-xs">📷 Imagem recebida</span>
                            </div>
                          )}
                          {msg.type === 'video' && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Film className="h-4 w-4" />
                              <span className="text-xs">🎥 Vídeo recebido</span>
                            </div>
                          )}
                          <p className="text-[10px] text-muted-foreground mt-1 text-right">{msg.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Selecione um contato para visualizar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
