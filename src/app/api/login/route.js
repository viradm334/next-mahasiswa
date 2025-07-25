import prisma from "../../../../lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { createJWT } from "../../../../lib/jwt";
import logger from "@/utils/logger";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return new Response(
      JSON.stringify({ message: "Email atau password salah!" }),
      { status: 401 }
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return new Response(
      JSON.stringify({ message: "Email atau password salah!" }),
      { status: 401 }
    );
  };

  logger.info(`User ${user.id} logged in`);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await createJWT({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }, secret);

  (await cookies()).set('token', token, {
    httpOnly: true,
    path: '/',
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24
  });

  return new Response(JSON.stringify({message: 'Login berhasil!'}), {status: 200, headers: {'Content-Type': 'application/json'}});
}
