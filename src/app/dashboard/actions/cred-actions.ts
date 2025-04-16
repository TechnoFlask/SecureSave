"use server"

import { fromByteArray, toByteArray } from "base64-js"
import { decryptCred, deriveExtractedKey, encryptCred } from "./crypto-actions"
import { UnEncryptedCardType, UnEncryptedPassType } from "../types"
import { cardsTable, passwordsTable, shareCredsTable } from "@/db/schema"
import { db } from "@/db"
import { and, DrizzleError, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { Failure, Result, Success } from "../return-types"

type CredType = "passwords" | "cards"

export async function unlockCred(
    master_password: string,
    credId: string,
    credType: CredType
): Promise<UnEncryptedCardType | UnEncryptedPassType | null> {
    const { userId } = await auth()

    const table = credType === "passwords" ? passwordsTable : cardsTable

    const { iv, enc, salt } = (
        await db
            .select()
            .from(table)
            .where(and(eq(table.id, credId), eq(table.userId, userId!)))
    )[0]

    const dec = await decryptCred(
        master_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )

    if (dec == null) return null

    const parsed = JSON.parse(dec)

    return parsed
}

export async function createSharedCred(
    decryptedData: UnEncryptedPassType | UnEncryptedCardType,
    credType: CredType,
    sharable_password: string
) {
    const { userId } = await auth()

    const reEncryptedCred = await encryptCred(
        sharable_password,
        JSON.stringify(decryptedData)
    )
    if (reEncryptedCred == null) return Failure("Encryption failed")
    const { enc, iv, salt } = reEncryptedCred

    try {
        const addedRecord = await db
            .insert(shareCredsTable)
            .values({
                credType,
                iv: fromByteArray(iv),
                enc: fromByteArray(enc),
                salt: fromByteArray(salt),
                recipient: "",
                sender: userId!,
            })
            .returning({ id: shareCredsTable.id })

        return Success(addedRecord[0].id)
    } catch (e) {
        return Failure(JSON.stringify((e as DrizzleError).cause))
    }
}

export async function openSharedCred(
    sharedId: string,
    shared_password: string
): Promise<UnEncryptedPassType | UnEncryptedCardType | unknown> {
    try {
        const { enc, iv, salt } = (
            await db
                .select()
                .from(shareCredsTable)
                .where(eq(shareCredsTable.id, sharedId))
        )[0]

        const dec = await decryptCred(
            shared_password,
            toByteArray(iv),
            toByteArray(enc),
            toByteArray(salt)
        )

        if (dec == null) return Failure("Decryption failed")

        return Success(JSON.parse(dec))
    } catch (e) {
        return Failure(JSON.stringify(e as DrizzleError))
    }
}

export async function addCred(
    master_password: string,
    data: string,
    credType: CredType,
    name: string
) {
    const { userId } = await auth()

    const encrypted_values = await encryptCred(master_password, data)

    if (encrypted_values == null)
        return { success: false, cause: "Encryption failed" }

    const { iv, enc, salt } = encrypted_values

    const table = credType === "passwords" ? passwordsTable : cardsTable

    try {
        await db.insert(table).values({
            userId: userId!,
            iv: fromByteArray(iv),
            enc: fromByteArray(enc),
            salt: fromByteArray(salt),
            name,
        })

        return Success()
    } catch (e) {
        return Failure(JSON.stringify((e as DrizzleError).cause))
    }
}

export async function deleteCred(
    master_password: string,
    credId: string,
    credType: CredType
) {
    const { userId } = await auth()

    const cred = await unlockCred(master_password, credId, credType)

    if (cred == null) return Failure("Unlocking failed")

    const table = credType === "passwords" ? passwordsTable : cardsTable

    try {
        await db
            .delete(table)
            .where(and(eq(table.id, credId), eq(table.userId, userId!)))

        return Success()
    } catch (e) {
        return Failure("Unxpected error happened while deleting credential")
    }
}
