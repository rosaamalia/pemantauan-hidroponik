"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Flex, Stack, Box, Text } from "@chakra-ui/react";
import { SidebarAkun } from "@components/dasbor-akun/SidebarAkun";

export default function DasborLayout({ children }) {
  return (
    <main>
      <SidebarAkun>{children}</SidebarAkun>
    </main>
  );
}
