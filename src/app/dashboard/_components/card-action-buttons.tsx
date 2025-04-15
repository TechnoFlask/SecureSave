import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CopyCred, DeleteCred, EditCred, ShareCred } from "./card-action-impls"

function Hover({
    children,
    prompt,
}: {
    children: React.ReactNode
    prompt: string
}) {
    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent className="font-semibold drop-shadow-accent-foreground/40 drop-shadow-lg">
                {prompt}
            </HoverCardContent>
        </HoverCard>
    )
}

export function CardActions({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    return (
        <div className="flex gap-2 lg:gap-5">
            {/* <Hover prompt="Copy Credential to Clipboard"> */}
            <CopyCred credId={credId} credType={credType} />
            {/* </Hover> */}
            {/* <Hover prompt="Edit Credential"> */}
            <EditCred credId={credId} credType={credType} />
            {/* </Hover> */}
            {/* <Hover prompt="Share Credential"> */}
            <ShareCred credId={credId} credType={credType} />
            {/* </Hover> */}
            {/* <Hover prompt="Delete Credential"> */}
            <DeleteCred credId={credId} credType={credType} />
            {/* </Hover> */}
        </div>
    )
}
