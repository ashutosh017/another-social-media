"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Privacy Policy</h1>
      </header>

      <div className="p-4 space-y-6 max-w-none prose prose-sm">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Last updated: January 1, 2024</p>

          <h2 className="text-lg font-semibold mb-3">Information We Collect</h2>
          <p className="text-sm mb-4">
            We collect information you provide directly to us, such as when you create an account, update your profile,
            post content, or contact us for support.
          </p>

          <h2 className="text-lg font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-sm mb-4">
            We use the information we collect to provide, maintain, and improve our services, process transactions, send
            communications, and protect our users.
          </p>

          <h2 className="text-lg font-semibold mb-3">Information Sharing</h2>
          <p className="text-sm mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties without your
            consent, except as described in this policy.
          </p>

          <h2 className="text-lg font-semibold mb-3">Data Security</h2>
          <p className="text-sm mb-4">
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="text-lg font-semibold mb-3">Your Rights</h2>
          <p className="text-sm mb-4">
            You have the right to access, update, or delete your personal information. You can also opt out of certain
            communications from us.
          </p>

          <h2 className="text-lg font-semibold mb-3">Cookies</h2>
          <p className="text-sm mb-4">
            We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized
            content and advertising.
          </p>

          <h2 className="text-lg font-semibold mb-3">Changes to This Policy</h2>
          <p className="text-sm mb-4">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            policy on this page.
          </p>

          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-sm">
            If you have any questions about this privacy policy, please contact us at privacy@example.com.
          </p>
        </div>
      </div>
    </div>
  )
}
