"use client"

import { useSearchParams } from "next/navigation"
import { CommonCredType } from "../types"

function parseDate(localeString: string) {
    const [datePart, timePart] = localeString.split(", ")

    const [day, month, year] = datePart.split("/").map(Number)

    let [time, modifier] = timePart.split(" ")
    let [hours, minutes, seconds] = time.split(":").map(Number)

    if (modifier.toLowerCase() === "pm" && hours < 12) hours += 12
    if (modifier.toLowerCase() === "am" && hours === 12) hours = 0

    const date = new Date(year, month - 1, day, hours, minutes, seconds)

    return date
}

export function filterCreds(creds: CommonCredType[]) {
    const searchParams = useSearchParams()
    const name = searchParams.get("name")
    const date = searchParams.get("date")
    const range = searchParams.get("range")

    let filteredCreds: typeof creds

    if (name == null || name === "") filteredCreds = creds
    else
        filteredCreds = creds.filter((cred) =>
            cred.name.toLowerCase().includes(name?.toLowerCase())
        )

    if (date != null && range != null && range !== "None")
        filteredCreds = filteredCreds.filter((cred) => {
            let refDate = parseDate(cred.createdAt)
            refDate = new Date(
                refDate.getFullYear(),
                refDate.getMonth(),
                refDate.getDate()
            )
            let filterDate = new Date(date)

            filterDate = new Date(
                filterDate.getFullYear(),
                filterDate.getMonth(),
                filterDate.getDate()
            )

            if (range === "Before")
                return refDate.getTime() < filterDate.getTime()
            else if (range === "After")
                return refDate.getTime() > filterDate.getTime()
            else return refDate.getTime() === filterDate.getTime()
        })

    return filteredCreds
}
