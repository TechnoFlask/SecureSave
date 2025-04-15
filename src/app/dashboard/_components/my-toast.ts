import { ExternalToast, toast } from "sonner"

type titleT = (() => React.ReactNode) | React.ReactNode

export const myToast = {
    ...toast,
    success: (message: titleT, data?: ExternalToast) =>
        toast.success(message, {
            className: "!bg-green-600 !text-white !text-lg",
            ...data,
        }),
    error: (message: titleT, data?: ExternalToast) =>
        toast.error(message, {
            className: "!bg-red-400 !text-white !text-lg",
            ...data,
        }),

    loading: (message: titleT, data?: ExternalToast) =>
        toast.loading(message, {
            className: "!text-lg",
            ...data,
        }),
}
