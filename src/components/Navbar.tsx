import Link from "next/link"

import { MdLogout } from "react-icons/md"
import { FaKey, FaUser, FaGithub } from "react-icons/fa6"
import { LuSquareMenu } from "react-icons/lu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs"
import { AccountIsland } from "@/app/dashboard/components/account-island"
import { AccessSharedCred } from "@/app/dashboard/components/access-shared-cred"
import { SectionIsland } from "@/app/dashboard/components/section-island"
import { Suspense } from "react"

function NavTitle({ size }: { size: number }) {
    return (
        <div className="flex items-center gap-3">
            <FaKey size={size} />
            <span className="text-xl lg:text-2xl">SecureSave</span>
        </div>
    )
}

async function SmallNavSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <LuSquareMenu size={35} />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="pt-16 flex flex-col items-center justify-between"
            >
                <SheetHeader className="sr-only">
                    <SheetTitle>Side Bar</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-20 w-full">
                    <Suspense
                        fallback={
                            <div className="w-full h-20 bg-slate-200 animate-pulse rounded-md" />
                        }
                    >
                        <AccountIsland />
                    </Suspense>
                    <SectionIsland />
                </div>
                <p className="text-center text-gray-500 py-8 px-3 text-sm">
                    SecureSave is a secure, simple, and intuitive credential
                    manager that helps you safely store, manage, and access your
                    passwords anytime, anywhere.
                </p>
                <div className="flex flex-col gap-10 w-full items-center">
                    <div className="flex flex-col gap-5 w-full items-center">
                        <AccessSharedCred />
                        <SignOutButton>
                            <div className="flex items-center gap-3 justify-center">
                                <MdLogout className="text-red-400" />
                                <span className="text-lg font-semibold text-red-400">
                                    Log Out
                                </span>
                            </div>
                        </SignOutButton>
                    </div>
                    <footer className="text-center text-gray-500 max-lg:py-4 py-8 text-sm bg-white flex items-center justify-center gap-4 lg:gap-50">
                        <p className="lg:pl-50">Built by Technoflask · 2025</p>
                        <Link
                            href="https://github.com/Technoflask/SecureSave"
                            target="_blank"
                        >
                            <FaGithub size={30} />
                        </Link>
                    </footer>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function SmallNav() {
    return (
        <nav className="sticky top-0 lg:hidden py-4 px-6 bg-accent/50 backdrop-blur-lg flex justify-between items-center shadow-lg h-[67px]">
            <Link
                href="/"
                className="drop-shadow-xl drop-shadow-accent-foreground/40"
            >
                <NavTitle size={25} />
            </Link>
            <div className="flex gap-2 justify-center items-center drop-shadow-xl drop-shadow-accent-foreground/40">
                <Suspense
                    fallback={
                        <div className="w-10 h-10 animate-pulse rounded-full bg-slate-200" />
                    }
                >
                    <SignedIn>
                        <SmallNavSidebar />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton>
                            <span className="flex items-center gap-2">
                                <FaUser />
                                <span>Sign In</span>
                            </span>
                        </SignInButton>
                    </SignedOut>
                </Suspense>
                {/* <ThemeToggle /> */}
            </div>
        </nav>
    )
}

export default function Navbar() {
    return (
        <>
            {/* <BigNav /> */}
            <SmallNav />
        </>
    )
}

// function BigNav() {
//     return (
//         <nav className="hidden lg:flex py-6 px-12 bg-accent/50 backdrop-blur-lg items-center justify-between shadow-lg">
//             <Link
//                 href="/"
//                 className="drop-shadow-xl drop-shadow-accent-foreground/40"
//             >
//                 <NavTitle size={35} />
//             </Link>
//             <SignedIn>
//                 <ul className="flex gap-8">
//                     {LINKS.map((link) => (
//                         <li className="text-xl" key={link.name}>
//                             <Link href={link.path}>
//                                 <div className="flex items-center gap-3 drop-shadow-xl drop-shadow-accent-foreground/40">
//                                     <link.Icon />
//                                     <span>{link.name}</span>
//                                 </div>
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </SignedIn>
//             <div className="flex items-center gap-3 drop-shadow-xl drop-shadow-accent-foreground/40">
//                 <SignedIn>
//                     <UserButton />
//                 </SignedIn>
//                 <SignedOut>
//                     <SignInButton>
//                         <button className="flex items-center gap-2 cursor-pointer">
//                             <FaUser size={25} />
//                             <span className="text-xl">Sign In</span>
//                         </button>
//                     </SignInButton>
//                 </SignedOut>
//                 <ThemeToggle />
//             </div>
//         </nav>
//     )
// }
