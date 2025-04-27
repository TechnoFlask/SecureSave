import "server-only"
import { auth } from "@clerk/nextjs/server"

export async function checkAuthenticated() {
    const { userId, redirectToSignIn } = await auth()
    if (userId == null) redirectToSignIn()

    return userId!
}
