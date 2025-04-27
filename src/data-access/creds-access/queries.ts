import "server-only"
import { credsTable } from "@/db/schema"
import { checkAuthenticated } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { cache } from "react"
import { Failure, Success } from "@/app/dashboard/utils/return-types"

const db = drizzle()

export const getDashboardCreds = cache(async () => {
    const userId = await checkAuthenticated()

    try {
        return Success(
            await db
                .select({
                    id: credsTable.id,
                    name: credsTable.name,
                    createdAt: credsTable.createdAt,
                    credType: credsTable.credType,
                })
                .from(credsTable)
                .where(eq(credsTable.userId, userId!))
        )
    } catch (e) {
        return Failure(
            "Failed to get credentials",
            (e as Error).cause,
            (e as Error).message
        )
    }
})

export const getCredById = cache(async (id: string) => {
    await checkAuthenticated()

    try {
        const filteredCred = await db
            .select()
            .from(credsTable)
            .where(and(eq(credsTable.id, id)))
            .limit(1)

        if (filteredCred.length === 0)
            return Failure(
                "Credential not found",
                "Credential not found",
                "No credential found with the provided ID."
            )

        return Success(filteredCred[0])
    } catch (e) {
        return Failure(
            "Failed to get credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})
