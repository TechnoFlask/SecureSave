import "server-only"
import { shareCredsTable } from "@/db/schema"
import { eq, InferInsertModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { cache } from "react"
import { checkAuthenticated } from "@/lib/auth"
import { Failure, Success } from "@/app/dashboard/utils/return-types"

type SharedCredInsertType = Omit<
    InferInsertModel<typeof shareCredsTable>,
    "sender"
>

const db = drizzle()

export const insertSharedCred = cache(async (values: SharedCredInsertType) => {
    const userId = await checkAuthenticated()

    try {
        const addedRecord = await db
            .insert(shareCredsTable)
            .values({ ...values, sender: userId })
            .returning()

        return Success(addedRecord[0].id)
    } catch (e) {
        return Failure(
            "Failed to insert shared credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})

export const deleteSharedCredById = cache(async (id: string) => {
    await checkAuthenticated()

    try {
        await db.delete(shareCredsTable).where(eq(shareCredsTable.id, id))

        return Success("")
    } catch (e) {
        return Failure(
            "Failed to delete shared credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})
