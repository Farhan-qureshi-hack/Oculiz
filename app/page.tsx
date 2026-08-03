'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/layout/landing-header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Zap,
  Lock,
  Eye,
  Fingerprint,
  TrendingUp,
  ChevronRight,
  Check,
  ArrowRight,
  AlertCircle,
  Cpu,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Generate AI Images',
    description: 'Create stunning AI images with integrated models like DALL-E, Midjourney, and more.',
  },
  {
    icon: Lock,
    title: 'Secure Ownership',
    description: 'Register ownership with encrypted steganographic embedding invisible to the eye.',
  },
  {
    icon: Eye,
    title: 'Advanced Verification',
    description: 'Verify image authenticity and detect tampering with forensic analysis.',
  },
  {
    icon: Fingerprint,
    title: 'Digital Fingerprints',
    description: 'Create unique digital signatures for complete provenance tracking.',
  },
  {
    icon: Shield,
    title: 'Tampering Detection',
    description: 'Instantly detect any modifications or alterations to protected images.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track your image portfolio with comprehensive analytics and insights.',
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for individuals',
    features: [
      'Up to 50 AI image generations',
      '100 verifications per month',
      'Basic ownership registration',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'For creators and studios',
    features: [
      'Unlimited AI image generations',
      'Unlimited verifications',
      'Advanced forensics',
      'Priority support',
      'API access',
      'Custom branding',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      '99.99% uptime SLA',
      'Advanced security features',
      'Training & onboarding',
    ],
  },
];

const faqItems = [
  {
    question: 'How does steganography protect my images?',
    answer: 'We use advanced steganographic techniques to embed ownership metadata invisibly within the image data, making it impossible to detect or remove without specialized tools.',
  },
  {
    question: 'Can I verify images from any source?',
    answer: 'Yes! You can upload images generated from any AI model - DALL-E, Midjourney, Stable Diffusion, Gemini, or any other source.',
  },
  {
    question: 'What happens if my image is tampered with?',
    answer: 'Our forensic analysis will detect any modifications and flag them in the verification report, showing exactly what was changed.',
  },
  {
    question: 'Is my ownership data private?',
    answer: 'Absolutely. All ownership metadata is encrypted and stored securely. You have complete control over who can access your verification reports.',
  },
  {
    question: 'Do you support batch processing?',
    answer: 'Yes, our API allows batch verification of images, making it perfect for organizations processing large volumes.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'We support PNG, JPEG, WebP, and TIFF formats. Higher quality images provide better forensic analysis results.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Generate or Upload',
    description: 'Create AI images with our integrated models or upload existing ones.',
  },
  {
    number: '02',
    title: 'Register Ownership',
    description: 'Embed encrypted ownership metadata using steganography.',
  },
  {
    number: '03',
    title: 'Share Protected Images',
    description: 'Distribute your protected images with full provenance tracking.',
  },
  {
    number: '04',
    title: 'Verify Anytime',
    description: 'Anyone can verify ownership and authenticity instantly.',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingHeader
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Hero Section */}
      <section className="flex-1 px-4 sm:px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-up">
            <Badge variant="secondary" className="w-fit">
              <Cpu className="w-3 h-3 mr-2" />
              AI-Powered Verification Platform
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Prove AI Image{' '}
              <span className="text-gradient-blue-cyan">Ownership</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              Protect, verify, and prove ownership of AI-generated images with invisible steganographic watermarking and advanced forensic analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="flex gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
            <div className="relative glass-lg h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold">AI Image Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Military-grade encryption meets invisible watermarking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Features</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Protect AI Images
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools for image generation, ownership registration, verification, and forensic analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="card-base">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 sm:px-6 py-16 md:py-24 bg-white/5 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Process</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple 4-Step Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From image creation to verified ownership in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="card-base text-center h-full">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary/30 mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <Badge variant="accent" className="mb-4">Pricing</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Flexible Plans for Every Creator
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <Card
              key={index}
              className={`card-elevated flex flex-col ${
                plan.highlighted ? 'ring-2 ring-primary transform md:scale-105' : ''
              }`}
            >
              {plan.highlighted && (
                <Badge variant="default" className="w-fit -mb-4">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? 'default' : 'outline'}
                  className="w-full mt-auto"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 py-16 md:py-24 bg-white/5 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Card
                key={index}
                className="card-base cursor-pointer"
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{item.question}</CardTitle>
                    <ChevronRight
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                        expandedFaq === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent className="border-t border-white/10 pt-4">
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <Card className="card-elevated bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10">
          <CardContent className="pt-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Protect Your AI Images?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join creators and studios worldwide using OCULIZ to prove ownership and verify authenticity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#contact">Schedule Demo</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
