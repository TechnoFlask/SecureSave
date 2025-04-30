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

import { CardType, PassType } from "../../types"
import { useSectionContext } from "../../section-context"
import { CredsFilters } from "../creds-filters"
import { AddCredButton } from "../add-cred-button"
import { filterCreds } from "../../utils/filtering"

export default function CredsCards({
    creds,
}: {
    creds: { passwords: PassType[]; cards: CardType[] }
}) {
    const { currentSection } = useSectionContext()
    const currentCreds =
        currentSection === "passwords" ? creds.passwords : creds.cards
    const filteredCurrentCreds = filterCreds(currentCreds)

    return (
        <>
            {currentSection !== "shared" && (
                <div className="h-full w-full px-14 flex flex-col gap-10">
                    <div className="flex justify-between h-9">
                        <Filters />
                        <AddCredButton />
                    </div>
                    {filteredCurrentCreds.length === 0 && (
                        <>
                            <div className="flex flex-col items-center justify-center grow">
                                <h1 className="text-2xl font-bold text-gray-500">
                                    No {currentSection} found
                                </h1>
                                <p className="text-gray-400">
                                    Add a new {currentSection} to get started
                                </p>
                            </div>
                        </>
                    )}
                    {filteredCurrentCreds.length !== 0 && (
                        <div className="space-y-8 w-full grow overflow-y-auto">
                            {filteredCurrentCreds.map((cred) => (
                                <Card key={cred.id} className="w-full">
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
                                                    <CredActions
                                                        credType={
                                                            currentSection ===
                                                            "passwords"
                                                                ? "passwords"
                                                                : "cards"
                                                        }
                                                        credId={cred.id}
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
                </div>
            )}
        </>
    )
}
function Filters() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="text-lg font-semibold">
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <CredsFilters />
            </PopoverContent>
        </Popover>
    )
}
