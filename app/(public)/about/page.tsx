import { CheckCircle, Star, Users, Globe } from "lucide-react"

export const metadata = {
  title: "About Us - TravelTools",
  description: "Learn about TravelTools and our mission to make travel accessible and memorable.",
}

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TravelTools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting travelers with unforgettable experiences since 2020. We believe every journey should be seamless,
            affordable, and memorable.
          </p>
        </div>

        {/* Mission Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To revolutionize the way people book travel experiences by providing curated, affordable packages with
              exceptional customer service. We empower travelers to explore the world without hassle.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-orange-100">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the most trusted travel booking platform in India, known for innovation, transparency, and
              creating life-changing travel experiences for millions of travelers.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose TravelTools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 bg-white p-6 rounded-lg border border-orange-100">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Curated Packages</h3>
                <p className="text-gray-600 text-sm">Handpicked destinations and experiences for diverse travelers</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-6 rounded-lg border border-orange-100">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Best Prices</h3>
                <p className="text-gray-600 text-sm">
                  Competitive pricing with exclusive deals and limited-time offers
                </p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-6 rounded-lg border border-orange-100">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Expert Support</h3>
                <p className="text-gray-600 text-sm">24/7 customer support via WhatsApp and email</p>
              </div>
            </div>
            <div className="flex gap-4 bg-white p-6 rounded-lg border border-orange-100">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Instant Booking</h3>
                <p className="text-gray-600 text-sm">Quick and easy booking process with real-time confirmations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-white p-6 rounded-lg border border-orange-100">
            <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg border border-orange-100">
            <div className="text-4xl font-bold text-orange-600 mb-2">150+</div>
            <div className="text-gray-600">Destinations</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg border border-orange-100">
            <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-600">Packages</div>
          </div>
          <div className="text-center bg-white p-6 rounded-lg border border-orange-100">
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>

        {/* Team Values */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-orange-100 text-center">
              <Star className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We strive for excellence in every aspect of our service and customer experience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-orange-100 text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Customer First</h3>
              <p className="text-gray-600 text-sm">Your satisfaction and trust are at the heart of everything we do.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-orange-100 text-center">
              <Globe className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Integrity</h3>
              <p className="text-gray-600 text-sm">
                Transparent operations and honest communication with all stakeholders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
