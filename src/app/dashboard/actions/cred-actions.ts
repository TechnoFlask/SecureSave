"use server"

import { fromByteArray, toByteArray } from "base64-js"
import { decryptCred, encryptCred } from "./crypto-actions"
import {
    EncryptedCardType,
    EncryptedPassType,
    UnEncryptedCardType,
    UnEncryptedPassType,
} from "../types"
import { cardsTable, passwordsTable } from "@/db/schema"
import { db } from "@/db"
import { and, DrizzleError, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"

type CredType = "passwords" | "cards"

async function isCredUnlocked() {}

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

export async function copyClipboardCred(
    master_password: string,
    credId: string,
    credType: CredType
) {}

export async function shareCred(
    master_password: string,
    credId: string,
    credType: CredType
) {}

export async function addCred(
    master_password: string,
    data: string,
    credType: CredType,
    name: string
) {
    const { userId } = await auth()

    const encrypted_values = await encryptCred(master_password, data)

    if (encrypted_values == null) return null

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
    } catch (e) {
        return {
            error: "Unexpected error happened while adding credential",
            cause: (e as DrizzleError).cause,
        }
    }
}

export async function deleteCred(
    master_password: string,
    credId: string,
    credType: CredType
) {
    const { userId } = await auth()

    const cred = await unlockCred(master_password, credId, credType)

    if (cred == null) return null

    const table = credType === "passwords" ? passwordsTable : cardsTable

    try {
        await db
            .delete(table)
            .where(and(eq(table.id, credId), eq(table.userId, userId!)))

        return { success: true }
    } catch (e) {
        return {
            error: "Unexpected error happened while deleting credential",
            cause: (e as DrizzleError).cause,
        }
    }
}
