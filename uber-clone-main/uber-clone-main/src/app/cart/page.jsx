"use client"

import { useState } from "react"
import Link from "next/link"
import {
    ArrowLeftIcon,
    XMarkIcon
} from "@heroicons/react/24/outline"

const initialCart = [
    {
        id: 1,
        restaurant: "Baristo Ristaurante",
        price: 15.99,
        qty: 1,
        address: "Livrer à l'adresse 91 Saint Julien Ave"
    },
]

export default function CartPage() {
    const [cart, setCart] = useState(initialCart)
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

    const removeItem = (id) => {
        setCart((c) => c.filter((i) => i.id !== id))
    }

    return (
        <div className="pt-4 pb-20">
            <div className="flex items-center px-4 mb-4">
                <Link href="/products">
                    <ArrowLeftIcon className="w-6 h-6 text-black" />
                </Link>
                <h1 className="ml-2 text-lg font-bold text-black">Paniers</h1>
            </div>

            <div className="flex items-center justify-between px-4 mb-4">
                <span className="text-sm text-gray-700">Sous-total</span>
                <span className="font-semibold text-gray-900">
          {total.toFixed(2)} €
        </span>
            </div>

            <div className="px-4 mb-6">
                <button className="w-full py-3 bg-secondary text-black rounded-lg text-center font-medium">
                    Passer la commande
                </button>
            </div>

            <div className="space-y-4 px-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-primary p-4 rounded-xl"
                    >
                        <button
                            onClick={() => removeItem(item.id)}
                            className="absolute top-3 right-3"
                            aria-label="Supprimer"
                        >
                            <XMarkIcon className="w-6 h-6 text-red-500" />
                        </button>

                        <div className="flex items-center mb-3 space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">
                                    {item.restaurant}
                                </p>
                                <p className="text-xs text-gray-600">
                                    {item.qty} article{item.qty > 1 ? "s" : ""} –{" "}
                                    {(item.price * item.qty).toFixed(2)} €
                                </p>
                                <p className="text-xs text-gray-600">{item.address}</p>
                            </div>
                        </div>

                        <button className="w-full bg-white text-black py-2 rounded-lg mb-2 hover:bg-gray-100">
                            Afficher les détails
                        </button>
                        <button className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-100">
                            Afficher le restaurant
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}