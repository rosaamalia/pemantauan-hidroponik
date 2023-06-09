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
import { useState } from "react";

export default function Daftar() {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [konfirmasiKataSandi, setKonfirmasiKataSandi] = useState("");

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

  const daftarAkun = () => {
    let data = {
      nama_pengguna: nama,
      username: username,
      kata_sandi: kataSandi,
      nomor_whatsapp: "62" + nomorWhatsapp,
    };

    console.log(data);
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
          <FormControl>
            <FormLabel>Nama</FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setNama(e.target.value)}
            />
            {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
          </FormControl>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
            />
            {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
          </FormControl>

          <FormControl>
            <FormLabel>Nomor WhatsApp</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+62" />
              <Input
                type="tel"
                placeholder="8123456789"
                onChange={(e) => setNomorWhatsapp(e.target.value)}
              />
            </InputGroup>
            {/* <FormHelperText>We&apos;ll never share your email.</FormHelperText> */}
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
                      <ViewOffIcon w={3} h={3} />
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
                      <ViewOffIcon w={3} h={3} />
                    ) : (
                      <ViewIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                  aria-label={"Toggle Navigation"}
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
