import { cloneElement, useRef, useState } from "react"
import { FaClipboard, FaShareFromSquare, FaTrashCan } from "react-icons/fa6"
import { deleteCred, unlockCred } from "../actions/cred-actions"

import { Input } from "@/components/ui/input"
import {
    AlertDialog,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { FaEdit } from "react-icons/fa"
import { myToast } from "./my-toast"
import { useRouter } from "next/navigation"
import { clipboardWarning } from "./clipboard-warning"

function DemandMasterPassword({
    children,
    handleSubmit,
    ...props
}: {
    handleSubmit: (master_password: string) => Promise<void>
} & React.ComponentProps<typeof AlertDialog>) {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <AlertDialog {...props}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Please Enter your master password
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden"></AlertDialogDescription>
                </AlertDialogHeader>
                <Input type="password" ref={inputRef} />
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={async () => {
                            await handleSubmit(inputRef.current?.value!)
                        }}
                    >
                        Go
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function CardAction({
    children,
    handleSubmit,
}: {
    children: React.ReactElement
    handleSubmit: (master_password: string) => Promise<void>
}) {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <div>
            {cloneElement(children, {
                onClick: (e: any) => {
                    ;(
                        children.props as React.ComponentProps<
                            typeof FaClipboard
                        >
                    ).onClick?.(e)
                    setIsDialogOpen(true)
                },
            } as React.ComponentProps<typeof FaClipboard>)}
            <DemandMasterPassword
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export function CopyCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    async function handleSubmit(master_password: string) {
        const toastId = myToast.loading("Processing....")
        const cred = await unlockCred(master_password, credId, credType)
        myToast.dismiss(toastId)

        if (cred == null) {
            myToast.error("Incorrect Unlock Credentials")
            return
        }

        myToast.success("Copied to clipboard")

        if ("username" in cred) {
            navigator.clipboard.writeText(`${cred.username} | ${cred.password}`)
        } else if ("holderName" in cred) {
            navigator.clipboard.writeText(
                `${cred.holderName} | ${cred.cardNumber} | ${cred.cvv}`
            )
        }

        // Clear clipboard
        const intervalId = setInterval(() => {
            clipboardWarning(intervalId)
        }, 90000)
    }

    return (
        <CardAction handleSubmit={handleSubmit}>
            <FaClipboard
                size={18}
                className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
            />
        </CardAction>
    )
}

export function EditCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    async function handleSubmit(master_password: string) {}

    return (
        <CardAction handleSubmit={handleSubmit}>
            <FaEdit
                size={18}
                className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
            />
        </CardAction>
    )
}

export function ShareCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    async function handleSubmit(master_password: string) {}

    return (
        <CardAction handleSubmit={handleSubmit}>
            <FaShareFromSquare
                size={18}
                className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
            />
        </CardAction>
    )
}

export function DeleteCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    const router = useRouter()
    async function handleSubmit(master_password: string) {
        const toastId = myToast.loading("Processing....")
        const cred = await deleteCred(master_password, credId, credType)

        if (cred == null) {
            myToast.dismiss(toastId)
            myToast.error("Incorrect Unlock Credentials")
            return
        }

        if (cred.success == undefined) {
            myToast.dismiss(toastId)
            myToast.error("Failed to delete the credential")
            return
        }

        myToast.dismiss(toastId)
        myToast.success("Successfully deleted the credential")
        router.replace("/dashboard")
    }

    return (
        <CardAction handleSubmit={handleSubmit}>
            <FaTrashCan
                size={18}
                className="text-red-400 cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
            />
        </CardAction>
    )
}
