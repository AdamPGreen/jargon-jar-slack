import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="app-container">
      <header className="app-header">
        <nav className="main-nav">
          <div className="logo">
            <Link to="/">Jargon Jar</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Jargon Jar</p>
      </footer>
    </div>
  )
}

export default AppLayout 