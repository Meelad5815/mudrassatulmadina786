import "./globals.css";
import { AppShell } from "./app-shell";

export const metadata = {
  title: "\u0645\u062F\u0631\u0633\u06C3 \u0627\u0644\u0645\u062F\u06CC\u0646\u06C1 - Admin Panel",
  description: "Madrasa management admin panel for students, teachers, attendance, and more.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
