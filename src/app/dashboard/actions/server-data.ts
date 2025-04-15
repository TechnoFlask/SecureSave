"use server"

import { db } from "@/db"
import { cardsTable, passwordsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function getServerCreds() {
    try {
        const { userId } = await auth()

        const passwords = await db
            .select()
            .from(passwordsTable)
            .where(eq(passwordsTable.userId, userId!))
        const cards = await db
            .select()
            .from(cardsTable)
            .where(eq(cardsTable.userId, userId!))

        return { passwords, cards }
    } catch (e) {
        console.log(e)
        return { error: "Unexpected error happened while fetching data" }
    }
}
