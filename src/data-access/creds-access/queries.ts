import "server-only"
import { credsTable } from "@/db/schema"
import { checkAuthenticated } from "@/lib/auth"
import { and, eq } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { cache } from "react"
import { Failure, Success } from "@/app/dashboard/utils/return-types"
import { unstable_cacheTag as cacheTag } from "next/cache"

const db = drizzle()

export const getDashboardCreds = cache(async () => {
    const userId = await checkAuthenticated()

    return _getDashboardCreds(userId)
})

const _getDashboardCreds = async (userId: string) => {
    try {
        return Success(
            await Promise.all([getAllPasswords(userId), getAllCards(userId)])
        )
    } catch (e) {
        return Failure(
            "Failed to get credentials",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

const getAllPasswords = async (userId: string) => {
    "use cache"
    cacheTag(`passwords-${userId}`)

    return db
        .select({
            id: credsTable.id,
            name: credsTable.name,
            createdAt: credsTable.createdAt,
            credType: credsTable.credType,
        })
        .from(credsTable)
        .where(
            and(
                eq(credsTable.userId, userId),
                eq(credsTable.credType, "passwords")
            )
        )
}

const getAllCards = async (userId: string) => {
    "use cache"
    cacheTag(`cards-${userId}`)

    return db
        .select({
            id: credsTable.id,
            name: credsTable.name,
            createdAt: credsTable.createdAt,
            credType: credsTable.credType,
        })
        .from(credsTable)
        .where(
            and(eq(credsTable.userId, userId), eq(credsTable.credType, "cards"))
        )
}

export const getCredById = cache(async (id: string) => {
    await checkAuthenticated()

    try {
        const filteredCred = await db
            .select()
            .from(credsTable)
            .where(eq(credsTable.id, id))
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
