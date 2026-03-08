import { Inter, Poppins, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arpan Bhuva | Electronics & Communication Engineer",
  description: "Portfolio of Arpan Bhuva, an Electronics & Communication Engineer specializing in embedded systems, IOT, and modern technology solutions.",
  openGraph: {
    title: "Arpan Bhuva | EC Engineer Portfolio",
    description: "Building innovative solutions in electronics, embedded systems, and technology.",
    type: "website",
    author: "Arpan Bhuva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpan Bhuva | EC Engineer",
    description: "Electronics & Communication Engineer portfolio.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${sourceSans.variable} ${jetbrainsMono.variable} antialiased selection:bg-blue-100 selection:text-primary font-body bg-background-soft`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
