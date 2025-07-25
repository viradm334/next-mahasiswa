import logger from '@/utils/logger';
import prisma from '../../../../../lib/prisma';

export async function PUT(req, {params}){
    try{
        const {id} = await params;
        const body = await req.json();
        const {name, nim, email, jurusan, nip} = body;

        const updated = await prisma.user.update({
            where: {id: Number(id)},
            data: {
                name, 
                nim,
                email, 
                jurusan,
                nip
            }
        });

        logger.info(`User ${id} data has been updated`);

        return Response.json({message: 'Berhasil mengubah data user!', data: updated});
    }catch(err){
        logger.error(`Error updating data: ${err.message}`);
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}