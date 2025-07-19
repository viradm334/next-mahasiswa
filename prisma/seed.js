import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      {
        name: 'Roni',
        email: 'roni@gmail.com',
        password,
        role: 'MAHASISWA',
        jurusan: 'S1 Farmasi',
        nim: '12121212'
      },
      {
        name: 'Riri',
        email: 'riri@gmail.com',
        password,
        role: 'MAHASISWA',
        jurusan: 'S1 Psikologi',
        nim: '1201020'
      },
      {
        name: 'Nia',
        email: 'nia@gmail.com',
        password,
        role: 'DOSEN',
        nip: '12565663'
      }
    ]
  });
}

main()
  .then(async () => {
    console.log('Seeding Done');
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
