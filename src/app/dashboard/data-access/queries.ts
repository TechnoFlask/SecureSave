import "server-only"
import { getDashboardCreds } from "@/data-access/creds-access/queries"
import { getDashboardSharedCreds } from "@/data-access/shared-creds-access/queries"
import { Success } from "../utils/return-types"

export const getServerCreds = async () => {
    const [creds, shared] = await Promise.all([
        getDashboardCreds(),
        getDashboardSharedCreds(),
    ])

    if (creds.success === false) return creds
    if (shared.success === false) return shared

    return Success({
        passwords: creds.data[0].map((cred) => ({
            ...cred,
            createdAt: cred.createdAt.toLocaleString("en-IN"),
        })),
        cards: creds.data[1].map((cred) => ({
            ...cred,
            createdAt: cred.createdAt.toLocaleString("en-IN"),
        })),
        shared: shared.data.map((cred) => ({
            ...cred,
            createdAt: cred.createdAt.toLocaleString("en-IN"),
        })),
    })
}
