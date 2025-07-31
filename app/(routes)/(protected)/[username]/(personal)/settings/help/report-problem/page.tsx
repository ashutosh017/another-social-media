"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReportProblemPage() {
  const problemTypes = [
    { id: "bug", label: "Something isn't working" },
    { id: "spam", label: "Spam or abuse" },
    { id: "harassment", label: "Harassment or bullying" },
    { id: "inappropriate", label: "Inappropriate content" },
    { id: "privacy", label: "Privacy concern" },
    { id: "other", label: "Something else" },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Report a Problem</h1>
      </header>

      <div className="p-4 space-y-6">
        <div>
          <Label className="text-base font-medium">What type of problem are you experiencing?</Label>
          <RadioGroup className="mt-3 space-y-3">
            {problemTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Label htmlFor={type.id} className="cursor-pointer">
                  {type.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-medium">
            Please describe the problem
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us what happened. Include as much detail as possible..."
            className="mt-2 min-h-[120px]"
          />
        </div>

        <div>
          <Label htmlFor="steps" className="text-base font-medium">
            Steps to reproduce (optional)
          </Label>
          <Textarea
            id="steps"
            placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
            className="mt-2 min-h-[100px]"
          />
        </div>

        <Button className="w-full">Submit Report</Button>

        <p className="text-xs text-muted-foreground text-center">
          We'll review your report and get back to you if we need more information.
        </p>
      </div>
    </div>
  )
}
