// API utility functions for frontend team

export const api = {
  // Authentication
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })
      return response.json()
    },
  },

  // Meetings
  meetings: {
    list: async () => {
      const response = await fetch("/api/meetings")
      return response.json()
    },
    create: async (meetingData: any) => {
      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingData),
      })
      return response.json()
    },
  },

  // AI Features
  ai: {
    generateSummary: async (meetingId: string) => {
      const response = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId }),
      })
      return response.json()
    },
    generateRecap: async (meetingId: string) => {
      const response = await fetch("/api/ai/recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetingId }),
      })
      return response.json()
    },
  },
}
