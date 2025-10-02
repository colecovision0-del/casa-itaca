import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { DEFAULT_PRICING, PricingConfig } from "@/services/pricingService";
import { toast } from "@/hooks/use-toast";

const PricingAdmin = () => {
  const [config, setConfig] = useState<PricingConfig>(DEFAULT_PRICING);

  const handleBaseRateChange = (key: 'weekday' | 'weekend' | 'sunday', value: string) => {
    const numValue = parseFloat(value) || 0;
    setConfig(prev => ({ ...prev, [key]: numValue }));
  };

  const handleMonthMultiplierChange = (month: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setConfig(prev => ({
      ...prev,
      monthlyMultipliers: {
        ...prev.monthlyMultipliers,
        [month]: numValue
      }
    }));
  };

  const exportConfig = () => {
    const jsonString = JSON.stringify(config, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pricing-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Configuration exported",
      description: "pricing-config.json has been downloaded. Use the update script to apply changes.",
    });
  };

  const months = [
    { num: 1, name: "January" },
    { num: 2, name: "February" },
    { num: 3, name: "March" },
    { num: 4, name: "April" },
    { num: 5, name: "May" },
    { num: 6, name: "June" },
    { num: 7, name: "July" },
    { num: 8, name: "August" },
    { num: 9, name: "September" },
    { num: 10, name: "October" },
    { num: 11, name: "November" },
    { num: 12, name: "December" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Pricing Admin</h1>
          <p className="text-muted-foreground">
            Update your pricing configuration. Export the JSON file and run the update script locally.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Base Rates (€ per night)</CardTitle>
            <CardDescription>
              Set your base prices for different days of the week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="weekday">Weekday (Mon-Thu)</Label>
                <Input
                  id="weekday"
                  type="number"
                  value={config.weekday}
                  onChange={(e) => handleBaseRateChange('weekday', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weekend">Weekend (Fri-Sat)</Label>
                <Input
                  id="weekend"
                  type="number"
                  value={config.weekend}
                  onChange={(e) => handleBaseRateChange('weekend', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sunday">Sunday</Label>
                <Input
                  id="sunday"
                  type="number"
                  value={config.sunday}
                  onChange={(e) => handleBaseRateChange('sunday', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Multipliers</CardTitle>
            <CardDescription>
              Adjust prices by month (1.0 = base price, 1.5 = 50% more, 0.7 = 30% discount)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {months.map(({ num, name }) => (
                <div key={num} className="space-y-2">
                  <Label htmlFor={`month-${num}`}>{name}</Label>
                  <Input
                    id={`month-${num}`}
                    type="number"
                    step="0.1"
                    value={config.monthlyMultipliers[num]}
                    onChange={(e) => handleMonthMultiplierChange(num, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={exportConfig} size="lg">
            <Download className="mr-2 h-4 w-4" />
            Export Configuration
          </Button>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>How to apply changes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click "Export Configuration" to download the pricing-config.json file</li>
              <li>Place the file in your project's root directory (where update-pricing.js is located)</li>
              <li>Run the update script: <code className="bg-background px-2 py-1 rounded">node update-pricing.js</code></li>
              <li>The script will update the pricingService.ts file and push changes to GitHub</li>
              <li>Your website will automatically update with the new prices</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingAdmin;
