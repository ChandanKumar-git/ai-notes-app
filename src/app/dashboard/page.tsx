

'use client'

import NoteForm from '@/components/notes/NoteForm'
import NoteList from '@/components/notes/NoteList'
import { useAuth } from '@/context/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (!user) router.push('/')
  }, [user])

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      {user && <p className="mb-4">Signed in as: {user.email}</p>}
      <NoteForm onNoteAdded={() => setRefresh(!refresh)} />
      <NoteList key={refresh.toString()} />
    </div>
  )
}
