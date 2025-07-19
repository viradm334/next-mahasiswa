import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const roleRoutes = {
    '/dashboard': ['DOSEN', 'MAHASISWA'],
    '/mahasiswa': 'DOSEN'
}

export async function middleware(req){
    const token = req.cookies.get('token')?.value;
    console.log("Token from cookie:", token);
    const pathname = req.nextUrl.pathname;

    const matchesRole = Object.keys(roleRoutes).find(route => pathname.startsWith(route));

    if(matchesRole){
        if(!token){
            return NextResponse.redirect(new URL('/login', req.url));
        }
    };

    try{
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload} = await jwtVerify(token, secret);

        const allowedRoles = Array.isArray(roleRoutes[matchesRole]) ? roleRoutes[matchesRole] : [roleRoutes[matchesRole]];

        if(!allowedRoles.includes(payload.role)){
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }

    } catch(err){
        console.error(`Verifikasi token gagal: ${err}`);
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
      '/dashboard/:path*',
      '/mahasiswa/:path*',
    ],
  };

  