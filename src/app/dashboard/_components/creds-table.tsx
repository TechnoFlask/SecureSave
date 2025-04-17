import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { CardActions } from "./cred-action-buttons"
import { useSearchParams } from "next/navigation"
import { CommonCredType } from "../types"
import { useSectionContext } from "../section-context"
import { Button } from "@/components/ui/button"

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

const PER_PAGE = 6

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

export function CredsTable({
    creds,
    credType,
}: {
    creds: CommonCredType[]
    credType: "passwords" | "cards"
}) {
    const searchParams = useSearchParams()
    const name = searchParams.get("name")
    const date = searchParams.get("date")
    const range = searchParams.get("range")
    let page: string | null
    if (credType === "passwords") page = searchParams.get("passpage")
    else page = searchParams.get("cardpage")

    const currentPage = page ? Number(page) : 1

    const { currentSection } = useSectionContext()

    const filteredCreds = filterCreds(creds, name, date, range)
    const paginatedFilteredCreds = filteredCreds.slice(
        (Number(currentPage) - 1) * PER_PAGE,
        Number(currentPage) * PER_PAGE
    )
    const pageCount = Math.ceil(filteredCreds.length / PER_PAGE)

    return (
        <div className="flex flex-col gap-4 w-full">
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
                    {paginatedFilteredCreds.map((cred) => (
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
                                    credType={
                                        currentSection !== "shared"
                                            ? currentSection
                                            : "passwords"
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            className="text-base"
                            href={
                                currentPage === 1
                                    ? "#"
                                    : `?${
                                          credType === "passwords"
                                              ? "pass"
                                              : "card"
                                      }page=${currentPage - 1}`
                            }
                        />
                    </PaginationItem>
                    {Array.from({ length: pageCount }, (_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                className="text-base"
                                href={`?${
                                    credType === "passwords" ? "pass" : "card"
                                }page=${i + 1}`}
                                isActive={currentPage === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            className="text-base"
                            href={
                                currentPage === pageCount
                                    ? "#"
                                    : `?${
                                          credType === "passwords"
                                              ? "pass"
                                              : "card"
                                      }page=${currentPage + 1}`
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
