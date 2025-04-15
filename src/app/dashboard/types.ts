export type EncryptedPassType = {
    iv: string
    enc: string
    salt: string
}

export type UnEncryptedPassType = {
    username: string
    password: string
}

export type EncryptedCardType = {
    iv: string
    enc: string
    salt: string
}

export type UnEncryptedCardType = {
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
