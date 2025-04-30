import { SmallDashboard } from "./small-dashboard"
import { BigDashboard } from "./big-dashboard"
import { DashboardContextProvider } from "./section-context"

export const experimental_ppr = true

export default async function Dashboard() {
    return (
        <DashboardContextProvider>
            <div className="container mx-auto lg:hidden h-dvh overflow-y-hidden flex flex-col">
                <SmallDashboard />
            </div>
            <div className="hidden w-screen h-screen lg:flex justify-center items-start xl:translate-y-36">
                <BigDashboard />
            </div>
        </DashboardContextProvider>
    )
}
