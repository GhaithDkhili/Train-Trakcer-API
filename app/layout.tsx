import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './global.css'
import Link from 'next/link'
import { HomeIcon, TrainIcon, MapIcon, RouteIcon } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Train Tracker',
  description: 'Track trains, stations, and routes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <nav className="w-64 bg-white shadow-lg">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Train Tracker</h1>
            </div>
            <ul className="space-y-2 p-4">
              <li>
                <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <HomeIcon className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/trains" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <TrainIcon className="h-5 w-5" />
                  <span>Trains</span>
                </Link>
              </li>
              <li>
                <Link href="/stations" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <MapIcon className="h-5 w-5" />
                  <span>Stations</span>
                </Link>
              </li>
              <li>
                <Link href="/routes" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                  <RouteIcon className="h-5 w-5" />
                  <span>Routes</span>
                </Link>
              </li>
            </ul>
          </nav>
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}




