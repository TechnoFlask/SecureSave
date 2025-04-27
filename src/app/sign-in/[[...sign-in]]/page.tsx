import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <div
            style={{
                background:
                    "linear-gradient(135deg, #f1fdfb 0%, #eaf8ff 25%, #edfef4 50%, #f4fbff 75%, #ffffff 100%)",
            }}
            className="h-screen fixed inset-0 z-0"
        >
            <div
                style={{ backdropFilter: "blur(10px)" }}
                className="fixed inset-0 z-10 flex justify-center items-center bg-transparent"
            >
                <SignIn />
            </div>
        </div>
    )
}
