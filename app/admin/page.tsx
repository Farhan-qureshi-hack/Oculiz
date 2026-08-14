'use client';

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
                  <p className="text-3xl font-bold">1,234</p>
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
                  <p className="text-3xl font-bold">45,678</p>
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
                  <p className="text-3xl font-bold">234K</p>
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
              Current health of platform services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'API Server', status: 'Online', uptime: '99.9%' },
              { name: 'Database', status: 'Online', uptime: '99.99%' },
              { name: 'Image Processing', status: 'Online', uptime: '99.5%' },
              { name: 'Verification Engine', status: 'Online', uptime: '99.8%' },
            ].map((service, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Uptime: {service.uptime}
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
              {[
                { action: 'User Registration', user: 'alice@example.com', time: '5 min ago' },
                { action: 'Image Protected', user: 'bob@example.com', time: '12 min ago' },
                { action: 'Verification', user: 'charlie@example.com', time: '23 min ago' },
                { action: 'Report Downloaded', user: 'diana@example.com', time: '1 hour ago' },
              ].map((item, i) => (
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
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">High API Usage</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      API requests at 85% of daily limit
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Backup Completed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Daily backup completed successfully
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full">View All Alerts</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
