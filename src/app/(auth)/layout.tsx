import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-agri-background relative p-4">
            <div className="absolute top-8 left-8">
                <Button variant="ghost" asChild className="gap-2 text-agri-primary hover:text-agri-primary-light hover:bg-agri-primary/10">
                    <Link href="/">
                        <MoveLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
            <div className="w-full max-w-md animate-fade-in-up">
                {children}
            </div>
        </div>
    );
}
