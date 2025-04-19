"use client"

import { useState } from "react"
import { Bell, Globe, Save, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  // General settings state
  const [siteName, setSiteName] = useState("ArahKarir")
  const [siteDescription, setSiteDescription] = useState("Career guidance platform for professionals")
  const [siteUrl, setSiteUrl] = useState("https://arahkarir.com")
  const [adminEmail, setAdminEmail] = useState("admin@arahkarir.com")
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC+7")

  // Security settings state
  const [twoFactorAuth, setTwoFactorAuth] = useState(true)
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [minPasswordLength, setMinPasswordLength] = useState("8")
  const [loginAttempts, setLoginAttempts] = useState("5")

  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [userRegistrationNotify, setUserRegistrationNotify] = useState(true)
  const [contentUpdateNotify, setContentUpdateNotify] = useState(true)
  const [systemAlertNotify, setSystemAlertNotify] = useState(true)

  const handleSaveSettings = () => {
    // In a real app, you would call an API to save the settings
    console.log("Saving settings for tab:", activeTab)

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your site's general settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="ms">Bahasa Melayu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC+7">UTC+7 (Jakarta, Bangkok)</SelectItem>
                    <SelectItem value="UTC+8">UTC+8 (Singapore, Kuala Lumpur)</SelectItem>
                    <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                    <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
                    <SelectItem value="UTC-8">UTC-8 (Los Angeles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for your site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require administrators to use two-factor authentication</p>
                </div>
                <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                  <Input
                    id="password-expiry"
                    type="number"
                    value={passwordExpiry}
                    onChange={(e) => setPasswordExpiry(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Set to 0 for no expiry</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-password-length">Minimum Password Length</Label>
                  <Input
                    id="min-password-length"
                    type="number"
                    value={minPasswordLength}
                    onChange={(e) => setMinPasswordLength(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-attempts">Max Failed Login Attempts</Label>
                <Input
                  id="login-attempts"
                  type="number"
                  value={loginAttempts}
                  onChange={(e) => setLoginAttempts(e.target.value)}
                />
                <p className="text-xs text-gray-500">Number of failed attempts before account is locked</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure when and how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Enable email notifications for system events</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Notification Events</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">User Registration</Label>
                    <p className="text-sm text-gray-500">Notify when a new user registers</p>
                  </div>
                  <Switch
                    id="user-registration"
                    checked={userRegistrationNotify}
                    onCheckedChange={setUserRegistrationNotify}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-update">Content Updates</Label>
                    <p className="text-sm text-gray-500">Notify when content is updated or added</p>
                  </div>
                  <Switch
                    id="content-update"
                    checked={contentUpdateNotify}
                    onCheckedChange={setContentUpdateNotify}
                    disabled={!emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-alert">System Alerts</Label>
                    <p className="text-sm text-gray-500">Notify for important system alerts and warnings</p>
                  </div>
                  <Switch
                    id="system-alert"
                    checked={systemAlertNotify}
                    onCheckedChange={setSystemAlertNotify}
                    disabled={!emailNotifications}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
