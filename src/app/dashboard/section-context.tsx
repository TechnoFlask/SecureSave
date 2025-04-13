"use client"

import { createContext, useContext, useState } from "react"
import { CardType, PassType } from "./types"

type DashboardContextType = {
    currentSection: "passwords" | "cards"
    setCurrentSection: (section: "passwords" | "cards") => void
    passwords: PassType[]
    setPasswords: (pass: PassType[]) => void
    cards: CardType[]
    setCards: (card: CardType[]) => void
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export function DashboardContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [currentSection, setCurrentSection] = useState<"passwords" | "cards">(
        "passwords"
    )
    const [passwords, setPasswords] = useState<PassType[]>([
        // { id: 1, desc: "Gmail", createdAt: new Date() },
        // { id: 2, desc: "Yahoo", createdAt: new Date() },
        // {
        //     id: 3,
        //     desc: "Amazonfwaefawe",
        //     createdAt: new Date(),
        // },
        // { id: 4, desc: "Amazon", createdAt: new Date() },
        // { id: 5, desc: "Amazon", createdAt: new Date() },
    ])

    const [cards, setCards] = useState<CardType[]>([
        // {
        //     id: 1,
        //     desc: "Primary card",
        //     holderName: "Anish",
        //     cardNumber: "123456789012345",
        //     cvv: "123",
        //     createdAt: new Date(),
        // },
        // {
        //     id: 2,
        //     desc: "Primary card",
        //     holderName: "Anish",
        //     cardNumber: "123456789012345",
        //     cvv: "123",
        //     createdAt: new Date(),
        // },
        // {
        //     id: 3,
        //     desc: "Primary card",
        //     holderName: "Anish",
        //     cardNumber: "123456789012345",
        //     cvv: "123",
        //     createdAt: new Date(),
        // },
        // {
        //     id: 4,
        //     desc: "Primary card",
        //     holderName: "Anish",
        //     cardNumber: "123456789012345",
        //     cvv: "123",
        //     createdAt: new Date(),
        // },
        // {
        //     id: 5,
        //     desc: "Primary card",
        //     holderName: "Anish",
        //     cardNumber: "123456789012345",
        //     cvv: "123",
        //     createdAt: new Date(),
        // },
    ])

    return (
        <DashboardContext.Provider
            value={{
                currentSection,
                setCurrentSection,
                passwords,
                setPasswords,
                cards,
                setCards,
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
