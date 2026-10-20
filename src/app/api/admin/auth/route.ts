import { NextRequest, NextResponse } from "next/server"

/**
 * Admin authentication API.
 * POST /api/admin/auth
 * Body: { email, password }
 */

const ADMIN_EMAIL = "dires7481@gmail.com"
const ADMIN_PASSWORD = "dg1234"
const SESSION_DURATION = 24 * 60 * 60 * 1000

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      )
    }

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials." },
        { status: 401 }
      )
    }

    const expires = Date.now() + SESSION_DURATION
    const token = Buffer.from(`${email}:${expires}`).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      email,
      expires: new Date(expires).toISOString(),
    })
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "/api/admin/auth",
  })
}
