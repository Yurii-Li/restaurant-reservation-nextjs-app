import {NextResponse} from "next/server";
import validator from 'validator';
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'
import * as jose from 'jose'


const prisma = new PrismaClient()


export async function POST(req: Request) {

  const {firstName, lastName, email, phone, city, password} = await req.json()


  const validationSchema = [
    {
      valid: validator.isLength(firstName, {min: 1, max: 20}),
      errorMessage: 'First name must be between 1 and 20 characters'
    },
    {
      valid: validator.isLength(lastName, {min: 1, max: 25}),
      errorMessage: 'Last name must be between 1 and 25 characters'
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is not valid'
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number is not valid'
    },
    {
      valid: validator.isLength(city, {min: 1}),
      errorMessage: 'City is not valid'
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
    }
  ]

  const errors: string[] = []

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length > 0) {
    return NextResponse.json({errorMessage: errors[0]}, {status: 400})
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (userWithEmail) {
    return NextResponse.json({errorMessage: 'Email is associated with another account'}, {status: 400})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      city,
      password: hashedPassword
    }
  })

  const alg = 'HS256'

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const token = await new jose.SignJWT({email: user.email})
    .setProtectedHeader({alg})
    .setExpirationTime("24h")
    .sign(secret)

  return NextResponse.json({
    token,
  }, {status: 200})

}


