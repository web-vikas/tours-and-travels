"use client"

import type { Package } from "@/types/package"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface PackageCardProps {
  package: Package
  whatsappNumber?: string
}

export default function PackageCard({ package: pkg, whatsappNumber }: PackageCardProps) {
  const handleWhatsAppClick = () => {
    const number = whatsappNumber || "+919876543210"
    const message = `Hi! I'm interested in the "${pkg.title}" package. Destination: ${pkg.destination}, Duration: ${pkg.duration}, Price: ₹${pkg.price.toLocaleString("en-IN")}. Please provide more details.`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${number.replace("+", "")}?text=${encodedMessage}`, "_blank")
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col py-0">
      {/* Package Image */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-200">
        <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-full object-cover" />
        {pkg.isLimited && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Limited Edition
          </div>
        )}
      </div>

      {/* Package Details */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
          <p className="text-sm text-gray-600 mb-3">
            <span className="font-semibold text-orange-600">{pkg.destination}</span> • {pkg.duration}
          </p>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 uppercase mb-2">Highlights</p>
          <div className="flex flex-wrap gap-2">
            {pkg.highlights.map((highlight, idx) => (
              <span key={idx} className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="mb-4">
            <p className="text-gray-600 text-sm">Starting from</p>
            <p className="text-3xl font-bold text-orange-600">₹{pkg.price.toLocaleString("en-IN")}</p>
          </div>
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Book via WhatsApp
          </Button>
        </div>
      </div>
    </Card>
  )
}
