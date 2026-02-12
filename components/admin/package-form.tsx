"use client"

import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import type { Package } from "@/types/package"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Link as LinkIcon, X, Loader2 } from "lucide-react"

const packageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.string().min(1, "Destination is required"),
  duration: z.string().min(1, "Duration is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  image: z.string(),
  isLimited: z.boolean(),
})

type PackageFormValues = z.infer<typeof packageSchema>

interface PackageFormProps {
  initialPackage?: Package | null
  onSave: (data: Omit<Package, "id">) => void
  onCancel: () => void
}

export default function PackageForm({ initialPackage, onSave, onCancel }: PackageFormProps) {
  const [highlights, setHighlights] = useState<string[]>(initialPackage?.highlights || [])
  const [highlightInput, setHighlightInput] = useState("")
  const [uploading, setUploading] = useState(false)
  const [imageTab, setImageTab] = useState<string>("upload")

  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: initialPackage?.title || "",
      destination: initialPackage?.destination || "",
      duration: initialPackage?.duration || "",
      price: initialPackage?.price || 0,
      image: initialPackage?.image || "",
      isLimited: initialPackage?.isLimited || false,
    },
  })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      })
      if (res.ok) {
        const data = await res.json()
        form.setValue("image", data.path)
      } else {
        const err = await res.json()
        alert(err.error || "Upload failed")
      }
    } catch {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights((prev) => [...prev, highlightInput.trim()])
      setHighlightInput("")
    }
  }

  const removeHighlight = (index: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = (values: PackageFormValues) => {
    onSave({
      ...values,
      highlights,
    })
  }

  const imageValue = form.watch("image")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package Title *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Goa Beach Paradise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Goa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3 nights / 4 days" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (₹) *</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 15000" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Image</FormLabel>
                  <Tabs value={imageTab} onValueChange={setImageTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-3">
                      <TabsTrigger value="upload" className="flex items-center gap-1">
                        <Upload size={14} />
                        Upload
                      </TabsTrigger>
                      <TabsTrigger value="url" className="flex items-center gap-1">
                        <LinkIcon size={14} />
                        URL
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="image-upload"
                          disabled={uploading}
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                              <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                              <span className="text-sm text-gray-600">Uploading...</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <Upload className="w-8 h-8 text-gray-400" />
                              <span className="text-sm text-gray-600">Click to upload image</span>
                              <span className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </TabsContent>
                    <TabsContent value="url">
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                      </FormControl>
                    </TabsContent>
                  </Tabs>
                  {imageValue && (
                    <div className="mt-3 relative h-40 w-full rounded-lg overflow-hidden bg-gray-200">
                      <img src={imageValue || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Highlights / Activities</label>
          <div className="flex gap-2 mb-3">
            <Input
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
              placeholder="Add highlight..."
            />
            <Button type="button" onClick={addHighlight} className="bg-orange-600 hover:bg-orange-700 text-white">
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
              >
                {highlight}
                <button type="button" onClick={() => removeHighlight(index)} className="hover:text-orange-900">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="isLimited"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Limited Edition Package</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
            {initialPackage ? "Update Package" : "Create Package"}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
