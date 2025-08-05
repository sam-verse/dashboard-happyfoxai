import { Settings as SettingsIcon, Moon, Sun, Download, Bell, Shield, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <SettingsIcon className="h-7 w-7 text-primary" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your dashboard preferences and configuration
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appearance Settings */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-primary" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <Switch 
                checked={theme === 'dark'} 
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Compact View</h4>
                <p className="text-sm text-muted-foreground">
                  Show more data in less space
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Animations</h4>
                <p className="text-sm text-muted-foreground">
                  Enable smooth transitions and effects
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Real-time Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified of new events as they happen
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Receive analytics summaries via email
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Anomaly Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Get alerted when unusual patterns are detected
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Data Retention</h4>
                <p className="text-sm text-muted-foreground">
                  Events are kept for 90 days by default
                </p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Export Data</h4>
                <p className="text-sm text-muted-foreground">
                  Download your analytics data
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Clear Data</h4>
                <p className="text-sm text-muted-foreground">
                  Remove all tracked events and sessions
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Anonymous Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Track events without personal identifiers
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">IP Anonymization</h4>
                <p className="text-sm text-muted-foreground">
                  Mask IP addresses in analytics
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Cookie Consent</h4>
                <p className="text-sm text-muted-foreground">
                  Require consent before tracking
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>About Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-medium text-foreground mb-1">Version</h4>
              <p className="text-sm text-muted-foreground">v1.0.0</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Last Updated</h4>
              <p className="text-sm text-muted-foreground">January 31, 2025</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Environment</h4>
              <p className="text-sm text-muted-foreground">Development</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              This analytics dashboard helps you track and understand user behavior in your applications. 
              Built with React, TypeScript, and Tailwind CSS for modern web development.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Documentation
              </Button>
              <Button variant="outline" size="sm">
                Support
              </Button>
              <Button variant="outline" size="sm">
                Feedback
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;