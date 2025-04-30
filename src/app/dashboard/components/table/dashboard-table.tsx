import { Card, CardContent } from "@/components/ui/card"
import { CredsTable } from "./creds-table"
import SharedTable from "./shared-table"
import { getServerCreds } from "../../data-access/queries"

export async function DashboardTable() {
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

    const { cards, passwords, shared } = creds.data

    return (
        <Card className="w-full">
            <CardContent>
                <CredsTable creds={{ passwords, cards }} />
                <SharedTable shared={shared} />
            </CardContent>
        </Card>
    )
}
