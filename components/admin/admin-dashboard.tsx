"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { Package } from "@/types/package"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Plus, Edit2, Trash2, Mail } from "lucide-react"
import PackageForm from "./package-form"
import SettingsPanel from "./settings-panel"
import ContactInquiries from "./contact-inquiries"
import { authClient } from "@/lib/auth-client"

interface AdminDashboardProps {
  userName: string
}

export default function AdminDashboard({ userName }: AdminDashboardProps) {
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>([])
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    try {
      const res = await fetch("/api/packages")
      if (res.ok) {
        const data = await res.json()
        setPackages(data)
      }
    } catch (err) {
      console.error("Failed to load packages:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSavePackage = async (packageData: Omit<Package, "id">) => {
    try {
      if (editingPackage) {
        const res = await fetch(`/api/packages/${editingPackage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(packageData),
        })
        if (res.ok) {
          const updated = await res.json()
          setPackages((prev) => prev.map((p) => (p.id === editingPackage.id ? updated : p)))
        }
      } else {
        const res = await fetch("/api/packages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(packageData),
        })
        if (res.ok) {
          const newPkg = await res.json()
          setPackages((prev) => [newPkg, ...prev])
        }
      }
    } catch (err) {
      console.error("Failed to save package:", err)
    }
    setEditingPackage(null)
    setShowForm(false)
  }

  const handleDeletePackage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return

    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" })
      if (res.ok) {
        setPackages((prev) => prev.filter((p) => p.id !== id))
      }
    } catch (err) {
      console.error("Failed to delete package:", err)
    }
  }

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setEditingPackage(null)
    setShowForm(false)
  }

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">TravelTools Admin</h1>
            <p className="text-sm text-gray-500">Welcome, {userName}</p>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={20} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="packages" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="packages">Manage Packages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-1">
              <Mail size={16} />
              Inquiries
            </TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Packages</h2>
                <p className="text-gray-600 mt-1">Manage your travel packages</p>
              </div>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
              >
                <Plus size={20} />
                Add Package
              </Button>
            </div>

            {/* Package Form */}
            {showForm && (
              <Card className="p-6">
                <PackageForm initialPackage={editingPackage} onSave={handleSavePackage} onCancel={handleCancelForm} />
              </Card>
            )}

            {/* Packages List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="py-0 flex flex-col overflow-hidden">
                  <div className="relative h-40 w-full overflow-hidden bg-gray-200">
                    <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-full object-cover" />
                    {pkg.isLimited && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                        Limited
                      </div>
                    )}
                  </div>
                  <div className="flex-1 px-4 pt-3">
                    <h3 className="font-bold text-gray-900 mb-1">{pkg.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {pkg.destination} • {pkg.duration}
                    </p>
                    <p className="text-lg font-bold text-orange-600 mb-4">₹{pkg.price.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex gap-2 px-4 pb-4">
                    <Button
                      onClick={() => handleEditPackage(pkg)}
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      <Edit2 size={16} />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeletePackage(pkg.id)}
                      variant="destructive"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-1"
                    >
                      <Trash2 size={16} />
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {packages.length === 0 && !showForm && (
              <Card className="p-12 text-center">
                <p className="text-gray-600 mb-4">No packages yet</p>
                <Button onClick={() => setShowForm(true)} className="bg-orange-600 hover:bg-orange-700 text-white">
                  Create First Package
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>

          {/* Contact Inquiries Tab */}
          <TabsContent value="inquiries">
            <ContactInquiries />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
