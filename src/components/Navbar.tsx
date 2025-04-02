import Link from "next/link"

import { TbLogout } from "react-icons/tb"
import { FaKey, FaUser, FaHouse, FaCreditCard, FaPlus } from "react-icons/fa6"
import { LuSquareMenu } from "react-icons/lu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import { ThemeToggle } from "./ThemeToggle"
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"

const LINKS = [
  {
    path: "/dashboard",
    name: "Home",
    Icon: FaHouse,
  },
  { path: "/dashboard", name: "Saved credentials", Icon: FaCreditCard },
  { path: "/new-cred", name: "Add new credential", Icon: FaPlus },
]

function NavTitle({ size }: { size: number }) {
  return (
    <div className="flex items-center gap-3">
      <FaKey size={size} />
      <span className="text-xl lg:text-2xl">SecureSave</span>
    </div>
  )
}

async function SmallNavSidebar() {
  const user = await currentUser()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <LuSquareMenu size={35} />
      </SheetTrigger>
      <SheetContent side="right" className="py-20 px-12 flex flex-col gap-6">
        <SheetHeader className="sr-only">
          <SheetTitle>Side Bar</SheetTitle>
        </SheetHeader>
        {/* Account */}
        <div className="flex items-center gap-3">
          <UserButton />
          <p className="text-xl font-medium">
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <Separator />
        <ul className="flex flex-col gap-6">
          {LINKS.map((link) => (
            <li className="text-xl font-semibold" key={link.name}>
              <Link href={link.path}>
                <SheetClose className="flex items-center gap-3">
                  <link.Icon />
                  <span>{link.name}</span>
                </SheetClose>
              </Link>
            </li>
          ))}
        </ul>
        <Separator />
        <SignOutButton>
          <div className="flex items-center gap-3">
            <TbLogout size={25} className="text-red-400" />
            <span className="text-xl font-semibold text-red-400">Log Out</span>
          </div>
        </SignOutButton>
      </SheetContent>
    </Sheet>
  )
}

function SmallNav() {
  return (
    <nav className="lg:hidden py-4 px-6 bg-accent flex justify-between items-center">
      <Link href="/">
        <NavTitle size={25} />
      </Link>
      <div className="flex gap-2 justify-center items-center">
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
        <ThemeToggle />
      </div>
    </nav>
  )
}

function BigNav() {
  return (
    <nav className="hidden lg:flex py-4 px-12 bg-accent items-center justify-between">
      <Link href="/">
        <NavTitle size={35} />
      </Link>
      <SignedIn>
        <ul className="flex gap-5">
          {LINKS.map((link) => (
            <li className="text-xl" key={link.name}>
              <Link href={link.path}>
                <div className="flex items-center gap-3">
                  <link.Icon />
                  <span>{link.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </SignedIn>
      <div className="flex items-center gap-3">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="flex items-center gap-2 cursor-pointer">
              <FaUser size={25} />
              <span className="text-xl">Sign In</span>
            </button>
          </SignInButton>
        </SignedOut>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default function Navbar() {
  return (
    <>
      <BigNav />
      <SmallNav />
    </>
  )
}
