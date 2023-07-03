"use client";

import NextLink from "next/link";
import { Box, Flex, Stack, Link, Text, Image } from "@chakra-ui/react";

export function TanamanCard({ jenisTanaman, ...rest }) {
  return (
    <Link
      as={NextLink}
      href={"/informasi-tanaman/" + jenisTanaman.id}
      _hover={{ textDecoration: "none" }}
      pointerEvents={"pointer"}
      mb={2}
      {...rest}
    >
      <Box
        bg={"white"}
        borderRadius={"xl"}
        border={"1px"}
        borderColor={"gray.200"}
        overflow={"hidden"}
        height={"100%"}
        padding={6}
      >
        <Flex direction={"row"} alignItems={"center"} height={"100%"}>
          <Image
            width={24}
            height={24}
            borderRadius={"lg"}
            objectFit="cover"
            src={"//images.weserv.nl/?url=" + jenisTanaman.foto}
            alt={jenisTanaman.nama_tanaman}
          />

          <Stack direction={"column"} spacing={2} ml={4} width={"70%"} flex={1}>
            <Text color={"green.900"} noOfLines={2} fontWeight={"semibold"}>
              {jenisTanaman.nama_tanaman}
            </Text>
            <Text fontSize={"sm"} noOfLines={2}>
              {jenisTanaman.deskripsi}
            </Text>

            <Text fontSize={"sm"} color={"green.600"}>
              Baca Selengkapnya →
            </Text>
          </Stack>
        </Flex>
      </Box>
    </Link>
  );
}
