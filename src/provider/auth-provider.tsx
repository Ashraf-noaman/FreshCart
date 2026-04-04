"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
        {children}
        </SessionProvider>
    </div>
  )
}
