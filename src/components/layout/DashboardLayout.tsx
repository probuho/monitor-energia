import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, BarChart3, Zap, TrendingUp, FileText, LogOut, User, Activity } from 'lucide-react';
import SidebarSimulator from '@/components/dashboard/SidebarSimulator';
import '@/styles/layout-fixes.css';

// Componente principal del layout del dashboard
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para manejar el logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Función para cerrar el sidebar en dispositivos móviles
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <SidebarProvider>
          <div className="flex h-screen bg-background overflow-hidden dashboard-layout">
        {/* Sidebar para desktop */}
        <Sidebar id="sidebar" className="hidden lg:flex flex-shrink-0 dashboard-sidebar">
        <SidebarHeader className="border-b border-border p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Monitor Energía</h2>
              <p className="text-sm text-muted-foreground">Sistema de Consumo</p>
            </div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="flex-1 p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/dashboard')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/consumo')}>
                  <Activity className="w-4 h-4 mr-2" />
                  Consumo
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/analisis')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Análisis
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button variant="ghost" className="w-full justify-start bg-cyan-50 hover:bg-cyan-100 text-cyan-700 hover:text-cyan-800 border-cyan-200" onClick={() => navigate('/informacion')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Información
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        
        {/* Simulador integrado */}
        <SidebarSimulator 
          onDataUpdate={() => {}} 
          consumosActuales={[]} 
        />

        {/* Información del usuario y logout */}
        <div className="border-t border-border p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{usuario?.nombre}</p>
              <p className="text-xs text-muted-foreground truncate">{usuario?.email}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </Sidebar>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden w-full dashboard-content-wrapper">
        {/* Header móvil */}
        <header className="lg:hidden border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold">Monitor Energía</h1>
            </div>
            
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar className="w-full">
                  <SidebarHeader className="border-b border-border p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Monitor Energía</h2>
                        <p className="text-sm text-muted-foreground">Sistema de Consumo</p>
                      </div>
                    </div>
                  </SidebarHeader>
                  
                  <SidebarContent className="flex-1 p-4">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Button variant="ghost" className="w-full justify-start" onClick={() => { navigate('/dashboard'); closeSidebar(); }}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Button variant="ghost" className="w-full justify-start">
                            <Activity className="w-4 h-4 mr-2" />
                            Consumo
                          </Button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Button variant="ghost" className="w-full justify-start">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Análisis
                          </Button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Button variant="ghost" className="w-full justify-start bg-cyan-50 hover:bg-cyan-100 text-cyan-700 hover:text-cyan-800 border-cyan-200" onClick={() => { navigate('/informacion'); closeSidebar(); }}>
                            <FileText className="w-4 h-4 mr-2" />
                            Información
                          </Button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarContent>
                  
                  <div className="border-t border-border p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{usuario?.nombre}</p>
                        <p className="text-xs text-muted-foreground truncate">{usuario?.email}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-start" 
                      onClick={() => { handleLogout(); closeSidebar(); }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </Sidebar>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Contenido principal con scroll */}
        <main className="flex-1 overflow-y-auto min-w-0 w-full max-w-none p-6 dashboard-main">
          {children}
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
