import { CardsCard, PasswordCard } from "./_components/card"

const PASSWORDS = [
    { desc: "Gmail", createdAt: new Date() },
    { desc: "Yahoo", createdAt: new Date() },
    { desc: "Amazon", createdAt: new Date() },
    { desc: "Amazon", createdAt: new Date() },
    { desc: "Amazon", createdAt: new Date() },
]

const CARDS = [
    {
        desc: "Primary card",
        holderName: "Anish",
        cardNumber: "123456789012345",
        cvv: "123",
        createdAt: new Date(),
    },
    {
        desc: "Primary card",
        holderName: "Anish",
        cardNumber: "123456789012345",
        cvv: "123",
        createdAt: new Date(),
    },
    {
        desc: "Primary card",
        holderName: "Anish",
        cardNumber: "123456789012345",
        cvv: "123",
        createdAt: new Date(),
    },
    {
        desc: "Primary card",
        holderName: "Anish",
        cardNumber: "123456789012345",
        cvv: "123",
        createdAt: new Date(),
    },
    {
        desc: "Primary card",
        holderName: "Anish",
        cardNumber: "123456789012345",
        cvv: "123",
        createdAt: new Date(),
    },
]

export default function Dashboard() {
    return (
        <div className="container mx-auto flex flex-col justify-around items-center xl:items-start pt-5 pb-10 gap-4 xl:flex-row">
            <div className="space-y-3 xl:space-y-5 flex flex-col items-center">
                <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg drop-shadow-accent-foreground/40">
                    Saved Passwords
                </p>
                <div className="grid place-items-center gap-6 xl:gap-8 grid-cols-1 md:grid-cols-2">
                    {PASSWORDS.map((pass, index) => (
                        <PasswordCard key={index} pass={pass} />
                    ))}
                </div>
            </div>
            <div className="space-y-3 xl:space-y-5 flex flex-col items-center">
                <p className="text-2xl xl:text-3xl font-bold drop-shadow-lg drop-shadow-accent-foreground/40">
                    Saved Cards
                </p>
                <div className="grid place-items-center gap-6 xl:gap-8 grid-cols-1 md:grid-cols-2">
                    {CARDS.map((card, index) => (
                        <CardsCard key={index} card={card} />
                    ))}
                </div>
            </div>
        </div>
    )
}
