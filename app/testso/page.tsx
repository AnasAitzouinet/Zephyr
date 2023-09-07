/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client"
import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'

const products = [
  {
    id: 1,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  // More products...
]

export default function Example() {
  return (
    <div className="">
      <div className="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Shopping Cart</h1>

        <div className="mt-12">
          <div>
            <ul role="list" className="divide-y divide-gray-300/30 border-t border-b border-gray-200/30">
              {products.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-lg">
                            <a href={product.href} className="font-medium text-gray-100 hover:text-gray-300">
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-200">{product.color}</p>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          
        </div>
      </div>
    </div>
  )
}
