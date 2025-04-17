"use server"

import { db } from "@/db"
import { credsTable, shareCredsTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq } from "drizzle-orm"

export async function getServerCreds() {
    try {
        const { userId } = await auth()

        const creds = await db
            .select({
                id: credsTable.id,
                name: credsTable.name,
                createdAt: credsTable.createdAt,
                credType: credsTable.credType,
            })
            .from(credsTable)
            .where(eq(credsTable.userId, userId!))

        const shared = await db
            .select({
                id: shareCredsTable.id,
                credType: shareCredsTable.credType,
                createdAt: shareCredsTable.createdAt,
            })
            .from(shareCredsTable)
            .where(eq(shareCredsTable.sender, userId!))

        return {
            passwords: creds.filter((cred) => cred.credType === "passwords"),
            cards: creds.filter((cred) => cred.credType === "cards"),
            shared,
        }
    } catch (e) {
        console.log(e)
        return { error: "Unexpected error happened while fetching data" }
    }
}
