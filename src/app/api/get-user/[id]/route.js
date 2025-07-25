import logger from '@/utils/logger';
import prisma from '../../../../../lib/prisma';

export async function GET(req, {params}){
    try{
        const {id} = await params;
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        logger.info(`Succesfully fetched user ${id} data`);

        if(!user){
            logger.info(`User fetching data failed: user not found`);
            return new Response(
                JSON.stringify({ message: 'Data mahasiswa tidak ditemukan!' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
              );
        }

        return Response.json({message: 'Berhasil mengambil data mahasiswa!', data: user});
    }catch(err){
        logger.error(`Error fetching user data: ${err.message}`);
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}