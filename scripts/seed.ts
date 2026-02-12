import { PrismaClient } from "@prisma/client"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { admin } from "better-auth/plugins"

const prisma = new PrismaClient()

// Create a standalone auth instance for seeding (with signUp enabled)
const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false, // Allow signup for seeding
  },
  plugins: [admin()],
})

async function main() {
  console.log("Seeding database...")

  // Seed default packages
  const existingPackages = await prisma.package.count()
  if (existingPackages === 0) {
    await prisma.package.createMany({
      data: [
        {
          title: "Goa Beach Paradise",
          destination: "Goa",
          duration: "3 nights / 4 days",
          price: 15000,
          highlights: ["Beach Resort", "Water Sports", "Local Cuisine", "Sunset Cruise"],
          image: "/beautiful-goa-beach-sunset-with-palm-trees.jpg",
          isLimited: false,
        },
        {
          title: "Himalayan Trek",
          destination: "Himachal Pradesh",
          duration: "5 nights / 6 days",
          price: 22000,
          highlights: ["Mountain Trekking", "Valley Views", "Local Culture", "Adventure Activities"],
          image: "/majestic-himalayan-mountains-with-snow-peaks.jpg",
          isLimited: false,
        },
        {
          title: "Rajasthan Royal Tour",
          destination: "Rajasthan",
          duration: "4 nights / 5 days",
          price: 18000,
          highlights: ["Heritage Forts", "Palace Visits", "Desert Safari", "Traditional Art"],
          image: "/ancient-rajasthan-fort-palace-architecture.jpg",
          isLimited: true,
        },
      ],
    })
    console.log("Created 3 default packages")
  } else {
    console.log(`Packages already exist (${existingPackages}), skipping...`)
  }

  // Seed default destinations
  const existingDestinations = await prisma.destination.count()
  if (existingDestinations === 0) {
    await prisma.destination.createMany({
      data: [
        { name: "Goa", tagline: "Sun, Sand & Serenity", image: "/beautiful-goa-beach-sunset-with-palm-trees.jpg", order: 0 },
        { name: "Rajasthan", tagline: "Royal Heritage & Culture", image: "/ancient-rajasthan-fort-palace-architecture.jpg", order: 1 },
        { name: "Himalayas", tagline: "Majestic Peaks & Trails", image: "/majestic-himalayan-mountains-with-snow-peaks.jpg", order: 2 },
        { name: "Kerala", tagline: "God's Own Country", image: "/placeholder.svg?height=300&width=400&text=Kerala", order: 3 },
        { name: "Varanasi", tagline: "Spiritual Capital", image: "/placeholder.svg?height=300&width=400&text=Varanasi", order: 4 },
        { name: "Andaman", tagline: "Tropical Paradise", image: "/placeholder.svg?height=300&width=400&text=Andaman", order: 5 },
      ],
    })
    console.log("Created 6 default destinations")
  } else {
    console.log(`Destinations already exist (${existingDestinations}), skipping...`)
  }

  // Seed WhatsApp number setting
  await prisma.settings.upsert({
    where: { key: "whatsappNumber" },
    update: {},
    create: { key: "whatsappNumber", value: "+919876543210" },
  })
  console.log("WhatsApp number setting seeded")

  // Create admin user via Better Auth internal API
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@traveltools.com" },
  })

  if (!existingAdmin) {
    try {
      // Use Better Auth's internal API directly (no HTTP server needed)
      const response = await auth.api.signUpEmail({
        body: {
          name: "Admin",
          email: "admin@traveltools.com",
          password: "admin123",
        },
      })

      if (response.user) {
        // Set role to admin via Prisma
        await prisma.user.update({
          where: { email: "admin@traveltools.com" },
          data: { role: "admin" },
        })
        console.log("Admin user created: admin@traveltools.com / admin123")
      } else {
        console.log("Sign up response:", response)
      }
    } catch (err) {
      console.error("Failed to create admin user:", err)
    }
  } else {
    // Ensure existing user has admin role
    if (existingAdmin.role !== "admin") {
      await prisma.user.update({
        where: { email: "admin@traveltools.com" },
        data: { role: "admin" },
      })
      console.log("Updated existing user to admin role")
    }
    console.log("Admin user already exists")
  }

  console.log("\nSeed complete!")
  console.log("Admin credentials: admin@traveltools.com / admin123")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
