"use client";

import { useContext, useState, useEffect } from "react";
import { SidebarAkun } from "@components/dasbor-akun/SidebarAkun";
import AkunContext from "@context/akunContext";
import { useRouter } from "next/navigation";
import { api } from "@utils/api";

export default function DasborLayout({ children }) {
  const router = useRouter();
  const { akunData, updateAkunData } = useContext(AkunContext);
  const [akun, setAkun] = useState(null);

  useEffect(() => {
    let isAuthenticated;
    const savedToken = localStorage.getItem("token");
    const token = JSON.parse(savedToken);

    if (akunData == null || akunData.data?.terverifikasi == false) {
      api
        .get("/api/akun", {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAkun(response.data.data);
          updateAkunData(response.data);
          isAuthenticated = true;
        })
        .catch((error) => {
          console.error(error);
          isAuthenticated = false;
        });
    } else {
      setAkun(akunData.data);
      isAuthenticated = true;
    }

    if (!isAuthenticated) {
      router.push("/masuk");
    }
  }, [updateAkunData, akunData, router]);

  return (
    <main>
      <SidebarAkun akun={akun}>{children}</SidebarAkun>
    </main>
  );
}
