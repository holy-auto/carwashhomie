"use client";

import { usePathname } from "next/navigation";

/* Hides the public site chrome (Navbar / Footer) on the /admin
   panel, which provides its own header. Children are passed through
   so Server Components (e.g. Footer) stay server-rendered. */

export default function ChromeGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}
