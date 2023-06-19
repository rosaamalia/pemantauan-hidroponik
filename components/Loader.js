"use client";

import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Loader() {
  return (
    <Flex
      height={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Image
        src="/images/loader/Plant.gif"
        width={64}
        height={64}
        alt="Loader"
      />
      <Text>Memuat...</Text>
    </Flex>
  );
}
