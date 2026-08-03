'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  CheckCircle,
  AlertTriangle,
  Eye,
  Download,
  Share2,
  Lock,
  Fingerprint,
  User,
  Mail,
  Calendar,
  Upload,
  Image,
  TrendingUp,
} from 'lucide-react';

export default function VerifyPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const [verificationResult, setVerificationResult] = useState({
    isAuthentic: true,
    ownershipVerified: true,
    tampering: false,
    ownerName: 'John Doe',
    ownerEmail: 'john@example.com',
    protectedDate: '2024-08-03',
    confidenceScore: 99.2,
    fingerprint: 'a1b2c3d4e5f6g7h8i9j0',
    status: 'authentic',
  });

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

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleVerify = async () => {
    if (!uploadedImage) return;

    setIsVerifying(true);
    setVerificationStatus('verifying');

    // Simulate verification process
    setTimeout(() => {
      setVerificationStatus('success');
      setIsVerifying(false);
    }, 2500);
  };

  const handleDownloadReport = () => {
    console.log('Downloading report...');
  };

  const resetVerification = () => {
    setUploadedImage(null);
    setUploadedFileName('');
    setVerificationStatus('idle');
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Eye className="w-8 h-8 text-primary" />
            Verify Image
          </h1>
          <p className="text-muted-foreground mt-2">
            Upload an image to verify its ownership, authenticity, and detect any tampering.
          </p>
        </div>

        {verificationStatus === 'success' ? (
          // Verification Results
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Banner */}
              <Card className={`card-elevated ${
                verificationResult.isAuthentic
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <CardContent className="pt-8">
                  <div className="flex items-start gap-4">
                    {verificationResult.isAuthentic ? (
                      <CheckCircle className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h3 className={`text-2xl font-bold ${
                        verificationResult.isAuthentic
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}>
                        {verificationResult.isAuthentic
                          ? 'Image is Authentic'
                          : 'Image Failed Verification'}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {verificationResult.isAuthentic
                          ? 'This image has a valid ownership watermark and no signs of tampering.'
                          : 'This image does not have a valid ownership watermark or shows tampering.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image and Details */}
              {uploadedImage && (
                <>
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Image Preview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative aspect-video bg-white/5 rounded-lg overflow-hidden border border-white/10 mb-4">
                        <img
                          src={uploadedImage}
                          alt="Verified"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        File: <span className="font-medium">{uploadedFileName}</span>
                      </p>
                    </CardContent>
                  </Card>

                  {/* Verification Details */}
                  <Card className="card-elevated">
                    <CardHeader>
                      <CardTitle>Verification Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-muted-foreground mb-2">
                            Ownership Verified
                          </p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="font-medium text-sm">Yes</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-muted-foreground mb-2">
                            Tampering Detected
                          </p>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="font-medium text-sm">No</span>
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-muted-foreground mb-2">
                            Confidence Score
                          </p>
                          <p className="font-bold text-lg">{verificationResult.confidenceScore}%</p>
                        </div>
                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-xs text-muted-foreground mb-2">
                            Digital Signature
                          </p>
                          <Badge variant="success">Valid</Badge>
                        </div>
                      </div>

                      {/* Ownership Information */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <h4 className="font-semibold">Ownership Information</h4>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <User className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Owner Name</p>
                            <p className="font-medium text-sm">
                              {verificationResult.ownerName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Owner Email</p>
                            <p className="font-medium text-sm">
                              {verificationResult.ownerEmail}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground">Protected Date</p>
                            <p className="font-medium text-sm">
                              {verificationResult.protectedDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Fingerprint */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Fingerprint className="w-4 h-4 text-primary" />
                          Digital Fingerprint
                        </h4>
                        <code className="block w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg font-mono text-xs break-all">
                          {verificationResult.fingerprint}
                        </code>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Results
                </Button>
                <Button variant="outline" onClick={resetVerification}>
                  Verify Another
                </Button>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="space-y-6">
              {/* Confidence Score */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Confidence Score</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative h-32 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          fill="none"
                          stroke="#0099ff"
                          strokeWidth="8"
                          strokeDasharray={`${(verificationResult.confidenceScore / 100) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                        />
                      </svg>
                      <div className="absolute text-center">
                        <p className="text-2xl font-bold">
                          {verificationResult.confidenceScore}%
                        </p>
                        <p className="text-xs text-muted-foreground">Authentic</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Forensic Analysis */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Forensic Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <span className="text-sm font-medium">Watermark Present</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <span className="text-sm font-medium">Metadata Intact</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <span className="text-sm font-medium">No Pixel Tampering</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                    <span className="text-sm font-medium">Signature Valid</span>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                </CardContent>
              </Card>

              {/* Authenticity Badge */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Authenticity Status</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <Badge variant="success" className="px-6 py-3 text-base">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Authentic & Protected
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Upload Area
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Upload Image for Verification</CardTitle>
              <CardDescription>
                Upload a protected image to verify ownership and authenticity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center p-16 rounded-lg border-2 border-dashed cursor-pointer transition-all ${
                  dragActive
                    ? 'border-primary bg-primary/10'
                    : 'border-white/20 hover:border-white/30 bg-white/5'
                }`}
              >
                {uploadedImage ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative aspect-video w-64 bg-white/5 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-sm">{uploadedFileName}</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setUploadedImage(null);
                          setUploadedFileName('');
                        }}
                        className="mt-3"
                      >
                        Remove & Upload Different
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-lg">
                        Drop your image here
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Or click to browse (PNG, JPEG, WebP, TIFF)
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

              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleVerify}
                  disabled={!uploadedImage || isVerifying}
                  className="flex-1"
                  size="lg"
                >
                  {isVerifying ? (
                    <>
                      <LoadingSpinner className="w-5 h-5 mr-2" size="sm" />
                      Verifying...
                    </>
                  ) : verificationStatus === 'verifying' ? (
                    <>
                      <LoadingSpinner className="w-5 h-5 mr-2" size="sm" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 mr-2" />
                      Verify Image
                    </>
                  )}
                </Button>
              </div>

              {/* Info Boxes */}
              <div className="grid md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-400 font-medium mb-2">
                    What We Check
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ Ownership watermark</li>
                    <li>✓ Digital signature</li>
                    <li>✓ Pixel integrity</li>
                    <li>✓ Metadata authenticity</li>
                  </ul>
                </div>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                  <p className="text-sm text-emerald-400 font-medium mb-2">
                    Results You&apos;ll Get
                  </p>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>✓ Owner information</li>
                    <li>✓ Authenticity verdict</li>
                    <li>✓ Tampering detection</li>
                    <li>✓ Confidence score</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
