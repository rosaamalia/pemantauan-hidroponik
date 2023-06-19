"use client";

import { useEffect, useState } from "react";
import { Button, Flex, Stack, Text, Input, useToast } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { rata_rata } from "@utils/data";
import { mendapatkanTanggal } from "@utils/helper";
import { api } from "@utils/api";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
};

export default function HistoriGrafik({ idKebun }) {
  const toast = useToast();
  const [label, setLabel] = useState([]);
  const [dataPh, setDataPh] = useState([]);
  const [dataTemperatur, setDataTemperatur] = useState([]);
  const [dataTds, setDataTds] = useState([]);
  const [dataIntensitasCahaya, setDataIntensitasCahaya] = useState([]);
  const [dataKelembapan, setDataKelembapan] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
      try {
        const response = await api.get(`/api/kebun/${idKebun}/data/rata-rata`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });
        const data = response.data.data;
        setLabel(mendapatkanTanggal(data));
        setDataPh(data.filter((obj) => "ph" in obj));
        setDataTemperatur(data.filter((obj) => "temperatur" in obj));
        setDataTds(data.filter((obj) => "tds" in obj));
        setDataIntensitasCahaya(
          data.filter((obj) => "intensitas_cahaya" in obj)
        );
        setDataKelembapan(data.filter((obj) => "kelembapan" in obj));

        console.log(response.data);
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
    };

    fetchData();
  }, [idKebun, toast]);

  const dataParameter = [
    {
      parameter: "pH",
      data: {
        labels: label,
        datasets: [
          {
            data: label.map((label) => dataPh[0].ph[label]),
            backgroundColor: "rgba(56, 161, 105, 0.85)",
          },
        ],
      },
    },
    {
      parameter: "Temperatur",
      data: {
        labels: label,
        datasets: [
          {
            data: label.map((label) => dataTemperatur[0].temperatur[label]),
            backgroundColor: "rgba(56, 161, 105, 0.85)",
          },
        ],
      },
    },
    {
      parameter: "TDS",
      data: {
        labels: label,
        datasets: [
          {
            data: label.map((label) => dataTds[0].tds[label]),
            backgroundColor: "rgba(56, 161, 105, 0.85)",
          },
        ],
      },
    },
    {
      parameter: "Intensitas Cahaya",
      data: {
        labels: label,
        datasets: [
          {
            data: label.map(
              (label) => dataIntensitasCahaya[0].intensitas_cahaya[label]
            ),
            backgroundColor: "rgba(56, 161, 105, 0.85)",
          },
        ],
      },
    },
    {
      parameter: "Kelembapan",
      data: {
        labels: label,
        datasets: [
          {
            data: label.map((label) => dataKelembapan[0].kelembapan[label]),
            backgroundColor: "rgba(56, 161, 105, 0.85)",
          },
        ],
      },
    },
  ];

  return (
    <Stack
      mt={4}
      direction={"column"}
      alignItems={"flex-start"}
      spacing={4}
      width={"100%"}
    >
      <Text>
        Rerata nilai parameter per hari dalam seminggu dalam bentuk grafik
      </Text>
      <Stack bgColor={"gray.50"} borderRadius={"lg"} px={6} py={4} mb={4}>
        <Text>
          Minggu: {label[0]} - {label[6]}
        </Text>
      </Stack>

      <Stack width={{ base: "100%", md: "70%" }} spacing={6}>
        {dataParameter.map((data) => (
          <Stack
            direction={"column"}
            bg={"white"}
            borderRadius={"lg"}
            border={"1px"}
            borderColor={"gray.200"}
            spacing={4}
            p={6}
            width={"100%"}
            key={data.parameter}
          >
            <Text fontWeight={"semibold"} color={"green.900"}>
              {data.parameter}
            </Text>
            <Bar options={options} data={data.data} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
