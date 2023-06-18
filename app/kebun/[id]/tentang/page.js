"use client";

import { useContext } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Image,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import KebunContext from "@context/kebunContext";

export default function Tentang() {
  const router = useRouter();
  const { kebunData } = useContext(KebunContext);

  return (
    <section>
      <Flex justifyContent={"space-between"} wrap={"wrap"}>
        <Stack
          width={{ base: "100%", md: "50%" }}
          spacing={"6"}
          direction={"column"}
        >
          <FormControl>
            <FormLabel>ID Kebun</FormLabel>
            <Text fontSize={"sm"}>{kebunData.id}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Nama Kebun</FormLabel>
            <Text fontSize={"sm"}>{kebunData.nama_kebun}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Deskripsi</FormLabel>
            <Text fontSize={"sm"}>{kebunData.deskripsi}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Text fontSize={"sm"}>{kebunData.alamat}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Jenis Tanaman</FormLabel>
            <Box
              width={"100%"}
              bg={"white"}
              borderRadius={"lg"}
              border={"1px"}
              borderColor={"gray.200"}
              overflow={"hidden"}
            >
              <Flex
                justifyContent={"space-between"}
                direction={"row"}
                alignItems={"center"}
              >
                <Stack p={4}>
                  <Text>{kebunData.jenis_tanaman.nama_tanaman}</Text>
                </Stack>
                <Flex width={"16"} height={"16"}>
                  <Image
                    src={kebunData.jenis_tanaman.foto}
                    objectFit={"cover"}
                    alt="Gambar jenis tanaman"
                  />
                </Flex>
              </Flex>
            </Box>
          </FormControl>
        </Stack>

        <Stack width={{ base: "100%", md: "50%" }} mt={{ base: "6", md: "0" }}>
          <Button
            colorScheme="green"
            variant={"outline"}
            rightIcon={<EditIcon />}
            width={{ base: "100%", md: "fit-content" }}
            onClick={() => router.push(`/kebun/${kebunData.id}/tentang/edit`)}
          >
            Edit Informasi Kebun
          </Button>
        </Stack>
      </Flex>
    </section>
  );
}
