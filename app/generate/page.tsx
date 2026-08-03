'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import {
  Zap,
  Download,
  Share2,
  Lock,
  Image as ImageIcon,
  Settings,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('dalle-3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageDetails, setImageDetails] = useState({
    size: '1024x1024',
    quality: 'hd',
    style: 'photorealistic',
  });
  const [copied, setCopied] = useState(false);

  const models = [
    { id: 'dalle-3', name: 'DALL-E 3', icon: '🎨' },
    { id: 'midjourney', name: 'Midjourney', icon: '✨' },
    { id: 'flux', name: 'Flux Pro', icon: '⚡' },
    { id: 'sd-xl', name: 'Stable Diffusion XL', icon: '🌟' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      // Generate a placeholder image URL
      setGeneratedImage(
        `https://api.placeholder.com/1024x1024?text=${encodeURIComponent(prompt.substring(0, 30))}`
      );
      setIsGenerating(false);
    }, 2000);
  };

  const handleProtect = () => {
    console.log('Protecting image...');
    // Navigate to protect page with image data
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-primary" />
            Generate AI Image
          </h1>
          <p className="text-muted-foreground mt-2">
            Create stunning AI-generated images and protect them with our steganographic watermarking.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Model Selection */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Select Model</CardTitle>
                <CardDescription>
                  Choose your preferred AI image generation model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {models.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setModel(m.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        model === m.id
                          ? 'border-primary bg-primary/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{m.icon}</div>
                      <p className="text-xs font-medium">{m.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Image Prompt</CardTitle>
                <CardDescription>
                  Describe what you want to generate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerate} className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate... (e.g., 'A futuristic city with neon lights at night, cyberpunk aesthetic, ultra-detailed, 4K')"
                    className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
                  />

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyPrompt}
                      disabled={!prompt}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Prompt
                        </>
                      )}
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isGenerating || !prompt.trim()}
                    >
                      {isGenerating ? (
                        <>
                          <LoadingSpinner className="w-4 h-4 mr-2" size="sm" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </div>

                  {isGenerating && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                      <p className="text-sm text-blue-400">
                        Generating your image... this may take 30-60 seconds
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Image Preview */}
            {generatedImage && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-lg">Generated Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button className="flex-1" onClick={handleProtect}>
                      <Lock className="w-4 h-4 mr-2" />
                      Protect Image
                    </Button>
                  </div>

                  {/* Prompt Display */}
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Prompt Used
                    </p>
                    <p className="text-sm text-foreground">{prompt}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Advanced Settings */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image Size</label>
                  <select
                    value={imageDetails.size}
                    onChange={(e) =>
                      setImageDetails({ ...imageDetails, size: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="512x512">512x512</option>
                    <option value="1024x1024">1024x1024 (Recommended)</option>
                    <option value="1536x1536">1536x1536</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality</label>
                  <select
                    value={imageDetails.quality}
                    onChange={(e) =>
                      setImageDetails({ ...imageDetails, quality: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="standard">Standard</option>
                    <option value="hd">HD (Recommended)</option>
                    <option value="ultra">Ultra HD</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Style</label>
                  <select
                    value={imageDetails.style}
                    onChange={(e) =>
                      setImageDetails({ ...imageDetails, style: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary text-sm"
                  >
                    <option value="photorealistic">Photorealistic</option>
                    <option value="artistic">Artistic</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="3d">3D Render</option>
                    <option value="anime">Anime</option>
                  </select>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-xs text-muted-foreground">
                    <strong>Tip:</strong> More detailed prompts produce better results. Include specific styles, lighting, and artistic references.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Today&apos;s Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Generations
                    </span>
                    <span className="font-medium text-sm">2 / 10</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div className="bg-primary h-full w-1/5 rounded-full"></div>
                  </div>
                </div>

                <Badge variant="success" className="w-full justify-center py-2">
                  8 generations remaining
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="card-elevated bg-blue-500/10 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-sm">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-muted-foreground">
                <div className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <p>Use specific details for better results</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <p>Specify artist styles (e.g., &quot;by concept artist&quot;)</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <p>Mention lighting conditions</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400">•</span>
                  <p>Add quality descriptors</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
