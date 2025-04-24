# 🧠 AI-Powered Notes App

A mini productivity app that lets users take notes and get AI-generated summaries in one click.

## 🔧 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + Shadcn UI
- Supabase (Auth + DB)
- DeepSeek API (Summarization)
- React Query

## ✅ Features

- 🔐 Auth with Email & Google (via Supabase)
- 📝 Create, Read, Delete Notes (per user)
- 🧠 AI Summarization of notes (via DeepSeek API)
- 🔄 Caching with React Query
- 💻 Deployed on Vercel

## 🚀 Live Demo

👉 [Live Site](https://ai-notes.vercel.app)

## 📦 Setup Locally

```bash
git clone https://github.com/yourusername/ai-notes-app.git
cd ai-notes-app
npm install
cp .env.local.example .env.local
# add your Supabase & DeepSeek keys to .env.local
npm run dev
