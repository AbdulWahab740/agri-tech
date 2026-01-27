
// Mock Auth Service for MVP
// This simulates backend responses

export interface User {
    user_id: string;
    is_profile_complete: boolean;
    name?: string;
    email?: string;
}

export const mockAuthService = {
    login: async (email: string, password: string): Promise<User> => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock user
        return {
            user_id: "farmer_001",
            is_profile_complete: false, // Default to false to show flow
            email,
            name: "Farmer User"
        };
    },

    signup: async (email: string, password: string): Promise<User> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            user_id: "farmer_001",
            is_profile_complete: false,
            email,
            name: "Farmer User"
        };
    },

    saveProfile: async (data: any): Promise<boolean> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Simulate saving profile
        console.log("Profile saved:", data);
        return true;
    }
};
