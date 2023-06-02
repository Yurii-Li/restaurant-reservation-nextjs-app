import './globals.css'
import {Inter} from 'next/font/google'
import NavBar from "@/app/components/NavBar";
import AuthContext from "@/app/context/AuthContext";

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'OpenTable',
}

export default function RootLayout({children,}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <main className={"bg-gray-100 min-h-screen w-screen"}>

      <AuthContext>
        <main className="max-w-screen-2xl m-auto bg-white">
          <NavBar/>
          {children}
        </main>
      </AuthContext>


    </main>

    </body>
    </html>
  )
}
