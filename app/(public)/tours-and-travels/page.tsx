import { CheckCircle, AlertCircle, MapPin, Luggage, DollarSign, Users, CreditCard, Camera } from "lucide-react"

export const metadata = {
  title: "Tours & Travels Guidelines - TravelTools",
  description:
    "Comprehensive guidelines and rules for traveling with TravelTools. Learn best practices for booking and travel preparation.",
}

export default function ToursAndTravelsPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tours & Travels</h1>
          <p className="text-xl text-gray-600">
            Complete guidelines and best practices for an exceptional travel experience
          </p>
        </div>

        {/* Travel Preparation Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pre-Travel Preparation Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <Luggage className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Packing Checklist</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Passport and visa documents</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Travel insurance documents</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Medications and health essentials</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Comfortable clothing for the destination</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Travel adapters and chargers</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Emergency contact numbers</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <MapPin className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Destination Research</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Weather and climate conditions</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Local customs and culture</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Local cuisine and dietary options</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Public transportation options</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Safety and security information</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Important phone numbers and embassies</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <DollarSign className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Budget Planning</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Accommodation costs</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Daily meal budget</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Activity and attraction fees</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Transportation and fuel costs</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Emergency funds (20% buffer)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Tips and gratuities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
              <CreditCard className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-lg mb-3">Financial Preparation</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Inform bank of travel dates</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Carry multiple payment methods</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Exchange currency or use ATMs</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Get travel insurance coverage</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Keep emergency cash separate</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle size={16} className="text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>Document important account numbers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Essential Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Travel Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="text-orange-600" />
                Health & Safety
              </h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                <li>Get vaccinations as recommended for your destination</li>
                <li>Purchase comprehensive travel insurance</li>
                <li>Keep medical records and prescription medications</li>
                <li>Avoid travel to unsafe areas after dark</li>
                <li>Register with your embassy before traveling</li>
                <li>Stay aware of local customs and regulations</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Users className="text-orange-600" />
                Social Etiquette
              </h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                <li>Learn basic phrases in the local language</li>
                <li>Respect local customs and traditions</li>
                <li>Ask permission before photographing people</li>
                <li>Dress appropriately for cultural sites</li>
                <li>Be respectful to service staff</li>
                <li>Avoid political or religious debates</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Camera className="text-orange-600" />
                Photography Tips
              </h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                <li>Always ask before photographing locals</li>
                <li>Respect sacred sites and their photography rules</li>
                <li>Use waterproof bag for beach photography</li>
                <li>Back up photos to cloud storage</li>
                <li>Carry extra memory cards and batteries</li>
                <li>Take photos during golden hours for best results</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Luggage className="text-orange-600" />
                Luggage Management
              </h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                <li>Use TSA-approved locks for luggage</li>
                <li>Tag all bags with contact information</li>
                <li>Never pack valuables in checked baggage</li>
                <li>Keep important documents with you</li>
                <li>Take photos of your luggage</li>
                <li>Pack light to avoid excess baggage fees</li>
              </ul>
            </div>
          </div>
        </section>

        {/* During Travel Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">During Your Travel</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-orange-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Accommodation Tips</h3>
              <p className="text-gray-600 text-sm mb-3">
                Always check your accommodation for cleanliness and safety features. Keep valuables in the safe, lock
                your room, and know the emergency exit routes. Request early check-in or late check-out if needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-orange-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Transportation Safety</h3>
              <p className="text-gray-600 text-sm mb-3">
                Use registered taxis or ride-sharing apps. Avoid traveling alone at night. Share your location with
                trusted contacts. Keep your belongings close and secure in public transport.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-orange-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Food & Water Safety</h3>
              <p className="text-gray-600 text-sm mb-3">
                Eat at reputable restaurants. Avoid raw vegetables in areas with questionable water. Drink bottled or
                purified water. Be cautious with street food, but don't miss local culinary experiences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-orange-100">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Stay Connected</h3>
              <p className="text-gray-600 text-sm mb-3">
                Get a local SIM card or international roaming plan. Keep your WhatsApp active for updates from
                TravelTools. Share your itinerary with family. Charge your phone regularly and carry a portable charger.
              </p>
            </div>
          </div>
        </section>

        {/* After Travel */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Post-Travel Guidelines</h2>
          <div className="bg-white p-8 rounded-lg border border-orange-100 space-y-4">
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Share Your Feedback</h3>
                <p className="text-gray-600 text-sm">Help us improve by sharing your experience and rating your trip</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Review Your Photos</h3>
                <p className="text-gray-600 text-sm">Organize and back up all your travel photos and memories</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Complete Travel Insurance Claims</h3>
                <p className="text-gray-600 text-sm">If needed, submit any travel insurance claims promptly</p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Plan Your Next Adventure</h3>
                <p className="text-gray-600 text-sm">
                  Book your next trip with TravelTools and continue exploring the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Emergency Resources</h2>
          <div className="bg-red-50 border border-red-200 p-8 rounded-lg">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Important Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>India Emergency:</strong> 112 (Police), 100 (Police), 102 (Ambulance), 101 (Fire)
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>TravelTools Support:</strong> +91 98765 43210 (24/7 WhatsApp)
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Travel Insurance Hotline:</strong> Check your policy document
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Email Support:</strong> info@traveltools.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
