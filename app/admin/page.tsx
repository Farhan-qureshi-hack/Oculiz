'use client';

import useSWR from 'swr';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Users,
  FileText,
  BarChart3,
  AlertTriangle,
  Check,
  Clock,
} from 'lucide-react';

export default function AdminPage() {
  const { data: health } = useSWR<{ ok: boolean; database: string; encryption: string }>('/api/health', (url: string) => fetch(url).then((response) => response.json()))
  const { data: assets } = useSWR<{ assets: unknown[] }>('/api/assets', (url: string) => fetch(url).then((response) => response.json()))
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            System administration and monitoring
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold">—</p>
                </div>
                <Users className="w-6 h-6 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Images
                  </p>
                  <p className="text-3xl font-bold">{assets ? assets.assets.length : '—'}</p>
                </div>
                <FileText className="w-6 h-6 text-secondary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    API Calls
                  </p>
                  <p className="text-3xl font-bold">—</p>
                </div>
                <BarChart3 className="w-6 h-6 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Alerts
                  </p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <AlertTriangle className="w-6 h-6 text-red-400 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Live health is available from the backend health endpoint; historical uptime is not collected yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'API Server', status: health?.ok ? 'Online' : 'Unavailable', uptime: 'Live check' },
              { name: 'Database', status: health?.database === 'connected' ? 'Connected' : 'Unavailable', uptime: 'Live check' },
              { name: 'Image Processing', status: 'Available', uptime: 'No uptime history' },
              { name: 'Verification Engine', status: 'Available', uptime: 'No uptime history' },
            ].map((service, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Historical uptime: not collected
                  </p>
                </div>
                <Badge variant="success">
                  <Check className="w-3 h-3 mr-1" />
                  {service.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Recent User Activities</CardTitle>
              <CardDescription>Latest user actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">No activity feed is connected. No sample users or events are shown.</p>
              {([] as Array<{ action: string; user: string; time: string }>).map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Active system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">No alert feed is connected. No synthetic incidents or backup claims are shown.</p>

            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
