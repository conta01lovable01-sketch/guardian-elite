import { Shield, LayoutDashboard, MapPin, CalendarClock, FileText, HardDrive } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Localização', url: '/location', icon: MapPin },
  { title: 'Agendamento', url: '/schedule', icon: CalendarClock },
  { title: 'Logs', url: '/logs', icon: FileText },
  { title: 'Arquivos Offline', url: '/offline', icon: HardDrive },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

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

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
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
