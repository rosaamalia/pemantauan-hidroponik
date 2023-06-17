"use client";

import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Flex,
  Stack,
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Text,
  Textarea,
  Image,
  InputLeftElement,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { IoMap } from "react-icons/io5";
import { jenis_tanaman } from "@utils/data";

export default function TambahKebun() {
  const router = useRouter();
  const [namaKebun, setNamaKebun] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jenisTanaman, setJenisTanaman] = useState("1");

  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
    address: "",
  });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }

    if (latitude != null && longitude != null) {
      // Mengambil alamat menggunakan API geocoding (misalnya, Nominatim)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentLocation({
            latitude: latitude,
            longitude: longitude,
            address: data.display_name,
          });
          setAlamat(data.display_name);
        })
        .catch((error) => console.error(error));
    }
  }, [latitude, longitude]);

  const Peta = dynamic(() => import("@components/dasbor-akun/Peta"), {
    ssr: false,
  });

  const tambahKebun = () => {
    let data = {
      nama_kebun: namaKebun,
      deskripsi: deskripsi,
      latitude: latitude,
      longitude: longitude,
      alamat: alamat,
      id_jenis_tanaman: +jenisTanaman,
    };

    console.log(data);
  };

  return (
    <section>
      <Stack
        direction={"column"}
        alignItems={"flex-start"}
        spacing={4}
        width={"100%"}
      >
        <Stack>
          <Text>
            Masukkan informasi kebun yang ingin ditambahkan untuk dimonitor.
          </Text>
        </Stack>

        <Flex wrap={"wrap"} justifyContent={"space-between"} width={"100%"}>
          <Stack width={{ base: "100%", md: "49%" }} spacing={6}>
            <FormControl>
              <FormLabel>Nama Kebun</FormLabel>
              <FormHelperText color={"gray.400"} fontSize={"xs"}>
                Nama kebun maksimal terdiri dari 50 karakter dan harus unik.
              </FormHelperText>
              <Input
                mt={2}
                type="text"
                placeholder="Kebun Tomat"
                onChange={(e) => setNamaKebun(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Deskripsi Kebun</FormLabel>
              <FormHelperText color={"gray.400"} fontSize={"xs"}>
                Deskripsi kebun maksimal terdiri dari 1000 karakter.
              </FormHelperText>
              <Textarea
                mt={2}
                placeholder="Kebun tomat jenis tomat buah yang menggunakan nutrisi A"
                onChange={(e) => setDeskripsi(e.target.value)}
              ></Textarea>
            </FormControl>

            <FormControl>
              <FormLabel>Lokasi</FormLabel>
              <FormHelperText color={"gray.400"} fontSize={"xs"}>
                Lokasi diambil otomatis berdasarkan lokasi saat ini.
              </FormHelperText>
              <InputGroup mt={2}>
                <InputLeftElement pointerEvents="none">
                  <IoMap />
                </InputLeftElement>
                {currentLocation.address != "" ? (
                  <Input
                    type="text"
                    placeholder="Lokasi"
                    value={currentLocation.address}
                    onChange={(e) => setAlamat(e.target.value)}
                    contentEditable
                  />
                ) : (
                  <Input
                    type="text"
                    placeholder="Lokasi"
                    onChange={(e) => setAlamat(e.target.value)}
                  />
                )}
              </InputGroup>
            </FormControl>

            {currentLocation.address != "" ? (
              <Peta currentLocation={currentLocation} />
            ) : (
              <></>
            )}
          </Stack>

          <Stack
            width={{ base: "100%", md: "49%" }}
            mt={{ base: "6", md: "0" }}
          >
            <FormControl>
              <FormLabel>Jenis Tanaman</FormLabel>
              <FormHelperText color={"red.400"} fontSize={"xs"}>
                Jenis tanaman tidak dapat diubah setelah kebun ditambahkan.
              </FormHelperText>
              <RadioGroup
                onChange={setJenisTanaman}
                value={jenisTanaman}
                mt={2}
              >
                <Stack direction="column" spacing={2}>
                  {jenis_tanaman.map((tanaman) => (
                    <Box
                      key={tanaman.id}
                      width={"100%"}
                      bg={"white"}
                      borderRadius={"lg"}
                      border={"1px"}
                      borderColor={"gray.200"}
                      overflow={"hidden"}
                    >
                      <label htmlFor={tanaman.id}>
                        <Flex
                          justifyContent={"space-between"}
                          direction={"row"}
                          alignItems={"center"}
                        >
                          <Stack p={2}>
                            <Radio
                              colorScheme="green"
                              value={String(tanaman.id)}
                              id={tanaman.id}
                            >
                              {tanaman.nama_tanaman}
                            </Radio>
                          </Stack>
                          <Flex width={"12"} height={"12"}>
                            <Image
                              src={tanaman.foto}
                              objectFit={"cover"}
                              alt="Gambar jenis tanaman"
                            />
                          </Flex>
                        </Flex>
                      </label>
                    </Box>
                  ))}
                </Stack>
              </RadioGroup>
            </FormControl>
          </Stack>
        </Flex>

        <Button
          colorScheme="green"
          width={{ base: "100%", md: "49%" }}
          my={6}
          onClick={tambahKebun}
        >
          Tambah Kebun
        </Button>
      </Stack>
    </section>
  );
}
