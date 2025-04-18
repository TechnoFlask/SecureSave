"use server"

import { fromByteArray, toByteArray } from "base64-js"
import { decryptCred, encryptCred } from "./crypto-actions"
import { UnEncryptedCardType, UnEncryptedPassType } from "../types"
import { credsTable, shareCredsTable } from "@/db/schema"
import { db } from "@/db"
import { and, DrizzleError, eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { Failure, Success } from "../return-types"
import { hash_string, verify_hash } from "../utils/hash"

type CredType = "passwords" | "cards"

export async function unlockCred(
    master_password: string,
    credId: string,
    credType: CredType
): Promise<UnEncryptedCardType | UnEncryptedPassType | null> {
    const { userId } = await auth()

    const { iv, enc, salt } = (
        await db
            .select()
            .from(credsTable)
            .where(
                and(
                    eq(credsTable.id, credId),
                    eq(credsTable.userId, userId!),
                    eq(credsTable.credType, credType)
                )
            )
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

export async function getEditableCred(
    master_password: string,
    credId: string,
    credType: CredType
): Promise<{
    name: string
    parsed: UnEncryptedCardType | UnEncryptedPassType
} | null> {
    const { userId } = await auth()

    const { iv, enc, salt, name } = (
        await db
            .select()
            .from(credsTable)
            .where(
                and(
                    eq(credsTable.id, credId),
                    eq(credsTable.userId, userId!),
                    eq(credsTable.credType, credType)
                )
            )
    )[0]

    const dec = await decryptCred(
        master_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )

    if (dec == null) return null

    const parsed = JSON.parse(dec)

    return { name, parsed }
}

export async function editCred(
    master_password: string,
    data: string,
    credType: CredType,
    credId: string,
    name: string
) {
    const { userId } = await auth()

    const encrypted_values = await encryptCred(master_password, data)

    if (encrypted_values == null)
        return { success: false, cause: "Encryption failed" }

    const { iv, enc, salt } = encrypted_values

    try {
        await db
            .update(credsTable)
            .set({
                name,
                enc: fromByteArray(enc),
                iv: fromByteArray(iv),
                salt: fromByteArray(salt),
            })
            .where(
                and(eq(credsTable.id, credId), eq(credsTable.userId, userId!))
            )

        return Success()
    } catch (e) {
        return Failure(JSON.stringify((e as DrizzleError).cause))
    }
}

export async function createSharedCred(
    decryptedData: UnEncryptedPassType | UnEncryptedCardType,
    credType: CredType,
    credId: string,
    sharable_password: string,
    recipient_email: string
) {
    const { userId } = await auth()

    const reEncryptedCred = await encryptCred(
        sharable_password,
        JSON.stringify(decryptedData)
    )
    if (reEncryptedCred == null) return Failure("Encryption failed")
    const { enc, iv, salt } = reEncryptedCred

    const hashedEmail = await hash_string(recipient_email)
    if (hashedEmail.success == false) return hashedEmail

    try {
        const addedRecord = await db
            .insert(shareCredsTable)
            .values({
                credType,
                credId,
                iv: fromByteArray(iv),
                enc: fromByteArray(enc),
                salt: fromByteArray(salt),
                recipient: hashedEmail.data as string,
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
    shared_password: string,
    input_recipient: string
) {
    try {
        const { enc, iv, salt, recipient, credType } = (
            await db
                .select()
                .from(shareCredsTable)
                .where(eq(shareCredsTable.id, sharedId))
        )[0]

        const verified = await verify_hash(recipient, input_recipient)

        if (verified.success == false)
            return Failure("Credential opening failed")

        if (verified.data == false) return Failure("Credential opening failed")

        const dec = await decryptCred(
            shared_password,
            toByteArray(iv),
            toByteArray(enc),
            toByteArray(salt)
        )

        if (dec == null) return Failure("Decryption failed")

        await db.delete(shareCredsTable).where(eq(shareCredsTable.id, sharedId))

        return Success([JSON.parse(dec), credType])
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

    try {
        await db.insert(credsTable).values({
            credType,
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

    try {
        await db
            .delete(credsTable)
            .where(
                and(eq(credsTable.id, credId), eq(credsTable.userId, userId!))
            )

        return Success()
    } catch (e) {
        return Failure("Unxpected error happened while deleting credential")
    }
}
