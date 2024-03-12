import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";

const font = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Aurora Lite | AAL",
  description: "Light Meme",
  authors: [{ name: 'Aurora Lite', url: 'https://github.com/auroralite' }],
  keywords: ['AAL', 'AuroraLite', 'Binance', 'CMC', 'CoinGecko', 'Ethereum'],
  publisher: 'AAL'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
