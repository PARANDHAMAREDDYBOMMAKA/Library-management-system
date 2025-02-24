"use client";

import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Navbar />;
}
