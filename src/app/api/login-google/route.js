import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(req) {
  const hashedPassword = await bcrypt.hash("google123", 10);

  const googleUser = {
    name: "Google User",
    email: "googleuser@gmail.com",
    password: hashedPassword,
    role: "MAHASISWA",
  };

  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });
  
  if (!user) {
    user = await prisma.user.create({
      data: { ...googleUser },
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(secret);

  (await cookies()).set("token", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return new Response(JSON.stringify({ message: "Login dengan google berhasil!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
