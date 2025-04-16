"use server"

import { db } from "@/db"
import { cardsTable, passwordsTable, shareCredsTable } from "@/db/schema"
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

        const shared = await db
            .select()
            .from(shareCredsTable)
            .where(eq(shareCredsTable.sender, userId!))

        return { passwords, cards, shared }
    } catch (e) {
        console.log(e)
        return { error: "Unexpected error happened while fetching data" }
    }
}
