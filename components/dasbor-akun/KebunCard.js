"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Button,
  Link,
  IconButton,
  CloseButton,
  Drawer,
  DrawerContent,
  Text,
  Icon,
  Image,
  useDisclosure,
  useColorModeValue,
  HStack,
  textDecoration,
} from "@chakra-ui/react";
import { IoPin } from "react-icons/io5";

export function KebunCard({ kebun, ...rest }) {
  return (
    <Link
      as={NextLink}
      href={"/kebun/" + kebun.id}
      _hover={{ textDecoration: "none" }}
      pointerEvents={"pointer"}
      mb={2}
      {...rest}
    >
      <Box
        bg={"white"}
        borderRadius={"lg"}
        border={"1px"}
        borderColor={"gray.200"}
        overflow={"hidden"}
        height={"100%"}
      >
        <Flex direction={"row"} alignItems={"center"} height={"100%"}>
          <Flex width={"30%"} height={"100%"}>
            <Image
              objectFit="cover"
              src={"//images.weserv.nl/?url=" + kebun.jenis_tanaman.foto}
              alt={kebun.jenis_tanaman.nama_tanaman}
            />
          </Flex>

          <Stack direction={"column"} spacing={2} p={4} width={"70%"}>
            <Text color={"green.900"} noOfLines={2} fontWeight={"semibold"}>
              {kebun.nama_kebun}
            </Text>
            <HStack>
              <Text fontSize={"xs"} color={"green.600"} fontWeight={"semibold"}>
                Jenis Tanaman
              </Text>
              <Text
                fontSize={"xs"}
                color={"yellow.500"}
                fontWeight={"semibold"}
              >
                {kebun.jenis_tanaman.nama_tanaman}
              </Text>
            </HStack>
            <Text fontSize={"sm"} noOfLines={2}>
              {kebun.deskripsi}
            </Text>
            <HStack>
              <IoPin />
              <Text fontSize={"sm"} color={"green.700"} noOfLines={1}>
                {kebun.alamat}
              </Text>
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </Link>
  );
}
