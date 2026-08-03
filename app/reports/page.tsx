'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Eye,
  Share2,
  MoreHorizontal,
  Calendar,
  Search,
  Filter,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const reportsData = [
  {
    id: 1,
    title: 'Monthly Verification Report',
    date: '2024-08-03',
    images: 45,
    verifications: 234,
    tampering: 2,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'July Protection Summary',
    date: '2024-07-31',
    images: 52,
    verifications: 198,
    tampering: 1,
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Quarterly Analytics Report',
    date: '2024-07-01',
    images: 142,
    verifications: 625,
    tampering: 4,
    status: 'Completed',
  },
  {
    id: 4,
    title: 'June Activity Report',
    date: '2024-06-30',
    images: 38,
    verifications: 167,
    tampering: 0,
    status: 'Completed',
  },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reportsData.filter((report) =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Reports
          </h1>
          <p className="text-muted-foreground mt-2">
            Access your verification and protection reports
          </p>
        </div>

        {/* Search and Actions */}
        <Card className="card-elevated">
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="card-base">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {report.date}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Images
                        </p>
                        <p className="font-semibold">{report.images}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Verifications
                        </p>
                        <p className="font-semibold">{report.verifications}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Tampering
                        </p>
                        <p className="font-semibold">{report.tampering}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Badge variant="success">{report.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="card-elevated text-center py-12">
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <h3 className="font-semibold">No reports found</h3>
              <p className="text-sm text-muted-foreground">
                Generate a new report to get started
              </p>
              <Button className="mt-4">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
