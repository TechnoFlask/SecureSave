"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaCreditCard, FaKey } from "react-icons/fa6"
import { useSectionContext } from "../section-context"

export function SectionIsland() {
    const { setCurrentSection } = useSectionContext()
    return (
        <Card className="w-3xs">
            <CardContent className="flex flex-col gap-5">
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setCurrentSection("passwords")}
                >
                    <FaKey />
                    <span className="text-xl font-semibold">My Passwords</span>
                </div>
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setCurrentSection("cards")}
                >
                    <FaCreditCard />
                    <span className="text-xl font-semibold">My Cards</span>
                </div>
            </CardContent>
        </Card>
    )
}
