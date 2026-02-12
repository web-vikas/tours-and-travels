import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { name, email, phone, subject, message } = body

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Name, email, subject, and message are required" },
      { status: 400 }
    )
  }

  const submission = await prisma.contactSubmission.create({
    data: { name, email, phone: phone || null, subject, message },
  })

  return NextResponse.json(submission, { status: 201 })
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(submissions)
}
