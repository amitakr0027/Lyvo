"use client"

import { Button } from "@/components/ui/button"
import { Mic, Video, Phone, Settings } from "lucide-react"

export function MeetingControls() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 rounded-full px-6 py-3">
      <div className="flex items-center space-x-4">
        <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
          <Mic className="h-5 w-5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
          <Video className="h-5 w-5" />
        </Button>
        <Button size="sm" variant="destructive">
          <Phone className="h-5 w-5" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-gray-700">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
