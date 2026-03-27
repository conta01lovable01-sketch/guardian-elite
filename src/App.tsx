import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DeviceStatusBar from "@/components/DeviceStatusBar";
import Index from "./pages/Index";
import LocationPage from "./pages/LocationPage";
import SchedulePage from "./pages/SchedulePage";
import LogsPage from "./pages/LogsPage";
import OfflinePage from "./pages/OfflinePage";
import MessagesPage from "./pages/MessagesPage";
import InputLogPage from "./pages/InputLogPage";
import LiveStreamPage from "./pages/LiveStreamPage";
import NetworkPage from "./pages/NetworkPage";
import FileExplorerPage from "./pages/FileExplorerPage";
import CallsPage from "./pages/CallsPage";
import BrowserHistoryPage from "./pages/BrowserHistoryPage";
import AlertsPage from "./pages/AlertsPage";
import SetupGuidePage from "./pages/SetupGuidePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DeviceStatusBar />
        <header className="h-10 flex items-center border-b border-border px-2">
          <SidebarTrigger className="text-muted-foreground hover:text-primary" />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/location" element={<AppLayout><LocationPage /></AppLayout>} />
          <Route path="/schedule" element={<AppLayout><SchedulePage /></AppLayout>} />
          <Route path="/logs" element={<AppLayout><LogsPage /></AppLayout>} />
          <Route path="/offline" element={<AppLayout><OfflinePage /></AppLayout>} />
          <Route path="/messages" element={<AppLayout><MessagesPage /></AppLayout>} />
          <Route path="/input-log" element={<AppLayout><InputLogPage /></AppLayout>} />
          <Route path="/livestream" element={<AppLayout><LiveStreamPage /></AppLayout>} />
          <Route path="/network" element={<AppLayout><NetworkPage /></AppLayout>} />
          <Route path="/file-explorer" element={<AppLayout><FileExplorerPage /></AppLayout>} />
          <Route path="/calls" element={<AppLayout><CallsPage /></AppLayout>} />
          <Route path="/browser-history" element={<AppLayout><BrowserHistoryPage /></AppLayout>} />
          <Route path="/alerts" element={<AppLayout><AlertsPage /></AppLayout>} />
          <Route path="/setup" element={<AppLayout><SetupGuidePage /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
