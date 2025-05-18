import React, { useRef, useState } from "react"
import { Bot, X } from "lucide-react"
import { Button } from "../../components"

interface AIAgentChatProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  width: number
  setWidth: (width: number) => void
}

export const AIAgentChat: React.FC<AIAgentChatProps> = ({
  isOpen,
  setIsOpen,
  width,
  setWidth,
}) => {
  const [dragging, setDragging] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Handle drag events for resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    e.preventDefault()
  }
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newWidth = window.innerWidth - e.clientX
        setWidth(Math.max(280, Math.min(newWidth, 600)))
      }
    }
    const handleMouseUp = () => setDragging(false)
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [dragging])

  return (
    <>
      {!isOpen && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center"
          onClick={() => setIsOpen(true)}
        >
          <Bot className="h-6 w-6 mr-2" />
          <span className="font-semibold">Ask Me</span>
        </button>
      )}
      {isOpen && (
        <div>
          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="right-0 h-full border-l bg-white shadow-2xl flex flex-col"
            style={{ width: width }}
          >
            <div className="flex items-center justify-between bg-blue-600 p-4 h-16">
              <span className="text-white text-xl font-bold flex items-center gap-2">
                <Bot className="h-5 w-5" /> AI Agent
              </span>
              <Button
                label=""
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <X />
              </Button>
            </div>
            {/* Chat content goes here */}
            <div className="flex-1 p-4 border border-l-blue-300 overflow-y-auto">
              {/* ...chat UI... */}
              <div className="text-gray-500">Chat with your AI agent here.</div>
            </div>
          </div>
          {/* Drag handle */}
          <div
            className="fixed top-0 h-full cursor-ew-resize"
            style={{
              right: width - 3,
              width: 6,
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </>
  )
}
