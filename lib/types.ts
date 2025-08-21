// Type definitions for the entire application

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Meeting {
  id: string
  title: string
  description?: string
  hostId: string
  participants: User[]
  startTime: Date
  endTime?: Date
  status: "scheduled" | "active" | "ended"
  recordingUrl?: string
  summary?: AISummary
  createdAt: Date
  updatedAt: Date
}

export interface AISummary {
  id: string
  meetingId: string
  content: string
  actionItems: ActionItem[]
  keyPoints: string[]
  participants: string[]
  duration: number
  createdAt: Date
}

export interface ActionItem {
  id: string
  description: string
  assignee?: string
  dueDate?: Date
  completed: boolean
  createdAt: Date
}

export interface AIRecap {
  id: string
  meetingId: string
  content: string
  audioUrl: string
  duration: number
  createdAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
