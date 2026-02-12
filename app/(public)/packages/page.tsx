import type { Package } from "@/types/package"
import PackageCard from "@/components/packages/package-card"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function PackagesPage() {
  const [packages, whatsappSetting] = await Promise.all([
    prisma.package.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.settings.findUnique({ where: { key: "whatsappNumber" } }),
  ])

  const whatsappNumber = whatsappSetting?.value || "+919876543210"

  const pkgs: Package[] = packages.map((p) => ({
    id: p.id,
    title: p.title,
    destination: p.destination,
    duration: p.duration,
    price: p.price,
    highlights: p.highlights,
    image: p.image,
    isLimited: p.isLimited,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Travel Packages</h2>
          <p className="text-gray-600">Choose from our curated selection of unforgettable experiences</p>
        </div>

        {pkgs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No packages available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
