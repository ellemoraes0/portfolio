import './globals.css';
import localFont from 'next/font/local';

const perfectPenmanship = localFont({
  src: './fonts/local/KGPerfectPenmanship.otf',
  variable: '--font-perfect-penmanship',
});

const reverie = localFont({
  src: './fonts/local/happy.ttf',
  variable: '--font-reverie',
});

// const happy = localFont({
//   src: './fonts/local/happy.otf',
//   variable: '--font-perfect-penmanship',
// });

export const metadata = {
  title: 'Potfolio Gabrielle',
  description: 'Portfólio de Gabrielle',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`
        ${perfectPenmanship.variable}
        ${reverie.variable}
      `}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
