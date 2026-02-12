import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { MapPin, Compass, Users, Award, Star, MessageCircle, ArrowRight } from "lucide-react"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export default async function Home() {
  const [packages, whatsappSetting, destinations] = await Promise.all([
    prisma.package.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.settings.findUnique({ where: { key: "whatsappNumber" } }),
    prisma.destination.findMany({ orderBy: { order: "asc" } }),
  ])

  const whatsappNumber = whatsappSetting?.value || "+919876543210"

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Discover Your Next Adventure</h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse our exclusive travel packages and book your dream vacation with just a few clicks
            </p>
            <Link href="/packages">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg"
              >
                Explore Packages
              </Button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 border-orange-100">
              <MapPin className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Exotic Destinations</h3>
              <p className="text-gray-600">Explore curated packages to the world&apos;s most beautiful destinations</p>
            </Card>
            <Card className="p-6 border-orange-100">
              <Compass className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Expert Planning</h3>
              <p className="text-gray-600">Our travel experts ensure every detail of your trip is perfect</p>
            </Card>
            <Card className="p-6 border-orange-100">
              <Users className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get instant support via WhatsApp for all your travel needs</p>
            </Card>
            <Card className="p-6 border-orange-100">
              <Award className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-2">Best Value</h3>
              <p className="text-gray-600">Premium travel experiences at competitive prices with exclusive offers</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Packages Carousel */}
      {packages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Featured Packages</h2>
              <p className="text-gray-600">Handpicked experiences for your next getaway</p>
            </div>

            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {packages.map((pkg) => (
                  <CarouselItem key={pkg.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden h-full py-0">
                      <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                        <img
                          src={pkg.image || "/placeholder.svg"}
                          alt={pkg.title}
                          className="w-full h-full object-cover"
                        />
                        {pkg.isLimited && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            Limited Edition
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{pkg.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="text-orange-600 font-medium">{pkg.destination}</span> • {pkg.duration}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {pkg.highlights.slice(0, 3).map((h, i) => (
                            <span key={i} className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                              {h}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-2xl font-bold text-orange-600">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </p>
                          <Link href="/packages">
                            <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4" />
              <CarouselNext className="hidden md:flex -right-4" />
            </Carousel>
          </div>
        </section>
      )}

      {/* Popular Destinations */}
      {destinations.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Popular Destinations</h2>
              <p className="text-gray-600">Explore the most sought-after travel destinations in India</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <Link href="/packages" key={dest.id}>
                  <Card className="group relative h-56 overflow-hidden cursor-pointer py-0">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                      <p className="text-sm text-white/80">{dest.tagline}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Happy Travelers" },
              { number: "50+", label: "Destinations" },
              { number: "100+", label: "Tour Packages" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-orange-600 mb-2">{stat.number}</p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Travelers Say</h2>
            <p className="text-gray-600">Real experiences from happy customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                text: "The Goa package was absolutely amazing! Every detail was taken care of. The resort was beautiful and the activities were so much fun. Highly recommended!",
                rating: 5,
              },
              {
                name: "Rahul Verma",
                location: "Delhi",
                text: "Our Rajasthan tour was a once-in-a-lifetime experience. The palace visits and desert safari were the highlights. The team was incredibly helpful throughout.",
                rating: 5,
              },
              {
                name: "Anita Patel",
                location: "Bangalore",
                text: "The Himalayan trek was breathtaking! Perfect organization and friendly guides. The views were stunning and the experience was unforgettable.",
                rating: 5,
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Explore?</h2>
          <p className="text-orange-100 text-lg mb-8">
            Start planning your dream vacation today. Browse our packages or reach out to us directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg">
                Browse Packages
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent("Hi! I'd like to know more about your travel packages.")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg text-orange-600"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
