import { Card, CardContent } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/server"

export function AccountIsland({ user }: { user: User | null }) {
    return (
        <Card className="w-3xs">
            <CardContent className="flex items-center gap-3">
                <UserButton />
                <span className="text-xl font-semibold">
                    {user?.firstName} {user?.lastName}
                </span>
            </CardContent>
        </Card>
    )
}
