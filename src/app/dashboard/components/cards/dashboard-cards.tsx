import { Card, CardContent } from "@/components/ui/card"
import { getServerCreds } from "../../data-access/queries"
import CredsCards from "./creds-cards"
import SharedCards from "./shared-cards"

export async function DashboardCards() {
    const creds = await getServerCreds()

    if (creds.success === false) {
        return (
            <Card className="w-full">
                <CardContent>
                    <p className="text-red-500">{creds.error}</p>
                </CardContent>
            </Card>
        )
    }

    const { passwords, cards, shared } = creds.data

    return (
        <div className="flex flex-col items-center py-10 gap-7 grow overflow-hidden">
            {/* // <div> */}
            <CredsCards creds={{ passwords, cards }} />
            <SharedCards shared={shared} />
        </div>
    )
}
