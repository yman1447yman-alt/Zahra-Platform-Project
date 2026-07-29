import type { Metadata } from "next";
import { Cairo, Tajawal } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zahra-platform-project.vercel.app"),
  title: "منصة الزهراء للخدمات التعليمية والحلول الذكية | كل ما تحتاجه في مكان واحد",
  description: "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية: خطط تشغيلية، ملفات إنجاز، حقائب نافس، تصميم بوربوينت، وسجلات المتابعة والتقويم المدرسي بجودة فائقة وتسليم سريع.",
  keywords: [
    "منصة الزهراء",
    "الزهراء للخدمات التعليمية",
    "ملفات الإنجاز",
    "ملفات نافس",
    "الخطط التشغيلية",
    "التقويم الخارجي",
    "سد الفاقد التعليمي",
    "تصميم بوربوينت",
    "أوراق عمل تفاعلية",
    "ملفات الجودة",
    "حلول تعليمية ذكية"
  ],
  authors: [{ name: "منصة الزهراء للخدمات التعليمية والحلول الذكية", url: "https://al-zahra-edu.sa" }],
  creator: "Al-Zahra Educational Platform",
  publisher: "Al-Zahra Educational Platform",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  verification: {
    google: "EclzTdjlnSWd0jOQJ1xkqyzIInkUk07eqfSDh6ieCd0",
  },
  openGraph: {
    title: "منصة الزهراء للخدمات التعليمية والحلول الذكية | التميز والأناقة الأكاديمية",
    description: "كل ما تحتاجه من خدمات تعليمية وإدارية وتصميمية في مكان واحد بأعلى جودة واهتمام بأدق التفاصيل. تواصل فوري عبر الواتساب.",
    url: "https://al-zahra-edu.sa",
    siteName: "منصة الزهراء للخدمات التعليمية والحلول الذكية",
    images: [
      {
        url: "/images/hero-mockup.png",
        width: 1200,
        height: 630,
        alt: "منصة الزهراء للخدمات التعليمية والحلول الذكية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "منصة الزهراء للخدمات التعليمية والحلول الذكية",
    description: "حلول احترافية للمعلمين والطلاب والمؤسسات التعليمية بجودة عالمية وتسليم سريع.",
    images: ["/images/hero-mockup.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/hero-mockup.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Structured JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "منصة الزهراء للخدمات التعليمية والحلول الذكية",
    "image": "/images/hero-mockup.png",
    "description": "منصة الزهراء تقدم حلولاً احترافية للمعلمين والمعلمات والطلاب والمؤسسات التعليمية: خطط تشغيلية، ملفات إنجاز، حقائب نافس، تصميم بوربوينت، وسجلات التقويم الخارجي والداخلي.",
    "telephone": "+966538950445",
    "url": "https://al-zahra-edu.sa",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "SA",
      "addressLocality": "الرياض، المملكة العربية السعودية"
    },
    "priceRange": "50-250 ر.س",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://wa.me/966538950445"
    ]
  };

  return (
    <html lang="ar" dir="rtl" className={`scroll-smooth ${cairo.variable} ${tajawal.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-[#6C63FF]/20 selection:text-[#6C63FF]">
        {children}
      </body>
    </html>
  );
}