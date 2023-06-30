import "@styles/globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@components/Providers";
import { AkunProvider } from "@context/akunContext";
import { KebunProvider } from "@context/kebunContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Pemantauan Hidroponik",
  description:
    "Monitor pertumbuhan tanaman pada kebun hidroponikmu untuk dapat mengidentifikasi masalah dengan cepat dan memaksimalkan hasil panen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AkunProvider>
          <KebunProvider>
            <Providers>{children}</Providers>
          </KebunProvider>
        </AkunProvider>
      </body>
    </html>
  );
}
