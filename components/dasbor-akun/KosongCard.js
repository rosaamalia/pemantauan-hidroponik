"use client";

import { Box, Flex, Image, Stack, Text, Button } from "@chakra-ui/react";

export function KosongCard({
  pathGambar,
  heading,
  deskripsi,
  teksTombol,
  ikon,
  onClick,
  ...rest
}) {
  return (
    <Box
      bg={"white"}
      borderRadius={"lg"}
      border={"1px"}
      borderColor={"gray.200"}
      overflow={"hidden"}
      {...rest}
    >
      <Flex direction={"row"} alignItems={"center"} height={"100%"}>
        <Flex width={"30%"} height={40}>
          <Image
            objectFit="cover"
            src={pathGambar}
            alt="Ilustrasi dasbor kosong"
          />
        </Flex>

        <Stack direction={"column"} spacing={2} p={4} width={"70%"}>
          <Text color={"green.900"} fontWeight={"semibold"}>
            {heading}
          </Text>
          <Text fontSize={"sm"}>{deskripsi}</Text>
          <Button
            colorScheme="green"
            variant={"outline"}
            rightIcon={ikon}
            size={"sm"}
            width={"fit-content"}
            onClick={onClick}
          >
            {teksTombol}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
