"use client";

import { useContext, useEffect, useState } from "react";
import {
  Flex,
  Code,
  Button,
  Stack,
  HStack,
  Text,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { rekomendasi } from "@utils/data";
import KebunContext from "@context/kebunContext";

export default function Dasbor({ params }) {
  const { kebunData } = useContext(KebunContext);
  const [data, setData] = useState({});
  const [tindakan, setTindakan] = useState([]);

  useEffect(() => {
    const realTimeData = () => {
      const client = new W3CWebSocket(
        `ws://192.168.1.15:8000/kebun/${kebunData.id}/data/terbaru`
      );

      client.onopen = () => {
        console.log("Connected to WebSocket server");

        client.send(
          JSON.stringify({
            id_kebun: kebunData.id,
          })
        );
      };

      client.onmessage = (message) => {
        console.log("Received message:", JSON.parse(message.data));
        const received = JSON.parse(message.data);
        setData(received.message);
        setTindakan(
          rekomendasi.find(
            (item) =>
              item.hasil_rekomendasi === +received.message.hasil_rekomendasi
          )?.tindakan
        );
      };

      return () => {
        // Tutup koneksi WebSocket saat komponen di-unmount
        client.close();
      };
    };

    realTimeData();
  }, [kebunData, tindakan]);

  const ambilData = () => {
    console.log("ambil data kebun ", +params.id);
    realTimeData();
  };

  return (
    <section>
      {Object.keys(data).length === 0 || data.id_kebun == null ? (
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"70vh"}
        >
          <OrderedList>
            <ListItem>
              Pada file Arduino.ino, temukan variabel id pada line 86
            </ListItem>
            <ListItem>
              Salin id {params.id}, kemudian tempel pada variabel id di langkah
              1
            </ListItem>
            <Code
              colorScheme="green"
              children={`/* Tempel id ke variabel berikut */`}
              width={"100%"}
            />
            <Code
              colorScheme="green"
              children={`let id = ${params.id}`}
              width={"100%"}
            />
            <ListItem>Klik tombol di bawah untuk menghubungkan sistem</ListItem>
          </OrderedList>
          <Button
            colorScheme="green"
            width={"fit-content"}
            mt={2}
            onClick={ambilData}
          >
            Hubungkan Sistem
          </Button>
        </Flex>
      ) : (
        <Flex justifyContent={"space-between"} wrap={"wrap"} mb={4}>
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

              {tindakan.length != 0 &&
                tindakan.map((tindakan) => (
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
                        <Text color={"yellow.200"}>
                          {data[tindakan.parameter]}
                        </Text>
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
              backgroundImage={`url(${kebunData.jenis_tanaman.foto})`}
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
        </Flex>
      )}
    </section>
  );
}
