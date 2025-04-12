import { currentUser } from "@clerk/nextjs/server"
import { SectionIsland } from "./_components/section-island"
import { AccountIsland } from "./_components/account-island"
import CredsTable from "./_components/creds-table"
import { CardType, PassType } from "./types"
import { AddCredButton } from "./_components/add-cred-button"
import { CredsTableFunctions } from "./_components/creds-table-functions"
import { CredsTableFilters } from "./_components/creds-table-filters"

export async function BigDashboard() {
    const user = await currentUser()

    return (
        <div className="container mx-auto p-10 xl:p-0 flex gap-10 xl:justify-center xl:items-start">
            <div className="flex flex-col gap-10">
                <AccountIsland user={user} />
                <SectionIsland />
                <CredsTableFilters />
            </div>
            <div className="grow flex flex-col items-end w-full gap-10">
                <CredsTableFunctions />
                <CredsTable />
            </div>
        </div>
    )
}
