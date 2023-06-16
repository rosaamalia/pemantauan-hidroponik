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
  Link
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

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const codeInputs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      setVerificationCode((prevCode) => {
        const newCode = [...prevCode];
        newCode[index] = value;

        return newCode;
      });

      if (value) {
        focusNextInput(index);
      } else {
        focusPreviousInput(index);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !verificationCode[index]) {
      focusPreviousInput(index);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusPreviousInput(index);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusNextInput(index);
    }
  };

  const focusNextInput = (index) => {
    if (codeInputs.current[index + 1]) {
      codeInputs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (codeInputs.current[index - 1]) {
      codeInputs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = verificationCode.join("");
    console.log("Kode verifikasi:", code);
  };

  const kirimUlang = () => {
    console.log("Kirim ulang");
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
          </InputGroup>
        </FormControl>
        <Button colorScheme="green" width={"fit-content"} onClick={kirimKode}>
          Kirim Kode Verifikasi
        </Button>

        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={4} width={"100%"}>
            <FormControl>
              <FormLabel>Kode Verifikasi</FormLabel>
              <FormHelperText color={"gray.400"} fontSize={"xs"}>
                  Kami mengirimkan kode ke nomor WhatsApp +62 {nomorWhatsapp}
              </FormHelperText>
              <Stack direction={"row"} spacing={2} mt={2} justifyContent={"center"}>
                {verificationCode.map((value, index) => (
                  <Input
                    htmlSize={3}
                    width="20%"
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength="1"
                    ref={(input) => (codeInputs.current[index] = input)}
                    textAlign={"center"}
                  />
                ))}
              </Stack>
              <Text mt={2}>
                Belum mendapatkan kode?{" "}
                <Link color={"green.500"} onClick={kirimUlang}>
                  Klik untuk kirim ulang
                </Link>
              </Text>
            </FormControl>
            <Flex wrap={"wrap"} justifyContent={"space-between"}>
              {verificationCode.includes("") ? (
                <Button colorScheme="green" width={{base: "100%", md: "49%"}} isDisabled>
                  Verifikasi
                </Button>
              ) : (
                <Button colorScheme="green" width={{base: "100%", md: "49%"}} type="submit">
                  Verifikasi
                </Button>
              )}
              <Button colorScheme="green" width={{base: "100%", md: "49%"}} mt={{base: "2", md: "0"}} variant={"outline"} onClick={() => router.push("/profil/edit")}>
                Kembali
              </Button>
            </Flex>

          </Stack>
        </form>
      </Stack>
    </section>
  );
}
