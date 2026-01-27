"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type District = string;
export type Crop = string;
export type Province = string;
export type CropStage = string;
export type FarmSize = string;

interface AgriState {
    district: District | null;
    crop: Crop | null;
    province: Province | null;
    cropStage: CropStage | null;
    farmSize: FarmSize | null;
    setDistrict: (district: District) => void;
    setCrop: (crop: Crop) => void;
    setProvince: (province: Province) => void;
    setCropStage: (stage: CropStage) => void;
    setFarmSize: (size: FarmSize) => void;
    isSelectionComplete: boolean;
}

const AgriContext = createContext<AgriState | undefined>(undefined);

export function AgriProvider({ children }: { children: ReactNode }) {
    const [district, setDistrict] = useState<District | null>(null);
    const [crop, setCrop] = useState<Crop | null>(null);
    const [province, setProvince] = useState<Province | null>(null);
    const [cropStage, setCropStage] = useState<CropStage | null>(null);
    const [farmSize, setFarmSize] = useState<FarmSize | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    React.useEffect(() => {
        setDistrict(localStorage.getItem('district'));
        setCrop(localStorage.getItem('crop'));
        setProvince(localStorage.getItem('province'));
        setCropStage(localStorage.getItem('cropStage'));
        setFarmSize(localStorage.getItem('farmSize'));
        setIsLoaded(true);
    }, []);

    // Update localStorage when state changes
    React.useEffect(() => {
        if (!isLoaded) return;
        if (district) localStorage.setItem('district', district);
        if (crop) localStorage.setItem('crop', crop);
        if (province) localStorage.setItem('province', province);
        if (cropStage) localStorage.setItem('cropStage', cropStage);
        if (farmSize) localStorage.setItem('farmSize', farmSize);
    }, [district, crop, province, cropStage, farmSize, isLoaded]);

    const isSelectionComplete = isLoaded && district !== null && crop !== null && province !== null && cropStage !== null;

    return (
        <AgriContext.Provider
            value={{
                district,
                crop,
                province,
                cropStage,
                farmSize,
                setDistrict,
                setCrop,
                setProvince,
                setCropStage,
                setFarmSize,
                isSelectionComplete,
            }}
        >
            {children}
        </AgriContext.Provider>
    );
}

export function useAgri() {
    const context = useContext(AgriContext);
    if (context === undefined) {
        throw new Error("useAgri must be used within an AgriProvider");
    }
    return context;
}
