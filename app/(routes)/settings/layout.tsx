"use client";

import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { SidebarToggle } from "@/components/ui/sidebar-toggle";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Suspense } from "react";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<SettingsLayoutSkeleton />}>
      <SettingsLayoutContent>{children}</SettingsLayoutContent>
    </Suspense>
  );
}

function SettingsLayoutContent({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  // const isDesktop = useMediaQuery("(min-width: 768px)");

  // Check if we're on mobile on mount and when window resizes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <AppSidebar className="hidden lg:flex" />
      <div className="w-full bg-sidebar md:p-3">
        <div className="rounded-inherit flex">
          <ResizablePanelGroup
            direction="horizontal"
            autoSaveId="settings-panel-layout"
            className="rounded-inherit gap-1.5 overflow-hidden rounded-tl-md"
          >
            <ResizablePanel
              className="border-none !bg-transparent"
              defaultSize={isMobile ? 100 : 35}
              minSize={isMobile ? 100 : 35}
            >
              <div className="flex-1 flex-col overflow-y-auto border bg-card shadow-sm md:flex md:rounded-2xl md:shadow-sm">
                <div className="sticky top-0 z-10 flex items-center justify-between gap-1.5 p-2">
                  <SidebarToggle className="h-fit px-2" />
                  <h1 className="flex-1 text-center text-sm font-medium">Settings</h1>
                </div>
                <ScrollArea className="h-[calc(100svh-(8px+8px+14px+44px-2px))] p-2 pt-0">
                  <div className="p-4 md:p-6">{children}</div>
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}

function SettingsLayoutSkeleton() {
  return (
    <>
      <div className="hidden lg:flex lg:w-80" />
      <div className="w-full bg-sidebar md:p-3">
        <div className="h-[calc(100svh-1.5rem)] animate-pulse bg-muted md:rounded-2xl" />
      </div>
    </>
  );
}
