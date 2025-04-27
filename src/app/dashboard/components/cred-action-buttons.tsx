import {
    CopyCred,
    DeleteCred,
    EditCred,
    ShareCred,
} from "./cred-action-button-impls"

export function CardActions({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    return (
        <div className="flex max-lg:flex-col max-lg:gap-5 gap-2 lg:gap-5">
            <CopyCred credId={credId} />
            <EditCred credId={credId} />
            <ShareCred credId={credId} credType={credType} />
            <DeleteCred credId={credId} />
        </div>
    )
}
