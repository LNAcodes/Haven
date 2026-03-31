import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getToken } from "next-auth/jwt";

export function withAuth(handler) {
  return async function (request, response) {
    await dbConnect();
    const session = await getServerSession(request, response, authOptions);
    const token = await getToken({ req: request });

    if (!session) {
      return response.status(401).json({ message: "Unauthorized" });
    }

    request.userId = token?.sub;
    return handler(request, response);
  };
}
