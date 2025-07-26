import prisma from "../../../../../lib/prisma";
import logger from "@/utils/logger";

export async function GET(req, { params }) {
  try {
    logger.info("Fetching user videos");
    const { id } = await params;
    const video = await prisma.video.findUnique({ where: { id: Number(id) } });
    return Response.json({ message: "Berhasil mengambil video!", data: video });
  } catch (err) {
    logger.error(`Error fetching videos: ${err.message}`);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
