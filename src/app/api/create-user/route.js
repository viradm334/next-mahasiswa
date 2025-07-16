import prisma from '../../../../lib/prisma'

export async function POST(req){
    try{
        const body = await req.json();
        const {name, nim, email, jurusan} = body;
        const user = await prisma.user.create({
            data: {
                name,
                nim,
                email,
                jurusan
            }
        });
        return Response.json({message: 'Berhasil menambahkan mahasiswa baru!', data: user});
    }catch(err){
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}