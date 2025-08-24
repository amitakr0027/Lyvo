// app/summaries/add/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function AddSummaryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    duration: "60",
    participants: "5",
    transcript: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          duration: parseInt(formData.duration),
          participants: parseInt(formData.participants),
          transcript: formData.transcript
        }),
      });

      if (response.ok) {
        router.push('/ai-summaries');
      } else {
        const error = await response.json();
        console.error('Failed to create summary:', error);
        alert('Failed to create summary. Please try again.');
      }
    } catch (error) {
      console.error('Error creating summary:', error);
      alert('Error creating summary. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Generate AI Meeting Summary</h1>
        </div>

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Product Roadmap Review"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="participants">Number of Participants</Label>
                  <Input
                    id="participants"
                    type="number"
                    min="1"
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transcript">Meeting Transcript</Label>
                <Textarea
                  id="transcript"
                  placeholder="Paste the meeting transcript here. The AI will analyze it and generate a summary, key points, action items, and sentiment analysis."
                  value={formData.transcript}
                  onChange={(e) => setFormData({...formData, transcript: e.target.value})}
                  rows={10}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  The AI will analyze this transcript to generate a comprehensive summary.
                </p>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Summary...
                    </>
                  ) : (
                    "Generate AI Summary"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}