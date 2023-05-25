import {NextResponse} from "next/server";
import validator from 'validator';


export async function POST(req: Request) {

  const {firstName, lastName, email, phone, city, password} = await req.json()


  const validationSchema = [
    {
      valid: validator.isLength(firstName, {min: 1, max: 20}),
      errorMessage : 'First name must be between 1 and 20 characters'
    },
    {
      valid: validator.isLength(lastName, {min: 1, max: 25}),
      errorMessage : 'Last name must be between 1 and 25 characters'
    },
    {
      valid: validator.isEmail(email),
      errorMessage : 'Email is not valid'
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage : 'Phone number is not valid'
    },
    {
      valid: validator.isLength(city, {min: 1}),
      errorMessage : 'City is not valid'
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage : 'Password must be at least 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol'
    }
  ]

  const errors: string[] = []

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length > 0) {
    return NextResponse.json({errorMessage : errors[0]}, {status: 400})
  }

  return NextResponse.json({message: 'User created'}, {status: 200})
}

