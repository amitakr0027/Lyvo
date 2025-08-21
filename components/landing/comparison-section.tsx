import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"

const comparisonData = [
  {
    feature: "AI Recap on Late Join",
    lyvo: true,
    zoom: false,
    meet: false,
  },
  {
    feature: "Personalized Task Emails",
    lyvo: true,
    zoom: false,
    meet: false,
  },
  {
    feature: "Real-time Language Subtitles",
    lyvo: true,
    zoom: false,
    meet: true,
  },
  {
    feature: "Built-in Smart Notifications",
    lyvo: true,
    zoom: false,
    meet: false,
  },
  {
    feature: "AI Meeting Summaries",
    lyvo: true,
    zoom: false,
    meet: false,
  },
]

export function ComparisonSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">Why Not Just Use Zoom?</h2>
          <p className="text-lg text-muted-foreground">
            See how Lyvo's AI-powered features stack up against traditional video conferencing
          </p>
        </div>

        <Card className="mx-auto max-w-4xl border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-xl">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">Lyvo</th>
                    <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Zoom</th>
                    <th className="text-center py-4 px-4 font-semibold text-muted-foreground">Google Meet</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 text-foreground">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.lyvo ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.zoom ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.meet ? (
                          <Check className="h-5 w-5 text-primary mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
