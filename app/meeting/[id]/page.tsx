import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meeting Room - Lyvo",
  description: "Join your AI-powered video meeting",
}

interface MeetingPageProps {
  params: {
    id: string
  }
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <div className="h-screen bg-black">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Meeting Room: {params.id}</h1>
          <p className="text-gray-300 mb-8">
            Video conferencing components will be implemented here by the frontend team.
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <p>Video Grid Component</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p>Meeting Controls Component</p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p>AI Features Panel Component</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
