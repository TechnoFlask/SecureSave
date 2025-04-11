"use server"

import argon2 from "argon2"

function getRandomSalt(length: number) {
    return crypto.getRandomValues(new Uint8Array(length))
}

export async function hashPassword(master_password: string, salt: Uint8Array) {
    try {
        const hashed_pass = await argon2.hash(master_password, {
            type: argon2.argon2id,
            salt: Buffer.from(salt),
            hashLength: 32,
            timeCost: 3,
            memoryCost: 1024,
            parallelism: 1,
            raw: true,
        })

        return hashed_pass
    } catch (e) {
        console.error((e as Error).message)

        return null
    }
}

export async function deriveKey(master_password: string, salt: Uint8Array) {
    const hashed_pass = await hashPassword(master_password, salt)

    if (hashed_pass == null) return null

    try {
        const cryptoKey = await crypto.subtle.importKey(
            "raw",
            hashed_pass,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt", "decrypt"]
        )

        return cryptoKey
    } catch (e) {
        console.error((e as Error).message)

        return null
    }
}

export async function encryptCred(master_password: string, data: string) {
    const salt = getRandomSalt(32)
    const cryptoKey = await deriveKey(master_password, salt)

    if (cryptoKey == null) return null

    try {
        const iv = crypto.getRandomValues(new Uint8Array(16))
        const enc = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            new TextEncoder().encode(data)
        )

        return { iv, enc: new Uint8Array(enc), salt }
    } catch (e) {
        console.error((e as Error).message)

        return null
    }
}

export async function decryptCred(
    master_password: string,
    iv: Uint8Array,
    enc: Uint8Array,
    salt: Uint8Array
) {
    const cryptoKey = await deriveKey(master_password, salt)

    if (cryptoKey == null) return null

    try {
        const dec = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv },
            cryptoKey,
            enc
        )

        return new TextDecoder().decode(dec)
    } catch (e) {
        console.error((e as Error).cause)

        return null
    }
}
