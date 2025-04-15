import { Button } from "@/components/ui/button"
import { myToast } from "./my-toast"
import { FaClipboard } from "react-icons/fa6"

export function clipboardWarning(intervalId: NodeJS.Timeout) {
    const toastId = myToast.message(
        <div className="flex justify-center items-center">
            <span>
                Credential still present in clipboard. Please clear for your
                safety
            </span>
            <Button
                className="border-red-400 text-red-400"
                variant="outline"
                onClick={async () => {
                    await navigator.clipboard.writeText("")
                    myToast.dismiss(toastId)
                    myToast.success("Cleared clipboard")
                    clearInterval(intervalId)
                }}
            >
                Clear
            </Button>
        </div>,
        {
            icon: <FaClipboard />,
            className: "!border-red-400 !border-4 !w-lg",
        }
    )
}
