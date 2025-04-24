'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Note = {
  id: string
  title: string
  content: string
  summary?: string
}

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const fetchNotes = async () => {
    const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
    setNotes(data || [])
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSummarize = async (noteId: string, content: string) => {
    setLoading(noteId)
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
    const data = await res.json()
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId ? { ...n, summary: data.summary } : n
      )
    )
    setLoading(null)
  }

  const handleDelete = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    fetchNotes()
  }

  const startEdit = (note: Note) => {
    setEditingNoteId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const handleUpdate = async () => {
    if (!editingNoteId) return
    await supabase
      .from('notes')
      .update({ title: editTitle, content: editContent })
      .eq('id', editingNoteId)

    setEditingNoteId(null)
    setEditTitle('')
    setEditContent('')
    fetchNotes()
  }

  return (
    <div className="mt-6 space-y-6">
      {notes.map((note) => (
        <div key={note.id} className="border p-4 rounded shadow-sm">
          {editingNoteId === note.id ? (
            <div className="space-y-2">
              <input
                className="w-full p-2 border rounded"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button onClick={handleUpdate} className="text-white bg-green-600 px-3 py-1 rounded mr-2">Update</button>
              <button onClick={() => setEditingNoteId(null)} className="text-white bg-gray-600 px-3 py-1 rounded">Cancel</button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{note.title}</h2>
              <p>{note.content}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleSummarize(note.id, note.content)}
                  className="text-blue-600 underline"
                >
                  {loading === note.id ? 'Summarizing...' : 'Summarize'}
                </button>

                <button
                  onClick={() => startEdit(note)}
                  className="text-yellow-600 underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </div>

              {note.summary && (
                <div className="mt-2 bg-gray-100 p-3 rounded">
                  <strong>Summary:</strong>
                  <p>{note.summary}</p>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
