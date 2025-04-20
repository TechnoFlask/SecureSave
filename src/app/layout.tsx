import type { Metadata } from "next"
import { Open_Sans, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { FaGithub } from "react-icons/fa6"
import Link from "next/link"

const openSans = Open_Sans({
    weight: ["400"],
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "SecureSave",
    description: "One solution to securing credentials",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning className="scroll-smooth">
                <body className={`${openSans.className} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {/* <header className="sticky top-0 z-10">
                            <Navbar />
                        </header> */}
                        <main>{children}</main>
                        <footer className="text-center text-gray-500 py-8 text-sm bg-white flex items-center justify-center gap-10 lg:gap-50">
                            <p className="pl-10 lg:pl-50">
                                Built by Technoflask · 2025
                            </p>
                            <Link
                                href="https://github.com/Technoflask/SecureSave"
                                target="_blank"
                            >
                                <FaGithub size={30} />
                            </Link>
                        </footer>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
