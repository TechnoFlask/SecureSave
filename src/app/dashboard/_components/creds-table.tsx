"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useSectionContext } from "../section-context"
import { CardType, CommonCredType, PassType } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { CardActions } from "./cred-action-buttons"
import { useSearchParams } from "next/navigation"

function truncateOrPad(str: string, maxlength: number) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength) + "..."
    } else {
        let pad = ""
        for (let i = 0; i < maxlength - str.length; i++) {
            pad = pad + " "
        }
        return str + pad
    }
}

function filterCreds(
    creds: CommonCredType[],
    name: string | null,
    date: string | null,
    range: string | null
) {
    let filteredCreds: typeof creds

    if (name == null || name === "") filteredCreds = creds
    else
        filteredCreds = creds.filter((cred) =>
            cred.name.toLowerCase().includes(name?.toLowerCase())
        )

    if (date != null && range != null)
        filteredCreds = filteredCreds.filter((cred) => {
            let refDate = cred.createdAt
            refDate = new Date(
                refDate.getFullYear(),
                refDate.getMonth(),
                refDate.getDate()
            )
            const filterDate = new Date(date)

            if (range === "Before") return refDate < filterDate
            else if (range === "After") return refDate > filterDate
            else return refDate.getTime() === filterDate.getTime()
        })

    return filteredCreds
}

function TableCore({ creds }: { creds: CommonCredType[] }) {
    const searchParams = useSearchParams()
    const name = searchParams.get("name")
    const date = searchParams.get("date")
    const range = searchParams.get("range")
    const { currentSection } = useSectionContext()

    const filteredCreds = filterCreds(creds, name, date, range)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-xl font-semibold text-center">
                        Name
                    </TableHead>
                    <TableHead className="text-xl font-semibold text-center">
                        Created On
                    </TableHead>
                    <TableHead className="text-xl font-semibold text-center">
                        Actions
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredCreds.map((cred) => (
                    <TableRow key={cred.id}>
                        <TableCell className="text-lg text-center font-medium">
                            {truncateOrPad(cred.name, 10)}
                        </TableCell>
                        <TableCell className="text-lg text-center font-medium">
                            {cred.createdAt.toLocaleString()}
                        </TableCell>
                        <TableCell className="grid place-items-center">
                            <CardActions
                                credId={cred.id}
                                credType={currentSection}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export function CredsTable({
    creds,
}: {
    creds: {
        passwords: PassType[]
        cards: CardType[]
    }
}) {
    const { currentSection } = useSectionContext()
    const { cards, passwords } = creds

    return (
        <Card className="w-full">
            <CardContent>
                {currentSection === "passwords" ? (
                    <TableCore creds={passwords} />
                ) : (
                    <TableCore creds={cards} />
                )}
            </CardContent>
        </Card>
    )
}
