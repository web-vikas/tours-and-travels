import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const pkg = await prisma.package.findUnique({ where: { id } })
  if (!pkg) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }
  return NextResponse.json(pkg)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const pkg = await prisma.package.update({
    where: { id },
    data: {
      title: body.title,
      destination: body.destination,
      duration: body.duration,
      price: body.price,
      highlights: body.highlights,
      image: body.image,
      isLimited: body.isLimited,
    },
  })

  return NextResponse.json(pkg)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await prisma.package.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
