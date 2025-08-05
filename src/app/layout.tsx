// /src/app/layout.tsx
import "./globals.css";
import { Providers } from "./provider";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
