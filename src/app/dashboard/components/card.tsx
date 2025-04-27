"use client"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardType, PassType, SharedType } from "../types"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CardActions } from "./cred-action-buttons"
import { Button } from "@/components/ui/button"
import { useSectionContext } from "../section-context"

export function CredCards({
    creds,
}: {
    creds: {
        passwords: PassType[]
        cards: CardType[]
        shared: SharedType[]
    }
}) {
    const { currentSection } = useSectionContext()

    return (
        <div className="flex flex-col items-center overflow-scroll h-screen py-10 gap-7">
            {creds[currentSection].map((pass) => (
                <Card key={pass.id} className="w-2xs">
                    <CardHeader className="grid">
                        <CardTitle className="flex justify-between items-center">
                            <span>{pass.name}</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="font-semibold"
                                    >
                                        Actions
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48">
                                    <CardActions
                                        credType={
                                            currentSection === "passwords"
                                                ? "passwords"
                                                : "cards"
                                        }
                                        credId={pass.id}
                                    />
                                </PopoverContent>
                            </Popover>
                        </CardTitle>
                        <CardDescription>{pass.createdAt}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        <p className="text-muted-foreground">
                            Protected by SecureSave
                        </p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
