import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">
            <span className="mr-2">🚀</span>
            AI-Powered Video Conferencing
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
            Lyvo — Smarter Meetings.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real Connections.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10">
            AI-powered video conferencing with instant summaries, smart late-joiner recaps, and real-time multi-language
            subtitles. Transform how your team collaborates.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              asChild
            >
              <Link href="/signup">
                Start for Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary/40 group"
              asChild
            >
              <Link href="/demo">
                <Play className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Watch Demo
              </Link>
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl bg-gradient-to-br from-card to-card/50 p-8 shadow-2xl border border-border/50 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] group">
              {/* Mock video interface */}
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-lg relative overflow-hidden">
                {/* Video grid mockup */}
                <div className="grid grid-cols-2 gap-2 p-4 h-full">
                  <div className="bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/30 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/40 rounded-full transition-all duration-300 hover:scale-110" />
                  </div>
                  <div className="bg-secondary/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-secondary/30 cursor-pointer">
                    <div className="w-12 h-12 bg-secondary/40 rounded-full transition-all duration-300 hover:scale-110" />
                  </div>
                  <div className="bg-primary/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/40 cursor-pointer">
                    <div className="w-12 h-12 bg-primary/50 rounded-full transition-all duration-300 hover:scale-110" />
                  </div>
                  <div className="bg-secondary/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-secondary/40 cursor-pointer">
                    <div className="w-12 h-12 bg-secondary/50 rounded-full transition-all duration-300 hover:scale-110" />
                  </div>
                </div>

                {/* Live subtitles overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur rounded-lg p-3 border border-border/50">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-muted-foreground">Live Subtitles:</span>
                    <span className="text-foreground">"Let's discuss the Q4 roadmap..."</span>
                  </div>
                </div>
              </div>

              {/* AI features indicators */}
              <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
                AI Summary Ready
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
                Multi-language Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}