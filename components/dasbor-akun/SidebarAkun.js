"use client";

import NextLink from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  Stack,
  Button,
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
import {
  IoHome,
  IoFlower,
  IoAddCircle,
  IoNewspaper,
  IoInformationCircle,
  IoMenu,
  IoLogOut,
} from "react-icons/io5";

const MenuUtama = [
  { name: "Beranda", icon: IoHome, route: "/beranda" },
  { name: "Semua Kebun", icon: IoFlower, route: "/kebun" },
  { name: "Tambah Kebun", icon: IoAddCircle, route: "/kebun/tambah" },
];
const Informasi = [
  { name: "Informasi Tanaman", icon: IoNewspaper, route: "/informasi-tanaman" },
  {
    name: "Tutorial Integrasi",
    icon: IoInformationCircle,
    route: "/tutorial-integrasi",
  },
];

export function SidebarAkun({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nama, setNama] = useState("Kim Jiwoo 김지우");
  const [profil, setProfil] = useState(
    "https://i.pinimg.com/564x/6b/0a/ff/6b0aff7fd2d02a6394026c0551ad4226.jpg"
  );

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        nama={nama}
        profil={profil}
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
          <SidebarContent onClose={onClose} nama={nama} profil={profil} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

function SidebarContent({ nama, profil, onClose, ...rest }) {
  const routeName = usePathname();
  const router = useRouter();

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

      <Text
        fontSize={"xs"}
        color={"blackAlpha.400"}
        fontWeight={"bold"}
        mb={2}
        mx={4}
      >
        MENU UTAMA
      </Text>
      <Stack spacing={2}>
        {MenuUtama.map((link) =>
          routeName == link.route ? (
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

      <Text
        fontSize={"xs"}
        color={"blackAlpha.400"}
        fontWeight={"bold"}
        mb={2}
        mt={6}
        mx={4}
      >
        INFORMASI
      </Text>
      <Stack spacing={2}>
        {Informasi.map((link) =>
          routeName == link.route ? (
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

      <Stack mt={6} mx={4}>
        <Box
          p={4}
          bg={"gray.50"}
          borderRadius="lg"
          cursor={"pointer"}
          onClick={() => router.push("/profil")}
        >
          <Flex
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Avatar
              name={nama}
              w={10}
              h={10}
              borderRadius={"md"}
              src={profil}
              mr={4}
            />
            <Flex direction={"column"} justifyContent={"space-between"}>
              <Text fontWeight={"semibold"} noOfLines={1}>
                {nama}
              </Text>
              <Link
                color={"blackAlpha.400"}
                as={NextLink}
                href="/profil"
                fontSize={"xx-small"}
                fontWeight={"bold"}
              >
                PROFIL SELENGKAPNYA
              </Link>
            </Flex>
          </Flex>
        </Box>
        <Button
          variant={"outline"}
          colorScheme="gray"
          rightIcon={<IoLogOut />}
          size={"sm"}
        >
          Keluar
        </Button>
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

function MobileNav({ onOpen, ...rest }) {
  const routeName = usePathname();
  const [namaHalaman, setNamaHalaman] = useState("");

  const getRouteName = (route) => {
    const menu = MenuUtama.find((item) => item.route === route);
    const informasi = Informasi.find((item) => item.route === route);

    if (menu) {
      setNamaHalaman(menu.name);
    } else if (informasi) {
      setNamaHalaman(informasi.name);
    } else {
      setNamaHalaman("Profil");
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
        {namaHalaman}
      </Text>
    </Flex>
  );
}
