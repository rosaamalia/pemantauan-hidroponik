"use client";

import { useState } from "react";
import {
  Button,
  Stack,
  Text,
  Input,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Paginasi from "@components/dasbor-akun/Paginasi";
import { SearchIcon } from "@chakra-ui/icons";
import { data_kebun } from "@utils/data";

export default function HistoriTabel({
  tanggalAwal,
  tanggalAkhir,
  setTanggalAwal,
  setTanggalAkhir,
  setTanggal,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data_kebun.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Stack
      mt={4}
      direction={"column"}
      alignItems={"flex-start"}
      spacing={4}
      width={"100%"}
    >
      <Text>Cari data dengan memasukkan rentang tanggal</Text>

      <Stack direction={"row"} alignItems={"center"} spacing={4} wrap={"wrap"}>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Input
            type="date"
            placeholder="dd/mm/yyyy"
            value={tanggalAwal}
            onChange={(e) => setTanggalAwal(e.target.value)}
            contentEditable
          />
          <Text>-</Text>
          <Input
            type="date"
            placeholder="dd/mm/yyyy"
            value={tanggalAkhir}
            onChange={(e) => setTanggalAkhir(e.target.value)}
            contentEditable
          />
        </Stack>
        <Button
          colorScheme="green"
          rightIcon={<SearchIcon />}
          onClick={setTanggal}
        >
          Cari
        </Button>
      </Stack>

      <TableContainer mt={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tanggal</Th>
              <Th>Waktu</Th>
              <Th isNumeric>pH</Th>
              <Th isNumeric>Temperatur</Th>
              <Th isNumeric>TDS</Th>
              <Th isNumeric>Intensitas Cahaya</Th>
              <Th isNumeric>Kelembapan</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems.map((data) => (
              <Tr key={data.id}>
                <Td>{data.tanggal}</Td>
                <Td>{data.waktu}</Td>
                <Td isNumeric>{data.ph}</Td>
                <Td isNumeric>{data.temperatur}</Td>
                <Td isNumeric>{data.tds}</Td>
                <Td isNumeric>{data.intensitas_cahaya}</Td>
                <Td isNumeric>{data.kelembapan}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Paginasi
        itemsPerPage={itemsPerPage}
        totalItems={data_kebun.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Stack>
  );
}
