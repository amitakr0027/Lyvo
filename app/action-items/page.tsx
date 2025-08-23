"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo, ChevronLeft, CheckCircle, Calendar, User, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionItemsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  
  const actionItems = [
    {
      id: "1",
      task: "Finalize mobile requirements",
      assignee: "Sarah Chen",
      dueDate: "Tomorrow",
      meeting: "Product Roadmap Review",
      status: "pending",
      priority: "high"
    },
    {
      id: "2",
      task: "Follow up with DevOps team",
      assignee: "Sarah Chen",
      dueDate: "Today",
      meeting: "Team Standup",
      status: "in-progress",
      priority: "medium"
    },
    {
      id: "3",
      task: "Send follow-up thank you email",
      assignee: "Sarah Chen",
      dueDate: "Today",
      meeting: "Client Presentation",
      status: "completed",
      priority: "medium"
    },
    {
      id: "4",
      task: "Prepare Q3 budget report",
      assignee: "Sarah Chen",
      dueDate: "Next Monday",
      meeting: "Finance Review",
      status: "pending",
      priority: "high"
    }
  ];

  const filteredItems = filter === "all" 
    ? actionItems 
    : actionItems.filter(item => item.status === filter);

  const toggleStatus = (id) => {
    // This would update the status in a real application
    console.log("Toggling status for item:", id);
  };

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
                <ListTodo className="h-8 w-8 mr-3 text-secondary" />
                Personalized Action Items
              </h1>
              <p className="text-muted-foreground">Your personal to-do list from meetings</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex space-x-2 mb-6">
          {["all", "pending", "in-progress", "completed"].map((option) => (
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

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">
                {actionItems.length}
              </div>
              <div className="text-sm text-muted-foreground">Total Items</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-500">
                {actionItems.filter(item => item.status === "pending" || item.status === "in-progress").length}
              </div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-500">
                {actionItems.filter(item => item.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{item.task}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.priority === 'high' ? 'bg-red-500/20 text-red-600' :
                        item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-600' :
                        'bg-green-500/20 text-green-600'
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {item.assignee}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Due: {item.dueDate}
                      </span>
                      <span>From: {item.meeting}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant={item.status === "completed" ? "default" : "outline"}
                    onClick={() => toggleStatus(item.id)}
                    className="ml-4"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {item.status === "completed" ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No action items found</h3>
            <p className="text-muted-foreground">Try changing your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}