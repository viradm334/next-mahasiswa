import prisma from '../../../../../lib/prisma';

export async function GET(req, {params}){
    try{
        const {id} = await params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!user){
            return new Response(
                JSON.stringify({ message: 'Data mahasiswa tidak ditemukan!' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
              );
        }

        return Response.json({message: 'Berhasil mengambil data mahasiswa!', data: user});
    }catch(err){
        console.error(err.message);
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}