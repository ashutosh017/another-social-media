"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield, Lock, Eye, UserCheck } from "lucide-react"
import Link from "next/link"

export default function PrivacySecurityPage() {
  const securityTopics = [
    {
      icon: Shield,
      title: "Account Security",
      description: "Learn how to keep your account secure with strong passwords and two-factor authentication.",
      articles: [
        "Creating a strong password",
        "Setting up two-factor authentication",
        "Recognizing suspicious activity",
        "Secure login practices",
      ],
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "Understand how to control who can see your content and interact with you.",
      articles: [
        "Making your account private",
        "Controlling who can message you",
        "Managing your followers",
        "Blocking and reporting users",
      ],
    },
    {
      icon: Eye,
      title: "Data & Privacy",
      description: "Learn about what data we collect and how you can control it.",
      articles: [
        "What data we collect",
        "How we use your information",
        "Downloading your data",
        "Deleting your information",
      ],
    },
    {
      icon: UserCheck,
      title: "Safety Tips",
      description: "Best practices for staying safe while using our platform.",
      articles: [
        "Protecting your personal information",
        "Avoiding scams and fake accounts",
        "Reporting inappropriate content",
        "Digital wellbeing tips",
      ],
    },
  ]

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <Link href="../" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-semibold flex-1">Privacy & Security Help</h1>
      </header>

      <div className="p-4 space-y-6">
        <p className="text-muted-foreground">
          Learn how to protect your account and control your privacy on our platform.
        </p>

        <div className="space-y-4">
          {securityTopics.map((topic) => (
            <Card key={topic.title}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <topic.icon className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{topic.description}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {topic.articles.map((article) => (
                  <Link key={article} href="#" className="block p-2 rounded hover:bg-muted/50 text-sm">
                    {article}
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
