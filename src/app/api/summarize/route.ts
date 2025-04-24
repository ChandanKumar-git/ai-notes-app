export const runtime = 'edge'

export async function POST(request: Request) {
  const body = await request.json()
  const { content } = body

  if (!content) {
    return Response.json({ error: 'Missing content' }, { status: 400 })
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // ✅ Updated working model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes notes.',
          },
          {
            role: 'user',
            content: `Summarize this note:\n\n${content}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    const data = await response.json()
    console.log('🧠 Groq Response:', data)

    const summary = data?.choices?.[0]?.message?.content || 'No summary generated'

    return Response.json({ summary })
  } catch (error) {
    console.error('Groq API Error:', error)
    return Response.json({ summary: 'Failed to summarize' }, { status: 500 })
  }
}
