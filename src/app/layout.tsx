import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import Footer from './components/Footer';
import Header from './components/Header';
import { ReactQueryProvider } from './providers/reactQueryProviders';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meus livros'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${openSans.className} flex min-h-screen flex-col`}>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
