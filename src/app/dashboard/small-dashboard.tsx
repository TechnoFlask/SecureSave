"use client"

import { Button } from "@/components/ui/button"
import { CardsCard, PasswordCard } from "./_components/card"
import { useSectionContext } from "./section-context"

export function SmallDashboard() {
    const { currentSection, setCurrentSection, passwords, cards } =
        useSectionContext()

    return (
        <div className="h-screen flex flex-col items-center py-10 gap-5 overflow-hidden">
            <div className="flex justify-around px-20 w-full">
                <Button
                    variant="outline"
                    className="text-lg"
                    onClick={() => setCurrentSection("passwords")}
                >
                    Passwords
                </Button>
                <Button
                    variant="outline"
                    className="text-lg"
                    onClick={() => setCurrentSection("cards")}
                >
                    Cards
                </Button>
            </div>
            <div className="overflow-y-scroll">
                {currentSection == "passwords" ? (
                    <div className="grid place-items-center gap-6 xl:gap-8 grid-cols-1 md:grid-cols-2">
                        {passwords.map((pass, index) => (
                            <PasswordCard key={index} pass={pass} />
                        ))}
                    </div>
                ) : (
                    <div className="grid place-items-center gap-6 xl:gap-8 grid-cols-1 md:grid-cols-2">
                        {cards.map((card, index) => (
                            <CardsCard key={index} card={card} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
