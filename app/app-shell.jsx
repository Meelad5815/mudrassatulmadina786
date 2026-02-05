"use client";

import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

export function AppShell({ children }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="app">
          <Sidebar />
          <div className="main">
            <Topbar />
            <div className="content">{children}</div>
          </div>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
