"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock4, ChevronLeft, Play, Download } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SmartRecapPage() {
  const router = useRouter();
  const [selectedMeeting, setSelectedMeeting] = useState("");
  const [recap, setRecap] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const meetings = [
    { id: "1", title: "Product Roadmap Review", time: "2:00 PM", date: "Today" },
    { id: "2", title: "Team Standup", time: "9:00 AM", date: "Tomorrow" },
    { id: "3", title: "Client Presentation", time: "11:30 AM", date: "Yesterday" }
  ];

  const generateRecap = () => {
    if (!selectedMeeting) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const recaps = {
        "1": "Meeting started with project timeline review. Main topics: Q3 mobile app development, resource allocation, and deadline adjustments. Key decisions: prioritize iOS version, hire 2 additional developers, set soft launch for August 20th. Next steps: Sarah to finalize requirements by tomorrow, John to start recruitment process.",
        "2": "Daily standup covered: backend integration issues blocking progress, DevOps team notified. Team updates: frontend 80% complete, database schema finalized. Blockers: API rate limiting issues. Action items: Sarah to follow up with DevOps, team to implement temporary workaround.",
        "3": "Client presentation successful. Covered new feature set: analytics dashboard, custom reporting, export functionality. Client feedback: very positive, especially liked visualization options. Requests: additional custom filters, white-labeling option. Next steps: schedule technical deep dive, provide customization quote."
      };
      
      setRecap(recaps[selectedMeeting] || "No recap available for this meeting.");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Clock4 className="h-8 w-8 mr-3 text-primary" />
                Smart Recap for Late Joiners
              </h1>
              <p className="text-muted-foreground">Catch up quickly with AI-generated meeting summaries</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Selection Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Select Meeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Choose a meeting</label>
                <select 
                  className="w-full p-3 border border-border/30 rounded-lg bg-background"
                  value={selectedMeeting}
                  onChange={(e) => setSelectedMeeting(e.target.value)}
                >
                  <option value="">Select a meeting</option>
                  {meetings.map(meeting => (
                    <option key={meeting.id} value={meeting.id}>
                      {meeting.title} - {meeting.date} {meeting.time}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                onClick={generateRecap} 
                disabled={!selectedMeeting || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Recap...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Generate Smart Recap
                  </>
                )}
              </Button>

              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold mb-2">How it works</h4>
                <p className="text-sm text-muted-foreground">
                  Smart Recap uses AI to analyze meeting content and generate a concise 1-minute summary 
                  perfect for participants who join late or need to quickly catch up on what they missed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Recap</CardTitle>
            </CardHeader>
            <CardContent>
              {recap ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">{recap}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      ~1 minute read
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Save Recap
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Clock4 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a meeting and generate a smart recap to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Example Use Cases */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>When to Use Smart Recap</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold mb-2">Late Arrivals</h4>
              <p className="text-sm text-muted-foreground">
                Quickly catch up when joining a meeting after it has started
              </p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg">
              <h4 className="font-semibold mb-2">Meeting Reviews</h4>
              <p className="text-sm text-muted-foreground">
                Refresh your memory on previous meetings before follow-ups
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold mb-2">Team Alignment</h4>
              <p className="text-sm text-muted-foreground">
                Get stakeholders up to speed without watching full recordings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}