"use client";

import "./globals.css"; // ✅ Ensures global styles apply
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme"; // ✅ Import updated theme

export default function RootLayout({ children }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js").catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
    }
  }, []);

  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* ✅ Applies global Material UI styles */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
