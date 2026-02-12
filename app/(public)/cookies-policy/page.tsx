export const metadata = {
  title: "Cookies Policy - TravelTools",
  description: "Learn about how TravelTools uses cookies on our website.",
}

export default function CookiesPolicyPage() {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookies Policy</h1>
        <p className="text-gray-600 mb-8 text-sm">Last updated: January 2025</p>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-orange-100 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files that are placed on your computer, mobile phone, or other device when you
              visit a website. They help to remember information about your visit, like your language preference or
              login information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Do We Use Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">TravelTools uses cookies for various purposes:</p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly and securely
              </li>
              <li>
                <strong>Performance Cookies:</strong> Help us understand how visitors use our website
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and preferences
              </li>
              <li>
                <strong>Marketing Cookies:</strong> Track your activity across websites for targeted advertising
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Session Cookies</h3>
                <p className="text-gray-600 text-sm">
                  These are temporary cookies that exist only while your browser is open. They help maintain your login
                  session and shopping cart.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Persistent Cookies</h3>
                <p className="text-gray-600 text-sm">
                  These remain on your device even after you close your browser. They help us remember your preferences
                  and improve your experience.
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Third-Party Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Set by third-party services like analytics and advertising partners to track user behavior.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cookie Choices</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can exercise this choice by:
            </p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>Adjusting your browser settings to refuse cookies</li>
              <li>Deleting cookies from your device</li>
              <li>Using private or incognito browsing mode</li>
              <li>Opting out of third-party cookies</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              Please note that disabling cookies may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookie Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the following third-party services that set cookies:
            </p>
            <ul className="text-gray-600 space-y-2 ml-6 list-disc">
              <li>
                <strong>Google Analytics:</strong> For tracking website usage and visitor behavior
              </li>
              <li>
                <strong>Vercel Analytics:</strong> For performance monitoring and user tracking
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
            <p className="text-gray-600 leading-relaxed">
              We take the protection of your personal data seriously. While cookies may contain personal information, we
              maintain strict security measures to protect this data from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookies Policy from time to time to reflect changes in technology or regulations. We
              encourage you to review this policy periodically for updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions about our cookies policy, please contact us at info@traveltools.com or call +91
              98765 43210.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookie Consent</h2>
            <p className="text-gray-600 leading-relaxed">
              By continuing to use our website after this notice has been displayed, you consent to our use of cookies
              as described in this policy. However, you can always disable cookies through your browser settings if you
              prefer.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
