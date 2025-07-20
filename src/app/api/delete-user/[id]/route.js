import prisma from '../../../../../lib/prisma';

export async function DELETE(req, {params}){
 try{
    const {id} = await params;

    await prisma.user.delete({
      where: {
         id: Number(id)
      }
    });

    if (global._io) {
      global._io.emit('log', 'Student deleted');
    }

    return Response.json({message: 'Mahasiswa berhasil dihapus!'});
 }catch(err){
    return new Response(
        JSON.stringify({ message: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
 } 
}