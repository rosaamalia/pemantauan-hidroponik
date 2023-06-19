"use client";

// import { getServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Button,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { AiFillPushpin } from "react-icons/ai";
import { KebunCard } from "@components/dasbor-akun/KebunCard";
import ModalKebunDisematkan from "@components/dasbor-akun/ModalKebunDisematkan";
import { KosongCard } from "@components/dasbor-akun/KosongCard";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";

export default function Beranda() {
  const router = useRouter();
  const { akunData } = useContext(AkunContext);

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [kebun, setKebun] = useState(0);
  const [semuaKebun, setSemuaKebun] = useState([]);
  const [kebunDisematkan, setKebunDisematkan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/kebun-disematkan/`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        const data = response.data.data.kebun;
        setKebunDisematkan(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    if (akunData) {
      setKebun(akunData.data.jumlah_kebun);
    }
  }, [akunData, setKebun]);

  useEffect(() => {
    async function semuaKebun() {
      try {
        const response = await api.get("/api/kebun/", {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        setSemuaKebun(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    semuaKebun();
  }, [setSemuaKebun, token]);

  const ubahSematan = async (sematan) => {
    console.log(sematan);
    let dataSematan = {
      kebun: sematan,
    };

    try {
      const response = await api.put(`/api/kebun-disematkan/`, dataSematan, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      const data = response.data.data.kebun;
      setKebunDisematkan(data);
    } catch (error) {
      console.error(error);
    }
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
                router.push("/kebun");
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

      {kebunDisematkan.length == 0 ? (
        <KosongCard
          pathGambar={"/images/dasbor-kebun/daffodils-kuning.jpg"}
          heading={"Tidak ada kebun yang disematkan!"}
          deskripsi={
            "Untuk memudahkan akses, sematkan kebun yang sering kamu kunjungi."
          }
          teksTombol={"Sematkan Kebun"}
          ikon={<AiFillPushpin />}
          onClick={onOpen}
          width={{ base: "100%", md: "49%" }}
          mt={4}
        />
      ) : (
        <></>
      )}

      <Flex my={4} wrap={"wrap"} justifyContent={"space-between"}>
        {semuaKebun &&
          semuaKebun
            .filter((kebun) => kebunDisematkan.includes(kebun.id))
            .map((kebun) => (
              <KebunCard
                width={{ base: "100%", md: "49%" }}
                key={kebun.id}
                kebun={kebun}
              ></KebunCard>
            ))}
      </Flex>

      {kebunDisematkan.length != 0 && semuaKebun && (
        <ModalKebunDisematkan
          isOpen={isOpen}
          onClose={onClose}
          semuaKebun={semuaKebun}
          kebunDisematkan={kebunDisematkan}
          ubahSematan={ubahSematan}
        />
      )}
    </section>
  );
}
