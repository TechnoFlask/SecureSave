import argon2 from "argon2"
import { Failure, Success } from "./return-types"

const ARGON2_OPTS = Object.freeze({
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 3,
    memoryCost: 1024,
    parallelism: 1,
})

export async function hashString(data: string, salt?: Uint8Array) {
    try {
        const hash = await argon2.hash(data, {
            ...ARGON2_OPTS,
            salt: salt ? Buffer.from(salt) : undefined,
        })

        return Success(hash)
    } catch (e) {
        return Failure(
            "Failed to hash string",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export async function hashStringRaw(data: string, salt?: Uint8Array) {
    try {
        const hash = await argon2.hash(data, {
            ...ARGON2_OPTS,
            salt: salt ? Buffer.from(salt) : undefined,
            raw: true,
        })

        return Success(hash)
    } catch (e) {
        return Failure(
            "Failed to hash string",
            (e as Error).cause,
            (e as Error).message
        )
    }
}

export async function verifyHash(hash: string, provided: string) {
    try {
        return Success(await argon2.verify(hash, provided))
    } catch (e) {
        return Failure(
            "Failed to verify hash",
            (e as Error).cause,
            (e as Error).message
        )
    }
}
