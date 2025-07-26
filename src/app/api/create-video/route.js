import logger from '@/utils/logger';
import prisma from '../../../../lib/prisma';

export async function POST(req){
    function extractYouTubeId(iframeHtml) {
        const match = iframeHtml.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
      }

    try{
        const body = await req.json();
        const {title, link, userId} = body;
        const video = await prisma.video.create({
            data: {
                title,
                link: extractYouTubeId(link),
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