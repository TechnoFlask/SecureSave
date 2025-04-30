import { SectionIsland } from "./components/section-island"
import { AccountIsland } from "./components/account-island"
import { DashboardTable } from "./components/table/dashboard-table"
import { CredsFilters } from "./components/creds-filters"
import { AddCredButton } from "./components/add-cred-button"
import { AccessSharedCred } from "./components/access-shared-cred"
import { Suspense } from "react"

export async function BigDashboard() {
    // const creds = await getServerCreds()
    // if (creds.error != undefined)
    //     return <div>Failed to load credentials. Please try again later....</div>

    return (
        <div className="container mx-auto p-10 xl:p-0 flex gap-10 xl:justify-center xl:items-start">
            <div className="flex flex-col gap-10">
                <Suspense
                    fallback={
                        <div className="w-full h-20 bg-slate-200 animate-pulse rounded-md" />
                    }
                >
                    <AccountIsland />
                </Suspense>
                <SectionIsland />

                <Suspense
                    fallback={
                        <div className="w-full h-20 bg-slate-200 animate-pulse rounded-md" />
                    }
                >
                    <CredsFilters />
                </Suspense>
            </div>
            <div className="grow flex flex-col items-end w-full gap-10">
                <div className="flex justify-between w-full">
                    <AccessSharedCred />
                    <AddCredButton />
                </div>
                <Suspense
                    fallback={
                        <div className="w-full h-20 bg-slate-200 animate-pulse rounded-md" />
                    }
                >
                    <DashboardTable />
                </Suspense>
            </div>
        </div>
    )
}
