import { SmallDashboard } from "./small-dashboard"
import { BigDashboard } from "./big-dashboard"
import { DashboardContextProvider } from "./section-context"
import { getServerCreds } from "./actions/server-data"

export const dynamic = "force-dynamic"
export const experimental_ppr = true

export default async function Dashboard() {
    const creds = await getServerCreds()
    if (creds.error != undefined)
        return <div>Failed to load credentials. Please try again later....</div>

    return (
        <DashboardContextProvider>
            <div className="container mx-auto lg:hidden">
                <SmallDashboard creds={creds} />
            </div>
            <div className="hidden w-screen h-screen lg:flex justify-center items-start xl:translate-y-36">
                <BigDashboard creds={creds} />
            </div>
        </DashboardContextProvider>
    )
}
