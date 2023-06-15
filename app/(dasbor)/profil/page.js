"use client";

import { useState } from "react";
import { Box, Flex, Stack, Text, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Profil({ params }) {
  const router = useRouter();
  const [akun, setAkun] = useState({
    nama: "Kim Jiwoo 김지우",
    username: "kimjiwoo",
    foto_profil:
      "https://i.pinimg.com/564x/6b/0a/ff/6b0aff7fd2d02a6394026c0551ad4226.jpg",
    nomor_whatsapp: "62000000000",
    jumlah_kebun: 10,
  });

  return (
    <section>
      <Stack width={{ base: "100%", md: "70%" }} spacing={6}>
        <Stack
          direction={{ base: "column", md: "row" }}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Stack direction={"row"} spacing={4}>
            <Image
              src={akun.foto_profil}
              width={32}
              height={32}
              objectFit={"cover"}
              borderRadius={"lg"}
              alt="Foto profil"
            />
            <Flex
              direction={"column"}
              justifyContent={"space-between"}
              flex={1}
            >
              <Stack>
                <Text
                  fontSize={"xs"}
                  color={"blackAlpha.400"}
                  fontWeight={"bold"}
                >
                  NAMA PENGGUNA
                </Text>
                <Flex alignItems={"flex-start"} wrap={"wrap"}>
                  <Text mr={2} noOfLines={1}>
                    {akun.nama}
                  </Text>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    (@{akun.username})
                  </Text>
                </Flex>
              </Stack>
              <Stack>
                <Text
                  fontSize={"xs"}
                  color={"blackAlpha.400"}
                  fontWeight={"bold"}
                >
                  NOMOR WHATSAPP
                </Text>
                <Text>+{akun.nomor_whatsapp}</Text>
              </Stack>
            </Flex>
          </Stack>

          <Button
            colorScheme="green"
            variant={"outline"}
            rightIcon={<EditIcon />}
            width={"fit-content"}
            mt={{ base: "2", md: "0" }}
            onClick={() => router.push(`/profil/edit`)}
          >
            Edit Profil
          </Button>
        </Stack>

        <Box p={4} bg={"gray.50"} borderRadius={"lg"} w={"100%"}>
          <Flex
            wrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"column"}>
              <Text
                color={"blackAlpha.400"}
                fontSize={"xx-small"}
                fontWeight={"bold"}
              >
                JUMLAH KEBUN
              </Text>
              <Text fontWeight={"semibold"} color={"green.900"}>
                {akun.jumlah_kebun} Kebun
              </Text>
            </Stack>

            <Button
              colorScheme="green"
              size={"sm"}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => {
                router.push("/semua-kebun");
              }}
            >
              Lihat Semua Kebun
            </Button>
          </Flex>
        </Box>
      </Stack>
    </section>
  );
}
