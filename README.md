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

## Logging

Logging dilakukan dengan menggunakan library winston. Setiap HTTP request yang terjadi akan tercatat dalam log yang tersimpan dalam folder /logs. Dalam folder tersebut ada 2 jenis file, yaitu error.log dan combined.log. Semua log error akan tersimpan pada error.log sementara log selain itu akan disimpan di combined.log.

## Monitoring

Monitoring dilakukan dengan menggunakan Prometheus + Grafana. Dalam aplikasi ini ditambahkan route /api/metrics yang akan memberikan sejumlah metrics kepada prometheus dan divisualisasikan dalam Grafana dashboard. Berikut merupakan link screenshot Grafana dashboard yang telah dibuat.

https://drive.google.com/file/d/1YIVVoSsPBfib2OLH99b5BvJbKc-C2mhk/view?usp=sharing

## Langkah Pengamanan

Untuk mengamankan aplikasi dari SQL injection saya menggunakan parameterized query yang sudah dihandle oleh Prisma. Dengan menggunakan fungsi bawaan model misalnya ada script masuk maka akan diperlakukan seperti string biasa. Lalu untuk mengamankan dari serangan CSRF saya membuat cookie JWT token melakukan origin checking dengan menyematkan atribut sameSite: 'Strict' dan juga HTTPOnly: true. Kemudian juga untuk setiap data yang ditampilkan dari database, React secara otomatis akan meng-escape karakter yang berbahaya, misalkan ada data berupa tag HTML tidak akan dirender sebagai HTML, tetapi sebagai string biasa.

## Tantangan

Tantangan yang saya hadapi adalah ketika konfigurasi Grafana karena portnya bertabrakan dengan port aplikasi ini, saya selesaikan dengan membuat custom.ini untuk menyesuaikan portnya dengan yang tersedia. Pada saat membuat unit test juga terdapat kesulitan karena ada library yang tidak kompatibel dengan unit test dan ada masalah dengan babel, itu diselesaikan dengan membuat babel.jest.config.js.

## Testing

Berikut adalah unit testing yang telah dilakukan, untuk file selengkapnya bisa dicek di folder `__tests__`:

1. create.test.js (Pass)
2. delete.test.js (Pass)
3. edit.test.js (Pass)
4. get_users.test.js (Pass)
5. login.test.js (Pass)

Untuk langkah-langkah yang dilakukan dalam melakukan test, dimulai dari install library yang diperlukan, seperti jest dan node-mocks-http. Kemudian dilanjut dengan mocking keadaan yang ingin dibuat simulasi, seperti membuat user, lalu mocking fungsi, running fungsi yang dites dan expect hal-hal yang menjadi keadaan yang ditargetkan, seperti status code dan hasil dari operasi dengan database kalau ada. 

Ada kesulitan saat test ini karena library Jose untuk verifikasi token JWT, tapi hal itu diatasi dengan membuat jest.config.js dan babel.jest.config.js

## Link Deploy Aplikasi

https://next-mahasiswa.vercel.app/

## Catatan Tambahan

Ditambahkan fitur upload video youtube dengan link iframe embed dari youtube. Berikut adalah contoh kode testing pada create.test.js.

 ```js
   jest.mock('../../lib/prisma', () => ({
    __esModule: true,
    default: {
      user: {
        create: jest.fn(),
      },
    },
  }));

  it('should return 500 on error', async () => {
    prisma.user.create.mockRejectedValue(new Error('Database error'));

    const req = {
      json: async () => ({
        name: 'Jane',
        email: 'jane@example.com',
        password: '654321',
        role: 'MAHASISWA',
      }),
    };

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.message).toBe('Database error');
  });
```