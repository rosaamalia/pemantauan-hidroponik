"use client";

import { Flex, Stack, Button } from "@chakra-ui/react";

export default function Paginasi({
  itemsPerPage,
  totalItems,
  currentPage,
  paginate,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageRangeDisplayed = 2; // Jumlah tombol halaman yang ditampilkan
  const ellipsis = "...";

  // Fungsi untuk menghasilkan daftar halaman yang akan ditampilkan
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > pageRangeDisplayed) {
      const middlePage = Math.floor(pageRangeDisplayed / 2);

      if (currentPage <= middlePage) {
        endPage = pageRangeDisplayed;
      } else if (currentPage >= totalPages - middlePage) {
        startPage = totalPages - pageRangeDisplayed + 1;
      } else {
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift(ellipsis);
    }

    if (endPage < totalPages) {
      pageNumbers.push(ellipsis);
    }

    return pageNumbers;
  };

  const renderedPages = generatePageNumbers();

  return (
    <Flex mt={4} justifyContent={"center"} width={"100%"}>
      <Stack direction="row" spacing={2}>
        <Button
          size="sm"
          variant="outline"
          colorScheme="green"
          onClick={() => paginate(currentPage - 1)}
        >
          ←
        </Button>

        {renderedPages.map((number, index) => (
          <Button
            key={index}
            size="sm"
            variant={currentPage === number ? "solid" : "outline"}
            colorScheme="green"
            onClick={() => paginate(number)}
          >
            {number === ellipsis ? ellipsis : number}
          </Button>
        ))}

        <Button
          size="sm"
          variant="outline"
          colorScheme="green"
          onClick={() => paginate(currentPage + 1)}
        >
          →
        </Button>
      </Stack>
    </Flex>
  );
}
