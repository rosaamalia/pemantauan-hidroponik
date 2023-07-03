"use client";

import { useState, useRef, useContext } from "react";
import {
  Flex,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { api } from "@utils/api";
import AkunContext from "@context/akunContext";

export default function EditNomorWhatsApp() {
  const router = useRouter();
  const toast = useToast();
  const { akunData, updateAkunData } = useContext(AkunContext);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const [nomorWhatsapp, setNomorWhatsapp] = useState("");
  const [errorNomorWhatsApp, setErrorNomorWhatsApp] = useState("");
  const [berhasilKirim, setBerhasilKirim] = useState(false);
  const [errorKodeVerfifikasi, setErrorKodeVerifikasi] = useState("");
  const [berhasilVerifikasi, setBerhasilVerifikasi] = useState(false);

  const kirimKode = async () => {
    let dataNomor = {
      nomor_whatsapp: "62" + nomorWhatsapp,
    };

    try {
      const response = await api.post(
        `/api/verifikasi/kirim-kode/update-nomor-whatsapp`,
        dataNomor,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      const data = response.data;
      setBerhasilKirim(true);

      toast({
        title: "Berhasil",
        description: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      console.log(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status == 400) {
        setErrorNomorWhatsApp(error.response.data.detail);
      }

      if (error.response?.status != 401 && error.response?.status != 400) {
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

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const codeInputs = useRef([]);

  const handleInputChange = (e, index) => {
    setErrorKodeVerifikasi("");

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

    let dataKode = {
      kode: code,
    };

    try {
      const response = await api.post(
        `/api/verifikasi/verifikasi-kode-nomor-whatsapp`,
        dataKode,
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }
      );

      const data = response.data;

      const updatedContextValue = { ...akunData };
      updatedContextValue.data.nomor_whatsapp = "62" + nomorWhatsapp;
      updateAkunData(updatedContextValue);

      toast({
        title: "Berhasil",
        description: data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      setBerhasilVerifikasi(true);
      console.log(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status == 400) {
        setErrorKodeVerifikasi(error.response.data.detail);
      }

      if (error.response?.status != 401 && error.response?.status != 400) {
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

  const kirimUlang = () => {
    console.log("Kirim ulang");

    kirimKode();
  };

  return (
    <section>
      <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
        <FormControl isInvalid={errorNomorWhatsApp}>
          <FormLabel>Nomor WhatsApp</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Pastikan nomor WhatsApp aktif.
          </FormHelperText>
          <InputGroup mt={2}>
            <InputLeftAddon>+62</InputLeftAddon>
            <Input
              type="tel"
              placeholder="0000000000"
              onChange={(e) => {
                setErrorNomorWhatsApp("");
                setNomorWhatsapp(e.target.value);
              }}
            />
          </InputGroup>
          {errorNomorWhatsApp && (
            <FormErrorMessage>{errorNomorWhatsApp}</FormErrorMessage>
          )}
        </FormControl>
        <Button colorScheme="green" width={"fit-content"} onClick={kirimKode}>
          Kirim Kode Verifikasi
        </Button>

        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={4} width={"100%"}>
            <FormControl isInvalid={errorKodeVerfifikasi}>
              <FormLabel>Kode Verifikasi</FormLabel>
              {berhasilKirim && (
                <FormHelperText color={"gray.400"} fontSize={"xs"}>
                  Kami mengirimkan kode ke nomor WhatsApp +62 {nomorWhatsapp}
                </FormHelperText>
              )}
              <Stack
                direction={"row"}
                spacing={2}
                mt={2}
                justifyContent={"center"}
              >
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
              {errorKodeVerfifikasi && (
                <FormErrorMessage>{errorKodeVerfifikasi}</FormErrorMessage>
              )}
            </FormControl>

            {berhasilVerifikasi ? (
              <Flex
                direction={"row"}
                bg={"green.50"}
                borderRadius={"lg"}
                p={2}
                alignItems={"center"}
              >
                <Text fontSize={"xl"}>✅</Text>
                <Text color={"green.800"} fontSize={"sm"} ml={2}>
                  Nomor WhatsApp berhasil diubah.
                </Text>
              </Flex>
            ) : (
              <Text mt={2}>
                Belum mendapatkan kode?{" "}
                <Link color={"green.500"} onClick={kirimUlang}>
                  Klik untuk kirim ulang
                </Link>
              </Text>
            )}
            <Flex wrap={"wrap"} justifyContent={"space-between"}>
              {verificationCode.includes("") ? (
                <Button
                  colorScheme="green"
                  width={{ base: "100%", md: "49%" }}
                  isDisabled
                >
                  Verifikasi
                </Button>
              ) : (
                <Button
                  colorScheme="green"
                  width={{ base: "100%", md: "49%" }}
                  type="submit"
                >
                  Verifikasi
                </Button>
              )}
              <Button
                colorScheme="green"
                width={{ base: "100%", md: "49%" }}
                mt={{ base: "2", md: "0" }}
                variant={"outline"}
                onClick={() => router.push("/profil/edit")}
              >
                Kembali
              </Button>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </section>
  );
}
