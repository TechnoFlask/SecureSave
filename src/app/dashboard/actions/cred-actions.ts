"use server"

import { toByteArray } from "base64-js"
import { decryptCred } from "./crypto-actions"

type CredType = "PASSWORD" | "CARD"

async function unlockCred(
    master_password: string,
    credId: string,
    credType: CredType
) {
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

    return dec
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
