import Navbar from "@/components/Navbar"
import { CardType, PassType, SharedType } from "./types"
import { CredCards } from "./components/card"

export function SmallDashboard({
    creds,
}: {
    creds: {
        passwords: PassType[]
        cards: CardType[]
        shared: SharedType[]
    }
}) {
    return (
        <div>
            <Navbar />
            <CredCards creds={creds} />
        </div>
    )
}
