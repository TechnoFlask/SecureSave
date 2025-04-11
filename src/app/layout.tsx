import type { Metadata } from "next"
import { Lato, Roboto } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ClerkProvider } from "@clerk/nextjs"

const lato = Lato({
    weight: ["400"],
})

const roboto = Roboto({ weight: ["400"] })

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
                <body className={`${roboto.className} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <header className="sticky top-0 z-10">
                            <Navbar />
                        </header>
                        <main>{children}</main>
                        <footer></footer>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
