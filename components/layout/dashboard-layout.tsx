'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="shell-grid flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          showMenu={true}
        />
        <main className="dashboard-page flex-1 overflow-y-auto scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
