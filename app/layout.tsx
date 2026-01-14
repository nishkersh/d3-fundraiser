import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';


const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'D3 - Donate Dosti Dance | Rotaract Chandigarh',
  description: 'Join the Golden Portal. A Bachata Fundraiser for TB Patients. Jan 31 & Feb 1.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
