import { Card, CardContent } from "@/components/ui/card"
import { Brain, Clock, Globe, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Summaries & Action Items",
    description:
      "Get instant meeting summaries with personalized action items for each participant. Never miss important decisions or follow-ups.",
    color: "text-primary",
  },
  {
    icon: Clock,
    title: "Late Joiner Smart Recap",
    description:
      "Joining late? Get a 60-second AI-generated audio recap of what you missed, so you're instantly up to speed.",
    color: "text-secondary",
  },
  {
    icon: Globe,
    title: "Multi-language Subtitles",
    description:
      "Real-time subtitles in 50+ languages. Break down language barriers and make meetings truly inclusive.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with WebRTC encryption and reliable connectivity. Your conversations stay private.",
    color: "text-secondary",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Why Choose Lyvo?</h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI features that transform ordinary meetings into extraordinary collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-xl transition-all duration-500 border-border/50 bg-card/50 backdrop-blur hover:bg-card/80 hover:scale-105 hover:-translate-y-2 cursor-pointer"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-${feature.color.split("-")[1]}/10 to-${feature.color.split("-")[1]}/20 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <feature.icon
                    className={`h-6 w-6 ${feature.color} transition-all duration-300 group-hover:scale-110`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                  {feature.description}
                </p>

                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
