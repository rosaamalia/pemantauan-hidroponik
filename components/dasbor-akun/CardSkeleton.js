"use client";

import { Flex, Skeleton } from "@chakra-ui/react";

export default function CardSkeleton({ ...rest }) {
  return (
    <Flex
      wrap={"wrap"}
      justifyContent={"space-between"}
      width={"100%"}
      {...rest}
    >
      {Array.from({ length: 4 }, (_, index) => (
        <Skeleton
          key={index}
          borderRadius={"lg"}
          startColor={"gray.50"}
          endColor={"gray.200"}
          width={{ base: "100%", md: "49%" }}
          height={40}
          mb={2}
        ></Skeleton>
      ))}
    </Flex>
  );
}
