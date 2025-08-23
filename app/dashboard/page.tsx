// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   Calendar,
//   Clock,
//   Users,
//   Video,
//   Plus,
//   Search,
//   Bell,
//   Settings,
//   BarChart3,
//   FileText,
//   LogOut,
//   Menu,
//   X,
//   Play,
//   Zap,
//   Globe,
//   Brain,
//   ChevronRight,
//   UserPlus,
//   CalendarDays,
//   TrendingUp,
//   MessageSquare,
//   Star
// } from "lucide-react";

// export default function LyvoDashboard() {
//   const [user, setUser] = useState({ email: "sarah@techstart.com", name: "Sarah Chen" });
//   const [meetings, setMeetings] = useState([
//     {
//       id: "1",
//       title: "Product Roadmap Review",
//       time: "2:00 PM",
//       date: "Today",
//       participants: 5,
//       status: "upcoming",
//       duration: "45 min",
//       type: "scheduled"
//     },
//     {
//       id: "2", 
//       title: "Team Standup",
//       time: "9:00 AM",
//       date: "Tomorrow",
//       participants: 8,
//       status: "scheduled",
//       duration: "30 min",
//       type: "recurring"
//     },
//     {
//       id: "3",
//       title: "Client Presentation",
//       time: "11:30 AM",
//       date: "Yesterday",
//       participants: 3,
//       status: "completed",
//       duration: "60 min",
//       type: "important"
//     }
//   ]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Mock analytics data
//   const analyticsData = {
//     totalMeetings: 24,
//     totalHours: 48,
//     averageParticipants: 6,
//     summariesGenerated: 22
//   };

//   const recentSummaries = [
//     {
//       id: "1",
//       meeting: "Product Roadmap Review",
//       date: "2 hours ago",
//       keyPoints: 3,
//       actionItems: 5,
//       sentiment: "positive"
//     },
//     {
//       id: "2",
//       meeting: "Marketing Strategy",
//       date: "1 day ago", 
//       keyPoints: 4,
//       actionItems: 2,
//       sentiment: "neutral"
//     }
//   ];

//   const sidebarItems = [
//     { icon: BarChart3, label: "Dashboard", active: true, count: null },
//     { icon: Video, label: "Meetings", active: false, count: 3 },
//     { icon: Brain, label: "AI Summaries", active: false, count: 5 },
//     { icon: TrendingUp, label: "Analytics", active: false, count: null },
//     { icon: MessageSquare, label: "Chat History", active: false, count: 12 },
//     { icon: Settings, label: "Settings", active: false, count: null }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-sans">
//       {/* Mobile Header */}
//       <div className="lg:hidden sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border/50 px-4 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="lg:hidden"
//             >
//               {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//             <div className="flex items-center space-x-2">
//               <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
//                 <span className="text-primary-foreground font-bold text-sm">L</span>
//               </div>
//               <span className="font-bold text-lg text-foreground">Lyvo</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="sm">
//               <Bell className="h-4 w-4" />
//             </Button>
//             <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
//               SC
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Sidebar */}
//         <aside className={`
//           fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card/80 backdrop-blur border-r border-border/50 transition-transform duration-300 lg:translate-x-0
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//         `}>
//           <div className="flex flex-col h-full p-6">
//             {/* Logo */}
//             <div className="hidden lg:flex items-center space-x-3 mb-8">
//               <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3">
//                 <span className="text-white font-bold text-lg">L</span>
//               </div>
//               <div>
//                 <span className="font-bold text-xl text-foreground">Lyvo</span>
//                 <div className="text-xs text-muted-foreground">AI-Powered Meetings</div>
//               </div>
//             </div>

//             {/* Quick Actions */}
//             <div className="space-y-3 mb-8">
//               <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg group">
//                 <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
//                 New Meeting
//               </Button>
//               <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105">
//                 <UserPlus className="mr-2 h-4 w-4" />
//                 Join Meeting
//               </Button>
//             </div>

//             {/* Navigation */}
//             <nav className="space-y-2 flex-1">
//               {sidebarItems.map((item, index) => (
//                 <button
//                   key={index}
//                   className={`
//                     w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-md group
//                     ${item.active 
//                       ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30' 
//                       : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
//                     }
//                   `}
//                 >
//                   <item.icon className={`h-5 w-5 transition-all duration-300 ${item.active ? 'text-primary' : 'group-hover:scale-110'}`} />
//                   <span className="font-medium flex-1">{item.label}</span>
//                   {item.count && (
//                     <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
//                       {item.count}
//                     </span>
//                   )}
//                   <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
//                 </button>
//               ))}
//             </nav>

