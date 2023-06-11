"use client";

import { useRef, useState } from "react";
import {
  Box,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";

export default function ModalKebunDisematkan({
  isOpen,
  onClose,
  semuaKebun,
  kebunDisematkan,
  ubahSematan,
}) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [sematan, setSematan] = useState(kebunDisematkan);

  const addItem = (id) => {
    if (!sematan.includes(id)) {
      setSematan([...sematan, id]);
    }
  };

  const removeItem = (id) => {
    const newNumbers = sematan.filter((number) => number !== id);
    setSematan(newNumbers);
  };

  const simpan = () => {
    ubahSematan(sematan);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior={"inside"}
      isCentered
      size={{ base: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"md"} noOfLines={2} pr={3}>
            Pilih kebun yang akan disematkan
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack direction={"column"} spacing={2}>
            {semuaKebun.length != 0 &&
              semuaKebun.map((kebun) => (
                <Box
                  bg={"white"}
                  borderRadius={"lg"}
                  border={"1px"}
                  borderColor={"gray.200"}
                  overflow={"hidden"}
                  key={kebun.id}
                >
                  <Flex direction={"row"} alignItems={"center"}>
                    <Stack
                      direction={"row"}
                      width={"80%"}
                      p={4}
                      spacing={3}
                      alignItems={"flex-start"}
                    >
                      {kebunDisematkan.includes(kebun.id) ? (
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              addItem(kebun.id);
                            } else {
                              removeItem(kebun.id);
                            }
                          }}
                        />
                      ) : (
                        <Checkbox
                          colorScheme="green"
                          onChange={(e) => {
                            if (e.target.checked == true) {
                              addItem(kebun.id);
                            } else {
                              removeItem(kebun.id);
                            }
                          }}
                        />
                      )}
                      <Stack direction={"column"}>
                        <Text
                          fontWeight={"semibold"}
                          noOfLines={1}
                          color={"green.900"}
                        >
                          {kebun.nama_kebun}
                        </Text>
                        <Text fontSize={"sm"} noOfLines={2}>
                          {kebun.deskripsi}
                        </Text>
                      </Stack>
                    </Stack>

                    <Flex width={"20%"} height={28}>
                      <Image
                        width={"100%"}
                        objectFit="cover"
                        src={kebun.jenis_tanaman.foto}
                        alt={kebun.jenis_tanaman.nama_tanaman}
                      />
                    </Flex>
                  </Flex>
                </Box>
              ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={simpan}>
            Simpan Sematan
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
