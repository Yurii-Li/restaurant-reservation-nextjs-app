import {NextResponse} from "next/server";
import * as jose from 'jose'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {

  const bearerToken = req.headers.get('authorization')

  if (!bearerToken) {
    return NextResponse.json({errorMessage: 'Unauthorized'}, {status: 401})
  }

  const token = bearerToken.split(' ')[1]

  if (!token) {
    return NextResponse.json({errorMessage: 'Unauthorized'}, {status: 401})
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    await jose.jwtVerify(token, secret)
  } catch (e) {
    return NextResponse.json({errorMessage: 'Unauthorized'}, {status: 401})
  }

  const payload  = jose.decodeJwt(token)

  if(!payload.email) return NextResponse.json({errorMessage: 'Unauthorized'}, {status: 401})

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email as string
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      city: true,

    }
  })



  return NextResponse.json({user}, {status: 200})
}
