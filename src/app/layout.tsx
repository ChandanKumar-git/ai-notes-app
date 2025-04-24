import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthProvider'
import ReactQueryProvider from '@/context/ReactQueryProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
