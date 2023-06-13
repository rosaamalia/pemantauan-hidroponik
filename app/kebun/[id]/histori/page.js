"use client";

import { useState } from "react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import HistoriTabel from "./components/tabel";
import HistoriGrafik from "./components/grafik";
import { formatDate, today } from "@utils/helper";

export default function Histori() {
  const [tanggalAwal, setTanggalAwal] = useState(today());
  const [tanggalAkhir, setTanggalAkhir] = useState(today());

  const setTanggal = () => {
    console.log(formatDate(tanggalAwal), formatDate(tanggalAkhir));
  };

  return (
    <section>
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Tabel</Tab>
          <Tab>Grafik</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <HistoriTabel
              tanggalAwal={tanggalAwal}
              setTanggalAwal={setTanggalAwal}
              tanggalAkhir={tanggalAkhir}
              setTanggalAkhir={setTanggalAkhir}
              setTanggal={setTanggal}
            />
          </TabPanel>
          <TabPanel p={0}>
            <HistoriGrafik />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
}
