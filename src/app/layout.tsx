import Header from "@/components/header";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Dentist Booking",
  description: "Booking your dentist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ColorModeScript />
        <ChakraProvider>
          <Header />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
