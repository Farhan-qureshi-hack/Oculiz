'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LogoInteraction } from '@/components/brand/logo-interaction';

interface HeaderProps {
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export function Header({ onMenuClick, showMenu = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-background/90 backdrop-blur dark:border-slate-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {showMenu && (
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <LogoInteraction compact />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
          <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
