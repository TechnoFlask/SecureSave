"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CardsCard, PasswordCard } from "./_components/card"
import { CardType, PassType } from "./types"
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
        // <div className="container mx-auto flex flex-col justify-around items-center xl:items-start pt-5 pb-10 gap-4 xl:flex-row">
        //     <div className="space-y-3 xl:space-y-5 flex flex-col items-center">
        //         <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg drop-shadow-accent-foreground/40">
        //             Saved Passwords
        //         </p>
        //     </div>
        //     <div className="space-y-3 xl:space-y-5 flex flex-col items-center">
        //         <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg drop-shadow-accent-foreground/40">
        //             Saved Cards
        //         </p>
        //     </div>
        // </div>
    )
}
