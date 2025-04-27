import "server-only"
import { Failure, Success } from "@/app/dashboard/utils/return-types"
import { credsTable } from "@/db/schema"
import { checkAuthenticated } from "@/lib/auth"
import { eq, InferInsertModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { cache } from "react"

type CredUpdateType = Partial<InferInsertModel<typeof credsTable>>
type CredInsertType = Omit<InferInsertModel<typeof credsTable>, "userId">

const db = drizzle()

export const insertCred = cache(async (values: CredInsertType) => {
    const userId = await checkAuthenticated()

    try {
        await db.insert(credsTable).values({ ...values, userId })

        return Success("")
    } catch (e) {
        return Failure(
            "Failed to insert credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})

export const updateCredById = cache(
    async (id: string, values: CredUpdateType) => {
        await checkAuthenticated()

        try {
            await db.update(credsTable).set(values).where(eq(credsTable.id, id))

            Success("")
        } catch (e) {
            return Failure(
                "Failed to update credential",
                (e as Error).cause,
                (e as Error).message
            )
        }
    }
)

export const deleteCredById = cache(async (id: string) => {
    await checkAuthenticated()

    try {
        await db.delete(credsTable).where(eq(credsTable.id, id))

        return Success("")
    } catch (e) {
        return Failure(
            "Failed to delete credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
})
