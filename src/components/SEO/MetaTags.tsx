import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function MetaTags({ 
  title = 'TarımVerse - Doğanın Dijital Evreni',
  description = 'Türkiye\'nin en büyük tarım topluluğu. AI, IoT ve blockchain teknolojileri ile akıllı tarım. Çiftçiler, bahçıvanlar ve tarım severlerin bilgi paylaştığı platform.',
  keywords = 'tarım, çiftçi, bahçe, organik tarım, ekim takvimi, hasat, tohum, gübre, tarım teknolojisi, akıllı tarım, AI tarım, IoT sensör, blockchain sertifika, sürdürülebilir tarım, verim tahmini, hastalık teşhisi',
  image = 'https://tarimverse.com/og-image.jpg',
  url = 'https://tarimverse.com'
}: MetaTagsProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TarımVerse" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="TarımVerse" />
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR" />
      <meta name="geo.country" content="Turkey" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* PWA Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content="TarımVerse" />
      <meta name="apple-mobile-web-app-title" content="TarımVerse" />
      <meta name="msapplication-starturl" content="/" />
      
      <link rel="canonical" href={url} />
    </Helmet>
  );
}