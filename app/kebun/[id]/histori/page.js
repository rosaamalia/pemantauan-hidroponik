"use client";

import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import HistoriTabel from "./components/tabel";
import HistoriGrafik from "./components/grafik";

export default function Histori({ params }) {
  return (
    <section>
      <Tabs colorScheme="green">
        <TabList>
          <Tab>Tabel</Tab>
          <Tab>Grafik</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <HistoriTabel idKebun={+params.id} />
          </TabPanel>
          <TabPanel p={0}>
            <HistoriGrafik idKebun={+params.id} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
}
