import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import Link from "next/link";
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Find Mobile Spray Tan Artists Near You`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${inter.variable}`}>
      <body className="font-sans">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-peach/30 bg-sand/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bronzed-gold">
                <span className="text-sm font-bold text-white">ST</span>
              </div>
              <span className="font-display text-xl text-espresso">
                SprayTan<span className="text-bronzed-gold">.com</span>
              </span>
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              <Link
                href="/#cities"
                className="text-sm text-espresso/70 transition-colors hover:text-bronzed-gold"
              >
                Cities
              </Link>
              <Link
                href="/#solutions"
                className="text-sm text-espresso/70 transition-colors hover:text-bronzed-gold"
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="text-sm text-espresso/70 transition-colors hover:text-bronzed-gold"
              >
                Blog
              </Link>
              <Link href="/add-listing" className="btn-primary text-xs">
                List Your Business
              </Link>
            </div>
            <Link
              href="/add-listing"
              className="btn-primary text-xs md:hidden"
            >
              List Your Business
            </Link>
          </nav>
        </header>

        {/* Main */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="border-t border-peach/30 bg-espresso text-white/70">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="font-display text-lg text-white">
                  SprayTan<span className="text-bronzed-gold">.com</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  The premier directory for finding mobile spray tan artists
                  near you. Compare prices, read reviews, and book your
                  perfect glow.
                </p>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-white">Services</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/mobile-spray-tan" className="hover:text-bronzed-gold">
                      Mobile Spray Tan
                    </Link>
                  </li>
                  <li>
                    <Link href="/bridal-spray-tan" className="hover:text-bronzed-gold">
                      Bridal Spray Tan
                    </Link>
                  </li>
                  <li>
                    <Link href="/airbrush-spray-tan" className="hover:text-bronzed-gold">
                      Airbrush Spray Tan
                    </Link>
                  </li>
                  <li>
                    <Link href="/competition-spray-tan" className="hover:text-bronzed-gold">
                      Competition Spray Tan
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-white">Top Cities</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/spray-tan-miami-fl" className="hover:text-bronzed-gold">
                      Miami, FL
                    </Link>
                  </li>
                  <li>
                    <Link href="/spray-tan-los-angeles-ca" className="hover:text-bronzed-gold">
                      Los Angeles, CA
                    </Link>
                  </li>
                  <li>
                    <Link href="/spray-tan-new-york-ny" className="hover:text-bronzed-gold">
                      New York, NY
                    </Link>
                  </li>
                  <li>
                    <Link href="/spray-tan-nashville-tn" className="hover:text-bronzed-gold">
                      Nashville, TN
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-3 font-semibold text-white">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/blog" className="hover:text-bronzed-gold">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/add-listing" className="hover:text-bronzed-gold">
                      Add Your Listing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/how-much-does-spray-tan-cost"
                      className="hover:text-bronzed-gold"
                    >
                      Pricing Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/how-to-prepare-for-spray-tan"
                      className="hover:text-bronzed-gold"
                    >
                      Prep Checklist
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs">
              <p>&copy; {new Date().getFullYear()} SprayTan.com. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
