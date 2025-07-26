import logger from '@/utils/logger';
import prisma from '../../../../../lib/prisma';

export async function DELETE(req, {params}){
 try{
    const {id} = await params;

    await prisma.video.delete({
      where: {
         id: Number(id)
      }
    });
    logger.info(`Video ${id} has been deleted`);

    return Response.json({message: 'Video berhasil dihapus!'});
 }catch(err){
  logger.error(`Error deleting video: ${err.message}`);
    return new Response(
        JSON.stringify({ message: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
 } 
}