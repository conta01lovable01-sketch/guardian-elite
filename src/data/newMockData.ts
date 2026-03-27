// === MESSAGES ===
export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  platform: 'whatsapp' | 'facebook' | 'sms' | 'viber';
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  contactId: string;
  text: string;
  time: string;
  sent: boolean;
  type: 'text' | 'audio' | 'image' | 'video';
  duration?: string;
  mediaUrl?: string;
}

export const chatContacts: ChatContact[] = [
  { id: '1', name: 'Maria Silva', avatar: 'MS', platform: 'whatsapp', lastMessage: 'Tudo bem? Chego em 10 min', time: '14:32', unread: 3, online: true },
  { id: '2', name: 'João Pedro', avatar: 'JP', platform: 'whatsapp', lastMessage: '📷 Foto', time: '13:50', unread: 0, online: false },
  { id: '3', name: 'Turma 8B', avatar: 'T8', platform: 'whatsapp', lastMessage: 'Lucas: Alguém fez a lição?', time: '12:05', unread: 12, online: true },
  { id: '4', name: 'Ana Costa', avatar: 'AC', platform: 'facebook', lastMessage: 'Viu aquele post? 😂', time: '11:40', unread: 1, online: true },
  { id: '5', name: 'Carlos Mendes', avatar: 'CM', platform: 'facebook', lastMessage: 'Partiu jogo amanhã?', time: '10:20', unread: 0, online: false },
  { id: '6', name: 'Mãe', avatar: 'MÃ', platform: 'sms', lastMessage: 'Volta cedo hoje filho', time: '09:15', unread: 0, online: false },
  { id: '7', name: '+55 11 98765-4321', avatar: '??', platform: 'sms', lastMessage: 'Promoção imperdível...', time: '08:30', unread: 1, online: false },
  { id: '8', name: 'Fernanda Lima', avatar: 'FL', platform: 'viber', lastMessage: 'Te liguei agora', time: '14:10', unread: 2, online: true },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', contactId: '1', text: 'Oi, tudo bem?', time: '14:20', sent: false, type: 'text' },
  { id: 'm2', contactId: '1', text: 'Tudo sim! E vc?', time: '14:22', sent: true, type: 'text' },
  { id: 'm3', contactId: '1', text: 'Vou chegar um pouco atrasada', time: '14:25', sent: false, type: 'text' },
  { id: 'm4', contactId: '1', text: '', time: '14:28', sent: false, type: 'audio', duration: '0:32' },
  { id: 'm5', contactId: '1', text: 'Ok, sem problema!', time: '14:30', sent: true, type: 'text' },
  { id: 'm6', contactId: '1', text: 'Tudo bem? Chego em 10 min', time: '14:32', sent: false, type: 'text' },
  { id: 'm7', contactId: '2', text: 'E aí mano', time: '13:40', sent: true, type: 'text' },
  { id: 'm8', contactId: '2', text: 'Olha essa foto', time: '13:45', sent: false, type: 'image' },
  { id: 'm9', contactId: '2', text: 'Kkkk top demais', time: '13:50', sent: true, type: 'text' },
  { id: 'm10', contactId: '4', text: 'Viu aquele post? 😂', time: '11:40', sent: false, type: 'text' },
  { id: 'm11', contactId: '4', text: 'Qual?', time: '11:42', sent: true, type: 'text' },
  { id: 'm12', contactId: '6', text: 'Volta cedo hoje filho', time: '09:15', sent: false, type: 'text' },
  { id: 'm13', contactId: '6', text: 'Tá bom mãe', time: '09:20', sent: true, type: 'text' },
];

// === INPUT LOG ===
export interface InputLogEntry {
  id: string;
  app: string;
  appIcon: string;
  text: string;
  timestamp: string;
  field: string;
}

export const inputLogs: InputLogEntry[] = [
  { id: 'i1', app: 'Chrome', appIcon: '🌐', text: 'como fazer bolo de chocolate', timestamp: '14:35', field: 'Barra de pesquisa' },
  { id: 'i2', app: 'Instagram', appIcon: '📸', text: 'boa foto!!', timestamp: '14:20', field: 'Comentário' },
  { id: 'i3', app: 'WhatsApp', appIcon: '💬', text: 'chego daqui a pouco', timestamp: '14:15', field: 'Chat - Maria Silva' },
  { id: 'i4', app: 'Chrome', appIcon: '🌐', text: 'jogos online grátis', timestamp: '13:50', field: 'Barra de pesquisa' },
  { id: 'i5', app: 'YouTube', appIcon: '▶️', text: 'minecraft tutorial farm', timestamp: '13:30', field: 'Barra de pesquisa' },
  { id: 'i6', app: 'Instagram', appIcon: '📸', text: 'segue de volta?', timestamp: '13:10', field: 'Mensagem Direta' },
  { id: 'i7', app: 'TikTok', appIcon: '🎵', text: 'muito bom esse 🔥', timestamp: '12:45', field: 'Comentário' },
  { id: 'i8', app: 'Chrome', appIcon: '🌐', text: 'tradução inglês para português', timestamp: '12:20', field: 'Barra de pesquisa' },
  { id: 'i9', app: 'WhatsApp', appIcon: '💬', text: 'alguém fez a lição de matemática?', timestamp: '12:05', field: 'Chat - Turma 8B' },
  { id: 'i10', app: 'Google Play', appIcon: '🏪', text: 'free fire', timestamp: '11:30', field: 'Pesquisa de App' },
];

