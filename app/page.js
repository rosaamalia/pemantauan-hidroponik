"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Container,
  Stack,
  Heading,
  Flex,
  Box,
  Text,
  Button,
  Avatar,
  Link,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ChatIcon } from "@chakra-ui/icons";
import { Nav } from "@components/Nav";
import { useEffect } from "react";

const imgOverflow = {
  overflow: "hidden",
};

const imgFitur = {
  objectFit: "cover",
};

const fitur = [
  {
    id: 1,
    judul: "Rekomendasi Tindakan",
    deskripsi:
      "Kami dapat memberikan rekomendasi tindakan berdasarkan keadaan tanaman.",
    gambar: "/images/fitur.png",
  },
  {
    id: 2,
    judul: "Histori Data",
    deskripsi:
      "Lihat keadaan kebun hidroponikmu sesuai dengan waktu yang diinginkan.",
    gambar: "/images/fitur.png",
  },
  {
    id: 3,
    judul: "Banyak Pilihan Tanaman",
    deskripsi:
      "Monitor kebun hidroponikmu dengan berbagai pilihan tanaman yang kami punya.",
    gambar: "/images/fitur.png",
  },
];

const testimoni = [
  {
    id: 1,
    nama: "정우석",
    pekerjaan: "Petani Hidroponik Rumahan",
    testimoni:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 2,
    nama: "강기노",
    pekerjaan: "Pemilik Hydromon",
    testimoni:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
  {
    id: 3,
    nama: "유토",
    pekerjaan: "Petani Hidroponik Rumahan",
    testimoni:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
  },
];

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token) {
      router.push("/beranda");
    }
  }, []);

  return (
    <main>
      <Nav></Nav>

      {/* Monitor your plants */}
      <Flex
        backgroundColor={"green.50"}
        height={"100vh"}
        pt={{ base: "28", md: "16" }}
      >
        <Flex
          width={"100vw"}
          direction={{ base: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={{ md: "space-between" }}
        >
          <Stack
            pl={{ base: "8", md: "16" }}
            pr={{ base: "8", md: "0" }}
            width={{ base: "100%", md: "50%" }}
            spacing={4}
            direction={"column"}
            alignItems={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading as="h1" size="3xl" noOfLines={3} color={"green.900"}>
              Monitor Your <Text color={"yellow.500"}>Plants</Text>
            </Heading>
            <Text>
              Monitor pertumbuhan tanaman pada kebun hidroponikmu untuk dapat
              mengidentifikasi masalah dengan cepat dan memaksimalkan hasil
              panen.
            </Text>
            <Button
              colorScheme="green"
              variant="solid"
              rightIcon={<ArrowForwardIcon />}
              maxWidth={"fit-content"}
              onClick={() => {
                router.push("/masuk");
              }}
            >
              Mulai memonitor kebun
            </Button>
          </Stack>
          <Box display={{ base: "none", md: "block" }}>
            <Image
              src={"/images/laptop-half.png"}
              height="900"
              width="525"
              alt="Monitor pemantauan hidroponik"
              style={imgOverflow}
            />
          </Box>
          <Box display={{ base: "block", md: "none" }}>
            <Image
              src={"/images/laptop-full.png"}
              height="900"
              width="600"
              alt="Monitor pemantauan hidroponik"
              style={imgOverflow}
            />
          </Box>
        </Flex>
      </Flex>

      {/* Fitur kami */}
      <Flex
        mx={{ base: "8", md: "16" }}
        my={16}
        justifyContent={"center"}
        direction={"column"}
      >
        <Stack direction={"column"} spacing={4} mb={8}>
          <Heading
            as="h1"
            size="xl"
            noOfLines={1}
            color={"green.900"}
            textAlign={"center"}
          >
            Fitur Kami
          </Heading>
          <Container textAlign={"center"}>
            Kami menawarkan berbagai macam fitur yang dapat membantu
            memaksimalkan pertumbuhan tanaman di kebun hidroponikmu
          </Container>
        </Stack>

        <Flex justifyContent={"space-between"} wrap={"wrap"}>
          {fitur.map((fitur_el) => (
            <Box
              width={{ base: "100%", sm: "30%" }}
              mb={{ base: "8", sm: "0" }}
              key={fitur_el.id}
            >
              <Box
                aspectRatio={"1/1"}
                width={"100%"}
                borderRadius={"20px"}
                backgroundColor={"yellow.500"}
                position={"relative"}
                overflow={"hidden"}
                mb={4}
              >
                <Image
                  src={fitur_el.gambar}
                  style={imgFitur}
                  alt="Fitur"
                  fill
                />
              </Box>
              <Stack>
                <Heading as="h2" size="md" noOfLines={2} color={"green.900"}>
                  {fitur_el.judul}
                </Heading>
                <Text>{fitur_el.deskripsi}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Bagaimana pendapat pengguna kami */}
      <Flex
        px={{ base: "8", md: "16" }}
        py={16}
        justifyContent={"center"}
        direction={"column"}
        backgroundColor={"green.700"}
      >
        <Heading as="h1" size="xl" noOfLines={2} color={"white"} mb={8}>
          Bagaimana Pendapat Pengguna Kami?
        </Heading>

        <Flex justifyContent={"space-between"} wrap={"wrap"}>
          {testimoni.map((testimoni_el) => (
            <Box
              width={{ base: "100%", md: "30%" }}
              mb={{ base: "8", md: "0" }}
              borderRadius={"xl"}
              overflow={"hidden"}
              key={testimoni_el.id}
            >
              <Stack p={8} backgroundColor={"white"} position={"relative"}>
                <Text>{testimoni_el.testimoni}</Text>
                <ChatIcon
                  position={"absolute"}
                  top={"8"}
                  right={"8"}
                  w={12}
                  h={12}
                  color={"green.300"}
                  opacity={"40%"}
                />
              </Stack>
              <Stack
                p={8}
                backgroundColor={"green.100"}
                direction={"row"}
                spacing={4}
              >
                <Avatar name={testimoni_el.nama} src="broken-link" />
                <Flex direction={"column"} justifyContent={"space-between"}>
                  <Heading as="h2" size="sm" noOfLines={1} color={"black"}>
                    {testimoni_el.nama}
                  </Heading>
                  <Text fontSize={"small"} color={"green.500"} noOfLines={1}>
                    {testimoni_el.pekerjaan}
                  </Text>
                </Flex>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Ayo bergabung */}
      <Flex
        pr={{ base: "8", md: "16" }}
        pl={{ base: "8", md: "0" }}
        pt={16}
        pb={{ base: "16", md: "0" }}
        justifyContent={"flex-start"}
        alignItems={"center"}
        direction={"row"}
      >
        <Box display={{ base: "none", md: "block" }}>
          <Image
            src={"/images/call-action.png"}
            width={"500"}
            height={"350"}
            alt="Kebun"
            style={{ marginRight: "4rem" }}
          />
        </Box>
        <Stack spacing={4}>
          <Heading as="h1" size="lg" noOfLines={2}>
            Ayo Bergabung dengan Kami!
          </Heading>
          <Button
            colorScheme="green"
            variant="solid"
            rightIcon={<ArrowForwardIcon />}
            maxWidth={"fit-content"}
            onClick={() => {
              router.push("/masuk");
            }}
          >
            Mulai
          </Button>
        </Stack>
      </Flex>

      {/* Footer */}
      <Flex
        px={{ base: "8", md: "16" }}
        py={16}
        justifyContent={"space-between"}
        direction={{ base: "column", sm: "row" }}
        bg={"green.900"}
        color={"white"}
      >
        <Stack
          direction={"row"}
          spacing={4}
          alignItems={"center"}
          mb={{ base: "16", sm: "0" }}
        >
          <Box
            aspectRatio={"1/1"}
            width={"80px"}
            position={"relative"}
            overflow={"hidden"}
            bg={"white"}
            borderRadius={"md"}
          >
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </Box>
          <Stack direction={"column"} spacing={0}>
            <Text as={"b"} fontSize={"md"}>
              Mulai monitor
            </Text>
            <Text as={"b"} fontSize={"md"}>
              kebunmu!
            </Text>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={4}>
          <Stack direction={"column"} spacing={2}>
            <Text fontSize={"md"} as={"b"}>
              BERGABUNG
            </Text>
            <Link
              as={NextLink}
              href="/daftar"
              _hover={{
                textDecoration: "none",
              }}
            >
              Buat Akun
            </Link>
            <Link
              as={NextLink}
              href="/masuk"
              _hover={{
                textDecoration: "none",
              }}
            >
              Masuk
            </Link>
          </Stack>
          <Stack direction={"column"} spacing={2}>
            <Text fontSize={"md"} as={"b"}>
              INFORMASI
            </Text>
            <Link>Informasi Tanaman</Link>
            <Link>Tutorial Integrasi</Link>
          </Stack>
        </Stack>
      </Flex>
    </main>
  );
}
