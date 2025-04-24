'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function NoteForm({ onNoteAdded }: { onNoteAdded: () => void }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user?.id) {
        console.log('✅ User ID:', data.user.id)
        setUserId(data.user.id)
      } else {
        console.error('❌ Could not get user:', error)
      }
    }
    getUser()
  }, [])

  const handleSubmit = async () => {
    if (!userId) return alert('User not authenticated.')

    const { data, error } = await supabase.from('notes').insert([
      {
        title,
        content,
        user_id: userId,
      },
    ])

    console.log('📝 Insert response:', { data, error })

    if (error) {
      alert('Failed to add note: ' + (error.message || JSON.stringify(error)))
    } else {
      alert('✅ Note added!')
      setTitle('')
      setContent('')
      onNoteAdded()
    }
  }

  return (
    <div className="space-y-4">
      <input
        className="w-full p-2 border rounded"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Note
      </button>
    </div>
  )
}
