import React from "react";

export default function GuidanceSessionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-screen flex flex-col bg-gray-50">{children}</div>;
}
