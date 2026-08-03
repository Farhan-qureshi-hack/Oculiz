'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertTriangle,
  Calendar,
} from 'lucide-react';

const monthlyData = [
  { month: 'Jan', protected: 40, verified: 20, tampered: 2 },
  { month: 'Feb', protected: 50, verified: 35, tampered: 1 },
  { month: 'Mar', protected: 65, verified: 45, tampered: 3 },
  { month: 'Apr', protected: 80, verified: 65, tampered: 2 },
  { month: 'May', protected: 95, verified: 85, tampered: 4 },
  { month: 'Jun', protected: 120, verified: 110, tampered: 1 },
];

const statusData = [
  { name: 'Authentic', value: 234, color: '#00c853' },
  { name: 'Modified', value: 8, color: '#ff6f00' },
  { name: 'Unverified', value: 5, color: '#757575' },
];

const sourceData = [
  { source: 'DALL-E', count: 45 },
  { source: 'Midjourney', count: 38 },
  { source: 'Flux', count: 32 },
  { source: 'Stable Diffusion', count: 28 },
  { source: 'Other', count: 19 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6m');

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary" />
              Analytics
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive insights about your protected images
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Protected
                  </p>
                  <p className="text-3xl font-bold">247</p>
                  <p className="text-xs text-emerald-400 mt-2">↑ 12% from last month</p>
                </div>
                <Shield className="w-6 h-6 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Verified
                  </p>
                  <p className="text-3xl font-bold">1,204</p>
                  <p className="text-xs text-emerald-400 mt-2">↑ 23% from last month</p>
                </div>
                <CheckCircle className="w-6 h-6 text-secondary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Tampering Detected
                  </p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs text-emerald-400 mt-2">↓ 2 from last month</p>
                </div>
                <AlertTriangle className="w-6 h-6 text-red-400 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold">98.8%</p>
                  <p className="text-xs text-emerald-400 mt-2">↑ 0.3% from last month</p>
                </div>
                <TrendingUp className="w-6 h-6 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Chart */}
          <Card className="card-elevated lg:col-span-2">
            <CardHeader>
              <CardTitle>Protection & Verification Trends</CardTitle>
              <CardDescription>Monthly overview of your activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="protected" fill="#0099ff" name="Protected" />
                  <Bar dataKey="verified" fill="#00d9ff" name="Verified" />
                  <Bar dataKey="tampered" fill="#ff6f00" name="Tampered" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
              <CardDescription>Distribution of image status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(20, 24, 41, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {statusData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Source Distribution */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Image Sources</CardTitle>
            <CardDescription>
              Distribution of protected images by source model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={sourceData}
                margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                <YAxis
                  dataKey="source"
                  type="category"
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(20, 24, 41, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="count" fill="#0099ff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Metrics */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Average Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm">Avg. Verifications per Image</span>
                <span className="font-bold text-lg">4.9</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm">Avg. Protection Confidence</span>
                <span className="font-bold text-lg">97.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm">Avg. File Size</span>
                <span className="font-bold text-lg">2.4 MB</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-sm">Avg. Processing Time</span>
                <span className="font-bold text-lg">1.2 sec</span>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Usage Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Peak Activity Hour</span>
                  <span className="font-bold">14:00 UTC</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Most Active Day</span>
                  <span className="font-bold">Tuesday</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Most Used Feature</span>
                  <span className="font-bold">Verify (45%)</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-bold">4.2 GB / 100 GB</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className="bg-primary h-full rounded-full"
                    style={{ width: '4.2%' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
