"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Loader from "@components/Loader";
import { SidebarKebun } from "@components/dasbor-kebun/SidebarKebun";
import KebunContext from "@context/kebunContext";
import { api } from "@utils/api";

export default function DasborKebunLayout({ children, params }) {
  const router = useRouter();
  const toast = useToast();

  const { kebunData, updateKebunData } = useContext(KebunContext);
  const [kebunId, setKebunId] = useState(+params.id);
  const [kebun, setKebun] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
      try {
        const response = await api.get(`/api/kebun/${kebunId}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });

        console.log(response.data.data);

        setKebun(response.data.data);
        updateKebunData(response.data.data);
      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          toast({
            title: "Session berakhir",
            description: "Anda harus melakukan login ulang.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });

          router.push("/masuk");
        }
      }
    };

    fetchData();
  }, [router, toast, kebunId, updateKebunData]);

  useEffect(() => {
    if (kebunData) {
      setKebun(kebunData);
    }
  }, [kebunData, setKebun]);

  return (
    <main>
      {kebun ? (
        <SidebarKebun kebun={kebun}>{children}</SidebarKebun>
      ) : (
        <Loader />
      )}
    </main>
  );
}
