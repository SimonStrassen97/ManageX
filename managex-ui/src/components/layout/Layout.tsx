import React from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="pt-24 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </>
  )
}
