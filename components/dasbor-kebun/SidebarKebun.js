"use client";

import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Link,
  IconButton,
  CloseButton,
  Drawer,
  DrawerContent,
  Text,
  Icon,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  IoStatsChart,
  IoLeaf,
  IoNotifications,
  IoTimeSharp,
  IoMenu,
  IoLogOut,
} from "react-icons/io5";

export function SidebarKebun({ kebun, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MenuUtama = [
    { name: "Dasbor Kebun", icon: IoStatsChart, route: `/kebun/${kebun.id}` },
    {
      name: "Tentang Kebun",
      icon: IoLeaf,
      route: `/kebun/${kebun.id}/tentang`,
      children: {
        route: `/kebun/${kebun.id}/tentang/edit`,
      },
    },
    {
      name: "Notifikasi",
      icon: IoNotifications,
      route: `/kebun/${kebun.id}/notifikasi`,
    },
    {
      name: "Histori",
      icon: IoTimeSharp,
      route: `/kebun/${kebun.id}/histori`,
    },
  ];

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        kebun={kebun}
        menu={MenuUtama}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} kebun={kebun} menu={MenuUtama} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} kebun={kebun} menu={MenuUtama} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

function SidebarContent({ menu, kebun, onClose, ...rest }) {
  const routeName = usePathname();

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={"/images/logo.png"} height={"40"} width={"40"} alt="Logo" />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <NavItem icon={ArrowBackIcon} route={"/kebun"} bg={"gray.50"} mb={6}>
        Kembali
      </NavItem>

      <Text
        fontSize={"xs"}
        color={"blackAlpha.400"}
        fontWeight={"bold"}
        mb={2}
        mx={4}
      >
        {kebun.nama_kebun.toUpperCase()}
      </Text>
      <Stack spacing={2}>
        {menu.map((link) =>
          routeName == link.route || routeName == link.children?.route ? (
            <NavItem
              key={link.name}
              icon={link.icon}
              bg={"gray.50"}
              route={link.route}
            >
              {link.name}
            </NavItem>
          ) : (
            <NavItem key={link.name} icon={link.icon} route={link.route}>
              {link.name}
            </NavItem>
          )
        )}
      </Stack>
    </Box>
  );
}

function NavItem({ icon, route, children, ...rest }) {
  return (
    <Link
      as={NextLink}
      href={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      fontSize={"sm"}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.50",
        }}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="20" color="green.700" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
}

function MobileNav({ kebun, menu, onOpen, ...rest }) {
  const routeName = usePathname();
  const [namaHalaman, setNamaHalaman] = useState("");

  const getRouteName = (route) => {
    const currentMenu = menu.find(
      (item) => item.route === route || item.children?.route === route
    );

    if (currentMenu) {
      setNamaHalaman(currentMenu.name);
    }
  };

  useEffect(() => {
    getRouteName(routeName);
  }, [routeName]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={"flex-start"}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        mr={4}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<IoMenu />}
      />

      <Text
        display={"flex"}
        fontSize="2xl"
        fontWeight="bold"
        color={"green.900"}
      >
        {namaHalaman === "Dasbor Kebun" ? kebun.nama_kebun : namaHalaman}
      </Text>
    </Flex>
  );
}
