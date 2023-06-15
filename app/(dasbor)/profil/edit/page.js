"use client";

import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function EditProfil() {
  const router = useRouter();
  const [akun, setAkun] = useState({
    nama: "Kim Jiwoo 김지우",
    username: "kimjiwoo",
    foto_profil:
      "https://i.pinimg.com/564x/6b/0a/ff/6b0aff7fd2d02a6394026c0551ad4226.jpg",
    nomor_whatsapp: "62000000000",
    jumlah_kebun: 10,
  });
  const [nama, setNama] = useState(akun.nama);
  const [username, setUsername] = useState(akun.username);
  const [nomorWhatsapp, setNomorWhatsapp] = useState(akun.nomor_whatsapp);
  const [fotoProfil, setFotoProfil] = useState("");
  const fileInputRef = useRef("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFotoProfil(file);
    console.log(file.name);
  };

  const handleButtonProfile = () => {
    fileInputRef.current.click();
  };

  const editProfil = () => {
    let data = {
      nama: nama,
      username: username,
      foto_profil: fotoProfil,
    };

    console.log(data);
  };

  return (
    <section>
      <Stack
        direction={"row"}
        spacing={4}
        alignItems={"center"}
        wrap={"wrap"}
        mb={6}
      >
        <Image
          src={akun.foto_profil}
          width={32}
          height={32}
          objectFit={"cover"}
          borderRadius={"lg"}
          alt="Foto profil"
        />
        <VStack spacing={2} alignItems={"flex-start"}>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
          <Button colorScheme="green" onClick={handleButtonProfile}>
            Ubah Foto Profil
          </Button>
          {fotoProfil != "" && (
            <Text fontSize={"sm"} noOfLines={1}>
              File gambar: {fotoProfil.name}
            </Text>
          )}
        </VStack>
      </Stack>
      <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
        <Stack direction={"column"} spacing={6}>
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              contentEditable
            />
            {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              contentEditable
            />
            {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
          </FormControl>

          <FormControl>
            <FormLabel>Nomor WhatsApp</FormLabel>
            <FormHelperText color={"gray.400"} fontSize={"xs"}>
              Nomor WhatsApp harus diverifikasi terlebih dahulu.
            </FormHelperText>
            <InputGroup mt={2}>
              <InputLeftAddon children="+62" />
              <Input type="tel" value={nomorWhatsapp.substring(2)} readOnly />
              <Button
                colorScheme="green"
                ml={2}
                onClick={() => router.push("/profil/edit/nomor-whatsapp")}
              >
                Ubah
              </Button>
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Kata Sandi</FormLabel>

            <Button
              colorScheme="green"
              onClick={() => router.push("/profil/edit/kata-sandi")}
            >
              Ubah Kata Sandi
            </Button>
          </FormControl>
        </Stack>

        <Stack direction={"column"} spacing={4}>
          <Button colorScheme="green" onClick={editProfil}>
            Simpan
          </Button>
          <Button
            colorScheme="red"
            variant={"outline"}
            onClick={() => router.push("/profil")}
          >
            Batal
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
