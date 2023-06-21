"use client";

import { Flex, Stack, Text, HStack, Skeleton } from "@chakra-ui/react";

export default function MonitorSkeleton() {
  return (
    <Flex justifyContent={"space-between"} wrap={"wrap"} mb={4}>
      <Stack
        direction={"column"}
        spacing={4}
        width={{ base: "100%", md: "49%" }}
      >
        <Skeleton
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
        >
          <Stack
            spacing={2}
            p={"6"}
            direction={"column"}
            width={100}
            borderRadius={"lg"}
          >
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              wrap={"wrap"}
              fontSize={"xs"}
              fontWeight={"semibold"}
              mb={{ base: "0", md: "2" }}
            >
              <Text>HASIL REKOMENDASI</Text>
              <Text>data</Text>
            </Flex>

            <Flex
              p={4}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              borderRadius={"lg"}
            >
              <Flex direction={"column"}>
                <Text fontSize={"sm"}>data</Text>
                <HStack fontSize={"xs"} fontWeight={"light"}>
                  <Text>data</Text>
                  <Text>data</Text>
                </HStack>
              </Flex>
              <Text fontSize={"xx-large"}>data</Text>
            </Flex>
          </Stack>
        </Skeleton>

        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent={"space-between"}
        >
          <Skeleton
            width={{ base: "100%", md: "49%" }}
            borderRadius={"lg"}
            startColor={"gray.50"}
            endColor={"gray.200"}
          >
            <Stack
              direction={"column"}
              p={6}
              borderRadius={"lg"}
              border={"1px"}
              overflow={"hidden"}
              fontWeight={"semibold"}
            >
              <Text fontSize={"sm"}>INTENSITAS CAHAYA</Text>
              <Text fontSize={"xl"}>data</Text>
            </Stack>
          </Skeleton>

          <Skeleton
            width={{ base: "100%", md: "49%" }}
            borderRadius={"lg"}
            startColor={"gray.50"}
            endColor={"gray.200"}
          >
            <Stack
              direction={"column"}
              p={6}
              borderRadius={"lg"}
              border={"1px"}
              overflow={"hidden"}
              fontWeight={"semibold"}
              mt={{ base: "4", md: "0" }}
            >
              <Text fontSize={"sm"}>pH</Text>
              <Text fontSize={"xl"}>data</Text>
            </Stack>
          </Skeleton>
        </Flex>

        <Skeleton
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
        >
          <Stack
            direction={"column"}
            p={6}
            borderRadius={"lg"}
            overflow={"hidden"}
            width={{ base: "100%", md: "49%" }}
            fontWeight={"semibold"}
          >
            <Text fontSize={"sm"}>TDS</Text>
            <Text fontSize={"xl"}>data</Text>
          </Stack>
        </Skeleton>
      </Stack>

      <Stack
        direction={"column"}
        spacing={4}
        width={{ base: "100%", md: "49%" }}
        mt={{ base: "4", md: "0" }}
      >
        <Skeleton
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
        >
          <Stack
            direction={"column"}
            p={6}
            borderRadius={"lg"}
            border={"1px"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Text fontSize={"sm"}>TEMPERATUR UDARA</Text>
                <Text fontSize={"xl"}>data</Text>
              </Stack>
              <Text fontSize={"xx-large"}>🌤️</Text>
            </Flex>
          </Stack>
        </Skeleton>

        <Skeleton
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
        >
          <Stack
            direction={"column"}
            p={6}
            borderRadius={"lg"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Text fontSize={"sm"}>KELEMBAPAN UDARA</Text>
                <Text fontSize={"xl"}>data</Text>
              </Stack>
              <Text fontSize={"xx-large"}>☁️</Text>
            </Flex>
          </Stack>
        </Skeleton>

        <Skeleton
          flex={1}
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
        >
          <Stack
            direction={"column"}
            p={6}
            borderRadius={"lg"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
            flex={1}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Text
              fontSize={"xx-large"}
              fontWeight={"bold"}
              textAlign={"right"}
              zIndex={1}
            >
              Bagaimana Keadaan Kebunmu?
            </Text>
          </Stack>
        </Skeleton>
      </Stack>
    </Flex>
  );
}
