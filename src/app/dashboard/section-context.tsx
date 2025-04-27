"use client"

import { createContext, useContext, useState } from "react"

type DashboardContextType = {
    currentSection: "passwords" | "cards" | "shared"
    setCurrentSection: (section: "passwords" | "cards" | "shared") => void
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [currentSection, setCurrentSection] = useState<
        "passwords" | "cards" | "shared"
    >("passwords")

    return (
        <DashboardContext.Provider
            value={{
                currentSection,
                setCurrentSection,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export function useSectionContext() {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error(
            "useSectionContext must be used within a SectionContextProvider"
        )
    }
    return context
}
