import { UnEncryptedCardType, UnEncryptedPassType } from "../types"

export async function passClipboard(pass: UnEncryptedPassType) {
    const { password, username } = pass
    const cred = `Username: ${username}\nPassword: ${password}`
    await navigator.clipboard.writeText(cred)
}

export async function cardClipboard(card: UnEncryptedCardType) {
    const { holderName, cardNumber, cvv, expiry } = card
    const cred = `Holder Name: ${holderName}\nCard Number: ${cardNumber}\nCVV: ${cvv}\nExpiry: ${expiry}`
    await navigator.clipboard.writeText(cred)
}
