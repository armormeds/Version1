import type { ReactNode } from 'react';
import './styles.css';

export const metadata = {
  title: 'Care, built around you',
  description: 'A secure telehealth platform.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
