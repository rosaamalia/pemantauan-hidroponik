"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Flex,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { IoAddCircle } from "react-icons/io5";
import { KebunCard } from "@components/dasbor-akun/KebunCard";
import { KosongCard } from "@components/dasbor-akun/KosongCard";
import Paginasi from "@components/dasbor-akun/Paginasi";
import { daftarKebun } from "@utils/data";

export default function SemuaKebun() {
  const router = useRouter();

  const [semuaKebun, setSemuaKebun] = useState(daftarKebun);
  const [query, setQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = semuaKebun.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //   const [totalItems, setTotalItems] = useState(0);

  //   useEffect(() => {
  //     fetchData(currentPage);
  //   }, [currentPage]);

  //   const fetchData = async (page) => {
  //     try {
  //       const response = await axios.get(`http://example.com/kebun?id_pengguna=1&page=${page}&limit=${itemsPerPage}`);
  //       const data = response.data.data;
  //       setSemuaKebun(data);
  //       setTotalItems(response.data.count);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const { isOpen, onOpen, onClose } = useDisclosure();

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
          {semuaKebun.length == 0 ? (
            <KosongCard
              pathGambar={"/images/dasbor-kebun/bunga-matahari.png"}
              heading={"Belum ada kebun!"}
              deskripsi={"Tambah kebun untuk memulai monitor."}
              teksTombol={"Tambah Kebun"}
              ikon={<IoAddCircle />}
              onClick={() => router.push("/kebun/tambah")}
              width={{ base: "100%", md: "49%" }}
            />
          ) : (
            currentItems.map((kebun) => (
              <KebunCard
                width={{ base: "100%", md: "49%" }}
                key={kebun.id}
                kebun={kebun}
              ></KebunCard>
            ))
          )}
        </Flex>

        {semuaKebun.length != 0 ? (
          <Paginasi
            itemsPerPage={itemsPerPage}
            totalItems={semuaKebun.length}
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
