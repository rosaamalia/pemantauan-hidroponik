"use client";

import { SidebarAkun } from "@components/dasbor-akun/SidebarAkun";

export default function DasborLayout({ children }) {
  return (
    <main>
      <SidebarAkun>{children}</SidebarAkun>
    </main>
  );
}
