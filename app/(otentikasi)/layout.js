"use client";

import Link from "next/link";
import Image from "next/image";
import { Flex, Stack, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OtentikasiLayout({ children }) {
  const router = useRouter();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      router.push("/beranda");
    }
  }, []);
  return (
    <main>
      <Flex height={"100vh"} direction={"row"}>
        <Stack
          px={{ base: "8", md: "16" }}
          py={4}
          width={{ base: "100%", md: "50%" }}
          height={"100%"}
        >
          <Link href="/">
            <Image
              src={"/images/logo.png"}
              width={"50"}
              height={"50"}
              alt="Logo"
            />
          </Link>
          {children}
        </Stack>

        <Stack
          width={"50%"}
          position={"relative"}
          display={{ base: "none", md: "flex" }}
        >
          <Box
            bg={"whiteAlpha.600"}
            backdropFilter="blur(10px)"
            position={"fixed"}
            borderRadius={"xl"}
            px={2}
            right={4}
            bottom={4}
            zIndex={1}
          >
            <Text>
              Photo by{" "}
              <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Markus Spiske
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/photos/sFydXGrt5OA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                Unsplash
              </a>
            </Text>
          </Box>
          <Box
            width={"50%"}
            height={"100%"}
            position={"fixed"}
            overflow={"hidden"}
          >
            <Image
              src={"/images/otentikasi/siram-tanaman.jpg"}
              alt="Menyiram tanaman"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Stack>
      </Flex>
    </main>
  );
}