// === NETWORK / WIFI ===
export interface WifiConnection {
  id: string;
  ssid: string;
  bssid: string;
  signalStrength: number;
  security: string;
  connectedAt: string;
  disconnectedAt?: string;
  current: boolean;
  ipAddress: string;
}

export const wifiConnections: WifiConnection[] = [
  { id: 'w1', ssid: 'Casa_Silva_5G', bssid: 'AA:BB:CC:DD:EE:01', signalStrength: 92, security: 'WPA3', connectedAt: '13:00', current: true, ipAddress: '192.168.1.45' },
  { id: 'w2', ssid: 'Escola_Municipal_WiFi', bssid: 'AA:BB:CC:DD:EE:02', signalStrength: 65, security: 'WPA2', connectedAt: '08:50', disconnectedAt: '12:00', current: false, ipAddress: '10.0.0.112' },
  { id: 'w3', ssid: 'McDonalds_Free', bssid: 'AA:BB:CC:DD:EE:03', signalStrength: 40, security: 'Aberta', connectedAt: '12:15', disconnectedAt: '12:35', current: false, ipAddress: '172.16.0.88' },
  { id: 'w4', ssid: 'Casa_Silva_5G', bssid: 'AA:BB:CC:DD:EE:01', signalStrength: 88, security: 'WPA3', connectedAt: '26/03 19:00', disconnectedAt: '26/03 23:30', current: false, ipAddress: '192.168.1.45' },
];

// === FILE EXPLORER ===
export interface RemoteFile {
  id: string;
  name: string;
  type: 'folder' | 'image' | 'video' | 'document' | 'audio';
  size?: string;
  modified: string;
  path: string;
  children?: RemoteFile[];
}

export const remoteFiles: RemoteFile[] = [
  {
    id: 'f1', name: 'DCIM', type: 'folder', modified: '27/03/2026', path: '/DCIM',
    children: [
      { id: 'f1a', name: 'IMG_20260327_1432.jpg', type: 'image', size: '3.2 MB', modified: '27/03/2026 14:32', path: '/DCIM/IMG_20260327_1432.jpg' },
      { id: 'f1b', name: 'IMG_20260327_1105.jpg', type: 'image', size: '2.8 MB', modified: '27/03/2026 11:05', path: '/DCIM/IMG_20260327_1105.jpg' },
      { id: 'f1c', name: 'VID_20260326_2010.mp4', type: 'video', size: '156 MB', modified: '26/03/2026 20:10', path: '/DCIM/VID_20260326_2010.mp4' },
    ],
  },
  {
    id: 'f2', name: 'Downloads', type: 'folder', modified: '27/03/2026', path: '/Downloads',
    children: [
      { id: 'f2a', name: 'trabalho_historia.pdf', type: 'document', size: '1.5 MB', modified: '27/03/2026 10:00', path: '/Downloads/trabalho_historia.pdf' },
      { id: 'f2b', name: 'musica_favorita.mp3', type: 'audio', size: '4.2 MB', modified: '26/03/2026 18:00', path: '/Downloads/musica_favorita.mp3' },
    ],
  },
  {
    id: 'f3', name: 'WhatsApp', type: 'folder', modified: '27/03/2026', path: '/WhatsApp',
    children: [
      { id: 'f3a', name: 'Media', type: 'folder', modified: '27/03/2026', path: '/WhatsApp/Media',
        children: [
          { id: 'f3a1', name: 'IMG-20260327-WA0012.jpg', type: 'image', size: '890 KB', modified: '27/03/2026 13:45', path: '/WhatsApp/Media/IMG-20260327-WA0012.jpg' },
          { id: 'f3a2', name: 'AUD-20260327-WA0005.opus', type: 'audio', size: '245 KB', modified: '27/03/2026 14:28', path: '/WhatsApp/Media/AUD-20260327-WA0005.opus' },
        ],
      },
    ],
  },
  {
    id: 'f4', name: 'Documents', type: 'folder', modified: '26/03/2026', path: '/Documents',
    children: [
      { id: 'f4a', name: 'notas_escola.txt', type: 'document', size: '2 KB', modified: '25/03/2026', path: '/Documents/notas_escola.txt' },
    ],
  },
];

