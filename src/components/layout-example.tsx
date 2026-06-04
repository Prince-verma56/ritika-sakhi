// ─── app/layout.tsx  (or your root layout) ───────────────────────────────────
// Shows exactly where to add MusicProvider and MusicNudge.
// Replace your existing layout content — only the wrapper lines change.

import { MusicProvider } from '@/components/MusicProvider';
import { MusicNudge }    from '@/components/MusicNudge';
import Navbar            from '@/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* MusicProvider wraps everything — audio element lives here, never unmounts */}
        <MusicProvider>
          <Navbar />
          <MusicNudge />   {/* floating pill — only visible when Chrome blocks autoplay */}
          <main>{children}</main>
        </MusicProvider>
      </body>
    </html>
  );
}
