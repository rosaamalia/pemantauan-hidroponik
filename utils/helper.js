export function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${year}-${month}-${day}`;
}

export function today() {
  // Mendapatkan tanggal hari ini
  const today = new Date();

  // Mendapatkan komponen tanggal, bulan, dan tahun
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Penambahan +1 karena bulan dimulai dari 0
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function mendapatkanTanggal(rata_rata) {
  const dates = [];

  const obj = Object.values(rata_rata[0])[0];
  dates.push(...Object.keys(obj));

  return dates;
}
