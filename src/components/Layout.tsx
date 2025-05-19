// components/Layout.tsx
import { FC, memo, PropsWithChildren } from "react";

interface LayoutProps {
  title: string;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = memo(
  ({ title, children }) => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      {children}
    </div>
  )
);

Layout.displayName = "Layout";

export default Layout;
