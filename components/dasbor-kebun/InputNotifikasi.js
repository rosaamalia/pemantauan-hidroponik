"use client";

import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Text,
  Input,
} from "@chakra-ui/react";

export function InputNotifikasi({
  label,
  helper,
  min,
  max,
  setMin,
  setMax,
  children,
}) {
  return (
    <FormControl>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"column"}>
          <FormLabel m={0}>{label}</FormLabel>
          <Text color={"gray.400"} fontSize={"xs"}>
            {helper}
          </Text>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          ml={{ base: "4", md: "0" }}
        >
          <Input
            type="number"
            width={20}
            borderColor={"green"}
            value={min}
            onChange={(e) => setMin(e.target.value)}
            contentEditable
          />
          <Text>-</Text>
          <Input
            type="number"
            width={20}
            borderColor={"green"}
            value={max}
            onChange={(e) => setMax(e.target.value)}
            contentEditable
          />
        </Stack>
      </Flex>
    </FormControl>
  );
}
