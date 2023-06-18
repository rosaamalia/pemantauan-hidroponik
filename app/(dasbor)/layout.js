"use client";

import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { SidebarAkun } from "@components/dasbor-akun/SidebarAkun";
import AkunContext from "@context/akunContext";
import { SemuaKebunProvider } from "@context/semuaKebunContext";
import { api } from "@utils/api";

export default function DasborLayout({ children }) {
  const router = useRouter();
  const toast = useToast();
  const { akunData, updateAkunData } = useContext(AkunContext);
  const [akun, setAkun] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (akunData == null) {
      api
        .get("/api/akun", {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((response) => {
          setAkun(response.data.data);
          updateAkunData(response.data);
        })
        .catch((error) => {
          toast({
            title: "Session berakhir",
            description: "Anda harus melakukan login ulang.",
            status: "info",
            duration: 9000,
            isClosable: true,
          });

          router.push("/masuk");
        });
    } else {
      setAkun(akunData.data);
    }
  }, [updateAkunData, akunData, router, toast]);

  return (
    <main>
      <SemuaKebunProvider>
        {akun != null ? (
          <SidebarAkun akun={akun}>{children}</SidebarAkun>
        ) : (
          <p>Loading ...</p>
        )}
      </SemuaKebunProvider>
    </main>
  );
}
