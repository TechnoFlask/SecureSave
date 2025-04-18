import { currentUser } from "@clerk/nextjs/server"
import { SectionIsland } from "./_components/section-island"
import { AccountIsland } from "./_components/account-island"
import { DashboardTable } from "./_components/dashboard-table"
import { CredsTableFilters } from "./_components/creds-table-filters"
import { AddCredButton } from "./_components/add-cred-button"
import { CardType, PassType, SharedType } from "./types"
import { AccessSharedCred } from "./_components/access-shared-cred"

export async function BigDashboard({
    creds,
}: {
    creds: {
        passwords: PassType[]
        cards: CardType[]
        shared: SharedType[]
    }
}) {
    const user = await currentUser()

    // const creds = await getServerCreds()
    // if (creds.error != undefined)
    //     return <div>Failed to load credentials. Please try again later....</div>

    return (
        <div className="container mx-auto p-10 xl:p-0 flex gap-10 xl:justify-center xl:items-start">
            <div className="flex flex-col gap-10">
                <AccountIsland user={user} />
                <SectionIsland />
                <CredsTableFilters />
            </div>
            <div className="grow flex flex-col items-end w-full gap-10">
                <div className="flex justify-between w-full">
                    <AccessSharedCred />
                    <AddCredButton />
                </div>
                <DashboardTable creds={creds} />
            </div>
        </div>
    )
}
