import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechStart Inc.",
    content:
      "Lyvo makes our global team meetings inclusive and efficient. The AI summaries save us hours of follow-up work.",
    avatar: "/professional-woman-avatar.png",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Engineering Lead",
    company: "DevCorp",
    content: 'The late joiner recap feature is a game-changer. No more awkward "what did I miss?" moments in meetings.',
    avatar: "/professional-man-avatar.png",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Operations Director",
    company: "Global Solutions",
    content:
      "Multi-language subtitles have transformed how we collaborate with our international partners. Absolutely brilliant.",
    avatar: "/diverse-professional-woman-avatar.png",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">See what our customers are saying about their Lyvo experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
