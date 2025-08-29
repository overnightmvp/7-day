'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, CardContent } from '@/components/ui'

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  message: string
  timestamp: Date
}

const SAMPLE_RESPONSES: Record<string, string> = {
  'team size': 'For teams of 8-12, I recommend our Blue Mountains Corporate Retreat or Sydney Harbour Charter. Both offer excellent team bonding opportunities. What type of experience are you looking for?',
  'budget': 'Most Australian companies spend between $150-$300 AUD per person for memorable team events. I can show you options across different price ranges. What\'s your approximate budget per person?',
  'location': 'We have premium venues across Sydney, Melbourne, Blue Mountains, Hunter Valley, and Barossa Valley. Where is your team based, and how far are you willing to travel?',
  'activities': 'Popular team activities include wine tastings, harbour cruises, mountain retreats, and city rooftop experiences. What kind of vibe are you going for - relaxed, adventurous, or professional?',
  'hello': 'G\'day! I\'m here to help you find the perfect team experience. What kind of event are you planning? I can suggest venues based on your team size, budget, and preferences.',
  'help': 'I can help you with:\n• Venue recommendations based on your needs\n• Budget planning for team events\n• Activity suggestions for different team types\n• Location advice across Australia\n\nWhat would you like to know?'
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: 'G\'day! I\'m your AI team event assistant. I can help you find the perfect Australian venue for your team. What are you looking for?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const [key, response] of Object.entries(SAMPLE_RESPONSES)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }
    
    // Default response
    return 'That\'s a great question! Our Australian venues offer diverse experiences from Sydney Harbour cruises to Blue Mountains retreats. Can you tell me more about your team size and preferred type of experience?'
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: getAIResponse(inputValue),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    'Team of 15 people',
    'Budget around $200 per person',
    'Sydney locations',
    'Wine tasting experiences'
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform hover:scale-105"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-neutral-200 z-50 flex flex-col max-h-[80vh] sm:max-h-none">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-sm">AI Event Assistant</div>
                <div className="text-xs text-blue-100">Online • Instant responses</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-100 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-neutral-100 text-neutral-900'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.message}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-neutral-100">
              <div className="text-xs text-neutral-500 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => setInputValue(question)}
                    className="text-xs bg-neutral-100 hover:bg-neutral-200 rounded-full px-2 sm:px-3 py-1 transition-colors truncate"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about team experiences..."
                className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="px-4"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}