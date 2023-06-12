"use client";

import { useState } from "react";
import { SidebarKebun } from "@components/dasbor-kebun/SidebarKebun";
import { daftarKebun } from "@utils/data";

export default function DasborKebunLayout({ children, params }) {
  const [kebun, setKebun] = useState(
    daftarKebun.find((obj) => obj.id === +params.id)
  );

  return (
    <main>
      <SidebarKebun kebun={kebun}>{children}</SidebarKebun>
    </main>
  );
}