// === CALLS ===
export interface CallRecord {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration: string;
  timestamp: string;
  date: string;
}

export interface Contact {
  id: string;
  name: string;
  number: string;
  email?: string;
  avatar: string;
  favorite: boolean;
}

export const callRecords: CallRecord[] = [
  { id: 'c1', name: 'Mãe', number: '+55 11 91234-5678', type: 'incoming', duration: '5:32', timestamp: '14:10', date: '27/03/2026' },
  { id: 'c2', name: 'João Pedro', number: '+55 11 99876-5432', type: 'outgoing', duration: '12:45', timestamp: '13:00', date: '27/03/2026' },
  { id: 'c3', name: 'Desconhecido', number: '+55 11 97654-3210', type: 'missed', duration: '0:00', timestamp: '11:45', date: '27/03/2026' },
  { id: 'c4', name: 'Pai', number: '+55 11 98765-1234', type: 'outgoing', duration: '3:15', timestamp: '10:30', date: '27/03/2026' },
  { id: 'c5', name: 'Maria Silva', number: '+55 11 91111-2222', type: 'incoming', duration: '8:20', timestamp: '09:00', date: '27/03/2026' },
  { id: 'c6', name: 'Mãe', number: '+55 11 91234-5678', type: 'outgoing', duration: '2:10', timestamp: '22:00', date: '26/03/2026' },
  { id: 'c7', name: 'Escola', number: '+55 11 3333-4444', type: 'incoming', duration: '1:05', timestamp: '16:30', date: '26/03/2026' },
];

export const contacts: Contact[] = [
  { id: 'ct1', name: 'Mãe', number: '+55 11 91234-5678', email: 'mae@email.com', avatar: 'MÃ', favorite: true },
  { id: 'ct2', name: 'Pai', number: '+55 11 98765-1234', email: 'pai@email.com', avatar: 'PA', favorite: true },
  { id: 'ct3', name: 'Maria Silva', number: '+55 11 91111-2222', avatar: 'MS', favorite: true },
  { id: 'ct4', name: 'João Pedro', number: '+55 11 99876-5432', avatar: 'JP', favorite: false },
  { id: 'ct5', name: 'Ana Costa', number: '+55 11 95555-6666', avatar: 'AC', favorite: false },
  { id: 'ct6', name: 'Carlos Mendes', number: '+55 11 94444-7777', avatar: 'CM', favorite: false },
  { id: 'ct7', name: 'Fernanda Lima', number: '+55 11 93333-8888', avatar: 'FL', favorite: false },
  { id: 'ct8', name: 'Escola Municipal', number: '+55 11 3333-4444', avatar: 'EM', favorite: false },
];

// === BROWSER HISTORY ===
export interface BrowserEntry {
  id: string;
  url: string;
  title: string;
  timestamp: string;
  date: string;
  duration: string;
  incognito: boolean;
}

export const browserHistory: BrowserEntry[] = [
  { id: 'b1', url: 'youtube.com/watch?v=abc123', title: 'Minecraft Tutorial - Farm Automática', timestamp: '14:30', date: '27/03/2026', duration: '45 min', incognito: false },
  { id: 'b2', url: 'google.com/search?q=bolo+chocolate', title: 'como fazer bolo de chocolate - Google', timestamp: '14:35', date: '27/03/2026', duration: '2 min', incognito: false },
  { id: 'b3', url: 'tiktok.com/@user/video/123', title: 'TikTok - Vídeo viral', timestamp: '13:10', date: '27/03/2026', duration: '15 min', incognito: false },
  { id: 'b4', url: 'instagram.com/stories', title: 'Instagram Stories', timestamp: '12:50', date: '27/03/2026', duration: '20 min', incognito: false },
  { id: 'b5', url: 'translate.google.com', title: 'Google Translate - EN → PT', timestamp: '12:20', date: '27/03/2026', duration: '5 min', incognito: false },
  { id: 'b6', url: 'reddit.com/r/gaming', title: 'r/gaming - Reddit', timestamp: '11:00', date: '27/03/2026', duration: '30 min', incognito: true },
  { id: 'b7', url: 'wikipedia.org/wiki/Brasil', title: 'Brasil – Wikipédia', timestamp: '10:00', date: '27/03/2026', duration: '8 min', incognito: false },
];

