import {
  Shield, LayoutDashboard, MapPin, CalendarClock, FileText, HardDrive,
  MessageSquare, Keyboard, MonitorPlay, Globe, FolderOpen, Phone, Bell, Settings,
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

const mainNav = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Localização', url: '/location', icon: MapPin },
  { title: 'Agendamento', url: '/schedule', icon: CalendarClock },
  { title: 'Logs', url: '/logs', icon: FileText },
  { title: 'Arquivos Offline', url: '/offline', icon: HardDrive },
];

const commsNav = [
  { title: 'Mensagens', url: '/messages', icon: MessageSquare },
  { title: 'Input Log', url: '/input-log', icon: Keyboard },
];

const surveillanceNav = [
  { title: 'Live Stream', url: '/livestream', icon: MonitorPlay },
];

const dataNav = [
  { title: 'Explorador de Arquivos', url: '/file-explorer', icon: FolderOpen },
  { title: 'Chamadas & Contatos', url: '/calls', icon: Phone },
  { title: 'Navegação & Apps', url: '/browser-history', icon: Globe },
];

const systemNav = [
  { title: 'Alertas Críticos', url: '/alerts', icon: Bell },
  { title: 'Configuração', url: '/setup', icon: Settings },
];

const NavSection = ({ label, items, collapsed }: { label: string; items: typeof mainNav; collapsed: boolean }) => (
  <SidebarGroup>
    {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-3">{label}</SidebarGroupLabel>}
    <SidebarGroupContent>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <NavLink
                to={item.url}
                end={item.url === '/'}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 hover:bg-secondary text-muted-foreground hover:text-foreground"
                activeClassName="bg-secondary text-primary font-medium glow-gold"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="flex items-center justify-center h-9 w-9 rounded-lg gold-gradient shrink-0">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-sm font-bold gold-text tracking-wide">GUARDIAN ELITE</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest">PRO</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <div className="pt-4 space-y-1">
            <NavSection label="Principal" items={mainNav} collapsed={collapsed} />
            <NavSection label="Comunicação" items={commsNav} collapsed={collapsed} />
            <NavSection label="Vigilância" items={surveillanceNav} collapsed={collapsed} />
            <NavSection label="Dados & Arquivos" items={dataNav} collapsed={collapsed} />
            <NavSection label="Sistema" items={systemNav} collapsed={collapsed} />
          </div>
        </ScrollArea>
      </SidebarContent>

      {!collapsed && (
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse-gold" />
            <span>Sistema Ativo</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">v3.2.1 Premium</p>
        </div>
      )}
    </Sidebar>
  );
}
