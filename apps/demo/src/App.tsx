import { useState } from 'react'
import { Button } from '@luna/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@luna/accordion'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@luna/alert-dialog'
import '@luna/button/styles'
import '@luna/accordion/styles'
import '@luna/alert-dialog/styles'
import './App.css'

type Tab = 'docs' | 'components' | 'blocks' | 'charts' | 'directory'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('components')
  const [searchQuery, setSearchQuery] = useState('')

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="app">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-content">
            {/* Logo */}
            <div className="navbar-left">
              <a href="/" className="logo">
                <span className="logo-icon">🌙</span>
                <span className="logo-text">Luna UI</span>
              </a>

              {/* Navigation Tabs */}
              <div className="nav-tabs">
                <button
                  className={`nav-tab ${activeTab === 'docs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('docs')}
                >
                  Docs
                </button>
                <button
                  className={`nav-tab ${activeTab === 'components' ? 'active' : ''}`}
                  onClick={() => setActiveTab('components')}
                >
                  Components
                </button>
                <button
                  className={`nav-tab ${activeTab === 'blocks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('blocks')}
                >
                  Blocks
                </button>
                <button
                  className={`nav-tab ${activeTab === 'charts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('charts')}
                >
                  Charts
                </button>
                <button
                  className={`nav-tab ${activeTab === 'directory' ? 'active' : ''}`}
                  onClick={() => setActiveTab('directory')}
                >
                  Directory
                </button>
              </div>
            </div>

            {/* Right Side: Search & Theme Toggle */}
            <div className="navbar-right">
              {/* Search Bar */}
              <div className="search-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <kbd className="search-kbd">⌘K</kbd>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? '☀️' : '🌙'}
              </Button>

              {/* GitHub Link */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                onClick={() => window.open('https://github.com/yourusername/luna-ui', '_blank')}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ display: 'block' }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main">
          {activeTab === 'docs' && <DocsContent />}
          {activeTab === 'components' && <ComponentsContent searchQuery={searchQuery} />}
          {activeTab === 'blocks' && <BlocksContent />}
          {activeTab === 'charts' && <ChartsContent />}
          {activeTab === 'directory' && <DirectoryContent />}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <p className="footer-text">
              Built with Luna UI • A React component library
            </p>
            <div className="footer-links">
              <a href="#" className="footer-link">Twitter</a>
              <span className="footer-separator">•</span>
              <a href="#" className="footer-link">GitHub</a>
              <span className="footer-separator">•</span>
              <a href="#" className="footer-link">Discord</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ============================================
// Tab Content Components
// ============================================

function DocsContent() {
  return (
    <div className="content-container">
      <div className="hero">
        <h1 className="hero-title">Documentation</h1>
        <p className="hero-description">
          Everything you need to know about using Luna UI in your projects.
        </p>
      </div>

      <section className="section">
        <h2 className="section-title">Getting Started</h2>
        <div className="prose">
          <h3>Installation</h3>
          <pre className="code-block">
            <code>npm install @luna/button @luna/accordion @luna/alert-dialog</code>
          </pre>

          <h3>Usage</h3>
          <p>Import the components you need and their styles:</p>
          <pre className="code-block">
            <code>{`import { Button } from '@luna/button'
import '@luna/button/styles'`}</code>
          </pre>

          <h3>Theming</h3>
          <p>Luna uses CSS variables for theming. Customize colors by overriding variables:</p>
          <pre className="code-block">
            <code>{`:root {
  --luna-blue: #0b6bcb;
  --luna-text-primary: #191919;
}`}</code>
          </pre>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Design Principles</h2>
        <div className="grid">
          <div className="card">
            <div className="card-icon">🎨</div>
            <h3 className="card-title">Minimalistic</h3>
            <p className="card-description">
              Clean, minimal design with warm grays and subtle interactions.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">♿</div>
            <h3 className="card-title">Accessible</h3>
            <p className="card-description">
              Built with accessibility in mind, following WAI-ARIA patterns.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Performant</h3>
            <p className="card-description">
              Optimized for speed with CSS Modules and efficient React patterns.
            </p>
          </div>
          <div className="card">
            <div className="card-icon">🎯</div>
            <h3 className="card-title">TypeScript First</h3>
            <p className="card-description">
              Full type safety with comprehensive TypeScript definitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ComponentsContent({ searchQuery }: { searchQuery: string }) {
  const [count, setCount] = useState(0)

  const filteredComponents = [
    { name: 'Button', visible: 'button'.includes(searchQuery.toLowerCase()) },
    { name: 'Accordion', visible: 'accordion'.includes(searchQuery.toLowerCase()) },
    { name: 'Alert Dialog', visible: 'alert dialog'.includes(searchQuery.toLowerCase()) },
  ]

  const showAll = searchQuery === '' || filteredComponents.some(c => c.visible)

  return (
    <div className="content-container">
      <div className="hero">
        <h1 className="hero-title">Components</h1>
        <p className="hero-description">
          Beautiful, accessible components built with React and CSS Modules.
        </p>
      </div>

      {/* Button Component */}
      {(showAll || filteredComponents[0].visible) && (
        <section className="section">
          <div className="section-header-row">
            <h2 className="section-title">Button</h2>
            <span className="badge">Stable</span>
          </div>
          <p className="section-description">
            Clickable button component with multiple variants and sizes.
          </p>

          <div className="demo-group">
            <h3 className="demo-subtitle">Variants</h3>
            <div className="button-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">Sizes</h3>
            <div className="button-row">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">⚙️</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">With Icons</h3>
            <div className="button-row">
              <Button variant="primary" leftIcon="✨">New Page</Button>
              <Button variant="subtle" leftIcon="📝">Edit</Button>
              <Button variant="subtle" rightIcon="→">Next</Button>
              <Button variant="outline" leftIcon="↗">Open</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">Interactive Example</h3>
            <div className="counter">
              <Button variant="outline" size="sm" onClick={() => setCount(count - 1)}>−</Button>
              <span className="count">{count}</span>
              <Button variant="outline" size="sm" onClick={() => setCount(count + 1)}>+</Button>
              <Button variant="ghost" size="sm" onClick={() => setCount(0)}>Reset</Button>
            </div>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">States</h3>
            <div className="button-row">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button isLoading>Loading...</Button>
            </div>
          </div>
        </section>
      )}

      {/* Accordion Component */}
      {(showAll || filteredComponents[1].visible) && (
        <section className="section">
          <div className="section-header-row">
            <h2 className="section-title">Accordion</h2>
            <span className="badge">Stable</span>
          </div>
          <p className="section-description">
            Collapsible content sections with smooth animations.
          </p>

          <div className="demo-group">
            <h3 className="demo-subtitle">Single Open</h3>
            <Accordion type="single" defaultValue={['item-1']}>
              <AccordionItem value="item-1">
                <AccordionTrigger>What is Luna UI?</AccordionTrigger>
                <AccordionContent>
                  Luna UI is a minimalistic React component library built with TypeScript, CSS Modules, and modern best practices.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes! It follows WAI-ARIA design patterns and includes proper keyboard navigation, focus management, and semantic HTML.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize it?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! You can customize colors through CSS variables, add custom classNames, and modify the source code.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">Multiple Open</h3>
            <Accordion type="multiple" defaultValue={['faq-1', 'faq-2']}>
              <AccordionItem value="faq-1">
                <AccordionTrigger>🎨 Design Philosophy</AccordionTrigger>
                <AccordionContent>
                  Luna follows a minimalistic aesthetic with warm grays, subtle shadows, and thoughtful spacing.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>⚡ Performance</AccordionTrigger>
                <AccordionContent>
                  Built with performance in mind using CSS Modules for scoped styles and efficient React patterns.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>📦 Bundle Size</AccordionTrigger>
                <AccordionContent>
                  Each component is independently packaged, so you only import what you need.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="demo-group">
            <h3 className="demo-subtitle">Variants</h3>
            <div className="variant-grid">
              <div>
                <h4 className="variant-title">Default</h4>
                <Accordion variant="default" type="single">
                  <AccordionItem value="1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Subtle dividers between items.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>Clean and minimal.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <h4 className="variant-title">Bordered</h4>
                <Accordion variant="bordered" type="single">
                  <AccordionItem value="1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>Card-style with borders.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>Great for FAQs.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div>
                <h4 className="variant-title">Ghost</h4>
                <Accordion variant="ghost" type="single">
                  <AccordionItem value="1">
                    <AccordionTrigger>Item 1</AccordionTrigger>
                    <AccordionContent>No borders, ultra minimal.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2">
                    <AccordionTrigger>Item 2</AccordionTrigger>
                    <AccordionContent>Perfect for sidebars.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Alert Dialog Component */}
      {(showAll || filteredComponents[2].visible) && (
        <section className="section">
          <div className="section-header-row">
            <h2 className="section-title">Alert Dialog</h2>
            <span className="badge">Stable</span>
          </div>
          <p className="section-description">
            Modal dialog for important confirmations and alerts.
          </p>

          <div className="demo-group">
            <h3 className="demo-subtitle">Examples</h3>
            <div className="button-row">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete Account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete Account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="primary">Save Changes</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save your changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. Do you want to save them before leaving?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Don't Save</AlertDialogCancel>
                    <AlertDialogAction variant="primary">Save Changes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">View Terms</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Terms of Service</AlertDialogTitle>
                    <AlertDialogDescription>
                      By using Luna UI, you agree to our terms of service. This is a demo component library for educational purposes.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction variant="primary">I Agree</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </section>
      )}

      {searchQuery && !filteredComponents.some(c => c.visible) && (
        <div className="empty-state">
          <p className="empty-state-text">No components found for "{searchQuery}"</p>
        </div>
      )}
    </div>
  )
}

function BlocksContent() {
  return (
    <div className="content-container">
      <div className="hero">
        <h1 className="hero-title">Blocks</h1>
        <p className="hero-description">
          Pre-built component combinations for common UI patterns.
        </p>
      </div>

      <section className="section">
        <h2 className="section-title">Coming Soon</h2>
        <p className="section-description">
          Blocks are pre-composed components like login forms, pricing cards, and feature sections.
        </p>
      </section>
    </div>
  )
}

function ChartsContent() {
  return (
    <div className="content-container">
      <div className="hero">
        <h1 className="hero-title">Charts</h1>
        <p className="hero-description">
          Data visualization components for displaying metrics and analytics.
        </p>
      </div>

      <section className="section">
        <h2 className="section-title">Coming Soon</h2>
        <p className="section-description">
          Chart components including line charts, bar charts, and more.
        </p>
      </section>
    </div>
  )
}

function DirectoryContent() {
  return (
    <div className="content-container">
      <div className="hero">
        <h1 className="hero-title">Directory</h1>
        <p className="hero-description">
          Browse all available components and utilities in one place.
        </p>
      </div>

      <section className="section">
        <h2 className="section-title">All Components</h2>
        <div className="directory-grid">
          <a href="#" className="directory-card">
            <h3 className="directory-card-title">Button</h3>
            <p className="directory-card-description">Clickable button component</p>
            <span className="directory-card-tag">Interactive</span>
          </a>
          <a href="#" className="directory-card">
            <h3 className="directory-card-title">Accordion</h3>
            <p className="directory-card-description">Collapsible content sections</p>
            <span className="directory-card-tag">Layout</span>
          </a>
          <a href="#" className="directory-card">
            <h3 className="directory-card-title">Alert Dialog</h3>
            <p className="directory-card-description">Modal confirmation dialogs</p>
            <span className="directory-card-tag">Overlay</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default App