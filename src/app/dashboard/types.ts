export type EncryptedPassType = {
    username: string
    password: string
}

export type EncryptedCardType = {
    holderName: string
    cardNumber: string
    cvv: string
}

export type CommonCredType = {
    id: string
    name: string
    createdAt: Date
}

export type PassType = EncryptedPassType & CommonCredType

export type CardType = EncryptedCardType & CommonCredType
