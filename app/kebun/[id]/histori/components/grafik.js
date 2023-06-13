"use client";

import { useState } from "react";
import { Button, Flex, Stack, Text, Input } from "@chakra-ui/react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const options = {
  responsive: true,
};

export default function HistoriGrafik() {
  const [label, setLabel] = useState(mendapatkanTanggal(rata_rata));
  const [dataPh, setDataPh] = useState(rata_rata.filter((obj) => "ph" in obj));
  const [dataTemperatur, setDataTemperatur] = useState(
    rata_rata.filter((obj) => "temperatur" in obj)
  );
  const [dataTds, setDataTds] = useState(
    rata_rata.filter((obj) => "tds" in obj)
  );
  const [dataIntensitasCahaya, setDataIntensitasCahaya] = useState(
    rata_rata.filter((obj) => "intensitas_cahaya" in obj)
  );
  const [dataKelembapan, setDataKelembapan] = useState(
    rata_rata.filter((obj) => "kelembapan" in obj)
  );

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
