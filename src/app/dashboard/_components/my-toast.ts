import { ExternalToast, toast } from "sonner"

type titleT = (() => React.ReactNode) | React.ReactNode

export const myToast = {
    ...toast,
    success: (message: titleT, data?: ExternalToast) =>
        toast.success(message, {
            ...data,
            className: "!bg-green-600 !text-white !text-lg " + data?.className,
        }),
    error: (message: titleT, data?: ExternalToast) =>
        toast.error(message, {
            ...data,
            className: "!bg-red-400 !text-white !text-lg " + data?.className,
        }),

    loading: (message: titleT, data?: ExternalToast) =>
        toast.loading(message, {
            ...data,
            className: "!text-lg " + data?.className,
        }),

    message: (message: titleT, data?: ExternalToast) =>
        toast.message(message, {
            ...data,
            className: "!text-lg " + data?.className,
        }),
}
