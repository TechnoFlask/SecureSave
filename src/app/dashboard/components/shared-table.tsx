"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SharedType } from "../types"
import { useSectionContext } from "../section-context"

export default function SharedTable({ shared }: { shared: SharedType[] }) {
    const { currentSection } = useSectionContext()
    return (
        <>
            {currentSection === "shared" && (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-xl font-semibold text-center">
                                Shared ID
                            </TableHead>
                            <TableHead className="text-xl font-semibold text-center">
                                Type
                            </TableHead>
                            <TableHead className="text-xl font-semibold text-center">
                                Shared On
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {shared.map((cred) => (
                            <TableRow key={cred.id}>
                                <TableCell className="text-lg text-center font-medium">
                                    {cred.id}
                                </TableCell>
                                <TableCell className="text-lg text-center font-medium">
                                    {cred.credType === "passwords"
                                        ? "Password"
                                        : "Card"}
                                </TableCell>
                                <TableCell className="text-lg text-center font-medium">
                                    {cred.createdAt.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    )
}
