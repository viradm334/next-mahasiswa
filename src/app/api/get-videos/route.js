import prisma from '../../../../lib/prisma';
import logger from '@/utils/logger';

export async function GET(req) {
  try {
    logger.info('Fetching all videos');
    const videos = await prisma.video.findMany({
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });
    return Response.json({message: "Berhasil mengambil data mahasiswa!", data: videos});
  } catch (err) {
    logger.error(`Error fetching videos: ${err.message}`);
    return new Response(
      JSON.stringify({ message: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
