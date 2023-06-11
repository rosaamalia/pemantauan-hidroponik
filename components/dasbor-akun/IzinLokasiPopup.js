"use client";

import { useEffect, useState } from "react";

export default function IzinLokasiPopup({ setLatitude, setLongitude }) {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handlePermission = () => {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            if (result.state === "prompt") {
              setShowPopup(true);
            }
          })
          .catch((error) => {
            console.error("Error requesting geolocation permission:", error);
          });
      }
    };

    handlePermission();
  }, []);

  const handleGrantPermission = () => {
    setShowPopup(false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Lakukan sesuatu dengan data lokasi yang diperoleh
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        // console.log("Latitude:", latitude);
        // console.log("Longitude:", longitude);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  };

  const handleDenyPermission = () => {
    setShowPopup(false);
    // Lakukan sesuatu jika izin lokasi ditolak oleh pengguna
  };

  return (
    showPopup && (
      <div>
        <p>
          Untuk melihat lokasi Anda, izinkan akses lokasi pada perangkat Anda.
        </p>
        <button onClick={handleGrantPermission}>Izinkan</button>
        <button onClick={handleDenyPermission}>Tolak</button>
      </div>
    )
  );
}
