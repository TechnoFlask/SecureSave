"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FaClipboard, FaPlus } from "react-icons/fa6"
import { useSectionContext } from "../section-context"
import { myToast } from "./my-toast"
import { Button } from "@/components/ui/button"

export function AddCredButton() {
    const { currentSection } = useSectionContext()
    return (
        <button
            onClick={async () => {
                // console.log(
                //     await unlockCred(
                //         "pass",
                //         "b90b5114-204e-43cf-9906-b08bbbe779fb",
                //         "cards"
                //     )
                // )
                // const data = {
                //     username: "card",
                //     password: "card_pass",
                // }
                // await addCred(
                //     "pass",
                //     JSON.stringify(data),
                //     currentSection,
                //     "pass"
                // )
                // const after = await encryptCred(
                //     "password",
                //     JSON.stringify(data)
                // )
                // console.log(
                //     fromByteArray(after!.iv),
                //     fromByteArray(after!.enc),
                //     fromByteArray(after!.salt)
                // )
                // console.log(await unlockCred("password", "", "passwords"))
            }}
        >
            <Card className="cursor-pointer max-w-sm">
                <CardContent className="flex justify-center items-center gap-3">
                    <FaPlus />
                    <span className="text-xl font-semibold">
                        Add{" "}
                        {currentSection === "passwords" ? "Password" : "Card"}
                    </span>
                </CardContent>
            </Card>
        </button>
    )
}
