import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
  const packages = await prisma.package.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(packages)
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const pkg = await prisma.package.create({
    data: {
      title: body.title,
      destination: body.destination,
      duration: body.duration,
      price: body.price,
      highlights: body.highlights || [],
      image: body.image || "",
      isLimited: body.isLimited || false,
    },
  })

  return NextResponse.json(pkg, { status: 201 })
}
