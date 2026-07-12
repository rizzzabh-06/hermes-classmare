"use client";

import ConvexClientProvider from "@/app/convex-provider";
import Sidebar from "@/components/shell/sidebar";
import Topbar from "@/components/shell/topbar";
import { ToastProvider } from "@/components/ui/neo-toast";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      <ToastProvider>
        <Sidebar />
        <Topbar />
        <div className="neo-layout">
          <div className="neo-layout__content">{children}</div>
        </div>
      </ToastProvider>
    </ConvexClientProvider>
  );
}
