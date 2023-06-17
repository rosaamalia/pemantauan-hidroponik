"use client";

import NextLink from "next/link";
import {
  Flex,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";

export default function Daftar() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState("");
  const [error, setError] = useState("");

  const [errorKonfirmasiKataSandi, setErrorKonfirmasiKataSandi] =
    useState(false);

  const handleKonfirmasiKataSandi = (e) => {
    setKonfirmasiKataSandi(e.target.value);
    setErrorKonfirmasiKataSandi(kataSandi !== e.target.value);
  };

  const [showKataSandi, setShowKataSandi] = useState(false);
  const [showKonfirmasiKataSandi, setShowKonfirmasiKataSandi] = useState(false);

  const handleShowKataSandi = () => setShowKataSandi(!showKataSandi);
  const handleShowKonfirmasiKataSandi = () =>
    setShowKonfirmasiKataSandi(!showKonfirmasiKataSandi);

  // Konteks akun
  const { akunData, updateAkunData } = useContext(AkunContext);

  const daftarAkun = async (e) => {
    e.preventDefault();

    let dataUser = {
      nama_pengguna: nama,
      username: username,
      kata_sandi: kataSandi,
      nomor_whatsapp: "62" + nomorWhatsapp,
    };

    try {
      const response = await api.post("/api/auth/register", dataUser);
      updateAkunData(response.data);

      router.push("/verifikasi");
    } catch (error) {
      console.log(error);

      if (error.response.data) {
        setError(error.response.data.detail);
      }
    }
  };

  return (
    <section>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
      >
        <Heading as="h1" size="xl" noOfLines={1} color={"green.900"} mb={8}>
          Daftar Akun
        </Heading>
        <Stack width={"100%"} spacing={6}>
          <FormControl isInvalid={error.nama_pengguna}>
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              onChange={(e) => {
                setError("");
                setNama(e.target.value);
              }}
            />
            {error.nama_pengguna && (
              <FormErrorMessage>{error.nama_pengguna[0]}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={error.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="johndoe"
              onChange={(e) => {
                setError("");
                setUsername(e.target.value);
              }}
            />
            {error.username && (
              <FormErrorMessage>{error.username[0]}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={error.nomor_whatsapp}>
            <FormLabel>Nomor WhatsApp</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+62" />
              <Input
                type="tel"
                placeholder="8123456789"
                onChange={(e) => {
                  setError("");
                  setNomorWhatsapp(e.target.value);
                }}
              />
            </InputGroup>
            {error.nomor_whatsapp && (
              <FormErrorMessage>{error.nomor_whatsapp[0]}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Kata Sandi</FormLabel>
            <InputGroup size="md">
              <Input
                type={showKataSandi ? "text" : "password"}
                placeholder="Kata sandi"
                onChange={(e) => setKataSandi(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  onClick={handleShowKataSandi}
                  icon={
                    showKataSandi ? (
                      <ViewOffIcon w={5} h={5} />
                    ) : (
                      <ViewIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                  aria-label={"Toggle Navigation"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl isInvalid={errorKonfirmasiKataSandi}>
            <FormLabel>Konfirmasi Kata Sandi</FormLabel>
            <InputGroup size="md">
              <Input
                type={showKonfirmasiKataSandi ? "text" : "password"}
                placeholder="Konfirmasi kata sandi"
                onChange={handleKonfirmasiKataSandi}
              />
              <InputRightElement>
                <IconButton
                  onClick={handleShowKonfirmasiKataSandi}
                  icon={
                    showKonfirmasiKataSandi ? (
                      <ViewOffIcon w={5} h={5} />
                    ) : (
                      <ViewIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                />
              </InputRightElement>
            </InputGroup>
            {errorKonfirmasiKataSandi ? (
              <FormErrorMessage>
                Kata sandi dan konfirmasi kata sandi tidak sama.
              </FormErrorMessage>
            ) : (
              ""
            )}
          </FormControl>

          {errorKonfirmasiKataSandi |
          (nama === "") |
          (username === "") |
          (nomorWhatsapp === "") |
          (kataSandi === "") |
          (konfirmasiKataSandi === "") ? (
            <Button colorScheme="green" isDisabled>
              Daftar
            </Button>
          ) : (
            <Button colorScheme="green" onClick={daftarAkun}>
              Daftar
            </Button>
          )}
        </Stack>

        <Text my={8} textAlign={"center"}>
          Sudah punya akun?{" "}
          <Link color={"green.500"} as={NextLink} href="/masuk">
            Masuk
          </Link>
        </Text>
      </Flex>
    </section>
  );
}
