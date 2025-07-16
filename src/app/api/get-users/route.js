import prisma from '../../../../lib/prisma'

export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    return Response.json({message: "Berhasil mengambil data mahasiswa!", data: users});
  } catch (err) {
    return new Response(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
