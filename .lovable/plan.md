

# Guardian Elite Pro — Plataforma de Monitoramento Parental Premium

## Visão Geral
Aplicativo de monitoramento parental com estética de luxo corporativo, paleta Azul Marinho (#001B3D) + Dourado Metálico (#C5A059), simulando um centro de inteligência profissional.

## Design System
- Cores primárias: Azul Marinho Profundo (#001B3D) e Dourado Metálico (#C5A059)
- Tipografia moderna e limpa (Inter/sistema)
- Botões com hover dourado, transições suaves, cards com bordas sutis douradas
- Ícones Lucide-React (Shield, Camera, Mic, MapPin, Battery, Wifi, etc.)

## Estrutura de Páginas

### 1. Layout Principal com Sidebar Premium
- Menu lateral elegante com logo "Guardian Elite Pro" + ícone Shield dourado
- Navegação: Dashboard, Localização, Agendamento, Logs, Arquivos Offline
- Header com status do dispositivo: Bateria, Sinal de Rede, Versão do Sistema
- Sidebar colapsável com animações suaves

### 2. Dashboard de Comando (página principal)
- **Screen Mirroring**: Componente central simulando espelhamento de tela em tempo real (mock com animação)
- **Controles de Câmera/Áudio**: Botões estilizados para "Escuta Ambiente" e "Live Camera" (Frontal/Traseira) com estados ativo/inativo
- **Cards de resumo**: Localização atual, apps ativos, alertas recentes
- **Notificações críticas**: Toast/banner quando dispositivo sai da Zona Segura

### 3. Módulo de Localização
- Mapa interativo (Leaflet — gratuito, sem API key) com localização GPS simulada
- Histórico de rotas com timeline
- Geofencing: zonas seguras desenhadas no mapa com alertas visuais

### 4. Agendamento Inteligente
- Interface para programar gravações de áudio/vídeo
- Seletor de data/hora (Shadcn DatePicker + time picker)
- Seletor de duração, tipo (áudio/vídeo), recorrência
- Lista de agendamentos com status (ativo, concluído, pendente)

### 5. Logs de Atividade
- Tabela premium com filtros: Apps abertos, Mensagens recebidas, Alertas de geofencing
- Badges coloridos por tipo de atividade
- Busca e ordenação

### 6. Arquivos Offline
- Grid/lista de gravações com thumbnails simulados
- Status: "Sincronizado" (verde) ou "Pendente" (amarelo)
- Metadados: data, duração, tipo, tamanho

## Dados
- Dados mock realistas para todas as seções (localização, logs, agendamentos, arquivos)
- Estrutura preparada para integração Supabase (tipos e hooks definidos)
- Sistema de notificações simulado com toasts premium

## Componentes-Chave
- `DeviceStatusBar` — bateria, rede, versão do sistema
- `ScreenMirror` — simulação de espelhamento
- `CameraAudioControls` — botões de escuta/câmera
- `LocationMap` — mapa com Leaflet + geofencing
- `ScheduleManager` — agendamento de gravações
- `ActivityLog` — tabela de logs
- `OfflineFiles` — arquivos com status de sync
- `SafeZoneAlert` — notificações de zona segura

