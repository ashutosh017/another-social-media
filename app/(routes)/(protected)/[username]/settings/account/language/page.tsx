"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

export default function LanguagePage() {
  const languages = [
    { code: "en", name: "English", selected: true },
    { code: "es", name: "Español", selected: false },
    { code: "fr", name: "Français", selected: false },
    { code: "de", name: "Deutsch", selected: false },
    { code: "it", name: "Italiano", selected: false },
    { code: "pt", name: "Português", selected: false },
    { code: "ja", name: "日本語", selected: false },
    { code: "ko", name: "한국어", selected: false },
    { code: "zh", name: "中文", selected: false },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Language</h1>
      </header>

      <div className="p-4">
        <p className="text-muted-foreground mb-6">Choose your preferred language for the app interface.</p>

        <RadioGroup defaultValue="en" className="space-y-3">
          {languages.map((language) => (
            <div key={language.code} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value={language.code} id={language.code} />
                <Label htmlFor={language.code} className="font-medium cursor-pointer">
                  {language.name}
                </Label>
              </div>
              {language.selected && <Check className="h-4 w-4 text-green-600" />}
            </div>
          ))}
        </RadioGroup>

        <Button className="w-full mt-6">Save Language Preference</Button>
      </div>
    </div>
  )
}
