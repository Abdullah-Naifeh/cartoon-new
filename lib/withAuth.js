// lib/withAuth.js
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export function withAuth(handler) {
  return async (req, res) => {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    // pass session along to handler
    return handler(req, res, session)
  }
}
