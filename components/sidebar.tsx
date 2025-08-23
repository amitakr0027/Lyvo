// components/sidebar.js
// "use client";

// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { 
//   BarChart3, Video, Brain, ListTodo, Clock4, Languages, 
//   TrendingUp, MessageSquare, Settings, LogOut, UserPlus, Plus,
//   ChevronRight, Menu, X
// } from "lucide-react";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const sidebarItems = [
//     { icon: BarChart3, label: "Dashboard", path: "/dashboard" },
//     { icon: Video, label: "Meetings", path: "/meetings" },
//     { icon: Brain, label: "AI Summaries", path: "/ai-summaries" },
//     { icon: ListTodo, label: "Action Items", path: "/action-items" },
//     { icon: Clock4, label: "Smart Recap", path: "/smart-recap" },
//     { icon: Languages, label: "Live Translation", path: "/live-translation" },
//     { icon: TrendingUp, label: "Analytics", path: "/analytics" },
//     { icon: MessageSquare, label: "Chat History", path: "/chat-history" },
//     { icon: Settings, label: "Settings", path: "/settings" }
//   ];

//   return (
//     <>
//       {/* Mobile sidebar toggle */}
//       <Button
//         variant="ghost"
//         size="sm"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50"
//       >
//         {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </Button>

//       {/* Sidebar */}
//       <aside className={`
//         fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card/80 backdrop-blur border-r border-border/50 transition-transform duration-300 lg:translate-x-0
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         <div className="flex flex-col h-full p-6">
//           {/* Logo and quick actions from the original dashboard */}
//           {/* ... */}

//           {/* Navigation */}
//           <nav className="space-y-2 flex-1">
//             {sidebarItems.map((item, index) => {
//               const isActive = pathname === item.path;
//               return (
//                 <a
//                   key={index}
//                   href={item.path}
//                   className={`
//                     w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 hover:scale-105 hover:shadow-md group
//                     ${isActive 
//                       ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30' 
//                       : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
//                     }
//                   `}
//                 >
//                   <item.icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'text-primary' : 'group-hover:scale-110'}`} />
//                   <span className="font-medium flex-1">{item.label}</span>
//                   <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
//                 </a>
//               );
//             })}
//           </nav>

//           {/* User profile from the original dashboard */}
//           {/* ... */}
//         </div>
//       </aside>

//       {/* Mobile overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-background/80 backdrop-blur z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </>
//   );
// }