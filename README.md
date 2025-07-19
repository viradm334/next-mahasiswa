# Aplikasi Mahasiswa

Aplikasi dibuat untuk sebagai sistem manajemen data mahasiswa.

## Fitur yang tersedia

Ada dua jenis user dalam aplikasi ini:

- Dosen: dapat mengakses data seluruh mahasiswa, edit data mahasiswa, dan menghapus data mahasiswa.
- Mahasiswa: dapat mengubah biodatanya sendiri.

Berikut adalah halaman yang tersedia dalam aplikasi ini:

- /: landing page untuk pengunjung website
- /register: halaman untuk mendaftarkan akun baru, baik itu menjadi dosen atau mahasiswa.
- /login: halaman autentikasi untuk mengakses fitur tertentu.
- /dashboard: halaman untuk yang dikunjungi setelah berhasil login.
- /mahasiswa: halaman untuk melihat data seluruh mahasiswa.
- /edit/[:id]: untuk mengubah data mahasiswa.

Fitur ekstra:

- Login dengan google tanpa password (simulasi)
- Logging komentar dengan websocket

## Cara Menjalankan Aplikasi

1. Install package NPM dengan command berikut:

 ```powershell
   npm install
```

2. Copy isi file dari .env.example ke dalam file .env.

 ```powershell
   cp env.example .env
```

3. Projek ini menggunakan Prisma sebagai ORM. Untuk variabel DATABASE_URL pada .env bisa diisi dengan url seperti di bawah (contoh berikut menggunakan MySQL sebagai databasenya, silahkan disesuaikan dengan preferensi masing-masing). Isi juga JWT_SECRET sesuai dengan keinginan.

 ```powershell
   DATABASE_URL="mysql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>"
```

4. Generate Prisma Client

 ```powershell
   npx prisma generate
```

5. Migrate database

 ```powershell
   npx prisma migrate deploy
```

6. Jalankan aplikasi

 ```powershell
   npm run dev
```

## Security Notes

Aplikasi ini diamankan dengan middleware berbasis role. Jika user mengakses halaman yang diproteksi ketika dia belum login, maka ia akan diarahkan untuk login dan tidak bisa mengakses halaman tersebut sebelum dia berhasil login. Lalu, ada jika ada user yang telah berhasil login dan ia mencoba mengakses halaman dimana dia tidak memiliki akses terhadapnya, maka akan muncul halaman Error 401 Unauthorized. Lalu setiap password yang dimasukkan ke dalam aplikasi akan dihash dan diberi salt untuk menjamin keamanannya supaya tidak bisa dilihat siapapun. Untuk melindungi dari serangan XSS maka token untuk login disimpan dalam cookies HTTP-Only. Untuk melindungi dari SQL Injection maka setiap interaksi dengan database dilakukan menggunakan Prisma Client API yang menggunakan parameterized query, yang berarti memisahkan kode SQL dari data yang diberikan user.