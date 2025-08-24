"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Mail,
  Calendar,
  Settings,
  Bell,
  Moon,
  Sun,
  Shield,
  Camera,
  Edit3,
  Save,
  X,
  Video,
  Clock,
  Users,
  FileText,
  LogOut,
  BarChart3,
  Plus,
  UserPlus,
  ChevronRight,
  Brain,
  ListTodo,
  Clock4,
  Languages,
  TrendingUp,
  MessageSquare,
  Menu,
  Star,
  Award,
  MessageCircle,
  HelpCircle,
  Send,
  ExternalLink,
  BookOpen,
  Phone,
  Zap,
  Download,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signOut, updateProfile, updatePassword } from "firebase/auth"
import { doc, getDoc, setDoc, updateDoc, addDoc, collection } from "firebase/firestore"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackType, setFeedbackType] = useState("general")
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [showUserGuideModal, setShowUserGuideModal] = useState(false)
  const [showVideoSupportModal, setShowVideoSupportModal] = useState(false)
  const [showFeaturesModal, setShowFeaturesModal] = useState(false)
  const [userData, setUserData] = useState({
    totalMeetingsHosted: 0,
    totalMeetingsJoined: 0,
    totalRecordings: 0,
    hoursSaved: 0,
    joinDate: "",
    role: "Host",
    profilePicture: "",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    meetingReminders: true,
  })
  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    allowDirectMessages: true,
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setEditedName(currentUser.displayName || "")
        await loadUserData(currentUser.uid)
      } else {
        router.push("/signin")
      }
    })

    return () => unsubscribe()
  }, [router])

  const loadUserData = async (userId: string) => {
    try {
      const userDocRef = doc(db, "users", userId)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const data = userDoc.data()
        setUserData({
          totalMeetingsHosted: data.totalMeetingsHosted || 0,
          totalMeetingsJoined: data.totalMeetingsJoined || 0,
          totalRecordings: data.totalRecordings || 0,
          hoursSaved: data.hoursSaved || 0,
          joinDate: data.joinDate || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          role: data.role || "Host",
          profilePicture: data.profilePicture || "",
        })
        setNotifications(data.notifications || notifications)
        setPrivacy(data.privacy || privacy)
        setDarkMode(data.darkMode || false)
      } else {
        const initialData = {
          totalMeetingsHosted: 0,
          totalMeetingsJoined: 0,
          totalRecordings: 0,
          hoursSaved: 0,
          joinDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
          role: "Host",
          profilePicture: "",
          notifications,
          privacy,
          darkMode: false,
          createdAt: new Date(),
        }
        await setDoc(userDocRef, initialData)
        setUserData(initialData)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }
  }

  const updateUserData = async (updates: any) => {
    if (!user) return

    try {
      const userDocRef = doc(db, "users", user.uid)
      await updateDoc(userDocRef, updates)
    } catch (error) {
      console.error("Error updating user data:", error)
    }
  }

  const sidebarItems = [
    { icon: User, label: "Profile", active: true, count: null, path: "/profile" },
    { icon: BarChart3, label: "Dashboard", active: false, count: null, path: "/dashboard" },
    { icon: Video, label: "Meetings", active: false, count: 3, path: "/meetings" },
    { icon: Brain, label: "AI Summaries", active: false, count: 5, path: "/ai-summaries" },
    { icon: ListTodo, label: "Action Items", active: false, count: 8, path: "/action-items" },
    { icon: Clock4, label: "Smart Recap", active: false, count: null, path: "/smart-recap" },
    { icon: Languages, label: "Live Translation", active: false, count: null, path: "/live-translation" },
    { icon: TrendingUp, label: "Analytics", active: false, count: null, path: "/analytics" },
    { icon: MessageSquare, label: "Chat History", active: false, count: 12, path: "/chat-history" },
    { icon: Settings, label: "Settings", active: false, count: null, path: "/settings" },
  ]

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setLoading(true)
    setMessage("")

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: editedName,
      })

      // Update password if provided
      if (newPassword && newPassword === confirmPassword && newPassword.length >= 6) {
        await updatePassword(user, newPassword)
      }

      // Update Firestore user data
      await updateUserData({
        displayName: editedName,
        updatedAt: new Date(),
      })

      setIsEditing(false)
      setNewPassword("")
      setConfirmPassword("")
      setMessage("Profile updated successfully!")

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000)
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setMessage(error.message || "Error updating profile")
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationToggle = async (key: string) => {
    const newNotifications = {
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    }
    setNotifications(newNotifications)
    await updateUserData({ notifications: newNotifications })
  }

  const handlePrivacyToggle = async (key: string) => {
    const newPrivacy = {
      ...privacy,
      [key]: !privacy[key as keyof typeof privacy],
    }
    setPrivacy(newPrivacy)
    await updateUserData({ privacy: newPrivacy })
  }

  const handleDarkModeToggle = async () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    await updateUserData({ darkMode: newDarkMode })

    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !user) return

    // For demo purposes, we'll use a placeholder URL
    // In production, you'd upload to Firebase Storage or another service
    const reader = new FileReader()
    reader.onload = async (e) => {
      const imageUrl = e.target?.result as string
      setUserData((prev) => ({ ...prev, profilePicture: imageUrl }))
      await updateUserData({ profilePicture: imageUrl })
    }
    reader.readAsDataURL(file)
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/signin")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim() || !user) return

    setFeedbackLoading(true)
    setFeedbackMessage("")

    try {
      await addDoc(collection(db, "feedback"), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || "Anonymous",
        type: feedbackType,
        message: feedbackText,
        timestamp: new Date(),
        status: "pending",
      })

      setFeedbackText("")
      setFeedbackMessage("Thank you for your feedback! We'll review it soon.")

      setTimeout(() => setFeedbackMessage(""), 5000)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      setFeedbackMessage("Error submitting feedback. Please try again.")
    } finally {
      setFeedbackLoading(false)
    }
  }

  const handleShowUserGuide = () => {
    setShowUserGuideModal(true)
  }

  const handleShowVideoSupport = () => {
    setShowVideoSupportModal(true)
  }

  const handleShowFeatures = () => {
    setShowFeaturesModal(true)
  }

  const helpResources = [
    {
      title: "Getting Started Guide",
      description: "Learn the basics of Lyvo",
      icon: BookOpen,
      action: handleShowUserGuide,
    },
    {
      title: "Video Support Guide",
      description: "Comprehensive video troubleshooting",
      icon: Video,
      action: handleShowVideoSupport,
    },
    {
      title: "Complete Features Guide",
      description: "All Lyvo features explained",
      icon: Zap,
      action: handleShowFeatures,
    },
    {
      title: "Contact Support",
      description: "Get help from our team",
      icon: Phone,
      action: () => window.open("mailto:support@lyvo.com", "_blank"),
    },
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 font-sans">
      <div className="lg:hidden sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
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
              {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside
          className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card/80 backdrop-blur border-r border-border/50 transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
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
              <Button
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-105 bg-transparent"
              >
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
                    ${
                      item.active
                        ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }
                  `}
                >
                  <item.icon
                    className={`h-5 w-5 transition-all duration-300 ${item.active ? "text-primary" : "group-hover:scale-110"}`}
                  />
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
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{user?.displayName || "User"}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="w-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-6 lg:p-8 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
              <div className="hidden lg:flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-green-500/10 px-3 py-1.5 rounded-full">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
            </div>

            {message && (
              <div
                className={`p-4 rounded-lg border backdrop-blur-sm ${
                  message.includes("Error")
                    ? "bg-destructive/10 border-destructive/20 text-destructive"
                    : "bg-green-500/10 border-green-500/20 text-green-600"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.includes("Error") ? <X className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      Basic Information
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-primary hover:text-primary/80"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditing(false)
                            setEditedName(user.displayName || "")
                            setNewPassword("")
                            setConfirmPassword("")
                          }}
                          disabled={loading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveProfile}
                          className="bg-primary hover:bg-primary/90"
                          disabled={loading}
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          ) : (
                            <Save className="h-4 w-4 mr-2" />
                          )}
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-primary to-secondary p-0.5">
                          <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                            {userData.profilePicture ? (
                              <img
                                src={userData.profilePicture || "/placeholder.svg"}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <span className="text-xl font-bold text-primary">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
                              </span>
                            )}
                          </div>
                        </div>
                        {isEditing && (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePictureUpload}
                              className="hidden"
                              id="profile-picture-upload"
                            />
                            <label
                              htmlFor="profile-picture-upload"
                              className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all duration-300 cursor-pointer"
                            >
                              <Camera className="h-3 w-3" />
                            </label>
                          </>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">Profile Picture</h3>
                        <p className="text-muted-foreground text-sm">
                          Upload a professional photo to personalize your profile
                        </p>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground flex items-center">
                          <User className="h-4 w-4 mr-2 text-primary" />
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                            placeholder="Enter your full name"
                          />
                        ) : (
                          <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                            {user.displayName || "Not set"}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-primary" />
                          Email Address
                        </label>
                        <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">{user.email}</p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground flex items-center">
                          <Award className="h-4 w-4 mr-2 text-secondary" />
                          Role
                        </label>
                        <p className="text-foreground font-medium bg-secondary/10 px-3 py-2 rounded-lg">
                          {userData.role}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          Member Since
                        </label>
                        <p className="text-foreground font-medium bg-muted/50 px-3 py-2 rounded-lg">
                          {userData.joinDate}
                        </p>
                      </div>
                    </div>

                    {/* Password Change */}
                    {isEditing && !user.providerData.some((provider) => provider.providerId === "google.com") && (
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <h4 className="text-sm font-medium text-foreground">Change Password</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">New Password</label>
                            <input
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Confirm Password</label>
                            <input
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                        {newPassword && newPassword.length < 6 && (
                          <p className="text-sm text-destructive">Password must be at least 6 characters long</p>
                        )}
                        {newPassword && confirmPassword && newPassword !== confirmPassword && (
                          <p className="text-sm text-destructive">Passwords do not match</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-primary" />
                      Preferences & Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-foreground flex items-center">
                        <Bell className="h-4 w-4 mr-2 text-primary" />
                        Notification Preferences
                      </h4>
                      <div className="space-y-4">
                        {[
                          { key: "email", label: "Email notifications", desc: "Receive updates via email" },
                          { key: "push", label: "Push notifications", desc: "Browser and mobile alerts" },
                          { key: "meetingReminders", label: "Meeting reminders", desc: "Get notified before meetings" },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-300"
                          >
                            <div>
                              <span className="text-sm font-medium text-foreground">{item.label}</span>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationToggle(item.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                                notifications[item.key as keyof typeof notifications] ? "bg-primary" : "bg-muted"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform duration-300 ${
                                  notifications[item.key as keyof typeof notifications]
                                    ? "translate-x-6"
                                    : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Theme */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-foreground flex items-center">
                        {darkMode ? (
                          <Moon className="h-4 w-4 mr-2 text-primary" />
                        ) : (
                          <Sun className="h-4 w-4 mr-2 text-primary" />
                        )}
                        Theme
                      </h4>
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-300">
                        <div>
                          <span className="text-sm font-medium text-foreground">Dark mode</span>
                          <p className="text-xs text-muted-foreground">Toggle between light and dark appearance</p>
                        </div>
                        <button
                          onClick={handleDarkModeToggle}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                            darkMode ? "bg-primary" : "bg-muted"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform duration-300 ${
                              darkMode ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Privacy */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-foreground flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        Privacy Settings
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            key: "showOnlineStatus",
                            label: "Show online status",
                            desc: "Let others know when you're active",
                          },
                          {
                            key: "allowDirectMessages",
                            label: "Allow direct messages",
                            desc: "Enable or disable direct messaging",
                          },
                        ].map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-300"
                          >
                            <div>
                              <span className="text-sm font-medium text-foreground">{item.label}</span>
                              <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handlePrivacyToggle(item.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                                privacy[item.key as keyof typeof privacy] ? "bg-primary" : "bg-muted"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform duration-300 ${
                                  privacy[item.key as keyof typeof privacy] ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Feedback Section */}
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                      <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                      Send Feedback
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Help us improve Lyvo by sharing your thoughts and suggestions
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {feedbackMessage && (
                      <div
                        className={`p-3 rounded-lg border backdrop-blur-sm ${
                          feedbackMessage.includes("Error")
                            ? "bg-destructive/10 border-destructive/20 text-destructive"
                            : "bg-green-500/10 border-green-500/20 text-green-600"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {feedbackMessage.includes("Error") ? <X className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                          <span className="text-sm font-medium">{feedbackMessage}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Feedback Type</label>
                      <select
                        value={feedbackType}
                        onChange={(e) => setFeedbackType(e.target.value)}
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
                      >
                        <option value="general">General Feedback</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="improvement">Improvement Suggestion</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">Your Message</label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Tell us what you think about Lyvo, report bugs, or suggest new features..."
                        rows={4}
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 resize-none"
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        {feedbackText.length}/500 characters
                      </div>
                    </div>

                    <Button
                      onClick={handleFeedbackSubmit}
                      disabled={!feedbackText.trim() || feedbackLoading || feedbackText.length > 500}
                      className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                    >
                      {feedbackLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      Send Feedback
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Activity Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        {
                          icon: Video,
                          label: "Meetings Hosted",
                          value: userData.totalMeetingsHosted,
                          color: "text-primary",
                          bg: "bg-primary/10",
                        },
                        {
                          icon: Users,
                          label: "Meetings Joined",
                          value: userData.totalMeetingsJoined,
                          color: "text-secondary",
                          bg: "bg-secondary/10",
                        },
                        {
                          icon: FileText,
                          label: "Recordings",
                          value: userData.totalRecordings,
                          color: "text-primary",
                          bg: "bg-primary/10",
                        },
                        {
                          icon: Clock,
                          label: "Hours Saved",
                          value: userData.hoursSaved,
                          color: "text-secondary",
                          bg: "bg-secondary/10",
                        },
                      ].map((stat, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                              <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                            <span className="text-sm font-medium text-foreground">{stat.label}</span>
                          </div>
                          <span className="text-lg font-bold text-foreground">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Help Section */}
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-secondary" />
                      Help & Support
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">Download guides and get assistance with Lyvo</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {helpResources.map((resource, index) => (
                        <button
                          key={index}
                          onClick={resource.action}
                          className="w-full flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/40 transition-all duration-300 hover:scale-105 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                              <resource.icon className="h-5 w-5 text-secondary" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-sm font-medium text-foreground">{resource.title}</h4>
                              <p className="text-xs text-muted-foreground">{resource.description}</p>
                            </div>
                          </div>
                          {resource.title.includes("Guide") ? (
                            <Download className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          ) : (
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border/50">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg border border-primary/20">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <h4 className="text-sm font-semibold text-foreground">Need Immediate Help?</h4>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          Our support team is available 24/7 to assist you
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            window.open("mailto:support@lyvo.com?subject=Urgent Support Request", "_blank")
                          }
                          className="w-full text-primary hover:text-primary/80 border-primary/30 hover:bg-primary/5"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {showUserGuideModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card/95 backdrop-blur border border-border/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Getting Started with Lyvo</h2>
                  <p className="text-sm text-muted-foreground">Complete guide to using Lyvo effectively</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowUserGuideModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary" />
                  Quick Start
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Create Your First Meeting</p>
                      <p>Click "New Meeting" to start an instant meeting or schedule one for later</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-secondary/5 rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Invite Participants</p>
                      <p>Share the meeting link or send calendar invitations to your team</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Use AI Features</p>
                      <p>Enable AI summaries, action items, and live translation for enhanced productivity</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Basic Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Video & Audio", desc: "HD video calls with crystal clear audio" },
                    { title: "Screen Sharing", desc: "Share your screen or specific applications" },
                    { title: "Recording", desc: "Record meetings for later review" },
                    { title: "Chat", desc: "Send messages during meetings" },
                    { title: "Breakout Rooms", desc: "Split into smaller discussion groups" },
                    { title: "Whiteboard", desc: "Collaborate on a shared digital whiteboard" },
                  ].map((feature, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Troubleshooting
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Can't join a meeting?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check your internet connection</li>
                      <li>• Ensure your browser allows camera and microphone access</li>
                      <li>• Try refreshing the page or using a different browser</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Audio/Video issues?</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check device permissions in browser settings</li>
                      <li>• Test your camera and microphone in device settings</li>
                      <li>• Close other applications using camera/microphone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showVideoSupportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card/95 backdrop-blur border border-border/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Video Support Guide</h2>
                  <p className="text-sm text-muted-foreground">Technical setup and troubleshooting</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowVideoSupportModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-secondary" />
                  Camera Setup
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Optimal Camera Settings</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Position camera at eye level for best angle</li>
                      <li>• Ensure good lighting (face the light source)</li>
                      <li>• Use HD resolution (720p or 1080p) for clear video</li>
                      <li>• Keep background clean and professional</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Camera Troubleshooting</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Grant camera permissions in browser settings</li>
                      <li>• Close other apps using the camera</li>
                      <li>• Try different browsers (Chrome, Firefox, Safari)</li>
                      <li>• Restart your device if camera isn't detected</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-secondary" />
                  Audio Configuration
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Microphone Best Practices</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use a headset or external microphone for better quality</li>
                      <li>• Test audio levels before joining meetings</li>
                      <li>• Mute when not speaking to reduce background noise</li>
                      <li>• Choose a quiet environment for meetings</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Audio Issues Solutions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check microphone permissions in browser</li>
                      <li>• Adjust system volume and microphone levels</li>
                      <li>• Use wired headphones to avoid echo</li>
                      <li>• Restart browser if audio stops working</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-secondary" />
                  Recording & Screen Sharing
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Recording Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Cloud recording with automatic transcription</li>
                      <li>• Local recording option available</li>
                      <li>• Recordings saved in dashboard</li>
                      <li>• Share recordings with participants</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Screen Sharing</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Share entire screen or specific window</li>
                      <li>• Include system audio in sharing</li>
                      <li>• Annotation tools available</li>
                      <li>• Remote control for collaboration</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFeaturesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card/95 backdrop-blur border border-border/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Complete Features Guide</h2>
                  <p className="text-sm text-muted-foreground">All Lyvo features and capabilities</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowFeaturesModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  AI-Powered Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Smart Summaries",
                      desc: "AI-generated meeting summaries with key points",
                      icon: FileText,
                    },
                    { title: "Action Items", desc: "Automatic extraction of tasks and follow-ups", icon: ListTodo },
                    { title: "Live Translation", desc: "Real-time translation in 50+ languages", icon: Languages },
                    {
                      title: "Smart Transcription",
                      desc: "Accurate speech-to-text with speaker identification",
                      icon: MessageSquare,
                    },
                    { title: "Sentiment Analysis", desc: "Track meeting mood and engagement levels", icon: TrendingUp },
                    {
                      title: "Meeting Insights",
                      desc: "Analytics on participation and speaking time",
                      icon: BarChart3,
                    },
                  ].map((feature, index) => (
                    <div key={index} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <feature.icon className="h-5 w-5 text-primary" />
                        <h4 className="font-medium text-foreground">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Video className="h-5 w-5 mr-2 text-secondary" />
                  Core Meeting Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "HD Video Calls", desc: "Crystal clear video up to 4K resolution" },
                    { title: "Screen Sharing", desc: "Share screen, window, or application" },
                    { title: "Recording", desc: "Cloud and local recording options" },
                    { title: "Virtual Backgrounds", desc: "Professional backgrounds and blur effects" },
                    { title: "Breakout Rooms", desc: "Split into smaller discussion groups" },
                    { title: "Whiteboard", desc: "Collaborative digital whiteboard" },
                    { title: "File Sharing", desc: "Share documents and files instantly" },
                    { title: "Polls & Surveys", desc: "Interactive polls during meetings" },
                    { title: "Reactions", desc: "Express yourself with emoji reactions" },
                  ].map((feature, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-secondary" />
                  Security & Administration
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Enterprise Security</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• End-to-end encryption for all meetings</li>
                      <li>• Waiting room and meeting passwords</li>
                      <li>• Admin controls and user management</li>
                      <li>• Compliance with GDPR, HIPAA, and SOC 2</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="font-medium text-foreground mb-2">Advanced Controls</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Meeting scheduling and calendar integration</li>
                      <li>• Custom branding and meeting rooms</li>
                      <li>• Analytics and reporting dashboard</li>
                      <li>• API access for custom integrations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-primary" />
                  Pro Tips for Maximum Productivity
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use keyboard shortcuts for quick actions (Space to mute/unmute)</li>
                  <li>• Enable AI summaries to never miss important points</li>
                  <li>• Set up recurring meetings for regular team check-ins</li>
                  <li>• Use breakout rooms for focused group discussions</li>
                  <li>• Record important meetings for team members who couldn't attend</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
