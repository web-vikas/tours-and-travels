"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Trash2, Eye, EyeOff, Clock } from "lucide-react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  read: boolean
  createdAt: string
}

export default function ContactInquiries() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    try {
      const res = await fetch("/api/contact")
      if (res.ok) {
        const data = await res.json()
        setSubmissions(data)
      }
    } catch (err) {
      console.error("Failed to load submissions:", err)
    } finally {
      setLoading(false)
    }
  }

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      })
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, read: !currentRead } : s))
        )
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, read: !currentRead })
        }
      }
    } catch (err) {
      console.error("Failed to update submission:", err)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (!window.confirm("Delete this inquiry?")) return
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" })
      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null)
        }
      }
    } catch (err) {
      console.error("Failed to delete submission:", err)
    }
  }

  const unreadCount = submissions.filter((s) => !s.read).length

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading inquiries...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
          <p className="text-gray-600 mt-1">
            {submissions.length} total {unreadCount > 0 && `(${unreadCount} unread)`}
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-12 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No contact inquiries yet</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {submissions.map((sub) => (
              <Card
                key={sub.id}
                className={`p-4 cursor-pointer transition-colors hover:border-orange-300 ${
                  selectedSubmission?.id === sub.id ? "border-orange-500 bg-orange-50" : ""
                } ${!sub.read ? "border-l-4 border-l-orange-500" : ""}`}
                onClick={() => {
                  setSelectedSubmission(sub)
                  if (!sub.read) toggleRead(sub.id, false)
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{sub.name}</p>
                      {!sub.read && (
                        <Badge className="bg-orange-100 text-orange-700 text-xs shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{sub.subject}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Submission Detail */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedSubmission.name}</h3>
                    <p className="text-sm text-gray-500">{selectedSubmission.email}</p>
                    {selectedSubmission.phone && (
                      <p className="text-sm text-gray-500">{selectedSubmission.phone}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRead(selectedSubmission.id, selectedSubmission.read)}
                    >
                      {selectedSubmission.read ? (
                        <><EyeOff className="w-4 h-4 mr-1" /> Mark Unread</>
                      ) : (
                        <><Eye className="w-4 h-4 mr-1" /> Mark Read</>
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    {selectedSubmission.subject}
                  </Badge>
                  <span className="text-xs text-gray-400 ml-3">
                    {new Date(selectedSubmission.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>

                <div className="mt-4">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                    className="inline-block"
                  >
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                      <Mail className="w-4 h-4 mr-2" /> Reply via Email
                    </Button>
                  </a>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select an inquiry to view details</p>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
