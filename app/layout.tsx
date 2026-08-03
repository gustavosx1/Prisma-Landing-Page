import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://prismanews.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prisma News — Veja o evento inteiro, não só um lado da história",
    template: "%s | Prisma News",
  },
  description:
    "Compare perspectivas editoriais em segundos. Descubra o que a sua timeline escondia com análise por espectro, detecção de blindspots e fontes verificadas.",
  keywords: [
    "jornalismo", "notícias", "análise editorial", "perspectivas",
    "media literacy", "viés de mídia", "fact-check", "comparação de cobertura",
  ],
  authors: [{ name: "Prisma News" }],
  creator: "Prisma News",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Prisma News",
    title: "Prisma News — Veja o evento inteiro, não só um lado",
    description: "Compare perspectivas editoriais em segundos. Análise por espectro editorial, detecção de blindspots e fontes diversas.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Prisma News — Inteligência editorial" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prisma News — Veja o evento inteiro, não só um lado",
    description: "Compare perspectivas editoriais em segundos. Análise por espectro editorial e detecção de blindspots.",
    images: ["/og-image.png"],
    creator: "@prismanews",
  },
  alternates: { canonical: SITE_URL },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Prisma News",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.jpg` },
      sameAs: ["https://twitter.com/prismanews","https://instagram.com/prismanews","https://linkedin.com/company/prismanews"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Prisma News",
      description: "Inteligência editorial: compare perspectivas, detecte blindspots, entenda o evento completo.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
