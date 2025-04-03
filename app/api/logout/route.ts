import { NextResponse } from "next/server";

export async function POST() {
  // 🔹 Clear the token by setting an expired cookie
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  response.headers.set("Set-Cookie", "token=; Path=/; HttpOnly; Max-Age=0");

  return response;
}
