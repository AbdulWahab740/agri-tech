"use client";

import { CloudRain, Thermometer, Wind, Droplets, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function LiveClimatePanel() {
    const [lastUpdated, setLastUpdated] = useState("Just now");
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            setLastUpdated("Just now");
            setLoading(false);
        }, 1000);
    };

    return (
        <Card className="border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                        <Thermometer className="w-5 h-5 text-secondary" />
                    </div>
                    Live Climate
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={loading}>
                    <RefreshCw className={`w-4 h-4 text-[#6B7280] ${loading ? "animate-spin" : ""}`} />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex items-end justify-between mb-6">
                    <div>
                        <span className="text-4xl font-bold text-[#1F2937] font-heading">27°C</span>
                        <p className="text-sm text-[#6B7280]">Sunny</p>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 text-xs bg-primary/20 text-primary-dark rounded-full font-medium">
                            Low Rain Chance
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <ClimateMetric
                        icon={<Droplets className="w-4 h-4" />}
                        label="Humidity"
                        value="68%"
                        color="text-blue-500"
                        bgColor="bg-blue-50"
                    />
                    <ClimateMetric
                        icon={<Wind className="w-4 h-4" />}
                        label="Wind"
                        value="12 km/h"
                        color="text-gray-500"
                        bgColor="bg-gray-100"
                    />
                    <ClimateMetric
                        icon={<CloudRain className="w-4 h-4" />}
                        label="Precip"
                        value="0mm"
                        color="text-cyan-500"
                        bgColor="bg-cyan-50"
                    />
                </div>
                <p className="text-xs text-[#9CA3AF] mt-4 text-center">Updated: {lastUpdated}</p>
            </CardContent>
        </Card>
    );
}

function ClimateMetric({ icon, label, value, color, bgColor }: { icon: React.ReactNode, label: string, value: string, color: string, bgColor: string }) {
    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${bgColor}`}>
            <div className={`mb-1 ${color}`}>
                {icon}
            </div>
            <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
            <p className="font-semibold text-foreground text-sm">{value}</p>
        </div>
    )
}
