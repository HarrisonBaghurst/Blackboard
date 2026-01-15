import type { Metadata } from "next";
import "./globals.css";
import { CurrentColourProvider } from "@/contexts/ToolContext";

export const metadata: Metadata = {
  title: "Blackboard",
  description: "Collaborative Blackboard website with AI LaTeX conversion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <CurrentColourProvider>
          {children}
        </CurrentColourProvider>
      </body>
    </html>
  );
}
