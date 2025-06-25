import { useState, useRef, useEffect } from 'react'
type FormEvent = React.FormEvent<HTMLFormElement>;
import './App.css'

const aboutImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
]

function GlassChat() {
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([])
  const [input, setInput] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [botTyping, setBotTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages or typing changes
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, botTyping])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    setBotTyping(true)
    setExpanded(true)
    const userInput = input
    setInput('')
    setTimeout(() => {
      setBotTyping(false)
      setMessages(prev => [...prev, { role: 'bot', text: userInput }])
    }, 1000)
  }

  return (
    <div className={`glass-chatbox${expanded ? ' expanded' : ''}`}>  
      <div className="glass-bar-chart">
        <div className="bar bar1" />
        <div className="bar bar2" />
        <div className="bar bar3" />
        <div className="bar bar4" />
      </div>
      <div className="glass-chat-messages" style={{flex: 1, minHeight: 0, overflowY: 'auto'}}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`glass-chat-msg ${msg.role === 'user' ? 'user' : 'bot'}`}
          >
            {msg.text}
          </div>
        ))}
        {botTyping && (
          <div className="glass-chat-msg bot typing">
            <span className="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="glass-chat-form" onSubmit={handleSubmit} style={{marginTop: 'auto'}}>
        <label className="glass-chat-label">How may I help you?</label>
        <div className="glass-chat-input-row">
          <input
            ref={inputRef}
            className="glass-chat-input"
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setExpanded(true)}
            autoComplete="off"
          />
          <button className="glass-chat-send" type="submit" aria-label="Send">→</button>
        </div>
      </form>
    </div>
  )
}

function AboutSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="glass-about-section">
      <button className="glass-about-back" onClick={onBack}>← Home</button>
      <h2 className="glass-about-title">About This Project</h2>
      <p className="glass-about-desc">
        This is a modern React + Vite + TypeScript template inspired by glassmorphism. The design features gradients, soft shadows, and beautiful glass effects. Easily edit this section to add your own about content, team, or project details.
      </p>
      <div className="glass-about-gallery">
        {aboutImages.map((src, i) => (
          <div className="glass-about-img-wrap" key={i}>
            <img src={src} alt={`Demo ${i+1}`} className="glass-about-img" />
          </div>
        ))}
      </div>
      <div className="glass-about-details">
        <h3>What can you put here?</h3>
        <ul>
          <li>Project description and mission</li>
          <li>Team members and roles</li>
          <li>Demo images or screenshots</li>
          <li>Contact information or links</li>
          <li>Anything you want—just edit this section!</li>
        </ul>
      </div>
    </div>
  )
}

function App() {
  const [page, setPage] = useState<'home' | 'about'>('home')
  return (
    <div className="glass-bg">
      <nav className="glass-nav">
        <span className="logo-text">Glass UI</span>
        <ul>
          <li><a href="#" onClick={e => {e.preventDefault(); setPage('home')}} className={page==='home' ? 'active' : ''}>Home</a></li>
          <li><a href="#" onClick={e => {e.preventDefault(); setPage('about')}} className={page==='about' ? 'active' : ''}>About</a></li>
        </ul>
      </nav>
      <main className="glass-hero" style={{paddingTop: 0, transition: 'all 0.5s cubic-bezier(.4,2,.6,1)'}}>
        {page === 'home' ? <GlassChat /> : <AboutSection onBack={() => setPage('home')} />}
      </main>
      <footer className="glass-footer">
        © 2025 Glass UI Demo. Inspired by glassmorphism.
      </footer>
    </div>
  )
}

export default App
