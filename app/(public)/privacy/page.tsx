export const metadata = {
  title: "Privacy Policy - TravelTools",
  description: "Read our privacy policy to learn how we protect your information.",
}

export default function PrivacyPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8 text-sm">Last updated: January 2025</p>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-orange-100 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              TravelTools is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information you provide directly to us, such as:
            </p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>Name, email address, and phone number</li>
              <li>Booking and payment information</li>
              <li>Travel preferences and history</li>
              <li>Messages sent through our contact form</li>
              <li>Profile information and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the information we collect for various purposes:
            </p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>Processing and managing your bookings</li>
              <li>Communicating with you about your trips</li>
              <li>Providing customer support</li>
              <li>Sending promotional emails and offers</li>
              <li>Analyzing usage patterns to improve our services</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell or rent your personal information to third parties. However, we may share your information
              with: service providers who help us operate our website, payment processors, and law enforcement when
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have the right to:</p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about this Privacy Policy or our privacy practices, please contact us at
              info@traveltools.com or call +91 98765 43210.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
