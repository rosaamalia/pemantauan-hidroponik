"use client";

import NextLink from "next/link";
import {
  Flex,
  Heading,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormControl,
  FormLabel,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useContext } from "react";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";
import { useRouter } from "next/navigation";

export default function Masuk() {
  const router = useRouter();
  const { updateAkunData } = useContext(AkunContext);
  const [username, setUsername] = useState("");
  const [kataSandi, setKataSandi] = useState("");
  const [error, setError] = useState("");

  const [showKataSandi, setShowKataSandi] = useState(false);

  const handleShowKataSandi = () => setShowKataSandi(!showKataSandi);

  const masukAkun = async (e) => {
    e.preventDefault();

    let dataUser = {
      username: username,
      kata_sandi: kataSandi,
    };

    try {
      const response = await api.post("/api/auth/login", dataUser);
      updateAkunData(response.data);

      localStorage.setItem("token", JSON.stringify(response.data.token));
      router.push("/beranda");
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
        height={"80vh"}
      >
        <Heading as="h1" size="xl" noOfLines={1} color={"green.900"} mb={2}>
          Selamat Datang
        </Heading>
        <Text as={"b"} mb={8} textAlign={"center"}>
          Masuk untuk melihat keadaan kebunmu
        </Text>
        <Stack width={"100%"} spacing={6}>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="johndoe"
              onChange={(e) => {
                setError("");
                setUsername(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Kata Sandi</FormLabel>
            <InputGroup size="md">
              <Input
                type={showKataSandi ? "text" : "password"}
                placeholder="Kata sandi"
                onChange={(e) => {
                  setError("");
                  setKataSandi(e.target.value);
                }}
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

          {(username === "") | (kataSandi === "") ? (
            <Button colorScheme="green" isDisabled>
              Masuk
            </Button>
          ) : (
            <Button colorScheme="green" onClick={masukAkun}>
              Masuk
            </Button>
          )}
        </Stack>

        <Text mt={8} textAlign={"center"}>
          Belum punya akun?{" "}
          <Link color={"green.500"} as={NextLink} href="/daftar">
            Daftar di sini
          </Link>
        </Text>
      </Flex>
    </section>
  );
}
