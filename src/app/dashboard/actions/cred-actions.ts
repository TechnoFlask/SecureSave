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

export async function deleteCred(
    master_password: string,
    credId: string,
    credType: CredType
) {
    const cred = await unlockCred(master_password, credId, credType)

    if (cred == null) return null

    const table = credType === "passwords" ? passwordsTable : cardsTable

    try {
        await db.delete(table).where(eq(table.id, credId))

        return { success: true }
    } catch (_) {
        return { error: "Unexpected error happened while deleting credential" }
    }
}
