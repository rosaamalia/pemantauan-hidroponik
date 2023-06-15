"use client";

import { useState, useRef } from "react";
import {
  Box,
  Flex,
  Stack,
  HStack,
  Text,
  Image,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function EditNomorWhatsApp() {
  const router = useRouter();

  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const kirimKode = () => {
    let data = {
      nomor_whatsapp: "62" + nomorWhatsapp,
    };
    console.log("Kirim kode ke nomor", data);
  };

  return (
    <section>
      <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
        <FormControl>
          <FormLabel>Nomor WhatsApp</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Pastikan nomor WhatsApp aktif.
          </FormHelperText>
          <InputGroup mt={2}>
            <InputLeftAddon children="+62" />
            <Input
              type="tel"
              placeholder="0000000000"
              onChange={(e) => setNomorWhatsapp(e.target.value)}
            />
            <Button colorScheme="green" ml={2} onClick={kirimKode}>
              Kirim Kode Verifikasi
            </Button>
          </InputGroup>
        </FormControl>
      </Stack>
    </section>
  );
}
