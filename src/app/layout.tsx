import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "sonner"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

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
        <Suspense>
            <ClerkProvider>
                <html
                    lang="en"
                    suppressHydrationWarning
                    className="scroll-smooth"
                >
                    <body className={`${openSans.className} antialiased`}>
                        {/* <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    > */}
                        {/* <header className="sticky top-0 z-10">
                            <Navbar />
                        </header> */}
                        <main>{children}</main>
                        <Toaster />
                        <Analytics />
                        {/* </ThemeProvider> */}
                    </body>
                </html>
            </ClerkProvider>
        </Suspense>
    )
}
