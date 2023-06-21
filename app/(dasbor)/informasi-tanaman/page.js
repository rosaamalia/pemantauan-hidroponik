"use client";

import { useState, useEffect } from "react";
import {
  Flex,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TanamanCard } from "@components/dasbor-akun/TanamanCard";
import Paginasi from "@components/dasbor-akun/Paginasi";
import CardSkeleton from "@components/dasbor-akun/CardSkeleton";
import { api } from "@utils/api";
import { useRouter } from "next/navigation";

export default function SemuaTanaman() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [jenisTanaman, setJenisTanaman] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async (page) => {
      try {
        const response = await api.get(`/api/jenis-tanaman/?page=${page}`);
        const data = response.data.results;
        setJenisTanaman(data);
        setTotalItems(response.data.count);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const sendData = () => {
    console.log("Data yang dikirim:", query);
    router.push(`/informasi-tanaman/cari?query=${query}`);
  };

  return (
    <section>
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        spacing={4}
        width={"100%"}
      >
        <Text>Cari tanaman yang ingin dimonitor</Text>

        <InputGroup width={{ base: "100%", md: "49%" }}>
          <Input
            placeholder="Cari tanaman"
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

        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Flex wrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
            {jenisTanaman.map((tanaman) => (
              <TanamanCard
                width={{ base: "100%", md: "49%" }}
                key={tanaman.id}
                jenisTanaman={tanaman}
              />
            ))}
          </Flex>
        )}

        {jenisTanaman.length != 0 ? (
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
