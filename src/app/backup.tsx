// import Link from "next/link"
// import { Shield, Lock } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { SignedIn, SignedOut } from "@clerk/nextjs"

// export default function LandingPage() {
//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
//             <div className="container max-w-5xl mx-auto">
//                 <div className="flex flex-col items-center text-center mb-8">
//                     <div className="flex items-center gap-2 mb-2">
//                         <Shield className="h-8 w-8 xl:h-12 xl:w-12 text-accent-foreground" />
//                         <h1 className="text-3xl xl:text-4xl font-bold">
//                             SecureSave
//                         </h1>
//                     </div>
//                 </div>

//                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
//                     <div className="space-y-4 max-w-md text-center md:text-left">
//                         <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
//                             Your Credentials.{" "}
//                             <span className="text-transparent/0 bg-clip-text bg-gradient-to-br from-accent-foreground/50 to-accent-foreground">
//                                 Secured.
//                             </span>
//                         </h2>
//                         <p className="text-lg xl:text-xl text-gray-500 dark:text-gray-400">
//                             Store your passwords and payment cards safely with
//                             military-grade encryption. Access them anywhere,
//                             anytime.
//                         </p>

//                         <ul className="grid gap-3 pt-2">
//                             <li className="flex items-center gap-2">
//                                 <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
//                                 <span className="xl:text-lg">
//                                     Master encryption for maximum security
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
//                                 <span className="xl:text-lg">
//                                     Secure password and card storage
//                                 </span>
//                             </li>
//                             <li className="flex items-center gap-2">
//                                 <div className="h-2 w-2 rounded-full bg-accent-foreground"></div>
//                                 <span className="xl:text-lg">
//                                     Simple, intuitive dashboard interface
//                                 </span>
//                             </li>
//                         </ul>

//                         <div className="pt-4">
//                             <SignedIn>
//                                 <Button
//                                     size="lg"
//                                     className="text-base px-8"
//                                     asChild
//                                 >
//                                     <Link href="/dashboard">Dashboard</Link>
//                                 </Button>
//                             </SignedIn>
//                             <SignedOut>
//                                 <Button
//                                     size="lg"
//                                     className="text-base px-8"
//                                     asChild
//                                 >
//                                     <Link href="/sign-in">Get Started</Link>
//                                 </Button>
//                             </SignedOut>
//                         </div>
//                     </div>

//                     <div className="relative w-full max-w-sm h-[300px] xl:max-w-lg xl:h-[350px] bg-gradient-to-br from-accent-foreground/50 to-accent-foreground rounded-xl shadow-2xl overflow-hidden">
//                         <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center p-6">
//                             <Lock className="h-16 w-16 xl:h-24 xl:w-24 text-white mb-6" />
//                             <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 w-full max-w-xs xl:max-w-sm shadow-lg">
//                                 <div className="flex items-center gap-3 mb-3">
//                                     <div className="h-3 w-3 rounded-full bg-accent-foreground"></div>
//                                     <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-3/4"></div>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-full"></div>
//                                     <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-5/6"></div>
//                                     <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full w-4/6"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
