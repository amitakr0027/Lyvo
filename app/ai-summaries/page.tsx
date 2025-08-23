// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Brain, ChevronLeft, Download, Share, Filter } from "lucide-react";
// import { useRouter } from "next/navigation";

// export default function AISummariesPage() {
//   const router = useRouter();
//   const [filter, setFilter] = useState("all");
  
//   const summaries = [
//     {
//       id: "1",
//       meeting: "Product Roadmap Review",
//       date: "2 hours ago",
//       duration: "45 min",
//       participants: 5,
//       summary: "Discussed Q3 product features, decided to prioritize mobile app enhancements. Team agreed to allocate more resources to the mobile division. Timeline for initial prototype set for next month.",
//       keyPoints: [
//         "Mobile app will be the primary focus for Q3",
//         "New hiring for mobile team approved",
//         "Prototype deadline set for August 15th"
//       ],
//       actionItems: 5,
//       sentiment: "positive"
//     },
//     {
//       id: "2",
//       meeting: "Marketing Strategy",
//       date: "1 day ago",
//       duration: "60 min",
//       participants: 8,
//       summary: "Reviewed Q2 marketing performance and planned Q3 initiatives. Digital campaigns showed 25% higher ROI than traditional channels. Budget reallocation proposed to focus more on social media and influencer marketing.",
//       keyPoints: [
//         "Digital campaigns outperformed traditional by 25%",
//         "Budget shift to social media and influencers",
//         "New content strategy to be developed"
//       ],
//       actionItems: 3,
//       sentiment: "neutral"
//     },
//     {
//       id: "3",
//       meeting: "Client Presentation",
//       date: "2 days ago",
//       duration: "60 min",
//       participants: 3,
//       summary: "Successfully presented new features to client, received positive feedback. Client particularly liked the analytics dashboard and requested some customizations. Follow-up meeting scheduled to discuss implementation details.",
//       keyPoints: [
//         "Client impressed with analytics dashboard",
//         "Customization requests noted",
//         "Follow-up meeting scheduled for next week"
//       ],
//       actionItems: 2,
//       sentiment: "positive"
//     }
//   ];

//   const filteredSummaries = filter === "all" 
//     ? summaries 
//     : summaries.filter(s => s.sentiment === filter);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" onClick={() => router.back()} className="flex items-center">
//               <ChevronLeft className="h-5 w-5 mr-2" />
//               Back
//             </Button>
//             <div>
//               <h1 className="text-3xl font-bold flex items-center">
//                 <Brain className="h-8 w-8 mr-3 text-primary" />
//                 AI Meeting Summaries
//               </h1>
//               <p className="text-muted-foreground">Automated notes and key points from your meetings</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="outline" className="flex items-center">
//               <Filter className="h-4 w-4 mr-2" />
//               Filter
//             </Button>
//           </div>
//         </div>

//         {/* Filter Options */}
//         <div className="flex space-x-2 mb-6">
//           {["all", "positive", "neutral", "negative"].map((option) => (
//             <Button
//               key={option}
//               variant={filter === option ? "default" : "outline"}
//               onClick={() => setFilter(option)}
//               className="capitalize"
//             >
//               {option}
//             </Button>
//           ))}
//         </div>

//         {/* Summaries List */}
//         <div className="space-y-6">
//           {filteredSummaries.map((summary) => (
//             <Card key={summary.id} className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle className="text-xl">{summary.meeting}</CardTitle>
//                     <p className="text-muted-foreground">
//                       {summary.date} • {summary.duration} • {summary.participants} participants
//                     </p>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                     summary.sentiment === 'positive' ? 'bg-green-500/20 text-green-600' :
//                     summary.sentiment === 'neutral' ? 'bg-gray-500/20 text-gray-600' :
//                     'bg-red-500/20 text-red-600'
//                   }`}>
//                     {summary.sentiment}
//                   </span>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold mb-2">Summary</h3>
//                   <p className="text-muted-foreground bg-muted/30 p-4 rounded-lg">
//                     {summary.summary}
//                   </p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-semibold mb-2">Key Points</h3>
//                   <ul className="space-y-2">
//                     {summary.keyPoints.map((point, index) => (
//                       <li key={index} className="flex items-start">
//                         <span className="text-primary mr-2">•</span>
//                         <span>{point}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {summary.actionItems} action items generated
//                   </span>
//                   <div className="flex space-x-2">
//                     <Button variant="outline" size="sm">
//                       <Download className="h-4 w-4 mr-2" />
//                       Export
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <Share className="h-4 w-4 mr-2" />
//                       Share
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {filteredSummaries.length === 0 && (
//           <div className="text-center py-12">
//             <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-lg font-medium text-muted-foreground">No summaries found</h3>
//             <p className="text-muted-foreground">Try changing your filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ChevronLeft, Download, Share, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AISummariesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  
  const summaries = [
    {
      id: "1",
      meeting: "Product Roadmap Review",
      date: "2 hours ago",
      duration: "45 min",
      participants: 5,
      summary: "Discussed Q3 product features, decided to prioritize mobile app enhancements. Team agreed to allocate more resources to the mobile division. Timeline for initial prototype set for next month.",
      keyPoints: [
        "Mobile app will be the primary focus for Q3",
        "New hiring for mobile team approved",
        "Prototype deadline set for August 15th"
      ],
      actionItems: 5,
      sentiment: "positive"
    },
    {
      id: "2",
      meeting: "Marketing Strategy",
      date: "1 day ago",
      duration: "60 min",
      participants: 8,
      summary: "Reviewed Q2 marketing performance and planned Q3 initiatives. Digital campaigns showed 25% higher ROI than traditional channels. Budget reallocation proposed to focus more on social media and influencer marketing.",
      keyPoints: [
        "Digital campaigns outperformed traditional by 25%",
        "Budget shift to social media and influencers",
        "New content strategy to be developed"
      ],
      actionItems: 3,
      sentiment: "neutral"
    },
    {
      id: "3",
      meeting: "Client Presentation",
      date: "2 days ago",
      duration: "60 min",
      participants: 3,
      summary: "Successfully presented new features to client, received positive feedback. Client particularly liked the analytics dashboard and requested some customizations. Follow-up meeting scheduled to discuss implementation details.",
      keyPoints: [
        "Client impressed with analytics dashboard",
        "Customization requests noted",
        "Follow-up meeting scheduled for next week"
      ],
      actionItems: 2,
      sentiment: "positive"
    }
  ];

  const filteredSummaries = filter === "all" 
    ? summaries 
    : summaries.filter(s => s.sentiment === filter);

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

        {/* Summaries List */}
        <div className="space-y-6">
          {filteredSummaries.map((summary) => (
            <Card key={summary.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{summary.meeting}</CardTitle>
                    <p className="text-muted-foreground">
                      {summary.date} • {summary.duration} • {summary.participants} participants
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
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-muted-foreground">
                    {summary.actionItems} action items generated
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
            <p className="text-muted-foreground">Try changing your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}