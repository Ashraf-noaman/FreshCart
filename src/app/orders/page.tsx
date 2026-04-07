import GetOrder from '@/components/orders/getorder'
import { ScrollText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Orders() {
  return (
     <main>
      <div className="bg-gradient-to-r from-green-600 to-green-400 h-40 lg:h-45 lg:p-8 p-8">
        <p>
          <Link href="/" className=" text-white/80 hover:text-white">
            Home /{" "}
          </Link>
          <span className="text-white">Orders</span>
        </p>
        <div className="flex items-center gap-5">
          <ScrollText className="my-3 text-green-600  bg-green-100/90 lg:w-17 lg:h-17 w-14 h-14 p-3  rounded-xl shadow-sm" />
          <div className="mt-2">
            <h3 className="lg:text-4xl text-xl font-bold text-white">
              Orders
            </h3>
            <p className="text-white">Your order </p>
          </div>
        </div>
      </div>
      <GetOrder/>
    </main>
  )
}
