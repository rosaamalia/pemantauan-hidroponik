"use client";

import { useState } from "react";
import {
  Flex,
  Text,
  Stack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { api } from "@utils/api";

export default function EditKataSandi() {
  const router = useRouter();
  const toast = useToast();
  const [kataSandiLama, setKataSandiLama] = useState("");
  const [kataSandiBaru, setKataSandiBaru] = useState("");
  const [konfirmasiKataSandiBaru, setKonfirmasiKataSandiBaru] = useState("");
  const [error, setError] = useState("");

  const [showKataSandiLama, setShowKataSandiLama] = useState(false);
  const handleShowKataSandiLama = () =>
    setShowKataSandiLama(!showKataSandiLama);

  const [showKataSandiBaru, setShowKataSandiBaru] = useState(false);
  const handleShowKataSandiBaru = () =>
    setShowKataSandiBaru(!showKataSandiBaru);

  const [showKonfirmasiKataSandiBaru, setShowKonfirmasiKataSandiBaru] =
    useState(false);
  const handleShowKonfirmasiKataSandiBaru = () =>
    setShowKonfirmasiKataSandiBaru(!showKonfirmasiKataSandiBaru);

  const [errorKonfirmasiKataSandiBaru, setErrorKonfirmasiKataSandiBaru] =
    useState(false);

  const handleKonfirmasiKataSandiBaru = (e) => {
    setError("");
    setKonfirmasiKataSandiBaru(e.target.value);
    setErrorKonfirmasiKataSandiBaru(kataSandiBaru !== e.target.value);
  };

  const updateKataSandi = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let dataKataSandi = {
      kata_sandi_lama: kataSandiLama,
      kata_sandi_baru: kataSandiBaru,
    };

    try {
      const response = await api.put(
        `/api/akun/update-kata-sandi`,
        dataKataSandi,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      setKataSandiLama("");
      setKataSandiBaru("");
      setKonfirmasiKataSandiBaru("");

      toast({
        title: "Berhasil",
        description: "Kata sandi berhasil diperbarui",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);

      if (error.response?.status == 400) {
        setError(error.response.data.detail);
      }

      if (error.response?.status != 401 && error.response?.status != 400) {
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
      <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
        <FormControl>
          <FormLabel>Kata Sandi Lama</FormLabel>
          <InputGroup size="md">
            <Input
              type={showKataSandiLama ? "text" : "password"}
              placeholder="Kata sandi"
              onChange={(e) => {
                setError("");
                setKataSandiLama(e.target.value);
              }}
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
              onChange={(e) => {
                setError("");
                setKataSandiBaru(e.target.value);
              }}
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

        {error != "" && (
          <Flex
            direction={"row"}
            bg={"red.50"}
            borderRadius={"lg"}
            p={2}
            alignItems={"center"}
          >
            <Text fontSize={"xl"}>⚠️</Text>
            <Text color={"red.800"} fontSize={"sm"} ml={2}>
              {error}
            </Text>
          </Flex>
        )}

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
          <Button
            colorScheme="green"
            variant={"outline"}
            onClick={() => router.push("/profil/edit")}
          >
            Kembali
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
