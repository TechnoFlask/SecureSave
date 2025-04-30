"use client"

import { FaClipboard, FaTrashCan } from "react-icons/fa6"
import { myToast } from "./my-toast"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
import { deleteSharedCred } from "../actions/cred-actions"
import { useRouter } from "next/navigation"

function CopySharedId({ sharedId }: { sharedId: string }) {
    return (
        <div
            className="flex gap-2 items-center"
            onClick={async () => {
                myToast.success("Shared ID copied to clipboard")
                await navigator.clipboard.writeText(sharedId)
            }}
        >
            <FaClipboard
                size={18}
                className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
            />
            <span className="lg:hidden">Copy Shared ID</span>
        </div>
    )
}

function DeleteSharedCred({ sharedId }: { sharedId: string }) {
    const tempPassInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <div className="flex gap-2 items-center">
                    <FaTrashCan
                        size={18}
                        className="text-red-400 cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                    />
                    <span className="lg:hidden text-red-400">
                        Delete Shared
                    </span>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                        Delete the shared credential
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden" />
                </AlertDialogHeader>
                <div>
                    <p className="font-semibold mb-3">Shared password</p>
                    <Input type="password" ref={tempPassInputRef} />
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={async () => {
                            const toastId = myToast.loading("Processing....")
                            const res = await deleteSharedCred(
                                sharedId,
                                tempPassInputRef.current!.value
                            )

                            myToast.dismiss(toastId)
                            if (res.success === false) {
                                myToast.error(
                                    "Failed to delete the shared credential"
                                )
                                return
                            }
                            myToast.success(
                                "Shared credential deleted successfully"
                            )
                            // router.replace("/dashboard")
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function SharedCredActions({ sharedId }: { sharedId: string }) {
    return (
        <div className="flex max-lg:flex-col max-lg:gap-5 gap-2 lg:gap-5">
            <CopySharedId sharedId={sharedId} />
            <DeleteSharedCred sharedId={sharedId} />
        </div>
    )
}
