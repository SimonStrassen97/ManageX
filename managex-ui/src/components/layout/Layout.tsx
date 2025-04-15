import React from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

interface LayoutProps {
  children: React.ReactNode
  title?: string // Add an optional title prop
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {title && (
            <div className="sticky bg-gray-300 shadow-md top-4 p-4">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
          )}
          <main className="bg-white py-4">{children}</main>
        </div>
      </div>
    </div>
  )
}
