"use client";

import { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import AkunContext from "@context/akunContext";

export default function Profil() {
  const router = useRouter();
  const { akunData } = useContext(AkunContext);

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
            <Avatar
              name={akunData.data.nama_pengguna}
              w={32}
              h={32}
              borderRadius={"lg"}
              src={akunData.data.foto_profil}
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
                    {akunData.data.nama_pengguna}
                  </Text>
                  <Text fontSize={"xs"} color={"gray.500"}>
                    (@{akunData.data.username})
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
                <Text>+{akunData.data.nomor_whatsapp}</Text>
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
                {akunData.data.jumlah_kebun} Kebun
              </Text>
            </Stack>

            <Button
              colorScheme="green"
              size={"sm"}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => {
                router.push("/kebun");
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
