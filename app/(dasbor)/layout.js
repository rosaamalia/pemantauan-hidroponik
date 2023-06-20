"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import Loader from "@components/Loader";
import { SidebarAkun } from "@components/dasbor-akun/SidebarAkun";
import AkunContext from "@context/akunContext";
import { api } from "@utils/api";

export default function DasborLayout({ children }) {
  const router = useRouter();
  const toast = useToast();
  const { akunData, updateAkunData } = useContext(AkunContext);
  const [akun, setAkun] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    const fetchData = async () => {
      try {
        const response = await api.get("/api/akun", {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        });

        console.log(response.data.data);

        setAkun(response.data.data);
        updateAkunData(response.data);
      } catch (error) {
        toast({
          title: "Session berakhir",
          description: "Anda harus melakukan login ulang.",
          status: "info",
          duration: 9000,
          isClosable: true,
        });

        router.push("/masuk");
      }
    };

    fetchData();
  }, [updateAkunData]);

  useEffect(() => {
    if (akunData) {
      setAkun(akunData.data);
    }
  }, [akunData, setAkun]);

  return (
    <main>
      {akun != null ? (
        <SidebarAkun akun={akun}>{children}</SidebarAkun>
      ) : (
        <Loader />
      )}
    </main>
  );
}
