"use client";

import { Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function TutorialIntegrasi() {
  return (
    <section>
      <Stack width={{ base: "100%", md: "70%" }} spacing={6}>
        <Heading as={"h1"}>Tutorial Integrasi</Heading>

        <Image
          src="https://images.unsplash.com/photo-1602624511769-6a3487e64934?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
          width={"100%"}
          height={"30vh"}
          objectFit={"cover"}
          alt="Komponen IOT"
        />

        <Text textAlign={"justify"}>
          Berikut adalah cara menghubungkan sistem pemantauan hidroponik dengan modul IoT: <br/><br/>

<ol>
  <li>Siapkan modul IoT yang menggunakan mikrokontroler jenis NodeMCU ESP8266.</li>
  <li>Unduh program untuk mikrokontroler melalui <a href="unduh_link.com">tautan ini</a> dan install Arduino IDE dari situs resmi Arduino (<a href="https://www.arduino.cc/en/software">arduino.cc/en/software</a>).</li>
  <li>Install ESP8266 Board Library pada Arduino IDE dengan mengikuti tutorial yang tersedia di <a href="https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/">randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/</a>.</li>
  <li>Install library DHT ESP dan ArduinoJson di Arduino IDE.</li>
  <li>Buka file program dan lakukan perubahan pada beberapa baris kode berikut:
    <ul>
      <li>Baris 70 dan 71: Definisikan WiFi yang akan digunakan untuk menghubungkan modul IoT dengan jaringan.</li>
      <li>Baris 146 dan 147: Definisikan kredensial akun sistem Pemantauan Hidroponik yang diperlukan untuk mengirim data ke server.</li>
      <li>Baris 149: Definisikan ID kebun yang telah didapatkan setelah menambahkan data kebun pada sistem.</li>
    </ul>
  </li>
  <li>Upload kode program ke modul IoT dan tunggu hingga data mulai dikirimkan.</li>
  <li>Jika terdapat error, pastikan file program sudah disesuaikan dengan langkah-langkah sebelumnya.</li>
</ol>
        </Text>
      </Stack>
    </section>
  );
}
