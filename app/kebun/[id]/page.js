"use client";

import { useState } from "react";
import { Flex, Code, Button, Stack, HStack, Text, OrderedList, ListItem } from "@chakra-ui/react";
import { daftarKebun, rekomendasi } from "@utils/data";

export default function Dasbor({ params }) {
  const [data, setData] = useState({
    id_kebun: 1,
    ph: 7.7,
    temperatur: 32,
    tds: 523,
    intensitas_cahaya: 865,
    kelembapan: 51,
    hasil_rekomendasi: rekomendasi.find((item) => item.hasil_rekomendasi === 15)
      ?.tindakan,
    created_at: "Rabu, 22 Maret 2023, 2:36 AM",
  });

  const [kebun, setKebun] = useState(
    daftarKebun.find((obj) => obj.id === +params.id)
  );

  return (
    <section style={{ height: "100vh"}}>
      {/* <Flex justifyContent={"space-between"} wrap={"wrap"}>
        <Stack
          direction={"column"}
          spacing={4}
          width={{ base: "100%", md: "49%" }}
        >
          <Stack
            spacing={2}
            p={"6"}
            direction={"column"}
            width={"100%"}
            bg={"green.500"}
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
              <Text color={"green.100"}>HASIL REKOMENDASI</Text>
              <Text color={"white"}>{data.created_at}</Text>
            </Flex>

            {data.hasil_rekomendasi.map((tindakan) => (
              <Flex
                p={4}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                borderRadius={"lg"}
                bg={"green.800"}
                color={"white"}
                key={tindakan.parameter}
              >
                <Flex direction={"column"}>
                  <Text fontSize={"sm"}>{tindakan.deskripsi}</Text>
                  <HStack fontSize={"xs"} fontWeight={"light"}>
                    <Text>{tindakan.label} :</Text>
                    <Text color={"yellow.200"}>{data[tindakan.parameter]}</Text>
                  </HStack>
                </Flex>
                <Text fontSize={"xx-large"}>{tindakan.emoji}</Text>
              </Flex>
            ))}
          </Stack>

          <Flex
            direction={{ base: "column", md: "row" }}
            justifyContent={"space-between"}
          >
            <Stack
              direction={"column"}
              p={6}
              bg={"white"}
              borderRadius={"lg"}
              border={"1px"}
              borderColor={"gray.200"}
              overflow={"hidden"}
              width={{ base: "100%", md: "49%" }}
              fontWeight={"semibold"}
            >
              <Text fontSize={"sm"} color={"gray.400"}>
                INTENSITAS CAHAYA
              </Text>
              <Text color={"green.800"} fontSize={"xl"}>
                {data["intensitas_cahaya"]}
              </Text>
            </Stack>
            <Stack
              direction={"column"}
              p={6}
              bg={"white"}
              borderRadius={"lg"}
              border={"1px"}
              borderColor={"gray.200"}
              overflow={"hidden"}
              width={{ base: "100%", md: "49%" }}
              fontWeight={"semibold"}
              mt={{ base: "4", md: "0" }}
            >
              <Text fontSize={"sm"} color={"gray.400"}>
                pH
              </Text>
              <Text color={"green.800"} fontSize={"xl"}>
                {data["ph"]}
              </Text>
            </Stack>
          </Flex>

          <Stack
            direction={"column"}
            p={6}
            bg={"white"}
            borderRadius={"lg"}
            border={"1px"}
            borderColor={"gray.200"}
            overflow={"hidden"}
            width={{ base: "100%", md: "49%" }}
            fontWeight={"semibold"}
          >
            <Text fontSize={"sm"} color={"gray.400"}>
              TDS
            </Text>
            <Text color={"green.800"} fontSize={"xl"}>
              {data["tds"]}
            </Text>
          </Stack>
        </Stack>

        <Stack
          direction={"column"}
          spacing={4}
          width={{ base: "100%", md: "49%" }}
          mt={{ base: "4", md: "0" }}
        >
          <Stack
            direction={"column"}
            p={6}
            bgGradient="linear(to-r, white, white, #FEFCBF)"
            borderRadius={"lg"}
            border={"1px"}
            borderColor={"gray.200"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Text fontSize={"sm"} color={"gray.400"}>
                  TEMPERATUR UDARA
                </Text>
                <Text color={"green.800"} fontSize={"xl"}>
                  {data["temperatur"]} ºC
                </Text>
              </Stack>
              <Text fontSize={"xx-large"}>🌤️</Text>
            </Flex>
          </Stack>

          <Stack
            direction={"column"}
            p={6}
            bgGradient="linear(to-r, white, white, #EBF8FF)"
            borderRadius={"lg"}
            border={"1px"}
            borderColor={"gray.200"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
          >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Stack>
                <Text fontSize={"sm"} color={"gray.400"}>
                  KELEMBAPAN UDARA
                </Text>
                <Text color={"green.800"} fontSize={"xl"}>
                  {data["kelembapan"]}
                </Text>
              </Stack>
              <Text fontSize={"xx-large"}>☁️</Text>
            </Flex>
          </Stack>

          <Stack
            direction={"column"}
            p={6}
            backgroundImage={`url(${kebun.jenis_tanaman.foto})`}
            borderRadius={"lg"}
            border={"1px"}
            borderColor={"gray.200"}
            overflow={"hidden"}
            width={"100%"}
            fontWeight={"semibold"}
            flex={1}
            alignItems={"flex-end"}
            justifyContent={"flex-end"}
            sx={{
              position: "relative",
              "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.25)",
                // zIndex: 1,
              },
            }}
          >
            <Text
              fontSize={"xx-large"}
              fontWeight={"bold"}
              textAlign={"right"}
              color={"white"}
              zIndex={1}
            >
              Bagaimana Keadaan Kebunmu?
            </Text>
          </Stack>
        </Stack>
      </Flex> */}

      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} height={"70vh"}>
        <OrderedList>
          <ListItem>Pada file Arduino.ino, temukan variabel id pada line 86</ListItem>
          <ListItem>Salin id {kebun.id}, kemudian tempel pada variabel id di langkah 1</ListItem>
          <Code colorScheme='green' children={`/* Tempel id ke variabel berikut */`} width={"100%"}/>
          <Code colorScheme='green' children={`let id = ${kebun.id}`} width={"100%"}/>
          <ListItem>Klik tombol di bawah untuk menghubungkan sistem</ListItem>
        </OrderedList>
        <Button colorScheme="green" width={"fit-content"} mt={2}>
          Hubungkan Sistem
        </Button>
      </Flex>
    </section>
  );
}
