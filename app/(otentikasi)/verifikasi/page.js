"use client";

import { useState, useRef, useContext, useEffect } from "react";
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
  FormErrorMessage,
  Link,
  useToast,
} from "@chakra-ui/react";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";

export default function VerificationForm() {
  const router = useRouter();
  const toast = useToast();

  const { akunData } = useContext(AkunContext);
  const [nomorWhatsapp, setNomorWhatsapp] = useState(
    akunData?.data?.nomor_whatsapp
  );
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [error, setError] = useState("");
  const codeInputs = useRef([]);

  useEffect(() => {
    if (codeInputs.current[0]) {
      codeInputs.current[0].focus();
    }
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = verificationCode.join("");

    let data = {
      kode: code,
    };

    try {
      const response = await api.post(
        "/api/verifikasi/verifikasi-kode-registrasi",
        data
      );

      localStorage.setItem("token", JSON.stringify(akunData?.token));
      router.push("/beranda");
    } catch (error) {
      console.log(error);

      if (error.response.data) {
        setError(error.response.data.detail);
      }
    }
  };

  const kirimUlang = async () => {
    let data = {
      nomor_whatsapp: nomorWhatsapp,
    };

    try {
      const response = await api.post("/api/verifikasi/kirim-kode", data);

      toast({
        title: "Berhasil",
        description: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);

      if (error.response.data) {
        toast({
          title: "Error",
          description: error.response.data.detail,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
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
            <FormControl isInvalid={error}>
              <FormLabel>Kode Verifikasi</FormLabel>
              <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                {verificationCode.map((value, index) => (
                  <Input
                    htmlSize={3}
                    width="20%"
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => {
                      setError("");
                      handleInputChange(e, index);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength="1"
                    ref={(input) => (codeInputs.current[index] = input)}
                    textAlign={"center"}
                  />
                ))}
              </Stack>
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
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
