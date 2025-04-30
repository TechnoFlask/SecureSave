"use client"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CredActions } from "../cred-action-buttons"
import { Button } from "@/components/ui/button"

import { SharedType } from "../../types"
import { useSectionContext } from "../../section-context"
import { SharedCredActions } from "../shared-action-buttons"

export default function SharedCards({ shared }: { shared: SharedType[] }) {
    const { currentSection } = useSectionContext()

    return (
        <>
            {currentSection === "shared" && (
                <>
                    {shared.length === 0 && (
                        <>
                            <div className="flex flex-col items-center justify-center h-full">
                                <h1 className="text-2xl font-bold text-gray-500">
                                    No shared credentials found
                                </h1>
                                <p className="text-gray-400">
                                    Share a new credential to get started
                                </p>
                            </div>
                        </>
                    )}
                    {shared.length !== 0 && (
                        <div className="space-y-8 h-full overflow-y-auto">
                            {shared.map((cred) => (
                                <Card key={cred.id} className="w-2xs">
                                    <CardHeader className="grid">
                                        <CardTitle className="flex justify-between items-center">
                                            <span>{cred.name}</span>
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
                                                    <SharedCredActions
                                                        sharedId={cred.id}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </CardTitle>
                                        <CardDescription>
                                            {cred.createdAt}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="flex justify-end">
                                        <p className="text-muted-foreground">
                                            Protected by SecureSave
                                        </p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    )
}
