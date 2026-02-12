"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"

const settingsSchema = z.object({
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
})

type SettingsValues = z.infer<typeof settingsSchema>

export default function SettingsPanel() {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      whatsappNumber: "",
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings?key=whatsappNumber")
      if (res.ok) {
        const data = await res.json()
        if (data.value) form.setValue("whatsappNumber", data.value)
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (values: SettingsValues) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "whatsappNumber", value: values.whatsappNumber }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (err) {
      console.error("Failed to save settings:", err)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Loading settings...</div>
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number for Bookings</FormLabel>
                  <FormDescription>
                    This is the number where booking notifications will be sent. Include country code (e.g., +919876543210)
                  </FormDescription>
                  <FormControl>
                    <Input type="tel" placeholder="+919876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                {saved ? "Settings Saved!" : "Save Settings"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">How It Works</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex gap-2">
            <span className="font-bold">1.</span>
            <span>Customers browse packages on the customer side</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">2.</span>
            <span>When they click &quot;Book via WhatsApp&quot;, a direct message opens with package details</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">3.</span>
            <span>The message is sent to your WhatsApp number configured above</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">4.</span>
            <span>Any changes you make to packages here appear instantly on the customer side</span>
          </li>
        </ul>
      </Card>

      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="font-semibold text-green-900 mb-3">Quick Tips</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>• Use high-quality images for better customer engagement</li>
          <li>• Mark popular packages as &quot;Limited Edition&quot; to create urgency</li>
          <li>• Update highlights and activities to reflect seasonal changes</li>
          <li>• Monitor your WhatsApp for incoming booking inquiries</li>
        </ul>
      </Card>
    </div>
  )
}
