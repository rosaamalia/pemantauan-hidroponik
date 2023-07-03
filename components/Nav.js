"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Stack,
  Button,
  Link,
  IconButton,
  Collapse,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export function Nav({ children }) {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      position="fixed"
      backgroundColor="whiteAlpha.800"
      backdropFilter="blur(10px)"
      zIndex={"1"}
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        px={8}
        py={4}
        width="100vw"
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Link
          as={NextLink}
          href="/"
          _hover={{
            textDecoration: "none",
          }}
        >
          <Image
            src={"/images/logo.png"}
            height={"40"}
            width={"40"}
            alt="Logo"
          />
        </Link>

        {/* Desktop Navbar */}
        <Stack
          direction="row"
          spacing={6}
          align="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Informasi Tanaman
          </Link>
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Tutorial Integrasi
          </Link>
          <Button
            colorScheme="green"
            variant="outline"
            onClick={() => {
              router.push("/masuk");
            }}
          >
            Masuk
          </Button>

          <Button
            colorScheme="green"
            variant="solid"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => {
              router.push("/daftar");
            }}
          >
            Daftar
          </Button>
        </Stack>

        {/* Mobile Navbar */}
        <Flex display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack
          spacing={6}
          direction="column"
          px={8}
          py={8}
          height={"100vh"}
          display={{ base: "flex", md: "none" }}
        >
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Informasi Tanaman
          </Link>
          <Link
            as={NextLink}
            href="/"
            _hover={{
              textDecoration: "none",
            }}
          >
            Tutorial Integrasi
          </Link>
          <Button
            colorScheme="green"
            variant="outline"
            width={"fit-content"}
            onClick={() => {
              router.push("/masuk");
            }}
          >
            Masuk
          </Button>
          <Button
            colorScheme="green"
            variant="solid"
            rightIcon={<ArrowForwardIcon />}
            width={"fit-content"}
            onClick={() => {
              router.push("/daftar");
            }}
          >
            Daftar
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
}
