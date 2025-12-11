import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/context/AppContext";
import { Providers } from "@/components/Providers";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SingularLogic Attendance",
  description: "Employee Attendance Dashboard",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let user = null;

  if (sessionCookie?.value) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_please_change");
      const { payload } = await jwtVerify(sessionCookie.value, secret);
      user = payload as any;
    } catch (e) {
      console.error("Failed to verify session cookie", e);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-gray-50")}>
        <Providers>
          <AppProvider>
            <Navbar user={user} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </AppProvider>
        </Providers>
      </body>
    </html>
  );
}
