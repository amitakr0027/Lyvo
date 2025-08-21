import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard - Lyvo",
  description: "Manage your meetings and AI insights",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Meetings</h2>
          <p className="text-muted-foreground">Dashboard components will be implemented here by the frontend team.</p>
        </div>
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">AI Insights</h2>
          <p className="text-muted-foreground">AI insights components will be implemented here by the frontend team.</p>
        </div>
      </div>
    </div>
  )
}
