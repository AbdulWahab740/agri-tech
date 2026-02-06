"use client";

import { useState, useEffect } from "react";
import { Loader2, Sprout, MapPin, Ruler, Wheat, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import { useAgri } from "@/context/AgriContext";

import { cn } from "@/lib/utils";

const PROVINCES = ["Punjab", "Sindh", "KPK", "Balochistan"];

const DISTRICTS: Record<string, string[]> = {
    Punjab: ["Lahore", "Multan", "Faisalabad", "Gujranwala", "Rawalpindi", "Khanewal", "Jhelum"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur", "Larkana"],
    KPK: ["Peshawar", "Mardan", "Abbottabad", "Swat"],
    Balochistan: ["Quetta", "Gwadar", "Turbat", "Khuzdar"],
};

const CROPS = ["Wheat", "Rice", "Cotton", "Sugarcane", "Maize"];
const STAGES = ["Sowing", "Vegetative", "Flowering", "Harvest"];
const SIZES = ["Small (< 5 acres)", "Medium (5-25 acres)", "Large (> 25 acres)"];
const IRRIGATION_TYPES = ["Canal", "Tubewell", "Drip", "Sprinkler", "Rainfed"];
const SOIL_TYPES = ["Clay", "Sandy", "Loam", "Silt", "Peat"];

interface EditDashboardSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditDashboardSheet({ open, onOpenChange }: EditDashboardSheetProps) {
    const {
        district,
        province,
        crop,
        cropStage,
        farmSize,
        irrigation_type,
        soil_type,
        setDistrict,
        setProvince,
        setCrop,
        setCropStage,
        setFarmSize,
        setIrrigationType,
        setSoilType,
    } = useAgri();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        crop: crop || "",
        province: province || "",
        district: district || "",
        farmSize: farmSize || "",
        cropStage: cropStage || "",
        irrigationType: irrigation_type || "",
        soilType: soil_type || "",
    });

    // Update form data when context changes or sheet opens
    useEffect(() => {
        if (open) {
            setFormData({
                crop: crop || "",
                province: province || "",
                district: district || "",
                farmSize: farmSize || "",
                cropStage: cropStage || "",
                irrigationType: irrigation_type || "",
                soilType: soil_type || "",
            });
            setError(null);
        }
    }, [open, crop, province, district, farmSize, cropStage, irrigation_type, soil_type]);

    const handleProvinceChange = (value: string) => {
        setFormData({ ...formData, province: value, district: "" });
    };

    const handleSubmit = async () => {
        if (typeof window === "undefined") return;
        setIsLoading(true);
        setError(null);

        try {
            const apiPayload = {
                province: formData.province,
                district: formData.district,
                crop: formData.crop,
                stage: formData.cropStage,
                irrigation_type: formData.irrigationType,
                soil_type: formData.soilType,
                area: parseInt(formData.farmSize) || 0,
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/dashboard/profile`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        ...(localStorage.getItem("access_token")
                            ? { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
                            : {}),
                    },
                    body: JSON.stringify(apiPayload),
                }
            );

            if (res.status === 401) {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
                return;
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.detail || err.error || "Failed to update profile");
            }

            // Update Context on success
            if (formData.province) setProvince(formData.province);
            if (formData.district) setDistrict(formData.district);
            if (formData.crop) setCrop(formData.crop);
            if (formData.cropStage) setCropStage(formData.cropStage);
            if (formData.farmSize) setFarmSize(formData.farmSize);
            if (formData.irrigationType) setIrrigationType(formData.irrigationType);
            if (formData.soilType) setSoilType(formData.soilType);

            onOpenChange(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Update failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[540px] p-0 flex flex-col bg-muted/5">
                <SheetHeader className="px-6 py-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-10 -mb-10 blur-xl" />

                    <div className="relative z-10 flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                            <Sprout className="w-6 h-6 text-white" />
                        </div>
                        <div className="space-y-1">
                            <SheetTitle className="font-heading text-2xl text-white">Edit Profile</SheetTitle>
                            <SheetDescription className="text-primary-foreground/80">
                                Personalize your dashboard for better insights.
                            </SheetDescription>
                        </div>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}
                    {/* Location Section */}
                    <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                            <div className="p-2 bg-green-100 rounded-full text-green-700">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">Location</h3>
                                <p className="text-xs text-muted-foreground">Regional weather & alerts</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Province</Label>
                                <Select onValueChange={handleProvinceChange} value={formData.province}>
                                    <SelectTrigger className="bg-muted/30 border-primary/20 focus:ring-primary/20">
                                        <SelectValue placeholder="Select Province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {PROVINCES.map((p) => (
                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">District</Label>
                                <Select
                                    disabled={!formData.province}
                                    onValueChange={(val) => setFormData({ ...formData, district: val })}
                                    value={formData.district}
                                >
                                    <SelectTrigger className="bg-muted/30 border-primary/20 focus:ring-primary/20">
                                        <SelectValue placeholder="Select District" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(formData.province ? DISTRICTS[formData.province] : []).map((d) => (
                                            <SelectItem key={d} value={d}>{d}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Crop Section */}
                    <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                            <div className="p-2 bg-yellow-100 rounded-full text-yellow-700">
                                <Wheat className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">Crop Details</h3>
                                <p className="text-xs text-muted-foreground">Tailored recommendations</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Primary Crop</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, crop: val })} value={formData.crop}>
                                    <SelectTrigger className="bg-muted/30 border-secondary/20 focus:ring-secondary/20">
                                        <SelectValue placeholder="Select Crop" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CROPS.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Current Stage</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, cropStage: val })} value={formData.cropStage}>
                                    <SelectTrigger className="bg-muted/30 border-secondary/20 focus:ring-secondary/20">
                                        <SelectValue placeholder="Select Stage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STAGES.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Resources Section */}
                    <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                            <div className="p-2 bg-blue-100 rounded-full text-blue-700">
                                <Droplet className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">Methods & Soil</h3>
                                <p className="text-xs text-muted-foreground">Precision management</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Irrigation Type</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, irrigationType: val })} value={formData.irrigationType}>
                                    <SelectTrigger className="bg-muted/30 border-blue-200">
                                        <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {IRRIGATION_TYPES.map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Soil Type</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, soilType: val })} value={formData.soilType}>
                                    <SelectTrigger className="bg-muted/30 border-orange-200">
                                        <SelectValue placeholder="Select Soil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SOIL_TYPES.map((s) => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Farm Size Section */}
                    <div className="bg-background rounded-xl border border-border/50 shadow-sm p-5 space-y-4 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                            <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                                <Ruler className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm text-foreground">Farm Size</h3>
                                <p className="text-xs text-muted-foreground">Resource planning</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Area</Label>
                            <Input
                                type="number"
                                placeholder="Enter the area in acres (e.g., 10)"
                                value={formData.farmSize}
                                onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                                className="h-11 bg-white border-gray-200 focus:ring-primary/20 focus:border-primary transition-all"
                            />
                        </div>
                    </div>
                </div>

                <SheetFooter className="px-6 py-4 bg-background border-t border-border flex items-center justify-end gap-3 sticky bottom-0 z-10 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.1)]">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 min-w-[140px]"
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
}
