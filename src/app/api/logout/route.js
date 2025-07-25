import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import logger from "@/utils/logger";

export async function POST(req){
    (await cookies()).set('token', '', {
        httpOnly: true,
        path: '/',
        sameSite: 'Strict',
        maxAge: 0
    });
    logger.info('User logged out');

    return NextResponse.json({message: 'Berhasil logout!'});
}