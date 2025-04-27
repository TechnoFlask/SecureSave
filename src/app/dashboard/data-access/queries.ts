import "server-only"
import { cache } from "react"
import { getDashboardCreds } from "@/data-access/creds-access/queries"
import { getDashboardSharedCreds } from "@/data-access/shared-creds-access/queries"
import { Success } from "../utils/return-types"

export const getServerCreds = cache(async () => {
    const [creds, shared] = await Promise.all([
        getDashboardCreds(),
        getDashboardSharedCreds(),
    ])

    if (creds.success === false) return creds
    if (shared.success === false) return shared

    return Success({
        passwords: creds.data
            .filter((cred) => cred.credType === "passwords")
            .map((cred) => ({
                ...cred,
                createdAt: cred.createdAt.toLocaleString("en-IN"),
            })),
        cards: creds.data
            .filter((cred) => cred.credType === "cards")
            .map((cred) => ({
                ...cred,
                createdAt: cred.createdAt.toLocaleString("en-IN"),
            })),

        shared: shared.data.map((cred) => ({
            ...cred,
            createdAt: cred.createdAt.toLocaleString("en-IN"),
        })),
    })
})
