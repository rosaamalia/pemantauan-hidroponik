"use client";

import { useState } from "react";
import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { daftarKebun } from "@utils/data";
import { InputNotifikasi } from "@components/dasbor-kebun/InputNotifikasi";

export default function Notifikasi({ params }) {
  const [kebun, setKebun] = useState(
    daftarKebun.find((obj) => obj.id === +params.id)
  );

  const [phMin, setPhMin] = useState(0);
  const [phMax, setPhMax] = useState(0);
  const [temperaturMin, setTemperaturMin] = useState(0);
  const [temperaturMax, setTemperaturMax] = useState(0);
  const [tdsMin, setTdsMin] = useState(0);
  const [tdsMax, setTdsMax] = useState(0);
  const [intensitasCahayaMin, setIntensitasCahayaMin] = useState(0);
  const [intensitasCahayaMax, setIntensitasCahayaMax] = useState(0);
  const [kelembapanMin, setKelembapanMin] = useState(0);
  const [kelembapanMax, setKelembapanMax] = useState(0);

  const parameter = [
    {
      label: "pH",
      helper: "Nilai pH dapat diisi dalam bentuk desimal",
      min: phMin,
      max: phMax,
      setMin: setPhMin,
      setMax: setPhMax,
    },
    {
      label: "Temperatur",
      helper: "Nilai temperatur hanya dapat diisi dalam bentuk bilangan bulat",
      min: temperaturMin,
      max: temperaturMax,
      setMin: setTemperaturMin,
      setMax: setTemperaturMax,
    },
    {
      label: "TDS",
      helper: "Nilai TDS dapat diisi dalam bentuk desimal",
      min: tdsMin,
      max: tdsMax,
      setMin: setTdsMin,
      setMax: setTdsMax,
    },
    {
      label: "Intensitas Cahaya",
      helper: "Nilai intensitas cahaya dapat diisi dalam bentuk desimal",
      min: intensitasCahayaMin,
      max: intensitasCahayaMax,
      setMin: setIntensitasCahayaMin,
      setMax: setIntensitasCahayaMax,
    },
    {
      label: "Kelembapan Udara",
      helper: "Nilai kelembapan dapat diisi dalam bentuk desimal",
      min: kelembapanMin,
      max: kelembapanMax,
      setMin: setKelembapanMin,
      setMax: setKelembapanMax,
    },
  ];

  const simpanNotifikasi = () => {
    let data = {
      ph_min: +phMin,
      ph_max: +phMax,
      temperatur_min: +temperaturMin,
      temperatur_max: +temperaturMax,
      tds_min: +tdsMin,
      tds_max: +tdsMax,
      intensitas_cahaya_min: +intensitasCahayaMin,
      intensitas_cahaya_max: +intensitasCahayaMax,
      kelembapan_min: +kelembapanMin,
      kelembapan_max: +kelembapanMax,
    };

    console.log(data);
  };

  return (
    <section>
      <Stack direction={"column"} spacing={6} width={"100%"}>
        <Stack>
          <Text>
            Atur notifikasi agar selalu mengetahui keadaan terkini kebunmu.
          </Text>
        </Stack>

        <Stack
          width={{ base: "100%", lg: "70%" }}
          spacing={6}
          direction={"column"}
        >
          {parameter.map((param) => (
            <InputNotifikasi
              key={param.label}
              label={param.label}
              helper={param.helper}
              min={param.min}
              max={param.max}
              setMin={param.setMin}
              setMax={param.setMax}
            />
          ))}

          <Flex
            direction={"row"}
            bg={"green.50"}
            borderRadius={"lg"}
            p={4}
            alignItems={"center"}
          >
            <Text fontSize={"xl"}>🔔</Text>
            <Text color={"green.800"} fontSize={"sm"} ml={4}>
              Notifikasi akan dikirim melalui pesan WhatssApp
            </Text>
          </Flex>

          <Button colorScheme="green" onClick={simpanNotifikasi}>
            Simpan
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
