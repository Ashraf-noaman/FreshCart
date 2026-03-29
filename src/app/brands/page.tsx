import { getUserToken } from '@/lib/auth';
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Brands() {
    const data = await getServerSession(authOptions)
    console.log(data,"session data in brands page");
    const myToken = await getUserToken();
  return (
    <div>
      Brands
    </div>
  )
}
