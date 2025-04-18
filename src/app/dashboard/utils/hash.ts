import argon2 from "argon2"
import { Failure, Success } from "../return-types"

export async function hash_string(data: string) {
    try {
        const hash = await argon2.hash(data, {
            type: argon2.argon2id,
            memoryCost: 4096,
            timeCost: 3,
            parallelism: 1,
        })

        return Success(hash)
    } catch (e) {
        return Failure((e as Error).message)
    }
}

export async function verify_hash(hash: string, provided: string) {
    try {
        return Success(await argon2.verify(hash, provided))
    } catch (e) {
        return Failure((e as Error).message)
    }
}
