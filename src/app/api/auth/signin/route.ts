import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";

import { signInValidator } from "@/validators";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const request = await req.json();

  const validate = signInValidator.validate(request);

  if (validate.error) {
    return NextResponse.json(
      { errorMessage: validate.error.message },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: request.email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { errorMessage: "Email or password is not valid" },
      { status: 401 },
    );
  }

  const passwordMatch = await bcrypt.compare(request.password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { errorMessage: "Email or password is not valid" },
      { status: 401 },
    );
  }

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
