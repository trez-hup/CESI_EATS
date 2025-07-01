"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    ArrowLeftIcon,
    PencilIcon,
    UserCircleIcon,
    HomeIcon,
    PhoneIcon,
    HeartIcon,
    ClipboardDocumentListIcon,
    UserPlusIcon
} from "@heroicons/react/24/outline"

export default function ProfilePage() {
    const router = useRouter()

    const user = {
        name: "Nom du client",
        email: "email@client.com",
        address: "87 rue Auchan 62000 Arras",
        phone: "+33780870404"
    }

    return (
        <div className="pt-4 pb-20">
            <div className="flex items-center px-4 mb-4">
                <button onClick={() => router.back()}>
                    <ArrowLeftIcon className="w-6 h-6 text-black" />
                </button>
            </div>

            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    <UserCircleIcon className="w-20 h-20 text-gray-300" />
                    <button
                        aria-label="Modifier le profil"
                        className="absolute bottom-0 right-0 bg-primary p-1 rounded-full"
                    >
                        <PencilIcon className="w-4 h-4 text-black" />
                    </button>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-black">
                    {user.name}
                </h2>
                <p className="text-sm text-secondary">{user.email}</p>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center bg-primary px-4 py-2">
          <span className="text-sm font-medium text-black">
            Mes informations
          </span>
                    <button>
                        <PencilIcon className="w-5 h-5 text-black" />
                    </button>
                </div>
                <div className="bg-white px-4 py-3 flex items-center space-x-3 border-b border-gray-200">
                    <HomeIcon className="w-6 h-6 text-gray-700" />
                    <span className="text-sm text-gray-800">{user.address}</span>
                </div>
                <div className="bg-white px-4 py-3 flex items-center space-x-3">
                    <PhoneIcon className="w-6 h-6 text-gray-700" />
                    <span className="text-sm text-gray-800">{user.phone}</span>
                </div>
            </div>

            <div className="mb-4">
                <div className="bg-primary px-4 py-2">
          <span className="text-sm font-medium text-black">
            Mes activités
          </span>
                </div>
                <div className="bg-white">
                    <Link
                        href="/favorites"
                        className="flex items-center space-x-3 px-4 py-3 border-b border-gray-200"
                    >
                        <HeartIcon className="w-6 h-6 text-gray-700" />
                        <span className="text-sm text-gray-800">Mes favoris</span>
                    </Link>
                    <Link
                        href="/orders"
                        className="flex items-center space-x-3 px-4 py-3 border-b border-gray-200"
                    >
                        <ClipboardDocumentListIcon className="w-6 h-6 text-gray-700" />
                        <span className="text-sm text-gray-800">Mes commandes</span>
                    </Link>
                    <Link
                        href="/invite"
                        className="flex items-center space-x-3 px-4 py-3"
                    >
                        <UserPlusIcon className="w-6 h-6 text-gray-700" />
                        <span className="text-sm text-gray-800">
              Inviter des amis
            </span>
                    </Link>
                </div>
            </div>

            <div className="mb-4">
                <button className="w-full text-left px-4 py-3 bg-white border-b border-gray-300 text-sm text-black">
                    Se déconnecter
                </button>
                <button className="w-full text-left px-4 py-3 bg-primary text-sm text-black">
                    Supprimer mon compte
                </button>
            </div>
        </div>
    )
}
