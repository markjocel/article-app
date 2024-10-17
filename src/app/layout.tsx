import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/header/header";

const poppins = Poppins({ subsets: ['latin'], weight: ['200', '400', '500', '700'] });

export const metadata: Metadata = {
  title: "Article Vault",
  description: "App that displays articles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <AuthProvider>
      <html lang="en" className={poppins.className}>
        <body style={{ margin: 0, color: "#1B1D21", backgroundColor: '#f9f9f9' }}>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
