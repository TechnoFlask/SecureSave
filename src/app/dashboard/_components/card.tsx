import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CardFunctions } from "./card-functions"

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
                "inline-flex justify-center items-center gap-1 p-2 bg-muted relative rounded-md drop-shadow-md drop-shadow-accent-foreground/40",
                className
            )}
        >
            {dots}
            <span className="hidden xl:inline-flex">{dots.slice(0, 8)}</span>
            <span className="absolute text-muted-foreground">Hidden</span>
        </div>
    )
}

export function PasswordCard({
    pass,
}: {
    pass: {
        desc: string
        createdAt: Date
    }
}) {
    return (
        <Card className="w-2xs xl:w-xs drop-shadow-lg drop-shadow-accent-foreground/40">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        {pass.desc}
                    </span>
                    <CardFunctions />
                </CardTitle>
                <CardDescription className="drop-shadow-md drop-shadow-accent-foreground/40">
                    {pass.createdAt.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-x-3">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        Password
                    </span>
                    <HiddenCred length={17} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <p className="text-muted-foreground text-center drop-shadow-md drop-shadow-accent-foreground/40">
                    Protected by SecureSave
                </p>
            </CardFooter>
        </Card>
    )
}

export function CardsCard({
    card,
}: {
    card: Record<"desc" | "holderName" | "cardNumber" | "cvv", string> & {
        createdAt: Date
    }
}) {
    return (
        <Card className="w-2xs xl:w-xs drop-shadow-lg drop-shadow-accent-foreground/40">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        {card.desc}
                    </span>
                    <CardFunctions />
                </CardTitle>
                <CardDescription className="drop-shadow-md drop-shadow-accent-foreground/40">
                    {card.createdAt.toLocaleString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="space-x-3">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        Holder Name
                    </span>
                    <HiddenCred length={14} />
                </div>
                <div className="space-x-3">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        Card Number
                    </span>
                    <HiddenCred length={14} />
                </div>
                <div className="space-x-3">
                    <span className="drop-shadow-md drop-shadow-accent-foreground/40">
                        CVV
                    </span>
                    <HiddenCred length={10} />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <p className="text-muted-foreground text-center drop-shadow-md drop-shadow-accent-foreground/40">
                    Protected by SecureSave
                </p>
            </CardFooter>
        </Card>
    )
}
