"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ChevronLeft, Download, Share, Filter, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSummaries } from "@/hooks/use-summaries";

export default function AISummariesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const { summaries, loading, error } = useSummaries();

  const filteredSummaries = filter === "all" 
    ? summaries 
    : summaries.filter(s => s.sentiment === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading summaries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-medium text-destructive">Error loading summaries</h3>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Brain className="h-8 w-8 mr-3 text-primary" />
                AI Meeting Summaries
              </h1>
              <p className="text-muted-foreground">Automated notes and key points from your meetings</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => router.push('/summaries/add')}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Summary
            </Button>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex space-x-2 mb-6">
          {["all", "positive", "neutral", "negative"].map((option) => (
            <Button
              key={option}
              variant={filter === option ? "default" : "outline"}
              onClick={() => setFilter(option)}
              className="capitalize"
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Real-time updates indicator */}
        <div className="mb-4 flex items-center text-sm text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
          Connected for real-time updates
        </div>

        {/* Summaries List */}
        <div className="space-y-6">
          {filteredSummaries.map((summary) => (
            <Card key={summary._id || summary.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{summary.title || summary.meeting}</CardTitle>
                    <p className="text-muted-foreground">
                      {new Date(summary.date || summary.createdAt).toLocaleDateString()} • 
                      {summary.duration} min • 
                      {summary.participants} participants
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    summary.sentiment === 'positive' ? 'bg-green-500/20 text-green-600' :
                    summary.sentiment === 'neutral' ? 'bg-gray-500/20 text-gray-600' :
                    'bg-red-500/20 text-red-600'
                  }`}>
                    {summary.sentiment}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Summary</h3>
                  <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
                    {summary.summary}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Key Points</h3>
                  <ul className="space-y-2">
                    {summary.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Action Items</h3>
                  <ul className="space-y-2">
                    {summary.actionItems.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {summary.actionItems.length} action items generated
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSummaries.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No summaries found</h3>
            <p className="text-muted-foreground">Try changing your filter criteria or add a new summary</p>
            <Button 
              onClick={() => router.push('/summaries/add')}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Summary
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}