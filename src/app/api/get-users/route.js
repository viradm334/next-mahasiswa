import prisma from '../../../../lib/prisma';
import logger from '@/utils/logger';

export async function GET(req) {
  try {
    logger.info('Fetching all mahasiswa users');
    const users = await prisma.user.findMany({
      where: {role: 'MAHASISWA'}
    });
    return Response.json({message: "Berhasil mengambil data mahasiswa!", data: users});
  } catch (err) {
    logger.error(`Error fetching all mahasiswa: ${err.message}`);
    return new Response(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
