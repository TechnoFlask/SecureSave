"use client"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { FaClipboard, FaShareFromSquare, FaTrashCan } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"

export function CardFunctions() {
    return (
        <div className="flex gap-2">
            <HoverCard>
                <HoverCardTrigger className="drop-shadow-lg drop-shadow-accent-foreground/40">
                    <FaClipboard
                        size={18}
                        className="cursor-pointer"
                        onClick={async () => {}}
                    />
                </HoverCardTrigger>
                <HoverCardContent>
                    Copy Credential to Clipboard
                </HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className="drop-shadow-lg drop-shadow-accent-foreground/40">
                    <FaEdit
                        size={18}
                        className="cursor-pointer"
                        onClick={async () => {}}
                    />
                </HoverCardTrigger>
                <HoverCardContent>Edit Credential</HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className="drop-shadow-lg drop-shadow-accent-foreground/40">
                    <FaShareFromSquare size={18} className="cursor-pointer" />
                </HoverCardTrigger>
                <HoverCardContent>Share Credential</HoverCardContent>
            </HoverCard>
            <HoverCard>
                <HoverCardTrigger className="drop-shadow-lg drop-shadow-accent-foreground/40">
                    <FaTrashCan
                        size={18}
                        className="text-red-400 cursor-pointer"
                    />
                </HoverCardTrigger>
                <HoverCardContent>Delete Credential</HoverCardContent>
            </HoverCard>
        </div>
    )
}
