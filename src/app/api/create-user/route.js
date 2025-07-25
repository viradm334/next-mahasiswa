import logger from '@/utils/logger';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req){
    try{
        const body = await req.json();
        const {name, email, password, role} = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        });
        logger.info(`New user has been registered`);
        return Response.json({message: 'Berhasil membuat akun!', data: user});
    }catch(err){
        logger.error(`Failed to register user: ${err.message}`);
        return new Response(
            JSON.stringify({ message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
          );
    }
}