import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "ivanpogi"; // Replace with a secure key

export async function authenticate(req: Request) {
  // 🔹 Get the token from the Authorization header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null; // No token, return null (handle unauthorized in route)
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    return decoded; // Return the decoded user data
  } catch (error) {
    return null; // Invalid token, return null
  }
}
