import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Don&apos;t just meet.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect smarter with Lyvo.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of teams who have transformed their meetings with AI-powered collaboration. 
            Start your free trial today and experience the future of video conferencing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* ✅ Signup Button */}
            <Link href="/signup" passHref>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* ✅ Contact Button */}
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                Schedule a Demo
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