//             {/* User Profile */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
//               <div className="flex items-center space-x-3 mb-3">
//                 <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
//                   SC
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-foreground text-sm">{user.name}</p>
//                   <p className="text-xs text-muted-foreground">{user.email}</p>
//                 </div>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="w-full text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 <LogOut className="mr-2 h-4 w-4" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 min-h-screen lg:ml-0">
//           <div className="p-6 lg:p-8 space-y-8">
//             {/* Header */}
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
//                   Welcome back, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sarah</span> 👋
//                 </h1>
//                 <p className="text-muted-foreground">Ready for another productive day of meetings?</p>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <input
//                     type="text"
//                     placeholder="Search meetings..."
//                     className="pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
//                   />
//                 </div>
//                 <Button variant="ghost" size="sm" className="relative">
//                   <Bell className="h-4 w-4" />
//                   <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full animate-pulse"></span>
//                 </Button>
//               </div>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 { icon: Calendar, label: "Total Meetings", value: analyticsData.totalMeetings, change: "+12%", color: "primary" },
//                 { icon: Clock, label: "Hours Saved", value: analyticsData.totalHours, change: "+8%", color: "secondary" },
//                 { icon: Users, label: "Avg Participants", value: analyticsData.averageParticipants, change: "+5%", color: "primary" },
//                 { icon: Brain, label: "AI Summaries", value: analyticsData.summariesGenerated, change: "+15%", color: "secondary" }
//               ].map((stat, index) => (
//                 <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur cursor-pointer">
//                   <CardContent className="p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className={`p-2 rounded-lg bg-${stat.color}/10 transition-all duration-300 group-hover:scale-110`}>
//                         <stat.icon className={`h-5 w-5 text-${stat.color}`} />
//                       </div>
//                       <span className={`text-sm font-medium text-${stat.color} bg-${stat.color}/10 px-2 py-1 rounded-full`}>
//                         {stat.change}
//                       </span>
//                     </div>
//                     <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
//                     <div className="text-sm text-muted-foreground">{stat.label}</div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Main Dashboard Grid */}
//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//               {/* Upcoming Meetings */}
//               <div className="xl:col-span-2">
//                 <Card className="border-border/50 bg-card/50 backdrop-blur">
//                   <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-xl font-semibold text-foreground">Upcoming Meetings</CardTitle>
//                     <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
//                       View All <ChevronRight className="ml-1 h-4 w-4" />
//                     </Button>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {meetings.map((meeting, index) => (
//                       <div
//                         key={meeting.id}
//                         className="group flex items-center justify-between p-4 rounded-lg border border-border/30 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:scale-102 hover:shadow-md cursor-pointer"
//                       >
//                         <div className="flex items-center space-x-4">
//                           <div className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
//                             meeting.status === 'upcoming' ? 'bg-primary/20 text-primary' :
//                             meeting.status === 'completed' ? 'bg-secondary/20 text-secondary' :
//                             'bg-muted/40 text-muted-foreground'
//                           }`}>
//                             <Video className="h-4 w-4" />
//                           </div>
//                           <div>
//                             <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
//                               {meeting.title}
//                             </h3>
//                             <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                               <span className="flex items-center">
//                                 <Clock className="h-3 w-3 mr-1" />
//                                 {meeting.time} • {meeting.date}
//                               </span>
//                               <span className="flex items-center">
//                                 <Users className="h-3 w-3 mr-1" />
//                                 {meeting.participants}
//                               </span>
//                               <span className="flex items-center">
//                                 <Calendar className="h-3 w-3 mr-1" />
//                                 {meeting.duration}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           {meeting.status === 'upcoming' && (
//                             <Button size="sm" className="bg-primary hover:bg-primary/90">
//                               <Play className="h-3 w-3 mr-1" />
//                               Join
//                             </Button>
//                           )}
//                           {meeting.type === 'important' && (
//                             <Star className="h-4 w-4 text-secondary fill-secondary" />
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                     <div className="text-center pt-4">
//                       <Button variant="outline" className="border-dashed border-primary/30 text-primary hover:bg-primary/10">
//                         <Plus className="h-4 w-4 mr-2" />
//                         Schedule New Meeting
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Quick Actions & AI Insights */}
//               <div className="space-y-6">
//                 {/* AI Insights */}
//                 <Card className="border-border/50 bg-card/50 backdrop-blur">
//                   <CardHeader>
//                     <CardTitle className="text-lg font-semibold text-foreground flex items-center">
//                       <Brain className="h-5 w-5 mr-2 text-primary" />
//                       AI Insights
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
//                       <div className="flex items-start space-x-3">
//                         <Zap className="h-4 w-4 text-primary mt-0.5" />
//                         <div>
//                           <p className="text-sm font-medium text-foreground">Meeting Optimization</p>
//                           <p className="text-xs text-muted-foreground">Your meetings are 23% more efficient this week!</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-3 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
//                       <div className="flex items-start space-x-3">
//                         <Globe className="h-4 w-4 text-secondary mt-0.5" />
//                         <div>
//                           <p className="text-sm font-medium text-foreground">Global Collaboration</p>
//                           <p className="text-xs text-muted-foreground">3 languages detected in recent meetings</p>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Recent AI Summaries */}
//                 <Card className="border-border/50 bg-card/50 backdrop-blur">
//                   <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-lg font-semibold text-foreground">Recent Summaries</CardTitle>
//                     <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
//                       <FileText className="h-4 w-4" />
//                     </Button>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {recentSummaries.map((summary, index) => (
//                       <div
//                         key={summary.id}
//                         className="p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-all duration-300 cursor-pointer"
//                       >
//                         <div className="flex items-center justify-between mb-2">
//                           <h4 className="text-sm font-medium text-foreground truncate">{summary.meeting}</h4>
//                           <span className="text-xs text-muted-foreground">{summary.date}</span>
//                         </div>
//                         <div className="flex items-center space-x-4 text-xs text-muted-foreground">
//                           <span>{summary.keyPoints} key points</span>
//                           <span>{summary.actionItems} actions</span>
//                           <span className={`px-2 py-1 rounded-full ${
//                             summary.sentiment === 'positive' ? 'bg-green-500/20 text-green-600' :
//                             summary.sentiment === 'neutral' ? 'bg-gray-500/20 text-gray-600' :
//                             'bg-red-500/20 text-red-600'
//                           }`}>
//                             {summary.sentiment}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-background/80 backdrop-blur z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Plus,
  Search,
  Bell,
  Settings,
  BarChart3,
  FileText,
  LogOut,
  Menu,
  X,
  Play,
  Zap,
  Globe,
  Brain,
  ChevronRight,
  UserPlus,
  TrendingUp,
  MessageSquare,
  Star,
  Languages,
  ListTodo,
  Clock4,
  BookOpen
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LyvoDashboard() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "sarah@techstart.com", name: "Sarah Chen" });
  const [meetings, setMeetings] = useState([
    {
      id: "1",
      title: "Product Roadmap Review",
      time: "2:00 PM",
      date: "Today",
      participants: 5,
      status: "upcoming",
      duration: "45 min",
      type: "scheduled"
    },
    {
      id: "2", 
      title: "Team Standup",
      time: "9:00 AM",
      date: "Tomorrow",
      participants: 8,
      status: "scheduled",
      duration: "30 min",
      type: "recurring"
    },
    {
      id: "3",
      title: "Client Presentation",
      time: "11:30 AM",
      date: "Yesterday",
      participants: 3,
      status: "completed",
      duration: "60 min",
      type: "important"
    }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock analytics data
  const analyticsData = {
    totalMeetings: 24,
    totalHours: 48,
    averageParticipants: 6,
    summariesGenerated: 22
  };

  const recentSummaries = [
    {
      id: "1",
      meeting: "Product Roadmap Review",
      date: "2 hours ago",
      keyPoints: 3,
      actionItems: 5,
      sentiment: "positive"
    },
    {
      id: "2",
      meeting: "Marketing Strategy",
      date: "1 day ago", 
      keyPoints: 4,
      actionItems: 2,
      sentiment: "neutral"
    }
  ];

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", active: true, count: null, path: "/dashboard" },
    { icon: Video, label: "Meetings", active: false, count: 3, path: "/meetings" },
    { icon: Brain, label: "AI Summaries", active: false, count: 5, path: "/ai-summaries" },
    { icon: ListTodo, label: "Action Items", active: false, count: 8, path: "/action-items" },
    { icon: Clock4, label: "Smart Recap", active: false, count: null, path: "/smart-recap" },
    { icon: Languages, label: "Live Translation", active: false, count: null, path: "/live-translation" },
    { icon: TrendingUp, label: "Analytics", active: false, count: null, path: "/analytics" },
    { icon: MessageSquare, label: "Chat History", active: false, count: 12, path: "/chat-history" },
    { icon: Settings, label: "Settings", active: false, count: null, path: "/settings" }
  ];

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">L</span>
              </div>
              <span className="font-bold text-lg text-foreground">Lyvo</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
              SC
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card/80 backdrop-blur border-r border-border/50 transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full p-6">
            {/* Logo */}
            <div className="hidden lg:flex items-center space-x-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <span className="font-bold text-xl text-foreground">Lyvo</span>
                <div className="text-xs text-muted-foreground">AI-Powered Meetings</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3 mb-8">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg group">
                <Plus className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                New Meeting
              </Button>
              <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105">
                <UserPlus className="mr-2 h-4 w-4" />
                Join Meeting
              </Button>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {sidebarItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-md group
                    ${item.active 
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <item.icon className={`h-5 w-5 transition-all duration-300 ${item.active ? 'text-primary' : 'group-hover:scale-110'}`} />
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.count && (
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* User Profile */}
            <div className="mt-6 p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg border border-border/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-medium">
                  SC
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Welcome back, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sarah</span> 👋
                </h1>
                <p className="text-muted-foreground">Ready for another productive day of meetings?</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search meetings..."
                    className="pl-10 pr-4 py-2 bg-muted/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 w-64"
                  />
                </div>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full animate-pulse"></span>
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Calendar, label: "Total Meetings", value: analyticsData.totalMeetings, change: "+12%", color: "primary" },
                { icon: Clock, label: "Hours Saved", value: analyticsData.totalHours, change: "+8%", color: "secondary" },
                { icon: Users, label: "Avg Participants", value: analyticsData.averageParticipants, change: "+5%", color: "primary" },
                { icon: Brain, label: "AI Summaries", value: analyticsData.summariesGenerated, change: "+15%", color: "secondary" }
              ].map((stat, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-${stat.color}/10 transition-all duration-300 group-hover:scale-110`}>
                        <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                      </div>
                      <span className={`text-sm font-medium text-${stat.color} bg-${stat.color}/10 px-2 py-1 rounded-full`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Upcoming Meetings */}
              <div className="xl:col-span-2">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-foreground">Upcoming Meetings</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      View All <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {meetings.map((meeting, index) => (
                      <div
                        key={meeting.id}
                        className="group flex items-center justify-between p-4 rounded-lg border border-border/30 bg-gradient-to-r from-muted/20 to-muted/10 hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:scale-102 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 ${
                            meeting.status === 'upcoming' ? 'bg-primary/20 text-primary' :
                            meeting.status === 'completed' ? 'bg-secondary/20 text-secondary' :
                            'bg-muted/40 text-muted-foreground'
                          }`}>
                            <Video className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {meeting.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {meeting.time} • {meeting.date}
                              </span>
                              <span className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {meeting.participants}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {meeting.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {meeting.status === 'upcoming' && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              <Play className="h-3 w-3 mr-1" />
                              Join
                            </Button>
                          )}
                          {meeting.type === 'important' && (
                            <Star className="h-4 w-4 text-secondary fill-secondary" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-4">
                      <Button variant="outline" className="border-dashed border-primary/30 text-primary hover:bg-primary/10">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule New Meeting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & AI Insights */}
              <div className="space-y-6">
                {/* AI Insights */}
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      AI Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-4 w-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Meeting Optimization</p>
                          <p className="text-xs text-muted-foreground">Your meetings are 23% more efficient this week!</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                      <div className="flex items-start space-x-3">
                        <Globe className="h-4 w-4 text-secondary mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Global Collaboration</p>
                          <p className="text-xs text-muted-foreground">3 languages detected in recent meetings</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent AI Summaries */}
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">Recent Summaries</CardTitle>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentSummaries.map((summary, index) => (
                      <div
                        key={summary.id}
                        className="p-3 rounded-lg border border-border/30 bg-muted/20 hover:bg-muted/40 transition-all duration-300 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-foreground truncate">{summary.meeting}</h4>
                          <span className="text-xs text-muted-foreground">{summary.date}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{summary.keyPoints} key points</span>
                          <span>{summary.actionItems} actions</span>
                          <span className={`px-2 py-1 rounded-full ${
                            summary.sentiment === 'positive' ? 'bg-green-500/20 text-green-600' :
                            summary.sentiment === 'neutral' ? 'bg-gray-500/20 text-gray-600' :
                            'bg-red-500/20 text-red-600'
                          }`}>
                            {summary.sentiment}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}