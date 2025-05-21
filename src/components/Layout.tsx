// components/Layout.tsx
import { FC, memo, PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/sonner";

export const Layout: FC<PropsWithChildren> = memo(({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {children}
    <Toaster />
  </div>
));

Layout.displayName = "Layout";

export default Layout;
