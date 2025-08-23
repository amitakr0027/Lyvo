"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, ChevronLeft, Volume2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LiveTranslationPage() {
  const router = useRouter();
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [subtitleLanguage, setSubtitleLanguage] = useState("en");
  const [audioLanguage, setAudioLanguage] = useState("en");
  const [isRecording, setIsRecording] = useState(false);

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "hi", name: "Hindi" },
    { code: "ar", name: "Arabic" }
  ];

  const toggleSubtitles = () => {
    setSubtitlesEnabled(!subtitlesEnabled);
  };

  const startRecording = () => {
    setIsRecording(true);
    // In a real app, this would start capturing audio for translation
  };

  const stopRecording = () => {
    setIsRecording(false);
    // In a real app, this would stop audio capture
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
                <Languages className="h-8 w-8 mr-3 text-secondary" />
                Real-time Translation
              </h1>
              <p className="text-muted-foreground">Live subtitles and translation for your meetings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Translation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Spoken Language</label>
                <select 
                  className="w-full p-3 border border-border/30 rounded-lg bg-background"
                  value={audioLanguage}
                  onChange={(e) => setAudioLanguage(e.target.value)}
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium">Subtitles</label>
                  <Button 
                    variant={subtitlesEnabled ? "default" : "outline"} 
                    size="sm" 
                    onClick={toggleSubtitles}
                  >
                    {subtitlesEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Turn on real-time subtitles during meetings
                </p>
              </div>

              {subtitlesEnabled && (
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle Language</label>
                  <select 
                    className="w-full p-3 border border-border/30 rounded-lg bg-background"
                    value={subtitleLanguage}
                    onChange={(e) => setSubtitleLanguage(e.target.value)}
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-4">
                {isRecording ? (
                  <Button onClick={stopRecording} variant="destructive" className="w-full">
                    Stop Translation
                  </Button>
                ) : (
                  <Button onClick={startRecording} className="w-full">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Start Translation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {isRecording ? (
                <div className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4 h-48 overflow-y-auto">
                    <div className="space-y-2">
                      <div className="p-2 bg-primary/10 rounded">
                        <p className="text-sm">
                          <span className="font-medium">Sarah:</span> Welcome everyone to today's meeting about our Q3 goals.
                        </p>
                        {subtitlesEnabled && subtitleLanguage !== "en" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            [Translated to {languages.find(l => l.code === subtitleLanguage)?.name}]: Bienvenue à tous à la réunion d'aujourd'hui sur nos objectifs du T3.
                          </p>
                        )}
                      </div>
                      <div className="p-2 bg-secondary/10 rounded">
                        <p className="text-sm">
                          <span className="font-medium">John:</span> Thank you. Let's start with reviewing the marketing strategy.
                        </p>
                        {subtitlesEnabled && subtitleLanguage !== "en" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            [Translated to {languages.find(l => l.code === subtitleLanguage)?.name}]: Merci. Commençons par examiner la stratégie marketing.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Translating from: {languages.find(l => l.code === audioLanguage)?.name}</span>
                    {subtitlesEnabled && (
                      <span>To: {languages.find(l => l.code === subtitleLanguage)?.name}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start translation to see live subtitles and translations</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Translation Features</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Multi-language Support</h4>
                <p className="text-sm text-muted-foreground">
                  Supports over 20 languages for real-time translation and subtitles
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Volume2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Voice Detection</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically detects different speakers and attributes dialogue correctly
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Languages className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Customizable Display</h4>
                <p className="text-sm text-muted-foreground">
                  Adjust subtitle size, color, and position for optimal viewing
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Settings className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Export Transcripts</h4>
                <p className="text-sm text-muted-foreground">
                  Save and export translated transcripts for future reference
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}