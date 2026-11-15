# Proyek KRS KampusKita — Repository Awal

Aplikasi web KRS sederhana untuk latihan kolaborasi Git. Tidak membutuhkan backend atau instalasi dependency; data disimpan di `localStorage` browser.

## Menjalankan aplikasi

Buka `index.html` di browser. Akun demo: `mahasiswa` / `krs123`.

## Kondisi awal `main`

Repository awal hanya memiliki branch `main`. Ada dua bug yang sengaja disediakan dan dua feature yang belum diimplementasikan.

| Tugas | File utama | Jenis pekerjaan |
|---|---|---|
| Feature 1 — pencarian dan filter mata kuliah | `feature-search.js` | Implementasi feature |
| Feature 2 — peringatan bentrok jadwal | `feature-conflict.js` | Implementasi feature |
| Bug 1 — validasi password login | `auth.js` | Bug fixing |
| Bug 2 — batas maksimum 24 SKS | `krs.js` | Bug fixing |

`data.js` berisi data mata kuliah, `app.js` berisi fungsi umum antarmuka, dan `index.html` menghubungkan semua file. Mahasiswa sebaiknya hanya mengubah file sesuai pembagian tugas.

## Alur kerja yang disarankan

### Semua mahasiswa: clone

```bash
git clone <URL-REPOSITORY>
cd <NAMA-FOLDER>
git branch
```

### Tim feature: buat branch sendiri

Contoh untuk Feature 1:

```bash
git switch -c feature/search-filter-krs
# edit feature-search.js
# uji aplikasi di browser
git add feature-search.js
git commit -m "feat: add course search and filters"
git push -u origin feature/search-filter-krs
```

Feature 2 menggunakan branch dan file berbeda:

```bash
git switch -c feature/schedule-conflict-warning
# edit feature-conflict.js; krs.js sudah menyediakan hook pemanggilnya
git add feature-conflict.js
git commit -m "feat: warn about schedule conflicts"
git push -u origin feature/schedule-conflict-warning
```

### Tim bug fixing: bekerja langsung pada main

Untuk latihan sesuai skenario kelas, dua bug fixer dapat bekerja pada `main`. Agar perubahan tidak saling menimpa, lakukan secara berurutan: satu orang menyelesaikan dan push terlebih dahulu, lalu orang berikutnya menjalankan `git pull` sebelum mengedit.

```bash
git switch main
git pull origin main
# edit auth.js atau krs.js sesuai pembagian
git add auth.js
git commit -m "fix: validate login password"
git push origin main
```

Bug fixer kedua harus mengambil perubahan terbaru sebelum mulai:

```bash
git switch main
git pull origin main
# edit krs.js
git add krs.js
git commit -m "fix: enforce 24 SKS limit"
git push origin main
```

### Integrasi feature

Setelah branch feature di-push, perubahan dapat ditinjau dan digabungkan ke `main` melalui Pull Request. Jika kelas menggunakan satu repository bersama, dosen dapat menjadi reviewer/maintainer.

Jika branch feature dibuat sebelum bug fixer memperbarui `main`, mahasiswa feature perlu menyelaraskan branch dengan perubahan terbaru:

```bash
git switch feature/search-filter-krs
git fetch origin
git merge origin/main
```

Selesaikan konflik jika muncul, uji ulang aplikasi, lalu push branch.

## Skenario pengujian

- Login: username `mahasiswa`, password benar `krs123`; password salah seharusnya ditolak setelah Bug 1 diperbaiki.
- Batas SKS: pilih mata kuliah hingga 24 SKS; penambahan yang membuat total melebihi 24 harus ditolak setelah Bug 2 diperbaiki.
- Bentrok jadwal: IF209 (Senin 09:30–12:00) beririsan dengan IF201 (Senin 08:00–10:30) dan IF202 (Senin 10:30–13:00). IF201 dan IF202 sendiri tidak bentrok karena hanya bersinggungan pada batas 10:30.
- Pencarian: cari kode atau nama mata kuliah dan uji filter semester serta jenis mata kuliah.

## Catatan

Ini aplikasi demonstrasi pembelajaran, bukan sistem akademik produksi. Login hanya simulasi sisi browser dan `localStorage` bukan mekanisme autentikasi yang aman. `localStorage` juga terpisah untuk setiap browser/perangkat.
