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

export default function Masuk() {
  const [username, setUsername] = useState("");
  const [kataSandi, setKataSandi] = useState("");

  const [showKataSandi, setShowKataSandi] = useState(false);

  const handleShowKataSandi = () => setShowKataSandi(!showKataSandi);

  const masukAkun = () => {
    let data = {
      username: username,
      kata_sandi: kataSandi,
    };

    console.log(data);
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
              onChange={(e) => setUsername(e.target.value)}
            />
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
