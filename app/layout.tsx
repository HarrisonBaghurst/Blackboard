import type { Metadata } from "next";
import "./globals.css";

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
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
