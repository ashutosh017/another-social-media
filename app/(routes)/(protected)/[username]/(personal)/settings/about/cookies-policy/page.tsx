"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CookiesPolicyPage() {
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Cookies Policy</h1>
      </header>

      <div className="p-4 space-y-6 max-w-none prose prose-sm">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Last updated: January 1, 2024</p>

          <h2 className="text-lg font-semibold mb-3">What Are Cookies</h2>
          <p className="text-sm mb-4">
            Cookies are small text files that are stored on your device when you visit our website. They help us provide
            you with a better experience by remembering your preferences and analyzing how you use our service.
          </p>

          <h2 className="text-lg font-semibold mb-3">Types of Cookies We Use</h2>

          <h3 className="font-medium mb-2">Essential Cookies</h3>
          <p className="text-sm mb-4">
            These cookies are necessary for the website to function properly. They enable basic functions like page
            navigation and access to secure areas.
          </p>

          <h3 className="font-medium mb-2">Performance Cookies</h3>
          <p className="text-sm mb-4">
            These cookies collect information about how visitors use our website, such as which pages are visited most
            often and if they get error messages.
          </p>

          <h3 className="font-medium mb-2">Functionality Cookies</h3>
          <p className="text-sm mb-4">
            These cookies allow the website to remember choices you make and provide enhanced, more personal features.
          </p>

          <h3 className="font-medium mb-2">Targeting Cookies</h3>
          <p className="text-sm mb-4">
            These cookies are used to deliver advertisements more relevant to you and your interests.
          </p>

          <h2 className="text-lg font-semibold mb-3">Managing Cookies</h2>
          <p className="text-sm mb-4">
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed.
          </p>

          <h2 className="text-lg font-semibold mb-3">Third-Party Cookies</h2>
          <p className="text-sm mb-4">
            We may also use third-party cookies from partners like Google Analytics to help us understand how our
            website is being used.
          </p>

          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-sm">
            If you have any questions about our use of cookies, please contact us at cookies@example.com.
          </p>
        </div>
      </div>
    </div>
  )
}
