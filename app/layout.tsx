
import type { Metadata } from "next";
import "./globals.css";
import { onest } from "@/lib/fonts";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Vendor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} w-full relative min-h-screen  bg-[#222] `}
      >
        {/* Fullscreen blurred gradient background */}
        <div className="absolute w-full h-full">
          <div className="absolute w-[40vw] max-w-[96rem] h-full left-[50%] top-0 transform -translate-x-2/4 bg-indigo-400/50 rounded-full blur-[300px] opacity-70 pointer-events-none" />
           <div className="absolute w-[40vw] max-w-[96rem] h-full left-[50%] top-0 transform -translate-x-2/4 bg-slate-300 rounded-full blur-[300px] opacity-70 pointer-events-none" />

        </div>

        {/* Main Content */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}