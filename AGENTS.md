# AGENTS.md

Panduan untuk AI agent (dan developer) yang bekerja di project ini.
Pemilik project **bukan programmer**, jadi kode harus bisa dipahami oleh orang non-teknis.

---

## 1. Prinsip Utama

1. **Kode harus mudah dibaca orang awam.** Utamakan kejelasan daripada trik yang "pintar".
2. **Maksimal 500 baris per file.** Jika sebuah file mendekati 500 baris, pecah menjadi beberapa file yang lebih kecil dengan tugas yang jelas.
3. **Setiap function wajib diberi komentar dalam bahasa Indonesia** yang menjelaskan kegunaannya.
4. **Jangan mengubah hal di luar permintaan.** Kerjakan sesuai yang diminta saja.

---

## 2. Aturan Batas 500 Baris

- Hitung semua baris di file, termasuk komentar dan baris kosong.
- Jika file akan melewati 500 baris:
  - Pecah berdasarkan tugas (contoh: `pembayaran.js`, `validasi.js`, `laporan.js`).
  - Jangan menghapus komentar atau merapatkan kode secara berlebihan hanya demi menghemat baris.
- Satu file = satu tanggung jawab utama.
- Sebelum selesai, cek jumlah baris setiap file yang diubah atau dibuat.

---

## 3. Aturan Penulisan Kode agar Mudah Dibaca

- **Nama jelas dan deskriptif.** Gunakan nama yang menjelaskan isinya.
  - Bagus: `hitungTotalBelanja`, `daftarPelanggan`, `sudahBayar`
  - Hindari: `x`, `tmp`, `d`, `calcTot`
- **Function pendek.** Satu function mengerjakan satu hal. Idealnya di bawah 30 baris.
- **Hindari kode yang terlalu ringkas atau rumit** (misalnya rantai kondisi bersarang, satu baris berisi banyak operasi).
- **Pecah langkah panjang menjadi langkah kecil** dengan nama variabel yang menjelaskan tiap langkah.
- **Hindari angka atau teks "ajaib".** Simpan dalam konstanta bernama.
  - Bagus: `const BATAS_USIA_MINIMAL = 17;`
  - Hindari: `if (usia > 17)`
- **Struktur folder rapi dan konsisten.** Nama file menjelaskan isinya.

---

## 4. Aturan Komentar (Bahasa Indonesia)

### Wajib untuk setiap function

Tulis komentar tepat di atas function yang menjelaskan:
- **Apa kegunaannya** (dalam bahasa sehari-hari)
- **Apa yang dibutuhkan** (input)
- **Apa hasilnya** (output)

### Contoh format

```js
/**
 * Menghitung total belanja pelanggan.
 *
 * Kegunaan : Menjumlahkan harga semua barang di keranjang, lalu
 *            mengurangi diskon jika ada.
 * Input    : daftarBarang (daftar barang beserta harganya),
 *            diskon (potongan harga dalam rupiah)
 * Hasil    : Total yang harus dibayar pelanggan (angka).
 */
function hitungTotalBelanja(daftarBarang, diskon) {
  // Jumlahkan semua harga barang
  let total = 0;
  for (const barang of daftarBarang) {
    total = total + barang.harga;
  }

  // Kurangi dengan diskon
  return total - diskon;
}
```

### Komentar tambahan

- Tambahkan komentar singkat di dalam function pada bagian yang tidak langsung jelas.
- Jelaskan **"kenapa"**, bukan hanya **"apa"**, jika ada keputusan yang tidak biasa.
- Beri komentar di bagian atas setiap file: satu atau dua kalimat tentang tujuan file itu.
- Jaga komentar tetap akurat. Jika kode berubah, **perbarui komentarnya**.
- Gunakan bahasa Indonesia yang sederhana. Jika harus memakai istilah teknis, jelaskan artinya.

---

## 5. Cara Agent Menjelaskan Pekerjaannya

Setelah selesai mengerjakan sesuatu, jelaskan kepada pemilik project:

1. **Apa yang diubah**, dalam bahasa awam (tanpa jargon berlebihan).
2. **File mana yang dibuat atau diubah.**
3. **Cara mencoba hasilnya**, jika relevan.
4. **Hal yang perlu diperhatikan**, jika ada risiko atau asumsi.

Jika ada istilah teknis yang tidak bisa dihindari, beri penjelasan singkat.

---

## 6. Checklist Sebelum Selesai

- [ ] Kode mudah dibaca dan memakai nama yang jelas
- [ ] Setiap function punya komentar bahasa Indonesia (kegunaan, input, hasil)
- [ ] Setiap file yang disentuh tidak lebih dari 500 baris
- [ ] Bagian atas file punya komentar tujuan file
- [ ] Komentar lama sudah diperbarui jika kodenya berubah
- [ ] Penjelasan ke pemilik project ditulis dengan bahasa sederhana