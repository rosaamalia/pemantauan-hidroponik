"use client";

import { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
} from "@chakra-ui/react";
import { daftarKebun } from "@utils/data";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";

export default function Tentang({ params }) {
  const router = useRouter();
  const [kebun, setKebun] = useState(
    daftarKebun.find((obj) => obj.id === +params.id)
  );

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
            <Text fontSize={"sm"}>{kebun.id}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Nama Kebun</FormLabel>
            <Text fontSize={"sm"}>{kebun.nama_kebun}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Deskripsi</FormLabel>
            <Text fontSize={"sm"}>{kebun.deskripsi}</Text>
          </FormControl>

          <FormControl>
            <FormLabel>Alamat</FormLabel>
            <Text fontSize={"sm"}>{kebun.alamat}</Text>
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
                  <Text>{kebun.jenis_tanaman.nama_tanaman}</Text>
                </Stack>
                <Flex width={"16"} height={"16"}>
                  <Image
                    src={kebun.jenis_tanaman.foto}
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
            onClick={() => router.push(`/kebun/${kebun.id}/tentang/edit`)}
          >
            Edit Informasi Kebun
          </Button>
        </Stack>
      </Flex>
    </section>
  );
}
