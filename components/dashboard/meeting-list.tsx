import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MeetingList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Meetings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">Meeting list component - to be implemented by frontend team</p>
          <Button variant="outline" className="w-full bg-transparent">
            Load Meetings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
