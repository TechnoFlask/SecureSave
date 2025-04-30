import Navbar from "@/components/Navbar"
import { DashboardCards } from "./components/cards/dashboard-cards"
import { Suspense } from "react"

export function SmallDashboard() {
    return (
        <>
            <Navbar />
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-lg">Loading...</p>
                    </div>
                }
            >
                <DashboardCards />
            </Suspense>
        </>
    )
}
