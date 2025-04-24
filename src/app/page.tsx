

'use client'
import AuthForm from '@/components/auth/AuthForm'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthProvider'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user])

  return <AuthForm />
}
