A1. Hook useState tidak boleh dipanggil di dalam kondisi (if) karena urutan pemanggilan Hooks harus selalu sama pada setiap render. React mencocokkan state berdasarkan urutan pemanggilan Hooks.

Perbaikan 
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (!sudahLogin) return null;
  // ...
}


A2. Penyebabnya adalah push() mengubah array secara langsung (mutasi), sehingga referensi array tetap sama dan React mungkin tidak melakukan render ulang.

Perbaikan
const tambah = (baru) => {
  setItems([...items, baru]);
};

A3. - (a) Tanpa dependency array: Effect dijalankan setelah setiap render.
- (b) Dependency []: Effect dijalankan setelah render pertama.
- (c) Dependency [kota]: Effect dijalankan setelah render pertama dan ketika nilai kota berubah.

Cleanup function dijalankan ketika komponen dilepas (unmount) dan sebelum effect dijalankan kembali akibat perubahan dependency.

A4. State keyword sebaiknya disimpan di komponen induk karena dibutuhkan oleh FilterBar dan DaftarMenu. Konsep ini disebut lifting state up. Yang dinaikkan adalah state atau data keyword beserta fungsi untuk mengubahnya, kemudian diteruskan ke kedua komponen melalui props.

A5. Controlled component adalah input yang nilai dan perubahannya dikendalikan oleh React melalui state.

Satu fungsi handleChange dapat menangani sepuluh input karena:
1. Setiap input memiliki atribut name yang berbeda.
2. Fungsi menggunakan event.target.name dan event.target.value untuk memperbarui state input yang sesuai.