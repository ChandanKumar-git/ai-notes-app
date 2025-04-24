import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabaseClient'

export const useNotes = () => {
  const queryClient = useQueryClient()

  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
      if (error) throw new Error(error.message)
      return data
    }
  })

  const addNote = useMutation({
    mutationFn: async (note: { title: string; content: string; user_id: string }) => {
      const { error } = await supabase.from('notes').insert([note])
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  return { ...notesQuery, addNote }
}
