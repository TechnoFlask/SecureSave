export type UnEncryptedPassType = {
    username: string
    password: string
}

export type UnEncryptedCardType = {
    holderName: string
    cardNumber: string
    cvv: string
    expiry: string
}

export type CommonCredType = {
    id: string
    name: string
    createdAt: string
    credType: "passwords" | "cards"
}

export type PassType = CommonCredType

export type CardType = CommonCredType

export type SharedType = {
    id: string
    credType: "passwords" | "cards"
    createdAt: string
    name: string
}
