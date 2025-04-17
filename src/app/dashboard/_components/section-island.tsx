"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaClipboard, FaCreditCard, FaKey } from "react-icons/fa6"
import { useSectionContext } from "../section-context"
import { cn } from "@/lib/utils"

export function SectionIsland() {
    const { currentSection, setCurrentSection } = useSectionContext()
    return (
        <Card className="w-3xs p-0">
            <CardContent className="flex flex-col w-full p-0">
                <div
                    className={cn(
                        "flex items-center gap-3 cursor-pointer w-full p-2.5 rounded-tl-xl rounded-tr-xl transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "passwords",
                            "hover:bg-accent-foreground/10":
                                currentSection !== "passwords",
                        }
                    )}
                    onClick={() => setCurrentSection("passwords")}
                >
                    <FaKey
                        className={cn({
                            "text-white": currentSection === "passwords",
                        })}
                    />
                    <span className="text-xl font-semibold">My Passwords</span>
                </div>
                <div
                    className={cn(
                        "flex items-center gap-3 cursor-pointer w-full p-2.5 transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "cards",
                            "hover:bg-accent-foreground/10":
                                currentSection !== "cards",
                        }
                    )}
                    onClick={() => setCurrentSection("cards")}
                >
                    <FaCreditCard
                        className={cn({
                            "text-white": currentSection === "cards",
                        })}
                    />
                    <span className="text-xl font-semibold">My Cards</span>
                </div>
                <div
                    className={cn(
                        "flex items-center gap-3 cursor-pointer w-full p-2.5 rounded-bl-xl rounded-br-xl transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "shared",
                            "hover:bg-accent-foreground/10":
                                currentSection !== "shared",
                        }
                    )}
                    onClick={() => setCurrentSection("shared")}
                >
                    <FaClipboard
                        className={cn({
                            "text-white": currentSection === "shared",
                        })}
                    />
                    <span className="text-xl font-semibold">
                        Shared Credentials
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
