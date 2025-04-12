"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FaClipboard, FaShareFromSquare, FaTrashCan } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import {
    AlertDialog,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

function AlertPassPrompt({ children }: { children: React.ReactNode }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hello</AlertDialogTitle>
                    <AlertDialogDescription>World</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

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

export function CardFunctions() {
    return (
        <div className="flex gap-2 lg:gap-5">
            <Hover prompt="Copy Credential to Clipboard">
                <AlertPassPrompt>
                    <FaClipboard
                        size={18}
                        className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                        onClick={async () => {}}
                    />
                </AlertPassPrompt>
            </Hover>
            <Hover prompt="Edit Credential">
                <FaEdit
                    size={18}
                    className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                    onClick={async () => {}}
                />
            </Hover>
            <Hover prompt="Share Credential">
                <FaShareFromSquare
                    size={18}
                    className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                />
            </Hover>
            <Hover prompt="Delete Credential">
                <FaTrashCan
                    size={18}
                    className="text-red-400 cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                />
            </Hover>
        </div>
    )
}
