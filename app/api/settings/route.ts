import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key")
  if (!key) {
    return NextResponse.json({ error: "Key parameter required" }, { status: 400 })
  }

  const setting = await prisma.settings.findUnique({ where: { key } })
  return NextResponse.json({ value: setting?.value || null })
}

export async function PUT(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  if (!body.key || body.value === undefined) {
    return NextResponse.json({ error: "Key and value required" }, { status: 400 })
  }

  const setting = await prisma.settings.upsert({
    where: { key: body.key },
    update: { value: body.value },
    create: { key: body.key, value: body.value },
  })

  return NextResponse.json(setting)
}
