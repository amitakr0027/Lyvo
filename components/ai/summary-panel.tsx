import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SummaryPanel() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-lg">AI Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">AI summary will appear here during the meeting</div>
        <Button variant="outline" size="sm" className="w-full bg-transparent">
          Generate Summary
        </Button>
      </CardContent>
    </Card>
  )
}
