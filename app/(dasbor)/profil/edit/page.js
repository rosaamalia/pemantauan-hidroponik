"use client";

import { useState, useRef, useContext } from "react";
import {
  Avatar,
  Stack,
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";

export default function EditProfil() {
  const router = useRouter();
  const toast = useToast();
  const { akunData, updateAkunData } = useContext(AkunContext);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const [nama, setNama] = useState(akunData.data.nama_pengguna);
  const [username, setUsername] = useState(akunData.data.username);
  const [nomorWhatsapp, setNomorWhatsapp] = useState(
    akunData.data.nomor_whatsapp
  );
  const [fotoProfil, setFotoProfil] = useState("");
  const fileInputRef = useRef("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFotoProfil(file);
    console.log(file, file.name);
  };

  const handleButtonProfile = () => {
    fileInputRef.current.click();
  };

  const editProfil = async () => {
    let formData = new FormData();
    formData.append("nama_pengguna", nama);
    formData.append("username", username);
    if (fotoProfil != "") {
      formData.append("foto_profil", fotoProfil);
    }
    console.log(formData);

    try {
      const response = await api.put(`/api/akun`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access}`,
        },
      });

      const data = response.data.data;

      toast({
        title: "Berhasil",
        description: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      // Mengupdate key 'data' dalam context
      const updatedContext = { ...AkunContext, data: data };
      // Lakukan pembaruan pada state context
      updateAkunData(updatedContext);

      setFotoProfil("");
      console.log(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status != 401) {
        toast({
          title: "Error",
          description: error.response?.data?.detail || "Server error",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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
        <Avatar
          name={akunData.data.nama_pengguna}
          w={32}
          h={32}
          borderRadius={"lg"}
          src={
            fotoProfil == ""
              ? akunData.data.foto_profil
              : URL.createObjectURL(fotoProfil)
          }
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
              <InputLeftAddon>+62</InputLeftAddon>
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
