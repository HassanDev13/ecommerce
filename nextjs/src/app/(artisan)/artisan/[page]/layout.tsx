import React from 'react';
import Navbar from '@/app/_components/navbar';
import Sidebar from '@/app/_components/sidebar';
import type { Metadata } from 'next';
import '../../../globals.css';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: ' ',
  description: 'Generated by create next app',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html>

      <body>

        <div className="flex h-screen">
          {/* Sidebar */}
       
          <div className="inline-block">
            <Sidebar />
          </div>

          <div className="flex  w-full flex-col">
            {/* Navbar */}
            <Navbar />

            <main className="relative w-full overflow-x-hidden overflow-y-auto p-2">
              <Providers>{children}</Providers>

            </main>
            <Toaster />
          </div>
        </div>
      </body>
    </html>

  );
};

export default RootLayout;
