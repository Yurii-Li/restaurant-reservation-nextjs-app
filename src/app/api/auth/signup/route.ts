import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";

import { signUpValidator } from "@/validators";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const request = await req.json();

  const validate = signUpValidator.validate(request);

  if (validate.error) {
    return NextResponse.json(
      { errorMessage: validate.error.message },
      { status: 400 },
    );
  }

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: request.email,
    },
  });

  if (userWithEmail) {
    return NextResponse.json(
      { errorMessage: "Email is associated with another account" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(request.password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: request.firstName,
      last_name: request.lastName,
      email: request.email,
      phone: request.phone,
      city: request.city,
      password: hashedPassword,
    },
  });

  const alg = "HS256";

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  const response = NextResponse.json(
    {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
    },
    { status: 200 },
  );

  response.cookies.set({
    name: "jwt",
    value: token,
    maxAge: 60 * 6 * 24,
  });

  return response;
}
