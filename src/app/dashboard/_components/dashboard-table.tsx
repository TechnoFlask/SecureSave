"use client"

import { useSectionContext } from "../section-context"
import { CardType, PassType, SharedType } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { CredsTable } from "./creds-table"
import SharedTable from "./shared-table"

export function DashboardTable({
    creds,
}: {
    creds: {
        passwords: PassType[]
        cards: CardType[]
        shared: SharedType[]
    }
}) {
    const { currentSection } = useSectionContext()
    const { cards, passwords, shared } = creds

    return (
        <Card className="w-full">
            <CardContent>
                {currentSection === "passwords" && (
                    <CredsTable creds={passwords} credType="passwords" />
                )}
                {currentSection === "cards" && (
                    <CredsTable creds={cards} credType="cards" />
                )}
                {currentSection === "shared" && <SharedTable shared={shared} />}
            </CardContent>
        </Card>
    )
}
