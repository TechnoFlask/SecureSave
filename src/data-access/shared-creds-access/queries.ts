import "server-only"
import { credsTable, shareCredsTable } from "@/db/schema"
import { checkAuthenticated } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { cache } from "react"
import { Failure, Success } from "@/app/dashboard/utils/return-types"
import { unstable_cacheTag as cacheTag } from "next/cache"

const db = drizzle()

export const getDashboardSharedCreds = cache(async () => {
    const userId = await checkAuthenticated()

    return _getDashboardSharedCreds(userId)
})

const _getDashboardSharedCreds = async (userId: string) => {
    "use cache"
    cacheTag(`shared-creds-${userId}`)

    try {
        return Success(
            await db
                .select({
                    id: shareCredsTable.id,
                    credType: shareCredsTable.credType,
                    createdAt: shareCredsTable.createdAt,
                    name: credsTable.name,
                })
                .from(shareCredsTable)
                .where(eq(shareCredsTable.sender, userId))
                .innerJoin(
                    credsTable,
                    eq(shareCredsTable.credId, credsTable.id)
                )
        )
    } catch (e) {
        return Failure(
            "Failed to get shared credentials",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export const getSharedCredById = cache(async (id: string) => {
    await checkAuthenticated()

    try {
        const filteredSharedCred = await db
            .select()
            .from(shareCredsTable)
            .where(eq(shareCredsTable.id, id))
            .limit(1)

        if (filteredSharedCred.length === 0) {
            return Failure(
                "Shared credential not found",
                "Shared credential not found",
                "No shared credential found with the provided ID."
            )
        }

        return Success(filteredSharedCred[0])
    } catch (e) {
        return Failure(
            "Failed to get shared credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})
