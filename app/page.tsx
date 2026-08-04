'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LandingHeader } from '@/components/layout/landing-header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Shield,
  Zap,
  Lock,
  Eye,
  Fingerprint,
  TrendingUp,
  Check,
  ArrowRight,
  Cpu,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Generate AI Images',
    description: 'Create stunning AI images with integrated models.',
  },
  {
    icon: Lock,
    title: 'Secure Ownership',
    description: 'Register ownership with encrypted steganographic embedding.',
  },
  {
    icon: Eye,
    title: 'Advanced Verification',
    description: 'Verify image authenticity with forensic analysis.',
  },
  {
    icon: Fingerprint,
    title: 'Digital Fingerprints',
    description: 'Create unique digital signatures for provenance tracking.',
  },
  {
    icon: Shield,
    title: 'Tampering Detection',
    description: 'Instantly detect any modifications to protected images.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics Dashboard',
    description: 'Track your image portfolio with comprehensive insights.',
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
    answer: 'Our technology embeds ownership data invisibly into the image, making it impossible to remove without detection.',
  },
  {
    question: 'Can anyone verify my images?',
    answer: 'Yes, anyone can use our verification tool. You can choose to share verification links publicly or keep them private.',
  },
  {
    question: 'How long does verification take?',
    answer: 'Our advanced forensic analysis typically completes in under 30 seconds.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'We use military-grade encryption. Your images and ownership data are never shared with third parties.',
  },
  {
    question: 'Can I export my verification reports?',
    answer: 'Yes, Professional and Enterprise plans include comprehensive export and API access.',
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <LandingHeader
        isOpen={mobileMenuOpen}
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Hero Section */}
      <section className="flex-1 px-4 sm:px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-up">
            <Badge className="badge-primary w-fit">
              <Cpu className="w-3 h-3 mr-2" />
              AI-Powered Verification
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-slate-900 dark:text-slate-50">
              Prove AI Image <span className="text-blue-600 dark:text-blue-400">Ownership</span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md">
              Protect, verify, and prove ownership of AI-generated images with invisible steganographic watermarking and advanced forensic analysis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn btn-primary" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button className="btn btn-outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400 pt-4">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-3xl"></div>
            <div className="card relative h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-50">AI Image Protection</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
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
          <Badge className="badge-primary mb-4">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            Everything You Need to Protect AI Images
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive tools for image generation, ownership registration, verification, and forensic analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card card-hover">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-50">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 sm:px-6 py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-primary mb-4">Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50">
              How OCULIZ Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '01', title: 'Generate', description: 'Create or upload an AI image' },
              { number: '02', title: 'Register', description: 'Embed ownership with steganography' },
              { number: '03', title: 'Protect', description: 'Get instant verification link' },
              { number: '04', title: 'Verify', description: 'Anyone can verify authenticity' },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">{step.number}</div>
                <h3 className="font-semibold mb-2 text-slate-900 dark:text-slate-50">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <Badge className="badge-primary mb-4">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50">
            Simple, Transparent Pricing
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className={`card ${plan.highlighted ? 'ring-2 ring-blue-600' : ''}`}
            >
              <h3 className="font-bold text-xl mb-1 text-slate-900 dark:text-slate-50">{plan.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{plan.description}</p>
              <div className="text-4xl font-bold mb-6 text-slate-900 dark:text-slate-50">{plan.price}</div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                    <Check className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="btn btn-primary w-full" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 sm:px-6 py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50 w-full">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="badge-primary mb-4">FAQ</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-slate-50">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="card w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">{item.question}</h3>
                  <span className="text-blue-600 dark:text-blue-400">{expandedFaq === index ? '−' : '+'}</span>
                </div>
                {expandedFaq === index && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-4">{item.answer}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="card bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 text-center">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">Ready to Protect Your Images?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of creators, studios, and media companies using OCULIZ to protect AI-generated images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn btn-primary" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button className="btn btn-outline" asChild>
              <Link href="#faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
