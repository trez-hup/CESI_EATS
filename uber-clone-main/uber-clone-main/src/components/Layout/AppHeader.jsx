"use client"

import Link from "next/link"
import {
    BellAlertIcon,
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    MicrophoneIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline"

export default function AppHeader() {
    return (
        <header className="relative w-full bg-primary">
            <div className="absolute inset-x-0 -top-3 flex justify-center">
                <div className="bg-white rounded-b-full w-8 h-4 flex items-center justify-center">
                    <ChevronDownIcon className="w-4 h-4 text-primary" />
                </div>
            </div>

            <div className="flex items-center justify-end h-12 px-4">
                <Link href="/notifications" className="p-2">
                    <BellAlertIcon className="w-6 h-6 text-black" />
                </Link>
                <Link href="/cart" className="p-2 ml-2">
                    <ShoppingCartIcon className="w-6 h-6 text-black" />
                </Link>
            </div>

            <div className="px-4 pb-4">
                <div className="flex items-center bg-white rounded-full h-10 px-3 shadow">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />

                    <input
                        type="text"
                        placeholder="Rechercher"
                        className="flex-grow px-2 text-gray-700 placeholder-gray-400 focus:outline-none"
                    />

                    <MicrophoneIcon className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </header>
    )
}
