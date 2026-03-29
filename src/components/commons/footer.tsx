import React from 'react'
import logo from "@/assets/freshcart-logo.svg";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  CreditCard
} from "lucide-react";
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0B1E36] text-gray-300">
      <div className="mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
        <div className="lg:col-span-2">
          <Link href="/" className="logo">
            <Image src={logo} alt="logo" className="w-50 left-0 bg-white p-3 rounded-lg mb-4"  />
          </Link>

          <p className="text-sm text-gray-400 mb-6 max-w-md">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>

          <div className="space-y-3 text-sm">
            <Link href='' className="flex items-center gap-2 group">
              <Phone className="text-green-400 w-4 h-4 group-hover:text-green-500" />
              <span className='group-hover:text-green-500'>+1 (800) 123-4567</span>
            </Link>

            <Link href='' className="flex items-center gap-2 group">
              <Mail className="text-green-400 w-4 h-4 group-hover:text-green-500 " />
              <span className='group-hover:text-green-500'>support@freshcart.com</span>
            </Link>

            <div className="flex items-center gap-2">
              <MapPin className="text-green-400 w-4 h-4" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex gap-4 mt-6">
            <div className="p-3 bg-[#132A47] rounded-full hover:bg-green-500 cursor-pointer transition">
              <Facebook size={18} />
            </div>

            <div className="p-3 bg-[#132A47] rounded-full hover:bg-green-500 cursor-pointer transition">
              <Twitter size={18} />
            </div>

            <div className="p-3 bg-[#132A47] rounded-full hover:bg-green-500 cursor-pointer transition">
              <Instagram size={18} />
            </div>

            <div className="p-3 bg-[#132A47] rounded-full hover:bg-green-500 cursor-pointer transition">
              <Youtube size={18} />
            </div>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-semibold mb-4">Shop</h3>
          <ul className="space-y-3 text-sm ">
            <li><Link href="/allCategories" className='hover:text-green-500'>All Products</Link></li>
            <li><Link href="/categories" className='hover:text-green-500'>Categories</Link></li>
            <li><Link href="/brands" className='hover:text-green-500'>Brands</Link></li>
            <li><Link href="/electronics" className='hover:text-green-500'>Electronics</Link></li>
            <li><Link href="/mensfashion" className='hover:text-green-500'>Mens Fashion</Link></li>
            <li><Link href="/womensfashion" className='hover:text-green-500'>Womens Fashion</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-semibold mb-4">Account</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className='hover:text-green-500'>My Account</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Order History</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Wishlist</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Shopping Cart</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Sign In</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Create Account</Link></li>
          </ul>
        </div>

        {/* Support + Legal */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm mb-6">
            <li><Link href="#" className='hover:text-green-500'>Contact Us</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Help Center</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Shipping Info</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Returns & Refunds</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Track Order</Link></li>
          </ul>
        </div>
        <div>
           <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="#" className='hover:text-green-500'>Privacy Policy</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Terms of Service</Link></li>
            <li><Link href="#" className='hover:text-green-500'>Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700">
        <div className="mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">

          <p>© 2026 FreshCart. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <CreditCard size={18} />
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
          </div>

        </div>
      </div>
    </footer>
  );
}