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
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  IconButton,
  VStack,
  Link
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import { useRouter } from "next/navigation";

export default function EditKataSandi() {
  const router = useRouter();
  const [kataSandiLama, setKataSandiLama] = useState("")
  const [kataSandiBaru, setKataSandiBaru] = useState("")
  const [konfirmasiKataSandiBaru, setKonfirmasiKataSandiBaru] = useState("")

  const [showKataSandiLama, setShowKataSandiLama] = useState(false);
  const handleShowKataSandiLama = () => setShowKataSandiLama(!showKataSandiLama);

  const [showKataSandiBaru, setShowKataSandiBaru] = useState(false);
  const handleShowKataSandiBaru = () => setShowKataSandiBaru(!showKataSandiBaru);

  const [showKonfirmasiKataSandiBaru, setShowKonfirmasiKataSandiBaru] = useState(false);
  const handleShowKonfirmasiKataSandiBaru = () => setShowKonfirmasiKataSandiBaru(!showKonfirmasiKataSandiBaru);

  const [errorKonfirmasiKataSandiBaru, setErrorKonfirmasiKataSandiBaru] =
    useState(false);

  const handleKonfirmasiKataSandiBaru = (e) => {
    setKonfirmasiKataSandiBaru(e.target.value);
    setErrorKonfirmasiKataSandiBaru(kataSandiBaru !== e.target.value);
  };

  const updateKataSandi = () => {
    let data = {
        kata_sandi_lama: kataSandiLama,
        kata_sandi_baru: kataSandiBaru
    }

    console.log(data)
  }

  return (
    <section>
      <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
        <FormControl>
            <FormLabel>Kata Sandi Lama</FormLabel>
            <InputGroup size="md">
              <Input
                type={showKataSandiLama ? "text" : "password"}
                placeholder="Kata sandi"
                onChange={(e) => setKataSandiLama(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  onClick={handleShowKataSandiLama}
                  icon={
                    showKataSandiLama ? (
                      <ViewOffIcon w={5} h={5} />
                    ) : (
                      <ViewIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                />
              </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl>
            <FormLabel>Kata Sandi Baru</FormLabel>
            <InputGroup size="md">
              <Input
                type={showKataSandiBaru ? "text" : "password"}
                placeholder="Kata sandi"
                onChange={(e) => setKataSandiBaru(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  onClick={handleShowKataSandiBaru}
                  icon={
                    showKataSandiBaru ? (
                      <ViewOffIcon w={5} h={5} />
                    ) : (
                      <ViewIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                />
              </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl isInvalid={errorKonfirmasiKataSandiBaru}>
            <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
            <InputGroup size="md">
                <Input
                type={showKonfirmasiKataSandiBaru ? "text" : "password"}
                placeholder="Konfirmasi kata sandi"
                onChange={handleKonfirmasiKataSandiBaru}
                />
                <InputRightElement>
                <IconButton
                    onClick={handleShowKonfirmasiKataSandiBaru}
                    icon={
                    showKonfirmasiKataSandiBaru ? (
                        <ViewOffIcon w={5} h={5} />
                    ) : (
                        <ViewIcon w={5} h={5} />
                    )
                    }
                    variant={"ghost"}
                />
                </InputRightElement>
            </InputGroup>
            {errorKonfirmasiKataSandiBaru ? (
                <FormErrorMessage>
                Kata sandi dan konfirmasi kata sandi tidak sama.
                </FormErrorMessage>
            ) : (
                ""
            )}
        </FormControl>
        
        <Stack spacing={4} direction={"column"}>
            {errorKonfirmasiKataSandiBaru |
            (kataSandiLama === "") |
            (kataSandiBaru == "") |
            (konfirmasiKataSandiBaru === "") ? (
                <Button colorScheme="green" isDisabled>
                Simpan Perubahan
                </Button>
            ) : (
                <Button colorScheme="green" onClick={updateKataSandi}>
                Simpan Perubahan
                </Button>
            )}
            <Button colorScheme="green" variant={"outline"} onClick={() => router.push("/profil/edit")}>
                Kembali
            </Button>
        </Stack>
      </Stack>
    </section>
  );
}
