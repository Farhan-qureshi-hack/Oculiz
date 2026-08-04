'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface LandingHeaderProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export function LandingHeader({ isOpen = false, onToggle }: LandingHeaderProps) {
  return (
    <header className="card sticky top-0 z-40 border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400 hidden sm:inline">
            OCULIZ
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button size="sm" className="hidden sm:flex" asChild>
            <Link href="/register">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={onToggle}
            className="md:hidden p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-700 px-4 py-4 space-y-4">
          <a
            href="#features"
            className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="block text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            FAQ
          </a>
          <Button size="sm" className="w-full" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
