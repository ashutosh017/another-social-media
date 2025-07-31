"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Terms of Use</h1>
      </header>

      <div className="p-4 space-y-6 max-w-none prose prose-sm">
        <div>
          <p className="text-sm text-muted-foreground mb-4">Last updated: January 1, 2024</p>

          <h2 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-sm mb-4">
            By accessing and using this service, you accept and agree to be bound by the terms and provision of this
            agreement.
          </p>

          <h2 className="text-lg font-semibold mb-3">2. Use License</h2>
          <p className="text-sm mb-4">
            Permission is granted to temporarily download one copy of the materials on our service for personal,
            non-commercial transitory viewing only.
          </p>

          <h2 className="text-lg font-semibold mb-3">3. Disclaimer</h2>
          <p className="text-sm mb-4">
            The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or implied,
            and hereby disclaim and negate all other warranties including without limitation, implied warranties or
            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual
            property or other violation of rights.
          </p>

          <h2 className="text-lg font-semibold mb-3">4. Limitations</h2>
          <p className="text-sm mb-4">
            In no event shall our company or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on our service, even if we or our authorized representative has been notified orally or in
            writing of the possibility of such damage.
          </p>

          <h2 className="text-lg font-semibold mb-3">5. Accuracy of Materials</h2>
          <p className="text-sm mb-4">
            The materials appearing on our service could include technical, typographical, or photographic errors. We do
            not warrant that any of the materials on its service are accurate, complete, or current.
          </p>

          <h2 className="text-lg font-semibold mb-3">6. Links</h2>
          <p className="text-sm mb-4">
            We have not reviewed all of the sites linked to our service and are not responsible for the contents of any
            such linked site. The inclusion of any link does not imply endorsement by us of the site.
          </p>

          <h2 className="text-lg font-semibold mb-3">7. Modifications</h2>
          <p className="text-sm mb-4">
            We may revise these terms of service at any time without notice. By using this service, you are agreeing to
            be bound by the then current version of these terms of service.
          </p>

          <h2 className="text-lg font-semibold mb-3">8. Governing Law</h2>
          <p className="text-sm">
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably
            submit to the exclusive jurisdiction of the courts in that state or location.
          </p>
        </div>
      </div>
    </div>
  )
}
