"use client";

import { AlertTriangle, Bug, CloudLightning, Info, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

interface RiskItem {
    type: string;
    level: RiskLevel;
    icon: React.ReactNode;
    explanation: string;
}

const RISKS: RiskItem[] = [
    {
        type: "Disease Risk",
        level: "HIGH",
        icon: <AlertTriangle className="w-5 h-5" />,
        explanation: "High humidity (85%) combined with moderate temperatures (22°C) creates ideal conditions for Yellow Rust. Preventative fungicide spray is recommended immediately."
    },
    {
        type: "Pest Risk",
        level: "MEDIUM",
        icon: <Bug className="w-5 h-5" />,
        explanation: "Aphid population is rising in neighboring districts. Monitor your crop density. Current wind speed favors migration."
    },
    {
        type: "Climate Risk",
        level: "LOW",
        icon: <CloudLightning className="w-5 h-5" />,
        explanation: "Weather forecast is favorable for the next 7 days. No extreme heat or heavy rainfall events predicted."
    }
];

const LEVEL_COLORS: Record<RiskLevel, string> = {
    LOW: "bg-green-100 text-green-700 border-green-200",
    MEDIUM: "bg-yellow-100 text-yellow-700 border-yellow-200",
    HIGH: "bg-red-100 text-red-700 border-red-200",
};

export function RiskAssessmentPanel() {
    return (
        <Card className="border-[#E5E7EB] shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    Risk Assessment
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {RISKS.map((risk) => (
                    <div key={risk.type} className="flex items-center justify-between p-3 rounded-lg border border-transparent hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${risk.level === 'HIGH' ? 'bg-red-100' : risk.level === 'MEDIUM' ? 'bg-yellow-100' : 'bg-green-100'}`}>
                                {risk.icon}
                            </div>
                            <div>
                                <h4 className="font-medium text-sm text-[#1F2937]">{risk.type}</h4>
                                <Badge variant="outline" className={`mt-1 text-[10px] px-2 py-0 h-5 font-semibold border ${LEVEL_COLORS[risk.level]}`}>
                                    {risk.level}
                                </Badge>
                            </div>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-xs text-primary gap-1 hover:text-primary-light">
                                    Why? <Info className="w-3 h-3" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle className="text-primary flex items-center gap-2">
                                        {risk.icon}
                                        {risk.type} Analysis
                                    </SheetTitle>
                                    <SheetDescription>
                                        Detailed breakdown of the risk factors.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-4">
                                    <div className={`p-4 rounded-lg border ${LEVEL_COLORS[risk.level]}`}>
                                        <p className="font-semibold text-lg">Current Risk: {risk.level}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">AI Explanation</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                            {risk.explanation}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">Recommended Actions</h4>
                                        <ul className="grid gap-2">
                                            <li className="flex items-start gap-2 text-sm text-foreground">
                                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                <span>Monitor field density daily.</span>
                                            </li>
                                            <li className="flex items-start gap-2 text-sm text-foreground">
                                                <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                <span>Check for discoloration in lower leaves.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
