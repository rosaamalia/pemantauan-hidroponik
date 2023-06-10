"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Flex,
  Stack,
  Input,
  Button,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Link,
} from "@chakra-ui/react";

export default function VerificationForm() {
  const router = useRouter();
  const [nomorWhatsapp, setNomorWhatsapp] = useState("628123456789");
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
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <Heading as="h1" size="xl" noOfLines={1} color={"green.900"} mb={2}>
          Verifikasi Akun
        </Heading>
        <Text as={"b"} mb={8} textAlign={"center"}>
          Kami mengirimkan kode ke nomor WhatsApp {"+" + nomorWhatsapp}
        </Text>
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={4} width={"100%"}>
            <FormControl>
              <FormLabel>Kode Verifikasi</FormLabel>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
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
            </FormControl>
            {verificationCode.includes("") ? (
              <Button colorScheme="green" isDisabled>
                Verifikasi
              </Button>
            ) : (
              <Button colorScheme="green" type="submit">
                Verifikasi
              </Button>
            )}

            <Button
              colorScheme="green"
              variant={"outline"}
              onClick={() => {
                router.push("/daftar");
              }}
            >
              Kembali
            </Button>
          </Stack>
        </form>

        <Text mt={8} textAlign={"center"}>
          Belum mendapatkan kode?{" "}
          <Link color={"green.500"} onClick={kirimUlang}>
            Klik untuk kirim ulang
          </Link>
        </Text>
      </Flex>
    </section>
  );
}
