import { cloneElement, useRef, useState, useTransition } from "react"
import { FaClipboard, FaShareFromSquare, FaTrashCan } from "react-icons/fa6"
import {
    deleteCred,
    createSharedCred,
    unlockCred,
    openSharedCred,
    getEditableCred,
} from "../actions/cred-actions"

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
import { Button } from "@/components/ui/button"
import { UnEncryptedCardType, UnEncryptedPassType } from "../types"
import { useSectionContext } from "../section-context"
import { CardUpdateForm, PasswordUpdateForm } from "./forms"

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
                    <AlertDialogDescription className="hidden" />
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
            await navigator.clipboard.writeText(
                `${cred.username} | ${cred.password}`
            )
        } else if ("holderName" in cred) {
            await navigator.clipboard.writeText(
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

function EditCredDialog({
    setIsDialogOpen,
    credId,
    initialData,
    master_password,
    children,
    ...props
}: React.ComponentProps<typeof AlertDialog> & {
    credId: string
    initialData: {
        name: string
        parsed: UnEncryptedCardType | UnEncryptedPassType
    }
    master_password: string
    setIsDialogOpen: (setIs: boolean) => void
}) {
    const { currentSection } = useSectionContext()
    return (
        <AlertDialog {...props}>
            <AlertDialogContent className="px-10 py-8">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-xl">
                        Update your{" "}
                        {currentSection === "passwords" ? "password" : "card"}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="hidden" />
                </AlertDialogHeader>
                {currentSection === "cards" ? (
                    <CardUpdateForm
                        credId={credId}
                        master_password={master_password}
                        initialData={
                            "cvv" in initialData.parsed
                                ? {
                                      name: initialData.name,
                                      ...initialData.parsed,
                                  }
                                : {
                                      name: "",
                                      cardNumber: "",
                                      cvv: "",
                                      expiry: "",
                                      holderName: "",
                                  }
                        }
                        closeParentDialog={setIsDialogOpen}
                    />
                ) : (
                    <PasswordUpdateForm
                        credId={credId}
                        master_password={master_password}
                        initialData={
                            "username" in initialData.parsed
                                ? {
                                      name: initialData.name,
                                      ...initialData.parsed,
                                  }
                                : {
                                      name: "",
                                      password: "",
                                      username: "",
                                  }
                        }
                        closeParentDialog={setIsDialogOpen}
                    />
                )}
                <AlertDialogFooter className="absolute bottom-0 right-0 -translate-x-10 -translate-y-8">
                    <AlertDialogCancel
                        className="text-lg"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function EditCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    const [cred, setCred] = useState<{
        name: string
        parsed: UnEncryptedCardType | UnEncryptedPassType
    }>({
        name: "",
        parsed: {
            cardNumber: "",
            cvv: "",
            expiry: "",
            holderName: "",
            password: "",
            username: "",
        },
    })
    const [masterPass, setMasterPass] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    async function handleSubmit(master_password: string) {
        const toastId = myToast.loading("Processing....")
        const cred = await getEditableCred(master_password, credId, credType)
        setMasterPass(master_password)

        myToast.dismiss(toastId)
        if (cred == null) {
            myToast.error("Failed to unlock credential")
            return
        }
        setCred(cred)
        setIsDialogOpen(true)
    }

    return (
        <>
            <CardAction handleSubmit={handleSubmit}>
                <FaEdit
                    size={18}
                    className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                />
            </CardAction>
            <EditCredDialog
                credId={credId}
                initialData={cred}
                master_password={masterPass}
                open={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </>
    )
}

export function ShareCred({
    credId,
    credType,
}: {
    credId: string
    credType: "passwords" | "cards"
}) {
    const tempPassInputRef = useRef<HTMLInputElement>(null)
    const recipientEmailInputRef = useRef<HTMLInputElement>(null)
    const [isTempPassDialogOpen, setIsTempPassDialogOpen] = useState(false)
    const [cred, setCred] = useState<
        UnEncryptedCardType | UnEncryptedPassType
    >()
    const router = useRouter()

    async function handleSubmit(master_password: string) {
        const toastId = myToast.loading("Processing....")
        const cred = await unlockCred(master_password, credId, credType)

        myToast.dismiss(toastId)
        if (cred == null) {
            myToast.error("Failed to unlock credential")
            return
        }
        setCred(cred)
        setIsTempPassDialogOpen(true)
    }

    return (
        <>
            <CardAction handleSubmit={handleSubmit}>
                <FaShareFromSquare
                    size={18}
                    className="cursor-pointer drop-shadow-lg drop-shadow-accent-foreground/40"
                />
            </CardAction>
            <AlertDialog
                open={isTempPassDialogOpen}
                onOpenChange={setIsTempPassDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Enter a temporary sharable encryption password
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <Input type="password" ref={tempPassInputRef} />
                    <div>
                        <p className="font-semibold mb-3">Recipient email</p>
                        <Input type="email" ref={recipientEmailInputRef} />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogFooter>
                            <Button
                                onClick={async () => {
                                    const toastId =
                                        myToast.loading("Processing....")
                                    const sharableId = await createSharedCred(
                                        cred!,
                                        credType,
                                        credId,
                                        tempPassInputRef.current!.value,
                                        recipientEmailInputRef.current!.value
                                    )

                                    if (sharableId.success === false) {
                                        myToast.dismiss(toastId)
                                        myToast.error(
                                            "Failed to create sharable Id"
                                        )
                                        return
                                    }

                                    await navigator.clipboard.writeText(
                                        sharableId.data as string
                                    )

                                    myToast.dismiss(toastId)
                                    myToast.success(
                                        <div>
                                            <span>
                                                Generated sharable ID:{" "}
                                                <p className="font-bold">
                                                    {sharableId.data as string}.
                                                </p>
                                                <p className="italic">
                                                    Copied to clipboard
                                                </p>
                                            </span>
                                            <p>
                                                Make sure to share the temporary
                                                password too, to unlock the
                                                credential
                                            </p>
                                        </div>,
                                        { duration: 10000 }
                                    )
                                    setIsTempPassDialogOpen(false)
                                    router.replace("/dashboard")
                                }}
                            >
                                Go
                            </Button>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
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

        if (cred.success === false) {
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
