import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'OCULIZ - AI Image Ownership & Verification',
  description: 'Protect, verify, and prove ownership of AI-generated images with advanced forensic analysis.',
  keywords: 'AI image, ownership, verification, forensic, steganography, authenticity',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0099ff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased scrollbar">
        {children}
      </body>
    </html>
  );
}
