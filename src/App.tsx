import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import Index from "./pages/Index";
import Organizations from "./pages/Organizations";
import Services from "./pages/Services";
import Features from "./pages/Features";
import Customers from "./pages/Customers";
import Events from "./pages/Events";
import Sessions from "./pages/Sessions";
import Analytics from "./pages/Analytics";
import AccessControl from "./pages/AccessControl";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            {/* Keyboard Shortcuts Handler */}
            <KeyboardShortcuts />
            
            <div className="min-h-screen flex w-full bg-background">
              {/* Enhanced Sidebar */}
              <AppSidebar />
              
              {/* Main Content Area with smooth transitions */}
              <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
                {/* Enhanced Navbar */}
                <Navbar 
                  onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  isMobileMenuOpen={isMobileMenuOpen}
                />
                
                {/* Page Content with better spacing */}
                <main className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20">
                  <div className="h-full">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/organizations" element={<Organizations />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/sessions" element={<Sessions />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/access" element={<AccessControl />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
