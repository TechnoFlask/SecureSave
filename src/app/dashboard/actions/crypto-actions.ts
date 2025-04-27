import "server-only"
import { Failure, Success } from "../utils/return-types"
import { hashStringRaw } from "../utils/hash"

export async function getRandomSalt(length: number) {
    return crypto.getRandomValues(new Uint8Array(length))
}

export async function deriveKey(
    master_password: string,
    salt: Uint8Array,
    extractable: boolean
) {
    const hashed_pass = await hashStringRaw(master_password, salt)
    if (hashed_pass.success === false) return hashed_pass

    try {
        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            hashed_pass.data,
            { name: "AES-GCM", length: 256 },
            extractable,
            ["encrypt", "decrypt"]
        )

        return Success(cryptoKey)
    } catch (e) {
        return Failure(
            "Failed to derive key",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export async function deriveExtractedKey(
    master_password: string,
    salt: Uint8Array
) {
    const sharableCryptoKey = await deriveKey(master_password, salt, true)
    if (sharableCryptoKey.success === false) return sharableCryptoKey

    try {
        const extractedCryptoKey = await crypto.subtle.exportKey(
            "jwk",
            sharableCryptoKey.data
        )

        return Success(extractedCryptoKey)
    } catch (e) {
        return Failure(
            "Failed to derive key",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export async function encryptCred(master_password: string, data: string) {
    const salt = await getRandomSalt(32)
    const cryptoKey = await deriveKey(master_password, salt, false)
    if (cryptoKey.success === false) return cryptoKey

    try {
        const iv = crypto.getRandomValues(new Uint8Array(16))
        const enc = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            cryptoKey.data,
            new TextEncoder().encode(data)
        )

        return Success({ iv, enc: new Uint8Array(enc), salt })
    } catch (e) {
        return Failure(
            "Failed to encrypt credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export async function decryptCred(
    master_password: string,
    iv: Uint8Array,
    enc: Uint8Array,
    salt: Uint8Array
) {
    const cryptoKey = await deriveKey(master_password, salt, false)
    if (cryptoKey.success === false) return cryptoKey

    try {
        const dec = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            cryptoKey.data,
            enc
        )

        return Success(new TextDecoder().decode(dec))
    } catch (e) {
        return Failure(
            "Failed to decrypt credential",
            (e as Error).cause,
            (e as Error).message
        )
    }
}
