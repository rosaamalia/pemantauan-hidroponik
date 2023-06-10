"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
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
  useDisclosure,
  Text,
  Modal,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AiFillPushpin } from "react-icons/ai";
import { KebunCard } from "@components/dasbor-akun/KebunCard";
import ModalKebunDisematkan from "@components/dasbor-akun/ModalKebunDisematkan";

export default function Beranda() {
  const router = useRouter();

  const [kebun, setKebun] = useState(0);
  const [semuaKebun, setSemuaKebun] = useState([
    {
      id: 1,
      nama_kebun: "Kebun Tomat",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jenis_tanaman: {
        nama_tanaman: "Tomat",
        foto: "https://i.pinimg.com/564x/96/55/dd/9655dd27a563eb22d1c1d281c1570e21.jpg",
      },
      alamat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      nama_kebun: "Kebun Tomat",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jenis_tanaman: {
        nama_tanaman: "Tomat",
        foto: "https://i.pinimg.com/564x/cc/c4/b9/ccc4b9633d9fd361451884fd8bc6af25.jpg",
      },
      alamat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 3,
      nama_kebun: "Kebun Kubis Keriting",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jenis_tanaman: {
        nama_tanaman: "Kubis Keriting",
        foto: "https://i.pinimg.com/564x/8c/e8/af/8ce8afb912b934b82b40d6e81ef8f684.jpg",
      },
      alamat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 4,
      nama_kebun: "Kebun Kubis Keriting",
      deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      jenis_tanaman: {
        nama_tanaman: "Kubis Keriting",
        foto: "https://i.pinimg.com/564x/38/fd/10/38fd102d64fa02af164dba87536eadde.jpg",
      },
      alamat: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ]);
  const [kebunDisematkan, setKebunDisematkan] = useState([1, 2]);

  const ubahSematan = (sematan) => {
    setKebunDisematkan(sematan);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <section>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        <Box
          p={4}
          bg={"gray.50"}
          borderRadius={"lg"}
          w={{ base: "100%", md: "49%" }}
        >
          <Flex
            wrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"column"}>
              <Text
                color={"blackAlpha.400"}
                fontSize={"xx-small"}
                fontWeight={"bold"}
              >
                JUMLAH KEBUN
              </Text>
              <Text fontWeight={"semibold"} color={"green.900"}>
                {kebun} Kebun
              </Text>
            </Stack>

            <Button
              colorScheme="green"
              size={"sm"}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => {
                router.push("/semua-kebun");
              }}
            >
              Lihat Semua Kebun
            </Button>
          </Flex>
        </Box>

        {kebunDisematkan.length != 0 ? (
          <Button
            colorScheme="green"
            variant={"outline"}
            rightIcon={<AiFillPushpin />}
            mt={{ base: 4, md: 0 }}
            onClick={onOpen}
          >
            Ubah Sematan
          </Button>
        ) : (
          <></>
        )}
      </Flex>

      <Flex my={4} wrap={"wrap"} justifyContent={"space-between"}>
        {semuaKebun
          .filter((kebun) => kebunDisematkan.includes(kebun.id))
          .map((kebun) => (
            <KebunCard
              width={{ base: "100%", md: "49%" }}
              key={kebun.id}
              kebun={kebun}
            ></KebunCard>
          ))}
      </Flex>

      {kebunDisematkan.length == 0 ? (
        <Box
          bg={"white"}
          borderRadius={"lg"}
          border={"1px"}
          borderColor={"gray.200"}
          overflow={"hidden"}
          width={{ base: "100%", md: "49%" }}
        >
          <Flex direction={"row"} alignItems={"center"} height={"100%"}>
            <Flex width={"30%"} height={"100%"}>
              <Image
                objectFit="cover"
                src="/images/dasbor-kebun/ilustrasi-pegang-tanaman.png"
                alt="Ilustrasi wanita memegang tanaman"
              />
            </Flex>

            <Stack direction={"column"} spacing={2} p={4} width={"70%"}>
              <Text color={"green.900"} fontWeight={"semibold"}>
                Tidak ada kebun yang disematkan!
              </Text>
              <Text fontSize={"sm"}>
                Untuk memudahkan akses, sematkan kebun yang sering kamu
                kunjungi.
              </Text>
              <Button
                colorScheme="green"
                variant={"outline"}
                rightIcon={<AiFillPushpin />}
                size={"sm"}
                width={"fit-content"}
                onClick={onOpen}
              >
                Sematkan Kebun
              </Button>
            </Stack>
          </Flex>
        </Box>
      ) : (
        <></>
      )}

      <ModalKebunDisematkan
        isOpen={isOpen}
        onClose={onClose}
        semuaKebun={semuaKebun}
        kebunDisematkan={kebunDisematkan}
        ubahSematan={ubahSematan}
      />
    </section>
  );
}
