import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Efunds - Plug, Play and Lend",
    description: "Empower your lending business with seamless infrastructure. Connect, configure, and start disbursing loans in minutes, not months.",
};

export default function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-black">
            {children}
        </div>
    );
}
