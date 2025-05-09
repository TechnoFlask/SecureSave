import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cardFormSchema, passwordFormSchema } from "./schema"
import { z as zod } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { addCred, editCred } from "../actions/cred-actions"
import { myToast } from "./my-toast"

export function PasswordForm({
    closeParentDialog,
}: {
    closeParentDialog: (setIs: boolean) => void
}) {
    const [isPending, startTransition] = useTransition()
    const form = useForm<zod.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            masterPassword: "",
        },
    })

    async function onSubmit(values: zod.infer<typeof passwordFormSchema>) {
        const { username, password, masterPassword: master_password } = values
        const toastId = myToast.loading("Processing....")
        const res = await addCred(
            master_password,
            JSON.stringify({
                username,
                password,
            }),
            "passwords",
            values.name
        )

        if (res.success === false) {
            myToast.dismiss(toastId)
            myToast.error("Failed to create the credential")
            return
        }

        myToast.dismiss(toastId)
        myToast.success("Successfully created the credential")

        closeParentDialog(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    startTransition(async () => {
                        await form.handleSubmit(onSubmit)(e)
                    })
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Name of credential
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Username</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Password</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="masterPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Master Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Master password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="text-lg mt-3"
                    disabled={isPending}
                >
                    {isPending ? "Adding...." : "Add"}
                </Button>
            </form>
        </Form>
    )
}

export function CardForm({
    closeParentDialog,
}: {
    closeParentDialog: (setIs: boolean) => void
}) {
    const [isPending, startTransition] = useTransition()
    const form = useForm<zod.infer<typeof cardFormSchema>>({
        resolver: zodResolver(cardFormSchema),
        defaultValues: {
            name: "",
            holderName: "",
            cardNumber: "",
            cvv: "",
            masterPassword: "",
            expiry: "",
        },
    })

    async function onSubmit(values: zod.infer<typeof cardFormSchema>) {
        const {
            name,
            holderName,
            cardNumber,
            cvv,
            expiry,
            masterPassword: master_password,
        } = values
        const toastId = myToast.loading("Processing....")
        const res = await addCred(
            master_password,
            JSON.stringify({
                holderName,
                cardNumber,
                cvv,
                expiry,
            }),
            "cards",
            name
        )

        if (res.success === false) {
            myToast.dismiss(toastId)
            myToast.error("Failed to create the credential")
            return
        }

        myToast.dismiss(toastId)
        myToast.success("Successfully created the credential")
        closeParentDialog(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    startTransition(async () => {
                        await form.handleSubmit(onSubmit)(e)
                    })
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Name of credential
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="holderName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Holder Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Holder name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Card Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Card number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">CVV</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="CVV"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Expiry</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="expiry"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="masterPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Master Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Master password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="text-lg mt-3"
                    disabled={isPending}
                >
                    {isPending ? "Adding...." : "Add"}
                </Button>
            </form>
        </Form>
    )
}

const editPasswordFormSchema = passwordFormSchema.omit({
    masterPassword: true,
})
const editCardFormSchema = cardFormSchema.omit({ masterPassword: true })

export function PasswordUpdateForm({
    closeParentDialog,
    initialData,
    master_password,
    credId,
}: {
    closeParentDialog: (setIs: boolean) => void
    initialData: zod.infer<typeof editPasswordFormSchema>
    master_password: string
    credId: string
}) {
    const [isPending, startTransition] = useTransition()
    const form = useForm<zod.infer<typeof editPasswordFormSchema>>({
        resolver: zodResolver(editPasswordFormSchema),
        defaultValues: initialData,
    })

    async function onSubmit(values: zod.infer<typeof editPasswordFormSchema>) {
        const { username, password, name } = values
        const toastId = myToast.loading("Processing....")
        const res = await editCred(
            master_password,
            JSON.stringify({ username, password }),
            credId,
            name
        )

        if (res.success === false) {
            myToast.dismiss(toastId)
            myToast.error("Failed to update the credential")
            return
        }

        myToast.dismiss(toastId)
        myToast.success("Successfully updated the credential")

        closeParentDialog(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    startTransition(async () => {
                        await form.handleSubmit(onSubmit)(e)
                    })
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Name of credential
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Username</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Username"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Password</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="text-lg mt-3"
                    disabled={isPending}
                >
                    {isPending ? "Editing...." : "Edit"}
                </Button>
            </form>
        </Form>
    )
}

export function CardUpdateForm({
    closeParentDialog,
    initialData,
    master_password,
    credId,
}: {
    closeParentDialog: (setIs: boolean) => void
    initialData: zod.infer<typeof editCardFormSchema>
    master_password: string
    credId: string
}) {
    const [isPending, startTransition] = useTransition()
    const form = useForm<zod.infer<typeof editCardFormSchema>>({
        resolver: zodResolver(editCardFormSchema),
        defaultValues: initialData,
    })

    async function onSubmit(values: zod.infer<typeof editCardFormSchema>) {
        const { name, holderName, cardNumber, cvv, expiry } = values
        const toastId = myToast.loading("Processing....")
        const res = await editCred(
            master_password,
            JSON.stringify({ holderName, cardNumber, cvv, expiry }),
            credId,
            name
        )

        if (res.success === false) {
            myToast.dismiss(toastId)
            myToast.error("Failed to update the credential")
            return
        }

        myToast.dismiss(toastId)
        myToast.success("Successfully updated the credential")

        closeParentDialog(false)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    startTransition(async () => {
                        await form.handleSubmit(onSubmit)(e)
                    })
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Name of credential
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="holderName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Holder Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Holder name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">
                                Card Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="Card number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">CVV</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="CVV"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiry"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg">Expiry</FormLabel>
                            <FormControl>
                                <Input
                                    className="placeholder:text-lg not-focus:text-base focus:text-lg"
                                    placeholder="expiry"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="text-lg mt-3"
                    disabled={isPending}
                >
                    {isPending ? "Editing...." : "Edit"}
                </Button>
            </form>
        </Form>
    )
}
