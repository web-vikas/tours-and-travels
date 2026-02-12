"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        }, 3000)
      } else {
        const data = await res.json()
        setError(data.error || "Failed to send message. Please try again.")
      }
    } catch {
      setError("Failed to send message. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">Have questions? We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
            <Phone className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Phone</h3>
            <p className="text-gray-600 text-sm mb-2">+91 98765 43210</p>
            <p className="text-gray-500 text-xs">Available 24/7</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
            <Mail className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-gray-600 text-sm mb-2">info@traveltools.com</p>
            <p className="text-gray-500 text-xs">Response within 24 hours</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-orange-100">
            <MapPin className="w-8 h-8 text-orange-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Location</h3>
            <p className="text-gray-600 text-sm mb-2">New Delhi, India</p>
            <p className="text-gray-500 text-xs">India wide operations</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Booking Inquiry">Booking Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><Loader2 size={18} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </Button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg border border-orange-100 cursor-pointer group">
              <summary className="font-bold text-gray-900 flex justify-between items-center">
                How quickly do you respond to inquiries?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg border border-orange-100 cursor-pointer group">
              <summary className="font-bold text-gray-900 flex justify-between items-center">
                What if I need to cancel my booking?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">
                Cancellations are handled based on the specific package terms. Contact us for details.
              </p>
            </details>
            <details className="bg-white p-6 rounded-lg border border-orange-100 cursor-pointer group">
              <summary className="font-bold text-gray-900 flex justify-between items-center">
                Do you offer customized packages?
                <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-gray-600 mt-3">Yes! Contact us to discuss customized travel packages for groups.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
