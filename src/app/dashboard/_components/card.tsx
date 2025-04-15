import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardActions } from "./card-action-buttons"
import { CardType, PassType } from "../types"

const HiddenCred = ({
    length = 16,
    className,
}: {
    length?: number
    className?: string
}) => {
    const dots = Array.from({ length }, (_, i) => (
        <span key={i} className="inline-block w-1 h-2 rounded-full bg-muted" />
    ))

    return (
        <div
            className={cn(
                "inline-flex justify-center items-center gap-1 p-2 bg-muted relative rounded-md",
                className
            )}
        >
            {dots}
            <span className="hidden xl:inline-flex">{dots.slice(0, 8)}</span>
            <span className="absolute text-muted-foreground">Hidden</span>
        </div>
    )
}

export function PasswordCard({ pass }: { pass: PassType }) {
    return (
        <Card className="w-2xs xl:w-xs">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span className="">{pass.name}</span>
                    <CardActions credId={pass.id} credType="passwords" />
                </CardTitle>
                <CardDescription className="">
                    {pass.createdAt.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-x-3">
                    <span className="">Password</span>
                    <HiddenCred length={17} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <p className="text-muted-foreground text-center ">
                    Protected by SecureSave
                </p>
            </CardFooter>
        </Card>
    )
}

export function CardsCard({ card }: { card: CardType }) {
    return (
        <Card className="w-2xs xl:w-xs">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span className="">{card.name}</span>
                    <CardActions credId={card.id} credType="cards" />
                </CardTitle>
                <CardDescription className="">
                    {card.createdAt.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-x-3">
                    <span className="">Holder Name</span>
                    <HiddenCred length={14} />
                </div>
                <div className="space-x-3">
                    <span className="">Card Number</span>
                    <HiddenCred length={14} />
                </div>
                <div className="space-x-3">
                    <span className="">CVV</span>
                    <HiddenCred length={10} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <p className="text-muted-foreground text-center">
                    Protected by SecureSave
                </p>
            </CardFooter>
        </Card>
    )
}
