import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req){
    (await cookies()).set('token', '', {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        maxAge: 0
    });

    return NextResponse.json({message: 'Berhasil logout!'});
}