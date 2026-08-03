'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Download,
  Trash2,
  Eye,
  Share2,
  MoreHorizontal,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const imageHistoryData = [
  {
    id: 1,
    name: 'Futuristic City',
    size: '2.4 MB',
    status: 'Protected',
    date: '2024-08-03',
    verified: 5,
    generated: true,
    thumbnail: 'https://api.placeholder.com/80x80?text=FC',
  },
  {
    id: 2,
    name: 'Abstract Art',
    size: '1.8 MB',
    status: 'Protected',
    date: '2024-08-02',
    verified: 3,
    generated: false,
    thumbnail: 'https://api.placeholder.com/80x80?text=AA',
  },
  {
    id: 3,
    name: 'Landscape',
    size: '3.2 MB',
    status: 'Protected',
    date: '2024-08-01',
    verified: 8,
    generated: true,
    thumbnail: 'https://api.placeholder.com/80x80?text=LS',
  },
  {
    id: 4,
    name: 'Portrait',
    size: '2.1 MB',
    status: 'Verified',
    date: '2024-07-31',
    verified: 2,
    generated: true,
    thumbnail: 'https://api.placeholder.com/80x80?text=PT',
  },
  {
    id: 5,
    name: 'Space Scene',
    size: '4.1 MB',
    status: 'Protected',
    date: '2024-07-30',
    verified: 12,
    generated: false,
    thumbnail: 'https://api.placeholder.com/80x80?text=SS',
  },
  {
    id: 6,
    name: 'Nature',
    size: '2.8 MB',
    status: 'Protected',
    date: '2024-07-29',
    verified: 1,
    generated: true,
    thumbnail: 'https://api.placeholder.com/80x80?text=NR',
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const itemsPerPage = 6;
  const filteredData = imageHistoryData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'protected' && item.status === 'Protected') ||
      (selectedFilter === 'verified' && item.status === 'Verified') ||
      (selectedFilter === 'generated' && item.generated);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Clock className="w-8 h-8 text-primary" />
            Image History
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your protected images
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="card-elevated">
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'protected', 'verified', 'generated'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setSelectedFilter(filter);
                      setCurrentPage(1);
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <Card key={item.id} className="card-base group overflow-hidden">
              <div className="relative aspect-square bg-white/5 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="pt-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.size}</p>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant={item.status === 'Protected' ? 'success' : 'primary'}
                  >
                    {item.status}
                  </Badge>
                  {item.generated && (
                    <Badge variant="secondary" className="text-xs">
                      Generated
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{item.date}</span>
                  <span>{item.verified} verifications</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {displayedItems.length === 0 && (
          <Card className="card-elevated text-center py-12">
            <div className="space-y-4">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
              <h3 className="font-semibold">No images found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
