"use client";

import { MapPin, Sprout, Wheat } from "lucide-react";
import { useAgri } from "@/context/AgriContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FarmerSnapshot() {
    const { district, province, crop, cropStage } = useAgri();

    return (
        <Card className="border-primary/20 bg-primary/5 mb-6">
            <CardContent className="p-4">
                <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-between gap-4">

                    {/* Location */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-full shadow-sm shrink-0">
                            <MapPin className="w-5 h-5 text-destructive" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">Location</p>
                            <p className="font-heading font-semibold text-foreground text-sm md:text-base truncate">
                                {district || "Unknown"}, {province?.substring(0, 3) || "PB"}
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-primary/10" />

                    {/* Crop */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-full shadow-sm shrink-0">
                            <Wheat className="w-5 h-5 text-secondary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">Crop</p>
                            <p className="font-heading font-semibold text-foreground text-sm md:text-base truncate">{crop || "Wheat"}</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-primary/10" />

                    {/* Stage */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-background rounded-full shadow-sm shrink-0">
                            <Sprout className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider truncate">Stage</p>
                            <p className="font-heading font-semibold text-foreground text-sm md:text-base truncate">{cropStage || "Vegetative"}</p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <div className="flex justify-end md:ml-auto col-span-1">
                        <Button variant="outline" size="sm" className="h-9 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary w-full md:w-auto">
                            Edit
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
