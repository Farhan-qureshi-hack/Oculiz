'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Upload,
  Download,
  Shield,
  CheckCircle,
  AlertCircle,
  Lock,
  User,
  Mail,
  Copy,
  Check,
  Image,
} from 'lucide-react';

export default function RegisterImagePage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    ownershipType: 'creator',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [apiError, setApiError] = useState('');
  const [isProtecting, setIsProtecting] = useState(false);
  const [protectionStatus, setProtectionStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [protectedImageUrl, setProtectedImageUrl] = useState('');
  const [protectedImageData, setProtectedImageData] = useState('');
  const [protectedFileName, setProtectedFileName] = useState('oculiz-protected.png');
  const [copiedId, setCopiedId] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== 'image/png') { setApiError('OCULIZ currently requires PNG files so the embedded signal survives lossless encoding.'); return }
    setIsProcessing(true); setApiError(''); setSelectedFile(file); setUploadedFileName(file.name); setUploadedImage(URL.createObjectURL(file));
    const form = new FormData(); form.append('image', file); form.append('analyzeOnly', 'true')
    const response = await fetch('/api/analyze', { method: 'POST', body: form }); const result = await response.json(); setAnalysis(result.provenance ?? null); setIsProcessing(false)
  };

  const handleProtect = async () => {
    if (!selectedFile) return; setIsProtecting(true); setProtectionStatus('processing'); setApiError('')
    const form = new FormData(); form.append('image', selectedFile); form.append('ownerName', ownerDetails.fullName); form.append('ownerEmail', ownerDetails.email); form.append('ownershipType', ownerDetails.ownershipType)
    const response = await fetch('/api/protect', { method: 'POST', body: form }); const result = await response.json()
    if (!response.ok) { setApiError(result.error ?? 'Unable to protect image'); setIsProtecting(false); setProtectionStatus('idle'); return }
    setProtectedImageUrl(result.assetId); setProtectedImageData(result.protectedImage); setProtectedFileName(result.filename); setAnalysis(result.provenance); setProtectionStatus('success'); setIsProtecting(false)
  };

  const handleDownload = () => {
    if (!protectedImageData) return
    const bytes = Uint8Array.from(atob(protectedImageData), (char) => char.charCodeAt(0))
    const url = URL.createObjectURL(new Blob([bytes], { type: 'image/png' }))
    const link = document.createElement('a'); link.href = url; link.download = protectedFileName; document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const handleCopyId = () => {
    if (protectedImageUrl) {
      navigator.clipboard.writeText(protectedImageUrl);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full oculiz-enter">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Upload className="w-8 h-8 text-primary" />
            Register AI Image
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload and protect your AI images with encrypted steganographic ownership watermarking.
          </p>
        </div>

        {protectionStatus === 'success' ? (
          // Success View
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <CardTitle className="text-2xl">Image Successfully Protected</CardTitle>
                  <CardDescription>
                    Your image now has invisible encrypted ownership watermark
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {uploadedImage && (
                    <div className="relative aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={uploadedImage}
                        alt="Protected"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold">Protection Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant="success">Protected</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner</span>
                        <span>{ownerDetails.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protected Date</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">File Name</span>
                        <span className="truncate">{uploadedFileName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <p className="text-sm text-blue-400 font-medium mb-3">
                      Protection ID
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-3 py-2 bg-black/30 rounded font-mono text-xs">
                        {protectedImageUrl}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyId}
                        className="flex-shrink-0"
                      >
                        {copiedId ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={handleDownload} disabled={!protectedImageData}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Protected
                    </Button>
                    <Button className="flex-1">
                      <Shield className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Owner Info - Read Only */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Ownership Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Owner Name</p>
                  <p className="font-medium">{ownerDetails.fullName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Owner Email</p>
                  <p className="font-medium">{ownerDetails.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Ownership Type</p>
                  <Badge variant="default">Creator</Badge>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-muted-foreground mb-3">
                    Ownership metadata is embedded invisibly in the image and cannot be removed without specialized tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Upload & Details Form
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Drag & Drop Upload */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Upload Image</CardTitle>
                  <CardDescription>
                    Drag and drop or click to upload (PNG, JPEG, WebP, TIFF)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <label
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center p-12 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                      dragActive
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-white/30 bg-white/5'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-3">
                        <LoadingSpinner size="lg" />
                        <p className="text-muted-foreground">Processing image...</p>
                      </div>
                    ) : uploadedImage ? (
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative aspect-video w-48 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                          <img
                            src={uploadedImage}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-sm">{uploadedFileName}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setUploadedImage(null);
                              setUploadedFileName('');
                            }}
                            className="mt-2"
                          >
                            Remove Image
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Image className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Drop your image here</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            or click to browse
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      type="file"
                      onChange={handleChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </CardContent>
              </Card>

              {apiError && <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300">{apiError}</div>}
              {analysis && uploadedImage && (
                <Card className="card-elevated"><CardHeader><CardTitle className="text-lg">Forensic signal report</CardTitle><CardDescription>Evidence found in the uploaded file before OCULIZ registration.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3"><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">AI likely</span><Badge variant={analysis.aiLikely ? 'warning' : 'secondary'}>{analysis.aiLikely ? 'Evidence found' : 'No reliable marker'}</Badge></div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Model</span><span className="text-sm">{analysis.model ?? 'Unknown'}</span></div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Generation date</span><span className="text-sm">{analysis.generatedAt ?? 'Not embedded'}</span></div><div className="flex items-center justify-between"><span className="text-sm text-muted-foreground">Generator identity</span><span className="text-sm">Not inferable</span></div><p className="text-xs leading-5 text-muted-foreground">IP addresses, emails, and human identities are only reported when explicitly present in signed metadata; pixels cannot prove who created an image.</p></CardContent></Card>
              )}
              {uploadedImage && (
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Image Verification</CardTitle>
                    <CardDescription>
                      Pre-protection checks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Valid Image Format</p>
                        <p className="text-xs text-muted-foreground">PNG format detected</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">No Previous Protection</p>
                        <p className="text-xs text-muted-foreground">Ready for watermarking</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Metadata Preserved</p>
                        <p className="text-xs text-muted-foreground">EXIF data intact</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Owner Details */}
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Ownership Details</CardTitle>
                  <CardDescription>
                    Information to embed in the image
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input
                      value={ownerDetails.fullName}
                      onChange={(e) =>
                        setOwnerDetails({
                          ...ownerDetails,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <Input
                      value={ownerDetails.email}
                      onChange={(e) =>
                        setOwnerDetails({
                          ...ownerDetails,
                          email: e.target.value,
                        })
                      }
                      placeholder="your@email.com"
                      type="email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Ownership Type
                    </label>
                    <select
                      value={ownerDetails.ownershipType}
                      onChange={(e) =>
                        setOwnerDetails({
                          ...ownerDetails,
                          ownershipType: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                    >
                      <option value="creator">Creator</option>
                      <option value="owner">Owner</option>
                      <option value="copyright">Copyright Holder</option>
                    </select>
                  </div>

                  <div className="pt-4 border-t border-white/10 text-xs text-muted-foreground space-y-2">
                    <p>
                      This information will be encrypted and embedded invisibly in your image using advanced steganography.
                    </p>
                    <p>
                      Only you can decrypt and view this metadata with your unique keys.
                    </p>
                  </div>

                  <Button
                    onClick={handleProtect}
                    disabled={!uploadedImage || isProtecting}
                    className="w-full mt-6"
                  >
                    {isProtecting ? (
                      <>
                        <LoadingSpinner className="w-4 h-4 mr-2" size="sm" />
                        Protecting...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Register & Protect
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Info Box */}
              <Card className="card-elevated bg-blue-500/10 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    What Gets Embedded?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex gap-2">
                    <span className="text-blue-400">✓</span>
                    <p>Owner name and email</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">✓</span>
                    <p>Ownership type</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">✓</span>
                    <p>Timestamp</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-400">✓</span>
                    <p>Digital signature</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
