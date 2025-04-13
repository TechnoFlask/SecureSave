"use server"

import { db } from "@/db"
import { cardsTable, passwordsTable } from "@/db/schema"

export async function getServerCreds() {
    try {
        const passwords = await db.select().from(passwordsTable)
        const cards = await db.select().from(cardsTable)

        return { passwords, cards }
    } catch (_) {
        return { error: "Unexpected error happened while fetching data" }
    }
}
