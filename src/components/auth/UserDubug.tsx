'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function UserDebug() {
  useEffect(() => {
    const debug = async () => {
      const { data, error } = await supabase.auth.getUser()
      console.log('🧪 Supabase User:', data?.user)
    }
    debug()
  }, [])

  return <div>🔍 Check console for user data</div>
}
