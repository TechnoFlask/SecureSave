"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { FaSearch, FaCalendarAlt } from "react-icons/fa"

export function CredsTableFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [range, setRange] = useState("before")

    const createQueryString = useCallback(
        (data: { name: string; value: string }[]) => {
            const params = new URLSearchParams(searchParams.toString())
            data.forEach((datum) => {
                params.set(datum.name, datum.value)
            })

            return params.toString()
        },
        [searchParams]
    )

    return (
        <Card className="w-3xs">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 items-center">
                <div className="flex justify-center items-center gap-3">
                    <FaSearch size={20} />
                    <Input
                        placeholder="Name"
                        className="placeholder:text-lg placeholder:text-left focus:text-lg"
                        onChange={(e) =>
                            router.push(
                                pathname +
                                    "?" +
                                    createQueryString([
                                        { name: "name", value: e.target.value },
                                    ])
                            )
                        }
                    />
                </div>
                <div className="w-full flex justify-between gap-3">
                    <Popover>
                        <PopoverTrigger>
                            <FaCalendarAlt />
                        </PopoverTrigger>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow"
                            />
                        </PopoverContent>
                    </Popover>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="text-lg text-muted-foreground grow flex justify-start"
                            >
                                <p className="-translate-x-1">Choose Range</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Date Ranges</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={range}
                                onValueChange={setRange}
                            >
                                <DropdownMenuRadioItem value="before">
                                    Before
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="after">
                                    After
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="on">
                                    On
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Button
                    className="text-lg w-full mt-2"
                    onClick={() => {
                        router.push(
                            pathname +
                                "?" +
                                createQueryString([
                                    {
                                        name: "date",
                                        value: date?.toISOString()!,
                                    },
                                    { name: "range", value: range },
                                ])
                        )
                    }}
                >
                    Filter
                </Button>
            </CardContent>
        </Card>
    )
}
