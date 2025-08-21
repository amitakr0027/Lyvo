import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Video, FileText } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Create Meeting",
    description: "Set up your meeting with host authentication and invite participants via email or link.",
    step: "01",
  },
  {
    icon: Video,
    title: "Meet & Collaborate",
    description: "Join video calls with real-time chat, AI-powered subtitles, and seamless screen sharing.",
    step: "02",
  },
  {
    icon: FileText,
    title: "Get AI Summary",
    description: "Receive instant meeting summaries with action items and personalized task emails.",
    step: "03",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Three simple steps to transform your meeting experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-primary/50 to-secondary/50 -translate-y-1/2" />

          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-8 text-center">
                {/* Step number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>

                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 mt-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
