"use client";

import { UserPlus, Settings, LayoutDashboard } from "lucide-react";

const steps = [
    {
        icon: <UserPlus className="w-5 h-5 text-primary" />,
        title: "Create Account",
        description: "Sign up in seconds. No credit card required."
    },
    {
        icon: <Settings className="w-5 h-5 text-primary" />,
        title: "Setup Farm Profile",
        description: "Input your crop, location, and sowing date."
    },
    {
        icon: <LayoutDashboard className="w-5 h-5 text-primary" />,
        title: "Get Insights",
        description: "Access your dashboard for live risk monitoring."
    }
];

export function HowItWorks() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                        How It Works
                    </h2>
                    <p className="text-muted-foreground">
                        Three simple steps to start farming with data.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Line behind on desktop */}
                    <div className="hidden md:block absolute top-6 left-0 w-full h-px bg-border -z-10" />

                    {steps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center bg-background">
                            <div className="w-12 h-12 rounded-full border bg-background flex items-center justify-center shadow-sm mb-4 z-10">
                                {step.icon}
                            </div>

                            <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-[200px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
