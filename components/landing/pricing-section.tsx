import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 5 participants",
      "Basic video conferencing",
      "Chat messaging",
      "40-minute meeting limit",
      "Basic support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per user/month",
    description: "Advanced AI features for growing teams",
    features: [
      "Up to 100 participants",
      "AI summaries & action items",
      "Multi-language subtitles",
      "Late joiner smart recap",
      "Unlimited meeting duration",
      "Priority support",
      "Meeting recordings",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Custom solutions for large organizations",
    features: [
      "Unlimited participants",
      "All Pro features",
      "Custom integrations",
      "Advanced analytics",
      "Dedicated support",
      "SSO & compliance",
      "Custom branding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your team's needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-border/50 bg-card/50 backdrop-blur hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                plan.popular ? "ring-2 ring-primary/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                  Most Popular
                </div>
              )}

              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <CardHeader className="text-center pb-8 pt-8 relative z-10">
                <CardTitle className="text-2xl font-bold text-foreground mb-2 transition-colors duration-300 group-hover:text-primary">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground transition-all duration-300 group-hover:scale-110 inline-block">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1 transition-colors duration-300 group-hover:text-foreground/80">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center space-x-3 transition-all duration-300 hover:translate-x-2 hover:bg-muted/30 p-2 rounded-lg"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <Check className="h-4 w-4 text-primary flex-shrink-0 transition-all duration-300 group-hover:scale-110" />
                      <span className="text-foreground transition-colors duration-300 group-hover:text-primary/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-primary/25"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground hover:shadow-secondary/25"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
