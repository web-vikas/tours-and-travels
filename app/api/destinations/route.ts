import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
  const destinations = await prisma.destination.findMany({
    orderBy: { order: "asc" },
  })
  return NextResponse.json(destinations)
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const count = await prisma.destination.count()

  const destination = await prisma.destination.create({
    data: {
      name: body.name,
      tagline: body.tagline,
      image: body.image,
      order: body.order ?? count,
    },
  })

  return NextResponse.json(destination, { status: 201 })
}
