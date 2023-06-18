"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import {
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { RiArrowGoBackLine } from "react-icons/ri";
import { KebunCard } from "@components/dasbor-akun/KebunCard";
import { KosongCard } from "@components/dasbor-akun/KosongCard";
import Paginasi from "@components/dasbor-akun/Paginasi";
import { api } from "@utils/api";

export default function SemuaKebun() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [semuaKebun, setSemuaKebun] = useState([]);
  const [query, setQuery] = useState(searchParams.get("query"));

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async (page) => {
      try {
        const response = await api.get(
          `/api/kebun/cari?q=${query}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token.access}`,
            },
          }
        );
        const data = response.data.results;
        setSemuaKebun(data);
        setTotalItems(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(currentPage);
  }, [currentPage, query]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const sendData = async () => {
    console.log("Data yang dikirim:", query);
    if (query == "") {
      router.push("/kebun");
    } else {
      router.push(`/kebun/cari?query=${query}`);
    }
  };

  return (
    <section>
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        spacing={4}
        width={"100%"}
      >
        <Text>Cari kebun kamu dengan kata kunci</Text>

        <InputGroup width={{ base: "100%", md: "49%" }}>
          <Input
            placeholder="Cari kebun"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement>
            <IconButton
              onClick={sendData}
              icon={<SearchIcon />}
              variant={"ghost"}
              aria-label={"Search Button"}
            />
          </InputRightElement>
        </InputGroup>

        <Flex wrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
          <Suspense
            fallback={
              <Stack spacing={2}>
                <Skeleton height={40} />
              </Stack>
            }
          >
            {semuaKebun.length == 0 ? (
              <KosongCard
                pathGambar={"/images/dasbor-kebun/bunga-matahari.png"}
                heading={"Kebun tidak ditemukan!"}
                deskripsi={`Kebun dengan kata kunci "${query}" tidak ditemukan`}
                teksTombol={"Semua Kebun"}
                ikon={<RiArrowGoBackLine />}
                onClick={() => router.push("/kebun")}
                width={{ base: "100%", md: "49%" }}
              />
            ) : (
              semuaKebun.map((kebun) => (
                <KebunCard
                  width={{ base: "100%", md: "49%" }}
                  key={kebun.id}
                  kebun={kebun}
                ></KebunCard>
              ))
            )}
          </Suspense>
        </Flex>

        {semuaKebun.length != 0 ? (
          <Paginasi
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            paginate={paginate}
          />
        ) : (
          <></>
        )}
      </Stack>
    </section>
  );
}
