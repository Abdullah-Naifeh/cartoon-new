import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/authOptions/route"

export async function withAuth(handler) {
  return async (req, res) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }
    return handler(req, res, session)
  }
}
