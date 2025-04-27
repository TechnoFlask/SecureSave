"use server"

import type { UnEncryptedCardType, UnEncryptedPassType } from "../types"
import type { FailureType, SuccessType } from "../utils/return-types"
import { fromByteArray, toByteArray } from "base64-js"
import { checkAuthenticated } from "@/lib/auth"
import { hashString, verifyHash } from "../utils/hash"
import { Failure, Success } from "../utils/return-types"
import { decryptCred, encryptCred } from "./crypto-actions"
import { getCredById } from "@/data-access/creds-access/queries"
import {
    deleteCredById,
    insertCred,
    updateCredById,
} from "@/data-access/creds-access/mutations"
import { getSharedCredById } from "@/data-access/shared-creds-access/queries"
import {
    deleteSharedCredById,
    insertSharedCred,
} from "@/data-access/shared-creds-access/mutations"

type CredType = "passwords" | "cards"

export async function unlockCred(
    master_password: string,
    credId: string
): Promise<
    SuccessType<UnEncryptedPassType | UnEncryptedCardType> | FailureType
> {
    await checkAuthenticated()

    const filteredCred = await getCredById(credId)
    if (filteredCred.success === false) return filteredCred

    const { iv, enc, salt } = filteredCred.data

    const dec = await decryptCred(
        master_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )
    if (dec.success === false) return dec
    return Success(JSON.parse(dec.data))
}

export async function getEditableCred(
    master_password: string,
    credId: string
): Promise<
    | SuccessType<{
          name: string
          parsed: UnEncryptedPassType | UnEncryptedCardType
      }>
    | FailureType
> {
    await checkAuthenticated()

    const filteredCred = await getCredById(credId)
    if (filteredCred.success === false) return filteredCred

    const { iv, enc, salt, name } = filteredCred.data

    const dec = await decryptCred(
        master_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )
    if (dec.success === false) return dec

    const parsed = JSON.parse(dec.data)
    return Success({ name, parsed })
}

export async function editCred(
    master_password: string,
    data: string,
    credId: string,
    name: string
) {
    await checkAuthenticated()

    const encrypted_values = await encryptCred(master_password, data)
    if (encrypted_values.success === false) return encrypted_values

    const { iv, enc, salt } = encrypted_values.data

    const res = await updateCredById(credId, {
        name,
        enc: fromByteArray(enc),
        iv: fromByteArray(iv),
        salt: fromByteArray(salt),
    })

    return Success(res)
}

export async function createSharedCred(
    decryptedData: UnEncryptedPassType | UnEncryptedCardType,
    credType: CredType,
    credId: string,
    sharable_password: string,
    recipient_email: string
) {
    await checkAuthenticated()

    const reEncryptedCred = await encryptCred(
        sharable_password,
        JSON.stringify(decryptedData)
    )
    if (reEncryptedCred.success === false) return reEncryptedCred

    const { enc, iv, salt } = reEncryptedCred.data

    const hashedEmail = await hashString(recipient_email)
    if (hashedEmail.success === false) return hashedEmail

    return await insertSharedCred({
        credType,
        credId,
        iv: fromByteArray(iv),
        enc: fromByteArray(enc),
        salt: fromByteArray(salt),
        recipient: hashedEmail.data as string,
    })
}

export async function openSharedCred(
    sharedId: string,
    shared_password: string,
    input_recipient: string
) {
    await checkAuthenticated()

    const res = await getSharedCredById(sharedId)
    if (res.success === false) return res

    const { enc, iv, salt, recipient, credType } = res.data

    const verified = await verifyHash(recipient, input_recipient)
    if (verified.success === false) return verified
    if (verified.data == false) return Failure("Incorrect hash", "", "")

    const dec = await decryptCred(
        shared_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )
    if (dec.success === false) return dec

    const deleteRes = await deleteSharedCredById(sharedId)
    if (deleteRes.success === false) return deleteRes

    return Success([JSON.parse(dec.data), credType])
}

export async function addCred(
    master_password: string,
    data: string,
    credType: CredType,
    name: string
) {
    await checkAuthenticated()

    const encrypted_values = await encryptCred(master_password, data)
    if (encrypted_values.success === false) return encrypted_values

    const { iv, enc, salt } = encrypted_values.data

    return await insertCred({
        credType,
        iv: fromByteArray(iv),
        enc: fromByteArray(enc),
        salt: fromByteArray(salt),
        name,
    })
}

export async function deleteCred(master_password: string, credId: string) {
    await checkAuthenticated()

    const cred = await unlockCred(master_password, credId)
    if (cred.success === false) return cred

    return await deleteCredById(credId)
}
