'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Zap,
  Upload,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Settings,
  Shield,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoInteraction } from '@/components/brand/logo-interaction';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Zap, label: 'Generate Image', href: '/generate' },
  { icon: Upload, label: 'Register Image', href: '/register-image' },
  { icon: CheckCircle, label: 'Verify Image', href: '/verify' },
  { icon: Clock, label: 'Image History', href: '/history' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: Shield, label: 'Admin', href: '/admin' },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-background/95 backdrop-blur transition-transform duration-300 md:relative md:translate-x-0 dark:border-slate-800',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full overflow-y-auto scrollbar">
          {/* Header */}
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <LogoInteraction compact />
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded md:hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-3 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-4 py-2.5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-lg shadow-blue-500/20'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  )}
                  onClick={onClose}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-slate-200 p-4 dark:border-slate-800">
            <div className="panel p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">
                Premium Plan Active
              </p>
              <p className="text-sm font-semibold text-primary">
                Unlimited Verifications
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
