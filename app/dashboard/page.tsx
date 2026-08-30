'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Zap,
  Upload,
  Eye,
  Download,
  Share2,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const chartData: Array<{ month: string; verified: number; protected: number }> = [
  { month: 'Jan', verified: 40, protected: 24 },
  { month: 'Feb', verified: 50, protected: 35 },
  { month: 'Mar', verified: 65, protected: 45 },
  { month: 'Apr', verified: 80, protected: 65 },
  { month: 'May', verified: 95, protected: 85 },
  { month: 'Jun', verified: 120, protected: 110 },
];

const recentActivities: Array<{ id: number; type: string; title: string; description: string; timestamp: string; status: string }> = [
  {
    id: 1,
    type: 'verified',
    title: 'Verified Image Ownership',
    description: 'Image "sunset_landscape.png" verified successfully',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    id: 2,
    type: 'protected',
    title: 'Protected New Image',
    description: 'Image "abstract_art.jpg" protected with steganography',
    timestamp: '4 hours ago',
    status: 'success',
  },
  {
    id: 3,
    type: 'tampered',
    title: 'Tampering Detected',
    description: 'Image "modified_photo.png" shows signs of modification',
    timestamp: '1 day ago',
    status: 'warning',
  },
  {
    id: 4,
    type: 'generated',
    title: 'Generated AI Image',
    description: 'New image generated from prompt "futuristic city"',
    timestamp: '2 days ago',
    status: 'success',
  },
  {
    id: 5,
    type: 'verified',
    title: 'Batch Verification',
    description: '10 images verified in batch process',
    timestamp: '3 days ago',
    status: 'success',
  },
];

const recentProtectedImages = [
  {
    id: 1,
    name: 'Futuristic City',
    size: '2.4 MB',
    status: 'Protected',
    date: '2 hours ago',
    verified: 3,
  },
  {
    id: 2,
    name: 'Abstract Art',
    size: '1.8 MB',
    status: 'Protected',
    date: '4 hours ago',
    verified: 1,
  },
  {
    id: 3,
    name: 'Landscape',
    size: '3.2 MB',
    status: 'Protected',
    date: '1 day ago',
    verified: 5,
  },
];

const stats = [
  {
    icon: Shield,
    label: 'Protected Images',
    value: '247',
    change: '+12%',
    positive: true,
  },
  {
    icon: CheckCircle,
    label: 'Verifications',
    value: '1,204',
    change: '+23%',
    positive: true,
  },
  {
    icon: AlertTriangle,
    label: 'Tampering Detected',
    value: '3',
    change: '-2%',
    positive: true,
  },
  {
    icon: TrendingUp,
    label: 'API Calls',
    value: '18,432',
    change: '+8%',
    positive: true,
  },
];

export default function DashboardPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6m');
  const { data: registry, error: registryError } = useSWR<{ assets: Array<{ status: string }> }>('/api/assets', (url: string) => fetch(url).then((response) => response.json()))
  const protectedCount = registry?.assets.filter((asset) => asset.status === 'protected').length ?? 0
  const verifiedCount = registry?.assets.filter((asset) => asset.status === 'registered').length ?? 0
  const visibleRecentActivities: Array<{ id: number; title: string; description: string; status: string; timestamp: string }> = registry ? [] : []
  const visibleProtectedImages: Array<{ id: number; name: string; size: string; verified: number }> = registry ? [] : []

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {registryError && <Card className="border-destructive/30 bg-destructive/10"><CardContent className="p-4 text-sm text-destructive">Live registry metrics are unavailable. No fabricated totals are shown for unavailable data.</CardContent></Card>}
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Live registry and verification summary. Values appear only when the backend returns them.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/generate">
                <Zap className="w-4 h-4 mr-2" />
                Generate Image
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                <Upload className="w-4 h-4 mr-2" />
                Upload & Protect
              </Link>
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="card-base">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <Icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.label === 'Protected Images' ? protectedCount : stat.label === 'Verifications' ? verifiedCount : '—'}</div>
                  <div className="flex items-center gap-1 text-xs mt-2">
                    <ArrowUpRight className="w-3 h-3 text-muted-foreground" />
                    <span className={stat.positive ? 'text-emerald-400' : 'text-red-400'}>
                      {registry ? 'Live' : 'Unavailable'}
                    </span>
                    <span className="text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity Overview</CardTitle>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="px-3 py-1 text-sm bg-input border border-border rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="1m">Last Month</option>
                  <option value="3m">Last 3 Months</option>
                  <option value="6m">Last 6 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={registry ? [] : []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(20, 24, 41, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="verified" fill="#0099ff" />
                  <Bar dataKey="protected" fill="#00d9ff" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage Used</span>
                  <span className="font-medium">Not collected</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '4.2%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">API Requests</span>
                  <span className="font-medium">Not collected</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-secondary h-full" style={{ width: '12.34%' }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Verifications</span>
                  <span className="font-medium">{registry ? `${verifiedCount} registered` : 'Not collected'}</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div className="bg-accent h-full" style={{ width: '95%' }}></div>
                </div>
              </div>

              <div className="pt-4"><p className="text-xs text-muted-foreground">Usage limits and billing are not connected.</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activities List */}
          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Your latest image protection and verification activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visibleRecentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      activity.status === 'success'
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Protected Images */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Protected Images</CardTitle>
              <CardDescription>Your most recent images</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {visibleProtectedImages.map((image) => (
                <div
                  key={image.id}
                  className="p-3 rounded-lg border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {image.name}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {image.size}
                      </p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <Badge variant="success" className="text-xs">
                      Protected
                    </Badge>
                    <span className="text-muted-foreground">
                      {image.verified} verified
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/history">View All</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="card-elevated bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 border-primary/30">
          <CardContent className="pt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-2">Upgrade to Professional</h3>
                <p className="text-muted-foreground">
                  Get unlimited API calls, advanced analytics, and priority support.
                </p>
              </div>
              <Button className="whitespace-nowrap">
                Upgrade Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
