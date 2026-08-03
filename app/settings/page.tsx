'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Bell,
  Palette,
  Lock,
  Globe,
  Eye,
  Moon,
  Sun,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [notifications, setNotifications] = useState({
    verifications: true,
    tampering: true,
    reports: true,
    updates: false,
  });
  const [language, setLanguage] = useState('en');

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your OCULIZ experience
          </p>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Theme Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Theme
              </CardTitle>
              <CardDescription>
                Choose your preferred appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'light', label: 'Light', icon: Sun },
                  { id: 'dark', label: 'Dark', icon: Moon },
                  { id: 'system', label: 'System', icon: Globe },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id as any)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      theme === id
                        ? 'border-primary bg-primary/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">{label}</p>
                  </button>
                ))}
              </div>
              <Button>Save Theme</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Manage what notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  id: 'verifications',
                  label: 'Verification Alerts',
                  description: 'Get notified when images are verified',
                },
                {
                  id: 'tampering',
                  label: 'Tampering Detected',
                  description: 'Alert when tampering is detected in images',
                },
                {
                  id: 'reports',
                  label: 'Report Generation',
                  description: 'Notify when reports are ready',
                },
                {
                  id: 'updates',
                  label: 'Product Updates',
                  description: 'New features and improvements',
                },
              ].map(({ id, label, description }) => (
                <div key={id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {description}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications[id as keyof typeof notifications]}
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          [id]: e.target.checked,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>

          {/* Language Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Language & Region
              </CardTitle>
              <CardDescription>
                Set your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Timezone</label>
                <select
                  defaultValue="utc"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                >
                  <option value="utc">UTC</option>
                  <option value="est">EST (UTC-5)</option>
                  <option value="cst">CST (UTC-6)</option>
                  <option value="mst">MST (UTC-7)</option>
                  <option value="pst">PST (UTC-8)</option>
                </select>
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your data and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Profile Visibility</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Make your profile visible to others
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Data Collection</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Allow usage analytics for improvements
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Two-Factor Authentication</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </div>

              <Button>Manage Sessions</Button>
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure API endpoint and rate limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">API Endpoint</label>
                <input
                  type="text"
                  defaultValue="https://api.oculiz.io/v1"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rate Limit</label>
                <select
                  defaultValue="1000"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                >
                  <option value="100">100 requests/min</option>
                  <option value="1000">1,000 requests/min</option>
                  <option value="10000">10,000 requests/min</option>
                </select>
              </div>

              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
