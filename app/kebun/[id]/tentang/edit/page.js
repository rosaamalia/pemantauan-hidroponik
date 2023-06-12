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
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
import { daftarKebun } from "@utils/data";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "@chakra-ui/icons";

export default function EditInformasiKebun({ params }) {
  const router = useRouter();
  const kebun = daftarKebun.find((obj) => obj.id === +params.id);
  const [namaKebun, setNamaKebun] = useState(kebun.nama_kebun);
  const [deskripsi, setDeskripsi] = useState(kebun.deskripsi);

  const editKebun = () => {
    let data = {
      nama_kebun: namaKebun,
      deskripsi: deskripsi,
    };

    console.log(data);
  };

  const hapusKebun = () => {
    console.log(`Hapus kebun id ${kebun.id}`);
  };

  return (
    <section>
      <Stack
        width={{ base: "100%", md: "50%" }}
        spacing={"6"}
        direction={"column"}
      >
        <Stack>
          <Text>Edit informasi kebun yang ingin dimonitor.</Text>
        </Stack>
        <FormControl>
          <FormLabel>Nama Kebun</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Nama kebun maksimal terdiri dari 50 karakter dan harus unik.
          </FormHelperText>
          <Input
            mt={2}
            value={namaKebun}
            onChange={(e) => setNamaKebun(e.target.value)}
            contentEditable
          />
        </FormControl>

        <FormControl>
          <FormLabel>Deskripsi</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Deskripsi kebun maksimal terdiri dari 1000 karakter.
          </FormHelperText>
          <Textarea
            mt={2}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            contentEditable
          ></Textarea>
        </FormControl>

        <Stack
          bg={"gray.50"}
          borderRadius={"lg"}
          border={"1px"}
          borderColor={"gray.200"}
          p={4}
          spacing={2}
          alignItems={"center"}
          direction={"column"}
          width={"100%"}
        >
          <Text color={"red.500"} fontSize={"xs"}>
            Deskripsi kebun maksimal terdiri dari 1000 karakter.
          </Text>
          <Button
            colorScheme="red"
            variant={"outline"}
            size={"sm"}
            width={"100%"}
            rightIcon={<DeleteIcon />}
            onClick={hapusKebun}
          >
            Hapus Kebun
          </Button>
        </Stack>

        <Button colorScheme="green" onClick={editKebun} mt={2}>
          Simpan Informasi Kebun
        </Button>
        <Button
          colorScheme="red"
          variant={"outline"}
          onClick={() => router.push(`/kebun/${kebun.id}/tentang`)}
        >
          Batal
        </Button>
      </Stack>
    </section>
  );
}
