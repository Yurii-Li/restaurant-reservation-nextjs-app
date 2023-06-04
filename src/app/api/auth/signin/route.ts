import {NextResponse} from "next/server";
import validator from 'validator';
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const {email, password} = await req.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is not valid'
    },
    {
      valid: validator.isLength(password, {min: 1}),
      errorMessage: 'Password is not valid'
    }
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  });

  if (errors.length > 0) {
    return NextResponse.json({errorMessage: errors[0]}, {status: 400})
  }

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!user) {
    return NextResponse.json({errorMessage: 'Email or password is not valid'}, {status: 401})
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return NextResponse.json({errorMessage: 'Email or password is not valid'}, {status: 401})
  }

  const alg = 'HS256'

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg})
    .setExpirationTime("24h")
    .sign(secret)

  // return NextResponse.json({token}, {status: 200})

  const response =  NextResponse.json({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone: user.phone,
    city: user.city,

  }, {status: 200})

  response.cookies.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    maxAge: 60 * 6 * 24,
  })

  return response

}
