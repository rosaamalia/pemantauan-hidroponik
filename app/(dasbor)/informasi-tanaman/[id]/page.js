"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { api } from "@utils/api";

export default function Tanaman({ params }) {
  const router = useRouter();
  const toast = useToast();
  const [kebunId, setKebunId] = useState(+params.id);
  const [tanaman, setTanaman] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/jenis-tanaman/${kebunId}`, {});

        console.log(response.data.data);

        setTanaman(response.data.data);
      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          toast({
            title: "Session berakhir",
            description: "Anda harus melakukan login ulang.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });

          router.push("/masuk");
        }
      }
    };

    fetchData();
  }, [kebunId]);

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
