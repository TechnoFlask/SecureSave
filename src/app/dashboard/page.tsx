import { SmallDashboard } from "./small-dashboard"
import { BigDashboard } from "./big-dashboard"
import { DashboardContextProvider } from "./section-context"

export default function Dashboard() {
    return (
        <DashboardContextProvider>
            <div className="container mx-auto lg:hidden">
                <SmallDashboard />
            </div>
            <div className="hidden w-screen h-screen lg:flex justify-center items-center xl:-translate-y-24">
                <BigDashboard />
            </div>
        </DashboardContextProvider>
    )
}
