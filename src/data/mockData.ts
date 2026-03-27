export interface ActivityLog {
  id: string;
  type: 'app' | 'message' | 'geofence';
  title: string;
  detail: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface OfflineFile {
  id: string;
  name: string;
  type: 'audio' | 'video';
  duration: string;
  size: string;
  date: string;
  status: 'synced' | 'pending';
}

export interface ScheduleItem {
  id: string;
  type: 'audio' | 'video';
  date: string;
  time: string;
  duration: string;
  recurrence: 'once' | 'daily' | 'weekly';
  status: 'active' | 'completed' | 'pending';
}

export interface LocationPoint {
  lat: number;
  lng: number;
  time: string;
  label: string;
}

export const deviceStatus = {
  battery: 73,
  signal: 'LTE',
  signalStrength: 4,
  systemVersion: 'Android 14',
  deviceName: 'Samsung Galaxy S24',
  lastSync: '2 min atrás',
  isOnline: true,
};

export const activityLogs: ActivityLog[] = [
  { id: '1', type: 'app', title: 'WhatsApp', detail: 'Aberto por 45 min', timestamp: '14:32', severity: 'info' },
  { id: '2', type: 'message', title: 'SMS Recebido', detail: '+55 11 9****-8832', timestamp: '14:18', severity: 'info' },
  { id: '3', type: 'geofence', title: 'Saiu da Zona Segura', detail: 'Escola Municipal - Perímetro excedido', timestamp: '13:55', severity: 'critical' },
  { id: '4', type: 'app', title: 'Instagram', detail: 'Aberto por 22 min', timestamp: '13:40', severity: 'info' },
  { id: '5', type: 'app', title: 'YouTube', detail: 'Aberto por 1h 15min', timestamp: '12:20', severity: 'warning' },
  { id: '6', type: 'message', title: 'WhatsApp - Grupo', detail: '"Turma 8B" - 12 mensagens', timestamp: '12:05', severity: 'info' },
  { id: '7', type: 'geofence', title: 'Entrou na Zona Segura', detail: 'Residência - Retornou ao perímetro', timestamp: '11:30', severity: 'info' },
  { id: '8', type: 'app', title: 'TikTok', detail: 'Aberto por 38 min', timestamp: '10:45', severity: 'warning' },
  { id: '9', type: 'message', title: 'SMS Enviado', detail: 'Para: Mãe', timestamp: '10:20', severity: 'info' },
  { id: '10', type: 'app', title: 'Chrome', detail: 'Navegação por 15 min', timestamp: '09:50', severity: 'info' },
];

export const offlineFiles: OfflineFile[] = [
  { id: '1', name: 'Gravação Ambiente - Sala', type: 'audio', duration: '15:32', size: '12.4 MB', date: '27/03/2026 14:00', status: 'synced' },
  { id: '2', name: 'Câmera Frontal - Captura', type: 'video', duration: '02:15', size: '45.8 MB', date: '27/03/2026 13:30', status: 'synced' },
  { id: '3', name: 'Gravação Ambiente - Externo', type: 'audio', duration: '08:47', size: '7.1 MB', date: '27/03/2026 12:00', status: 'pending' },
  { id: '4', name: 'Câmera Traseira - Ambiente', type: 'video', duration: '05:03', size: '98.2 MB', date: '27/03/2026 11:15', status: 'pending' },
  { id: '5', name: 'Gravação Agendada - Noturna', type: 'audio', duration: '30:00', size: '24.6 MB', date: '26/03/2026 23:00', status: 'synced' },
  { id: '6', name: 'Câmera Frontal - Verificação', type: 'video', duration: '01:00', size: '18.3 MB', date: '26/03/2026 20:00', status: 'synced' },
];

export const scheduleItems: ScheduleItem[] = [
  { id: '1', type: 'audio', date: '27/03/2026', time: '18:00', duration: '15 min', recurrence: 'daily', status: 'active' },
  { id: '2', type: 'video', date: '27/03/2026', time: '20:00', duration: '5 min', recurrence: 'once', status: 'pending' },
  { id: '3', type: 'audio', date: '28/03/2026', time: '08:00', duration: '30 min', recurrence: 'weekly', status: 'active' },
  { id: '4', type: 'audio', date: '26/03/2026', time: '23:00', duration: '30 min', recurrence: 'daily', status: 'completed' },
];

export const routeHistory: LocationPoint[] = [
  { lat: -23.5505, lng: -46.6333, time: '08:00', label: 'Residência' },
  { lat: -23.5475, lng: -46.6361, time: '08:25', label: 'Ponto de Ônibus' },
  { lat: -23.5430, lng: -46.6400, time: '08:50', label: 'Escola Municipal' },
  { lat: -23.5430, lng: -46.6400, time: '12:00', label: 'Escola Municipal (Saída)' },
  { lat: -23.5460, lng: -46.6380, time: '12:30', label: 'Praça Central' },
  { lat: -23.5505, lng: -46.6333, time: '13:00', label: 'Residência' },
];

export const safeZones = [
  { name: 'Residência', center: { lat: -23.5505, lng: -46.6333 }, radius: 200 },
  { name: 'Escola Municipal', center: { lat: -23.5430, lng: -46.6400 }, radius: 300 },
];
