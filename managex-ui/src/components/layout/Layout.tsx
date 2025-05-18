import React from "react"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { AIAgentChat } from "../../features/ai_agent/AIAgentChat"

interface LayoutProps {
  children: React.ReactNode
  title?: string // Add an optional title prop
}
export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isChatOpen, setIsChatOpen] = React.useState(false)
  const [chatWidth, setChatWidth] = React.useState(400)

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar />
        <div className="flex-1 flex flex-row">
          <div className="flex-1 flex flex-col overflow-hidden">
            {title && (
              <div className="sticky bg-gray-300 shadow-md p-4 flex items-center h-16">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              </div>
            )}
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
          <AIAgentChat
            isOpen={isChatOpen}
            setIsOpen={setIsChatOpen}
            width={chatWidth}
            setWidth={setChatWidth}
          />
        </div>
      </div>
    </div>
  )
}
