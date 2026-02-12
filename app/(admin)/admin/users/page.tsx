import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import UserManagement from "@/components/admin/user-management"

export default async function UsersPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect("/admin/login")
  }

  if (session.user.role !== "admin") {
    redirect("/admin/login")
  }

  return <UserManagement />
}
