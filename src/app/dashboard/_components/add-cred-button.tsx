"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaPlus } from "react-icons/fa6"
import { useSectionContext } from "../section-context"

export function AddCredButton() {
    const { currentSection } = useSectionContext()
    return (
        <Card className="cursor-pointer max-w-sm">
            <CardContent className="flex justify-center items-center gap-3">
                <FaPlus />
                <span className="text-xl font-semibold">
                    Add {currentSection === "passwords" ? "Password" : "Card"}
                </span>
            </CardContent>
        </Card>
    )
}