// === APP INVENTORY ===
export interface AppInfo {
  id: string;
  name: string;
  packageName: string;
  version: string;
  size: string;
  installedDate: string;
  lastUsed: string;
  category: string;
  status: 'installed' | 'removed';
  removedDate?: string;
  usageToday: string;
}

export const appInventory: AppInfo[] = [
  { id: 'a1', name: 'WhatsApp', packageName: 'com.whatsapp', version: '2.26.3.14', size: '210 MB', installedDate: '15/01/2026', lastUsed: '14:32', category: 'Comunicação', status: 'installed', usageToday: '1h 45min' },
  { id: 'a2', name: 'Instagram', packageName: 'com.instagram.android', version: '326.0.0', size: '350 MB', installedDate: '15/01/2026', lastUsed: '13:40', category: 'Social', status: 'installed', usageToday: '55min' },
  { id: 'a3', name: 'TikTok', packageName: 'com.zhiliaoapp.musically', version: '34.5.2', size: '420 MB', installedDate: '20/02/2026', lastUsed: '12:45', category: 'Entretenimento', status: 'installed', usageToday: '38min' },
  { id: 'a4', name: 'YouTube', packageName: 'com.google.android.youtube', version: '19.12.36', size: '280 MB', installedDate: '15/01/2026', lastUsed: '12:20', category: 'Entretenimento', status: 'installed', usageToday: '1h 15min' },
  { id: 'a5', name: 'Chrome', packageName: 'com.android.chrome', version: '123.0.6312', size: '190 MB', installedDate: '15/01/2026', lastUsed: '14:35', category: 'Navegação', status: 'installed', usageToday: '22min' },
  { id: 'a6', name: 'Free Fire', packageName: 'com.dts.freefireth', version: '1.104.1', size: '1.2 GB', installedDate: '10/03/2026', lastUsed: '26/03 21:00', category: 'Jogos', status: 'installed', usageToday: '0min' },
  { id: 'a7', name: 'Telegram', packageName: 'org.telegram.messenger', version: '10.12.0', size: '95 MB', installedDate: '01/02/2026', lastUsed: '25/03', category: 'Comunicação', status: 'removed', removedDate: '26/03/2026', usageToday: '0min' },
  { id: 'a8', name: 'VPN Master', packageName: 'com.vpn.master', version: '4.5.1', size: '45 MB', installedDate: '25/03/2026', lastUsed: '25/03', category: 'Ferramentas', status: 'removed', removedDate: '26/03/2026', usageToday: '0min' },
];

// === ALERTS / WATCHLIST ===
export interface KeywordAlert {
  id: string;
  keyword: string;
  source: string;
  context: string;
  timestamp: string;
  date: string;
  severity: 'low' | 'medium' | 'high';
  read: boolean;
}

export interface WatchlistKeyword {
  id: string;
  keyword: string;
  active: boolean;
  createdAt: string;
  matchCount: number;
}

export const keywordAlerts: KeywordAlert[] = [
  { id: 'ka1', keyword: 'droga', source: 'WhatsApp - Turma 8B', context: '...alguém falou sobre droga na escola...', timestamp: '13:15', date: '27/03/2026', severity: 'high', read: false },
  { id: 'ka2', keyword: 'fugir', source: 'SMS - João Pedro', context: '...bora fugir da aula amanhã...', timestamp: '12:30', date: '27/03/2026', severity: 'high', read: false },
  { id: 'ka3', keyword: 'senha', source: 'Chrome - Pesquisa', context: '...como descobrir senha do wifi...', timestamp: '11:00', date: '27/03/2026', severity: 'medium', read: true },
  { id: 'ka4', keyword: 'VPN', source: 'Google Play - Pesquisa', context: '...VPN grátis para celular...', timestamp: '10:15', date: '26/03/2026', severity: 'medium', read: true },
];

export const watchlistKeywords: WatchlistKeyword[] = [
  { id: 'wk1', keyword: 'droga', active: true, createdAt: '01/03/2026', matchCount: 3 },
  { id: 'wk2', keyword: 'fugir', active: true, createdAt: '01/03/2026', matchCount: 1 },
  { id: 'wk3', keyword: 'senha', active: true, createdAt: '05/03/2026', matchCount: 5 },
  { id: 'wk4', keyword: 'VPN', active: true, createdAt: '10/03/2026', matchCount: 2 },
  { id: 'wk5', keyword: 'nude', active: true, createdAt: '01/03/2026', matchCount: 0 },
  { id: 'wk6', keyword: 'arma', active: true, createdAt: '01/03/2026', matchCount: 0 },
];
