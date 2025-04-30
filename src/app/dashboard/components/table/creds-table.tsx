"use client"

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
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { CredActions } from "../cred-action-buttons"
import { useSearchParams } from "next/navigation"
import { CardType, CommonCredType, PassType } from "../../types"
import { useSectionContext } from "../../section-context"
import { filterCreds } from "../../utils/filtering"

const PER_PAGE = 6

export function CredsTable({
    creds,
}: {
    creds: { passwords: PassType[]; cards: CardType[] }
}) {
    const { currentSection } = useSectionContext()
    const searchParams = useSearchParams()

    const credType = currentSection === "passwords" ? "passwords" : "cards"
    const currentCreds =
        credType === "passwords" ? creds.passwords : creds.cards

    let page: string | null
    if (credType === "passwords") page = searchParams.get("passpage")
    else page = searchParams.get("cardpage")

    const currentPage = page ? Number(page) : 1

    const filteredCreds = filterCreds(currentCreds)
    const paginatedFilteredCreds = filteredCreds.slice(
        (Number(currentPage) - 1) * PER_PAGE,
        Number(currentPage) * PER_PAGE
    )
    const pageCount = Math.ceil(filteredCreds.length / PER_PAGE)

    return (
        <>
            {currentSection !== "shared" && (
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
                                        {cred.name}
                                        {/* {truncateOrPad(cred.name, 10)} */}
                                    </TableCell>
                                    <TableCell className="text-lg text-center font-medium">
                                        {cred.createdAt.toLocaleString()}
                                    </TableCell>
                                    <TableCell className="grid place-items-center">
                                        <CredActions
                                            credId={cred.id}
                                            credType={cred.credType}
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
                                            credType === "passwords"
                                                ? "pass"
                                                : "card"
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
            )}
        </>
    )
}
