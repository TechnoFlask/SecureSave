import type { Metadata } from "next"
import { Open_Sans, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"

const openSans = Open_Sans({
    weight: ["400"],
    subsets: ["latin"],
})

const inter = Inter({
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
            <html lang="en" suppressHydrationWarning>
                <body className={`${openSans.className} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <header className="sticky top-0 z-10">
                            <Navbar />
                        </header>
                        <main>{children}</main>
                        <footer></footer>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
