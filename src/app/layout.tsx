// Root layout (applies to all pages)
"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NotificationProvider } from "@/app/context/NotificationContext";
import { ConfirmationProvider } from "@/app/context/ConfirmationContext";
import { store } from "./store";
import { Provider } from "react-redux";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "CSM",
//   description: "Collaborative Surgical Module",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <main>
          <Provider store={store}>
            <ConfirmationProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </ConfirmationProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
