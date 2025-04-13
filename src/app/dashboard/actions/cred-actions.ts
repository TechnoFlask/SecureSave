"use server"

import { toByteArray } from "base64-js"
import { decryptCred } from "./crypto-actions"
import { EncryptedCardType, EncryptedPassType } from "../types"

type CredType = "passwords" | "cards"

async function isCredUnlocked() {}

export async function unlockCred(
    master_password: string,
    credId: string,
    credType: CredType
): Promise<string | null> {
    // ): Promise<EncryptedPassType | EncryptedCardType | null> {
    /*
     1. Database -> IV, encrypted cred, salt
     2. decrypt(master, IV, encrypted, salt) 
     3. success -> decrypt
     4. failure -> null
     */

    const iv = "26l9+npnhZKJSIBDBVwugQ=="
    const enc =
        "qloNZOmQi1jUkFrihlZh5QIplYhszNDS3fancugBIpvOe/hrSZg4uBZ3Y+5NCCHWf6jS"
    const salt = "VPloGJ6r8DvPCf2jMpt2pj5Rqe1AaFFl0Ly67wLLGtk="

    const dec = await decryptCred(
        master_password,
        toByteArray(iv),
        toByteArray(enc),
        toByteArray(salt)
    )

    if (dec == null) return null

    // const parsed = JSON.parse(dec)
    const parsed = dec

    return parsed
    // if (credType === "passwords") return parsed as EncryptedPassType
    // else return parsed as EncryptedCardType
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
) {}
