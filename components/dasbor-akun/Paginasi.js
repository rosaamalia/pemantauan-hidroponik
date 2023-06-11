"use client";

import { Flex, Stack, Button } from "@chakra-ui/react";

export default function Paginasi({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex mt={4} justifyContent={"center"} width={"100%"}>
      <Stack direction="row" spacing={2}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            size="sm"
            variant={currentPage === number ? "solid" : "outline"}
            colorScheme="green"
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        ))}
      </Stack>
    </Flex>
  );
}
