"use client";

import { useState } from "react";
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
import { jenis_tanaman } from "@utils/data";

export default function SemuaTanaman() {
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jenis_tanaman.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const sendData = () => {
    console.log("Data yang dikirim:", query);
    setQuery("");
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

        <Flex wrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
          {currentItems.map((tanaman) => (
            <TanamanCard
              width={{ base: "100%", md: "49%" }}
              key={tanaman.id}
              jenisTanaman={tanaman}
            />
          ))}
        </Flex>

        {jenis_tanaman.length != 0 ? (
          <Paginasi
            itemsPerPage={itemsPerPage}
            totalItems={jenis_tanaman.length}
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
