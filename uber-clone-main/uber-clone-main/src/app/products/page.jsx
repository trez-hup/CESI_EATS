"use client"

import Link from 'next/link'


const categories = [
    { id: 1, icon: '🍔', label: 'Burger' },
    { id: 2, icon: '🍕', label: 'Pizza' },
    { id: 3, icon: '🥗', label: 'Salades' },
    { id: 4, icon: '⋯', label: 'Plus' },
]

const restaurants = [
    {
        id: 1,
        name: 'Baristo Ristaurante',
        image: '/images/baristo.jpg',
        rating: 4.5,
    },
    {
        id: 2,
        name: 'Pizza Planet',
        image: '/images/pizzaplanet.jpg',
        rating: 4.2,
    },
]

export default function ProductsPage() {
    return (
        <div className="pt-4 pb-20">

            <h2 className="px-4 text-sm font-medium text-gray-700 mb-2">
                Nos catégories
            </h2>
            <div className="px-4 flex space-x-4 overflow-x-auto">
                {categories.map(cat => (
                    <div
                        key={cat.id}
                        className="flex-shrink-0 flex flex-col items-center text-lg"
                    >
                        <div className="bg-white p-3 rounded-full shadow">
                            <span className="text-2xl">{cat.icon}</span>
                        </div>
                        <span className="mt-1 text-xs text-gray-600">{cat.label}</span>
                    </div>
                ))}
            </div>

            <h2 className="mt-6 px-4 text-sm font-medium text-gray-700 mb-2">
                Restaurants les mieux notés
            </h2>
            <div className="px-4 flex space-x-4 overflow-x-auto">
                {restaurants.map(resto => (
                    <Link
                        key={resto.id}
                        href={`/restaurants/${resto.id}`}
                        className="flex-shrink-0 w-48 bg-white rounded-lg shadow overflow-hidden"
                    >
                        <div className="h-24 bg-gray-200">
                            <img
                                src={resto.image}
                                alt={resto.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm font-semibold text-gray-800">
                                {resto.name}
                            </h3>
                            <div className="flex items-center mt-1 text-yellow-500 text-xs">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <span key={i}>
                    {resto.rating >= i + 1
                        ? '★'
                        : resto.rating > i
                            ? '☆'
                            : '☆'}
                  </span>
                                ))}
                                <span className="ml-1 text-gray-500 text-xs">
                  {resto.rating.toFixed(1)}
                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <h2 className="mt-6 px-4 text-sm font-medium text-gray-700 mb-2">
                Nouveautés
            </h2>
            <div className="px-4">
                <div className="text-gray-400 italic text-xs">Aucune nouveauté pour l’instant</div>
            </div>
        </div>
    )
}
