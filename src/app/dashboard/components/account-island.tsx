import { Card, CardContent } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs"
import { currentUser, User } from "@clerk/nextjs/server"

export async function AccountIsland() {
    const user = await currentUser()

    return (
        <Card className="max-lg:px-0 max-lg:py-3.5 w-full lg:w-3xs max-lg:shadow-none max-lg:border-none">
            <CardContent className="flex items-center gap-3 justify-center px-0">
                <UserButton />
                <span className="text-xl font-semibold">
                    {user?.firstName} {user?.lastName}
                </span>
            </CardContent>
        </Card>
    )
}
