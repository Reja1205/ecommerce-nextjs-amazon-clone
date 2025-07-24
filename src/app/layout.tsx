import "./globals.css";
import Header from "@/components/Header";
import { ReactNode } from "react";

export const metadata = {
  title: "MyStore",
  description: "Amazon-style e-commerce built by Rejaur",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
