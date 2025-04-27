"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaPlus } from "react-icons/fa6"
import { useSectionContext } from "../section-context"
import { CardForm, PasswordForm } from "./forms"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog"

function AddCredDialog({
    setIsDialogOpen,
    children,
    ...props
}: React.ComponentProps<typeof AlertDialog> & {
    setIsDialogOpen: (setIs: boolean) => void
}) {
    const { currentSection } = useSectionContext()
    return (
        <AlertDialog {...props}>
            <AlertDialogContent className="px-10 py-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                        Add a new{" "}
                        {currentSection === "passwords" ? "password" : "card"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden" />
                </AlertDialogHeader>
                {currentSection === "cards" ? (
                    <CardForm closeParentDialog={setIsDialogOpen} />
                ) : (
                    <PasswordForm closeParentDialog={setIsDialogOpen} />
                )}
                <AlertDialogFooter className="absolute bottom-0 right-0 -translate-x-10 -translate-y-8">
                    <AlertDialogCancel className="text-lg">
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function AddCredButton() {
    const { currentSection } = useSectionContext()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <>
            {currentSection !== "shared" && (
                <>
                    <button>
                        <Card
                            className="cursor-pointer max-w-sm"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <CardContent className="flex justify-center items-center gap-3">
                                <FaPlus />
                                <span className="text-xl font-semibold">
                                    Add{" "}
                                    {currentSection === "passwords"
                                        ? "Password"
                                        : "Card"}
                                </span>
                            </CardContent>
                        </Card>
                    </button>
                    <AddCredDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                </>
            )}
        </>
    )
}
