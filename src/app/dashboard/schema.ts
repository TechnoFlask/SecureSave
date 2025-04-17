import { z as zod } from "zod"

function luhn_check(cardNumber: string) {
    const newCardNumber = cardNumber
        .split(" ")
        .join("")
        .split("")
        .map(Number)
        .reverse()

    const sum = newCardNumber.reduce((acc, curr, idx) => {
        if (idx % 2 !== 0) {
            curr = curr * 2
            if (curr > 9) curr = curr - 9
        }
        return acc + curr
    }, 0)

    return sum % 10 === 0
}

const masterPasswordSchema = zod.object({
    master_password: zod
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be at most 64 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(
            /[^A-Za-z0-9]/,
            "Password must contain at least one special character"
        )
        .refine((password) => !/\s/.test(password), {
            message: "Password must not contain spaces",
        })
        .refine(
            (password) => {
                const commonPasswords = ["password", "12345678", "qwerty"]
                return !commonPasswords.includes(password.toLowerCase())
            },
            {
                message: "Password is too common",
            }
        ),
})

export const passwordFormSchema = zod
    .object({
        name: zod.string().trim(),
        username: zod.string().trim(),
        password: zod.string().trim(),
    })
    .merge(masterPasswordSchema)

export const cardFormSchema = zod
    .object({
        name: zod.string().trim(),
        holderName: zod.string().trim(),
        cardNumber: zod
            .string()
            .trim()
            .regex(/^\d+$/, "Card number must contain digits only")
            .min(13, "Card number must be at least 13 digits")
            .max(19, "Card number must be at most 19 digits")
            .refine(luhn_check, {
                message: "Card number is not valid",
            }),
        cvv: zod
            .string()
            .trim()
            .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
        expiry: zod
            .string()
            .trim()
            .regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format")
            .refine(
                (expiry) => {
                    const [month, year] = expiry.split("/").map(Number)
                    const currentDate = new Date()
                    const currentYear = currentDate.getFullYear() % 100
                    const currentMonth = currentDate.getMonth() + 1

                    return (
                        year > currentYear ||
                        (year === currentYear && month >= currentMonth)
                    )
                },
                { message: "Expiry date is in the past" }
            ),
    })
    .merge(masterPasswordSchema)
