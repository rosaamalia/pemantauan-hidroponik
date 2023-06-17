"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { jenis_tanaman } from "@utils/data";

export default function Tanaman({ params }) {
  const [tanaman, setTanaman] = useState(
    jenis_tanaman.find((tanaman) => tanaman.id === +params.id)
  );
  return (
    <section>
      <Stack width={{ base: "100%", md: "70%" }} spacing={6}>
        <Breadcrumb fontSize="sm">
          <BreadcrumbItem color={"green.700"}>
            <Link href="/informasi-tanaman">Informasi Tanaman</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{tanaman.nama_tanaman}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Heading as={"h1"}>{tanaman.nama_tanaman}</Heading>

        <Image
          src={tanaman.foto}
          width={"100%"}
          height={"30vh"}
          objectFit={"cover"}
          alt={tanaman.nama_tanaman}
        />

        <Text
          dangerouslySetInnerHTML={{ __html: tanaman.teks_artikel }}
          textAlign={"justify"}
        />
      </Stack>
    </section>
  );
}
