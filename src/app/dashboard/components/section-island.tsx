"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaClipboard, FaCreditCard, FaKey } from "react-icons/fa6"
import { useSectionContext } from "../section-context"
import { cn } from "@/lib/utils"

export function SectionIsland() {
    const { currentSection, setCurrentSection } = useSectionContext()
    return (
        <Card className="w-full lg:w-3xs p-0 max-lg:shadow-none max-lg:border-none">
            <CardContent className="flex flex-col w-full p-0">
                <div
                    className={cn(
                        "max-lg:py-6 flex items-center gap-3 cursor-pointer w-full p-2.5 lg:rounded-tl-xl lg:rounded-tr-xl transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "passwords",
                            "hover:bg-accent-foreground/10 max-lg:bg-gray-200":
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
                    <span className="text-lg lg:text-xl font-semibold">
                        My Passwords
                    </span>
                </div>
                <div
                    className={cn(
                        "max-lg:py-6 flex items-center gap-3 cursor-pointer w-full p-2.5 transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "cards",
                            "hover:bg-accent-foreground/10 max-lg:bg-gray-200":
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
                    <span className="text-lg lg:text-xl font-semibold">
                        My Cards
                    </span>
                </div>
                <div
                    className={cn(
                        "max-lg:py-6 flex items-center gap-3 cursor-pointer w-full p-2.5 lg:rounded-bl-xl lg:rounded-br-xl transition-colors duration-500",
                        {
                            "bg-accent-foreground text-white":
                                currentSection === "shared",
                            "hover:bg-accent-foreground/10 max-lg:bg-gray-200":
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
                    <span className="text-lg lg:text-xl font-semibold">
                        Shared{" "}
                        <span className="hidden lg:inline">Credentials</span>
                        <span className="lg:hidden">Creds</span>
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
