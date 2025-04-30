import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Lock, Shield } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { FaGithub } from "react-icons/fa6"
import { FiShare2, FiShield, FiFeather } from "react-icons/fi"

export const experimental_ppr = true

function Hero({ ...props }: React.ComponentProps<"section">) {
    return (
        <section {...props}>
            <div className="flex justify-center items-center xl:gap-3 mb-7 xl:mb-14">
                <Shield className="h-10 w-10 xl:h-16 xl:w-16 text-accent-foreground" />
                <h1 className="text-3xl xl:text-4xl font-bold">SecureSave</h1>
            </div>
            <div className=" flex flex-col lg:flex-row items-center justify-center p-4 gap-10">
                <div className="flex flex-col gap-3 xl:gap-6">
                    <h1 className="text-3xl xl:text-5xl font-bold mb-4">
                        Securely store and manage your credentials — with
                        confidence
                    </h1>
                    <h2 className="text-2xl xl:text-3xl mb-2 lg:pr-4">
                        SecureSave is your encrypted, easy-to-use password and
                        credential manager built for peace of mind
                    </h2>
                    <div className="flex gap-5">
                        <Suspense
                            fallback={
                                <div className="h-8 w-32 bg-gray-300 animate-pulse rounded-full" />
                            }
                        >
                            <SignedOut>
                                <Link href="/sign-in">
                                    <Button
                                        className="text-base xl:text-lg cursor-pointer"
                                        size="lg"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </SignedOut>
                            <SignedIn>
                                <Link href="/dashboard">
                                    <Button
                                        className="text-base xl:text-lg cursor-pointer"
                                        size="lg"
                                    >
                                        Your Credentials
                                    </Button>
                                </Link>
                            </SignedIn>
                        </Suspense>
                        <Link href="#features">
                            <Button
                                className="text-base xl:text-lg cursor-pointer"
                                variant="outline"
                                size="lg"
                            >
                                Learn More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="relative w-full max-w-sm h-[300px] xl:max-w-lg xl:h-[350px] bg-gradient-to-br from-accent-foreground/50 to-accent-foreground rounded-xl shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center p-6">
                        <Lock className="h-16 w-16 xl:h-24 xl:w-24 text-white mb-6" />
                        <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 w-full max-w-xs xl:max-w-sm shadow-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-3 w-3 rounded-full bg-accent-foreground"></div>
                                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4"></div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
                                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>
                                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-4/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Features() {
    return (
        <section
            id="features"
            className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-14"
        >
            <div className="space-y-2">
                <FiShield className="lg:hidden" size={50} />
                <FiShield className="hidden lg:block" size={70} />
                <h3 className="font-semibold text-xl lg:text-2xl">
                    Zero Knowledge Encryption
                </h3>
                <p className="text-lg lg:text-xl mt-3">
                    Only you can access your credentials — not even we can read
                    them.
                </p>
            </div>
            <div className="space-y-2">
                <FiShare2 className="lg:hidden" size={50} />
                <FiShare2 className="hidden lg:block" size={70} />
                <h3 className="font-semibold text-xl lg:text-2xl">
                    Secure Credential Sharing
                </h3>
                <p className="text-lg lg:text-xl mt-3">
                    Share passwords with your team or family — safely and
                    easily.
                </p>
            </div>
            <div className="space-y-2">
                <FiFeather className="lg:hidden" size={50} />
                <FiFeather className="hidden lg:block" size={70} />
                <h3 className="font-semibold text-xl lg:text-2xl">
                    Distraction-Free Interface
                </h3>
                <p className="text-lg lg:text-xl mt-3">
                    Minimal and intuitive — built to help you focus, not fumble.
                </p>
            </div>
        </section>
    )
}

function ThankYou() {
    return (
        <section className="py-16 px-5 text-center bg-gray-100 rounded-xl">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
                Thank You for Visiting
            </h3>
            <p className="text-lg lg:text-xl mb-8">
                SecureSave was designed with simplicity and security in mind. I
                hope you enjoyed exploring the features of this credential
                manager, and I’m always open to feedback!
            </p>
            <p className="text-lg lg:text-xl">
                Feel free to explore and manage your credentials securely.
            </p>
        </section>
    )
}

export default function Home() {
    return (
        <div className="container mx-auto min-h-screen">
            <div className="pt-16 xl:pt-48 flex flex-col gap-24 lg:gap-36">
                <Hero />
                <Features />
                <ThankYou />
                <footer className="text-center text-gray-500 py-8 text-sm bg-white flex items-center justify-center gap-10 lg:gap-50">
                    <p className="pl-10 lg:pl-50">
                        Built by Technoflask · 2025
                    </p>
                    <Link
                        href="https://github.com/Technoflask/SecureSave"
                        target="_blank"
                    >
                        <FaGithub size={30} />
                    </Link>
                </footer>
            </div>
        </div>
    )
}
