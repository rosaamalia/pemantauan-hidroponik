"use client";

import { useState, useEffect, useCallback } from "react";
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
  useToast,
} from "@chakra-ui/react";
import Paginasi from "@components/dasbor-akun/Paginasi";
import { SearchIcon } from "@chakra-ui/icons";
import { formatDate, today } from "@utils/helper";
import { api } from "@utils/api";

export default function HistoriTabel({ idKebun }) {
  const toast = useToast();
  const [dataKebun, setDataKebun] = useState([]);

  const [tanggalAwal, setTanggalAwal] = useState(today());
  const [tanggalAkhir, setTanggalAkhir] = useState(today());
  const [filteredByTanggal, setFilteredByTanggal] = useState(false);
  const [tanggalAwalFilter, setTanggalAwalFilter] = useState(null);
  const [tanggalAkhirFilter, setTanggalAkhirFilter] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = useCallback(
    async (page, tanggal_awal = null, tanggal_akhir = null) => {
      const token = JSON.parse(localStorage.getItem("token"));

      try {
        let url = `/api/kebun/${idKebun}/data?page=${page}`;

        if (tanggal_awal && tanggal_akhir) {
          url += `&tanggal_awal=${tanggal_awal}&tanggal_akhir=${tanggal_akhir}`;
        }

        const response = await api.get(url, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        const data = response.data.results;
        console.log(response.data);
        setDataKebun(data);
        setTotalItems(response.data.count);
      } catch (error) {
        console.error(error);

        if (error.response?.status != 401) {
          toast({
            title: "Error",
            description: error.response?.data?.detail || "Server error",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      }
    },
    [idKebun, toast]
  );

  useEffect(() => {
    if (filteredByTanggal) {
      fetchData(currentPage, tanggalAwalFilter, tanggalAkhirFilter);
    } else {
      fetchData(currentPage);
    }
  }, [
    currentPage,
    fetchData,
    filteredByTanggal,
    tanggalAwalFilter,
    tanggalAkhirFilter,
  ]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setTanggal = () => {
    console.log(formatDate(tanggalAwal), formatDate(tanggalAkhir));
    setCurrentPage(1);
    setFilteredByTanggal(true);
    setTanggalAwalFilter(formatDate(tanggalAwal));
    setTanggalAkhirFilter(formatDate(tanggalAkhir));
    fetchData(currentPage, formatDate(tanggalAwal), formatDate(tanggalAkhir));
  };

  const semuaData = () => {
    setFilteredByTanggal(false);
    setTanggalAwalFilter(null);
    setTanggalAkhirFilter(null);
    fetchData(currentPage);
  };

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

        {filteredByTanggal && (
          <Button colorScheme="gray" onClick={semuaData}>
            Semua Data
          </Button>
        )}
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
            {dataKebun.map((data) => (
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
        totalItems={totalItems}
        currentPage={currentPage}
        paginate={paginate}
      />
    </Stack>
  );
}
