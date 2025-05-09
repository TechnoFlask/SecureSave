"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaShareFromSquare } from "react-icons/fa6"
import { openSharedCred } from "../actions/cred-actions"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRef } from "react"
import { Input } from "@/components/ui/input"
import { myToast } from "./my-toast"
import { useRouter } from "next/navigation"
import { cardClipboard, passClipboard } from "../utils/clipboard"
import { clipboardWarning } from "./clipboard-warning"

export function AccessSharedCred() {
    const router = useRouter()
    const credentialIdInputRef = useRef<HTMLInputElement>(null)
    const tempPassInputRef = useRef<HTMLInputElement>(null)
    const recipientEmailInputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Card className="cursor-pointer max-lg:px-0 max-lg:py-3.5 w-full lg:w-xs max-lg:shadow-none max-lg:border-none">
                        <CardContent className="flex justify-center items-center gap-3 px-0">
                            <FaShareFromSquare />
                            <span className="text-lg lg:text-xl font-semibold">
                                Access Shared{" "}
                                <span className="lg:hidden">Cred</span>
                                <span className="hidden lg:inline">
                                    Credential
                                </span>
                            </span>
                        </CardContent>
                    </Card>
                </AlertDialogTrigger>
                <AlertDialogContent className="px-10 py-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl">
                            Access the shared credential
                        </AlertDialogTitle>
                        <AlertDialogDescription className="hidden" />
                    </AlertDialogHeader>
                    <div>
                        <p className="font-semibold mb-3">
                            Shared credential ID
                        </p>
                        <Input ref={credentialIdInputRef} />
                    </div>
                    <div>
                        <p className="font-semibold mb-3">Shared password</p>
                        <Input type="password" ref={tempPassInputRef} />
                    </div>
                    <div>
                        <p className="font-semibold mb-3">Recipient email</p>
                        <Input type="email" ref={recipientEmailInputRef} />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            className="text-lg"
                            onClick={async () => {
                                const toastId =
                                    myToast.loading("Processing....")
                                const cred = await openSharedCred(
                                    credentialIdInputRef.current!.value,
                                    tempPassInputRef.current!.value,
                                    recipientEmailInputRef.current!.value
                                )

                                myToast.dismiss(toastId)
                                if (cred.success === false) {
                                    myToast.error(
                                        "Failed to access the credential"
                                    )
                                    return
                                }

                                if (cred.data[1] === "passwords") {
                                    await passClipboard(cred.data[0])
                                } else {
                                    await cardClipboard(cred.data[0])
                                }

                                const intervalId = setInterval(() => {
                                    clipboardWarning(intervalId)
                                }, 90000)
                                myToast.success(
                                    "Credential copied to clipboard"
                                )
                                // setIsDialogOpen!(false)
                                // router.replace("/dashboard")
                            }}
                        >
                            Access
                        </AlertDialogAction>
                        <AlertDialogCancel className="text-lg">
                            Cancel
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
