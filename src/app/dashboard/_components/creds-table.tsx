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
import { CardType, PassType } from "../types"
import { Card, CardContent } from "@/components/ui/card"
import { CardFunctions } from "./card-functions"
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

function TableCore({ creds }: { creds: PassType[] | CardType[] }) {
    const searchParams = useSearchParams()
    const name = searchParams.get("name")
    const date = searchParams.get("date")
    const range = searchParams.get("range")

    console.log(date)

    let showable: typeof creds

    if (name == null || name === "") showable = creds
    else
        showable = creds.filter((cred) =>
            cred.desc.toLowerCase().includes(name?.toLowerCase())
        )

    let dateFilteredShowable = showable

    if (date != null && range != null)
        dateFilteredShowable = showable.filter((cred) => {
            let refDate = cred.createdAt
            refDate = new Date(
                refDate.getFullYear(),
                refDate.getMonth(),
                refDate.getDate()
            )
            const filterDate = new Date(date)

            if (range === "before") return refDate < filterDate
            else if (range === "after") return refDate > filterDate
            else return true
        })

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
                {dateFilteredShowable.map((cred) => (
                    <TableRow key={cred.id}>
                        <TableCell className="text-lg text-center font-medium">
                            {truncateOrPad(cred.desc, 10)}
                        </TableCell>
                        <TableCell className="text-lg text-center font-medium">
                            {cred.createdAt.toLocaleString()}
                        </TableCell>
                        <TableCell className="grid place-items-center">
                            <CardFunctions />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default function CredsTable() {
    const { currentSection, passwords, cards } = useSectionContext()

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
