"use client";

import { useState, useContext } from "react";
import {
  Stack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  FormHelperText,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "@chakra-ui/icons";
import { api } from "@utils/api";
import KebunContext from "@context/kebunContext";

export default function EditInformasiKebun() {
  const router = useRouter();
  const toast = useToast();
  const { kebunData, updateKebunData } = useContext(KebunContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  const [namaKebun, setNamaKebun] = useState(kebunData.nama_kebun);
  const [deskripsi, setDeskripsi] = useState(kebunData.deskripsi);

  const editKebun = async () => {
    let dataKebun = {
      nama_kebun: namaKebun,
      deskripsi: deskripsi,
    };

    try {
      const response = await api.put(`/api/kebun/${kebunData.id}`, dataKebun, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });

      const data = response.data.data;
      updateKebunData(data);

      toast({
        title: "Berhasil",
        description: "Data berhasil diperbarui",
        status: "success",
        duration: 9000,
        isClosable: true,
      });

      console.log(data);
    } catch (error) {
      console.error(error);

      if (error.response?.status != 401) {
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

  const hapusKebun = async () => {
    try {
      const response = await api.delete(`/api/kebun/${kebunData.id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });

      const data = response.data.data;

      onClose();
      router.push("/kebun");

      toast({
        title: "Berhasil",
        description: "Kebun berhasil dihapus",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);

      if (error.response?.status != 401) {
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

  return (
    <section>
      <Stack
        width={{ base: "100%", md: "70%" }}
        spacing={"6"}
        direction={"column"}
      >
        <Stack>
          <Text>Edit informasi kebun yang ingin dimonitor.</Text>
        </Stack>
        <FormControl>
          <FormLabel>Nama Kebun</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Nama kebun maksimal terdiri dari 50 karakter dan harus unik.
          </FormHelperText>
          <Input
            mt={2}
            value={namaKebun}
            onChange={(e) => setNamaKebun(e.target.value)}
            contentEditable
          />
        </FormControl>

        <FormControl>
          <FormLabel>Deskripsi</FormLabel>
          <FormHelperText color={"gray.400"} fontSize={"xs"}>
            Deskripsi kebun maksimal terdiri dari 1000 karakter.
          </FormHelperText>
          <Textarea
            mt={2}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            contentEditable
          ></Textarea>
        </FormControl>

        <Stack
          bg={"gray.50"}
          borderRadius={"lg"}
          border={"1px"}
          borderColor={"gray.200"}
          p={4}
          spacing={2}
          alignItems={"center"}
          direction={"column"}
          width={"100%"}
        >
          <Text color={"red.500"} fontSize={"xs"} textAlign={"center"}>
            Tindakan penghapusan kebun akan menyebabkan data hilang secara
            permanen.
          </Text>
          <Button
            colorScheme="red"
            variant={"outline"}
            size={"sm"}
            width={"100%"}
            rightIcon={<DeleteIcon />}
            onClick={onOpen}
          >
            Hapus Kebun
          </Button>
        </Stack>

        <Button colorScheme="green" onClick={editKebun} mt={2}>
          Simpan Informasi Kebun
        </Button>
        <Button
          colorScheme="green"
          variant={"outline"}
          onClick={() => router.push(`/kebun/${kebunData.id}/tentang`)}
        >
          Kembali
        </Button>
      </Stack>

      {/* Modal hapus */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Kebun</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Yakin untuk menghapus kebun {kebunData.nama_kebun}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={hapusKebun}>
              Hapus
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
