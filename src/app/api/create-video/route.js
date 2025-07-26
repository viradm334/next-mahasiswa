import logger from '@/utils/logger';
import prisma from '../../../../lib/prisma';

export async function POST(req){
    try{
        const body = await req.json();
        const {title, link, userId} = body;
        const video = await prisma.video.create({
            data: {
                title,
                link,
                userId: Number(userId)
            }
        });
        logger.info(`New video has been uploaded`);
        return Response.json({message: 'Berhasil upload video!', data: video});
    }catch(err){
        logger.error(`Failed to upload video: ${err.message}`);
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}