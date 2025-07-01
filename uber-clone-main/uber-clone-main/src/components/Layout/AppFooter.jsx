"use client"
import Link from 'next/link'
import {
    HomeIcon,
    ShoppingCartIcon,
    UserIcon
} from '@heroicons/react/24/outline'
import {Bars3Icon} from "@heroicons/react/16/solid";

export default function AppFooter() {
    return (
        <nav className="fixed bottom-0 w-full bg-primary border-t border-gray-200 z-20 rounded-t-2xl">
            <div className="max-w-md mx-auto flex justify-between h-14 px-6">
                <Link href="/" className="flex flex-col items-center justify-center text-black">
                    <Bars3Icon className="w-6 h-6" />
                    <span className="text-xs">Menu</span>
                </Link>
                <Link href="/products" className="flex flex-col items-center justify-center text-black">
                    <HomeIcon className="w-6 h-6" />
                    <span className="text-xs">Accueil</span>
                </Link>
                <Link href="/cart" className="flex flex-col items-center justify-center text-black">
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span className="text-xs">Panier</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center justify-center text-black">
                    <UserIcon className="w-6 h-6" />
                    <span className="text-xs">Profil</span>
                </Link>
            </div>
        </nav>
    )
}