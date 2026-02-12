"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Trash2, Shield, ShieldOff } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().min(1, "Role is required"),
})

type CreateUserValues = z.infer<typeof createUserSchema>

interface User {
  id: string
  name: string
  email: string
  role: string
  banned?: boolean
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState("")

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "admin",
    },
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const { data } = await authClient.admin.listUsers({
        query: { limit: 100 },
      })
      if (data) {
        setUsers(data.users as unknown as User[])
      }
    } catch (err) {
      console.error("Failed to load users:", err)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: CreateUserValues) => {
    setError("")
    setCreating(true)

    try {
      const { error } = await authClient.admin.createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      })

      if (error) {
        setError(error.message || "Failed to create user")
      } else {
        form.reset()
        setShowCreateForm(false)
        loadUsers()
      }
    } catch {
      setError("Failed to create user")
    } finally {
      setCreating(false)
    }
  }

  const handleRemoveUser = async (userId: string) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return

    try {
      await authClient.admin.removeUser({ userId })
      loadUsers()
    } catch (err) {
      console.error("Failed to remove user:", err)
    }
  }

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin"
    try {
      await authClient.admin.setRole({ userId, role: newRole })
      loadUsers()
    } catch (err) {
      console.error("Failed to update role:", err)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Loading users...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage admin users</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
        >
          <UserPlus size={20} />
          Add User
        </Button>
      </div>

      {showCreateForm && (
        <Card className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Create New User</h3>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Minimum 8 characters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={creating} className="bg-orange-600 hover:bg-orange-700 text-white">
                  {creating ? "Creating..." : "Create User"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}

      {/* Users List */}
      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <span
                className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                  user.role === "admin"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleRole(user.id, user.role)}
                title={user.role === "admin" ? "Demote to user" : "Promote to admin"}
              >
                {user.role === "admin" ? <ShieldOff size={16} /> : <Shield size={16} />}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveUser(user.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-600">No users found</p>
        </Card>
      )}
    </div>
  )
}
