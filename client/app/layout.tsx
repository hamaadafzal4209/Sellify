import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { cn } from "@/lib/utils";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/app/redux/store";
import { Providers } from "./redux/Provider";

// Load the Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Load the Poppins font for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Sellify - Your Ultimate eCommerce Store",
  description:
    "Discover the best products at unbeatable prices with Sellify, your go-to eCommerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html
      lang="en"
      className={cn(
        "min-h-screen bg-dark-300 font-sans antialiased",
        inter.variable,
        poppins.variable
      )}
    >
      <body className="font-poppins">
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <Header />
            {children}
            <Footer />
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}