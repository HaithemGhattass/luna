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

import '@luna/alert-dialog/styles'

import '@luna/button/styles'
import '@luna/accordion/styles'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [count, setCount] = useState(0)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <h1 className="logo">
              <span className="logo-icon">🌙</span>
              Luna UI Demo
            </h1>
            <p className="tagline">Testing Button and Accordion components</p>
          </div>
          <Button
            variant="subtle"
            size="sm"
            onClick={toggleTheme}
            leftIcon={isDark ? '☀️' : '🌙'}
          >
            {isDark ? 'Light' : 'Dark'} Mode
          </Button>
        </header>

        <main className="main">
          {/* Button Section */}
          <section className="section">
            <h2 className="section-title">Button Component</h2>
            
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
                <Button variant="primary" leftIcon="✨">
                  New Page
                </Button>
                <Button variant="subtle" leftIcon="📝">
                  Edit
                </Button>
                <Button variant="subtle" rightIcon="→">
                  Next
                </Button>
                <Button variant="outline" leftIcon="↗">
                  Open
                </Button>
              </div>
            </div>

            <div className="demo-group">
              <h3 className="demo-subtitle">Interactive Counter</h3>
              <div className="counter">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCount(count - 1)}
                >
                  −
                </Button>
                <span className="count">{count}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCount(0)}
                >
                  Reset
                </Button>
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

          {/* Accordion Section */}
          <section className="section">
            <h2 className="section-title">Accordion Component</h2>

            <div className="demo-group">
              <h3 className="demo-subtitle">Single Open (Default)</h3>
              <Accordion type="single" defaultValue={['item-1']}>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Luna UI?</AccordionTrigger>
                  <AccordionContent>
                    Luna UI is a Notion-inspired React component library built
                    with TypeScript, CSS Modules, and modern best practices.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes! It follows WAI-ARIA design patterns and includes proper
                    keyboard navigation, focus management, and semantic HTML.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I customize it?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! You can customize colors through CSS variables,
                    add custom classNames, and even modify the source code
                    directly since you own the components.
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
                    Luna follows Notion's clean, minimal aesthetic with warm
                    grays, subtle shadows, and thoughtful spacing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2">
                  <AccordionTrigger>⚡ Performance</AccordionTrigger>
                  <AccordionContent>
                    Built with performance in mind using CSS Modules for scoped
                    styles and efficient React patterns.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3">
                  <AccordionTrigger>📦 Bundle Size</AccordionTrigger>
                  <AccordionContent>
                    Each component is independently packaged, so you only import
                    what you need. No bloated dependencies.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="demo-group">
              <h3 className="demo-subtitle">Bordered Variant</h3>
              <Accordion variant="bordered" type="single">
                <AccordionItem value="card-1">
                  <AccordionTrigger>Card-style Appearance</AccordionTrigger>
                  <AccordionContent>
                    The bordered variant creates a card-like appearance with
                    visible borders around each item.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="card-2">
                  <AccordionTrigger>Perfect for FAQs</AccordionTrigger>
                  <AccordionContent>
                    This style works great for FAQ sections, settings panels, or
                    any content that benefits from clear visual separation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="demo-group">
              <h3 className="demo-subtitle">Ghost Variant</h3>
              <Accordion variant="ghost" type="single">
                <AccordionItem value="ghost-1">
                  <AccordionTrigger>Minimal Styling</AccordionTrigger>
                  <AccordionContent>
                    The ghost variant has no borders for an ultra-clean look.
                    Great for sidebars and navigation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="ghost-2">
                  <AccordionTrigger>Flexible Usage</AccordionTrigger>
                  <AccordionContent>
                    Use this when you want the accordion functionality without
                    heavy visual styling.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          {/* Combined Example */}
          <section className="section">
            <h2 className="section-title">Combined Example</h2>
            <div className="card">
              <h3 className="card-title">Settings Panel</h3>
              <Accordion variant="ghost" type="multiple">
                <AccordionItem value="general">
                  <AccordionTrigger>⚙️ General Settings</AccordionTrigger>
                  <AccordionContent>
                    <div className="settings-content">
                      <Button variant="subtle" fullWidth>
                        Change Username
                      </Button>
                      <Button variant="subtle" fullWidth>
                        Update Email
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="security">
                  <AccordionTrigger>🔒 Security</AccordionTrigger>
                  <AccordionContent>
                    <div className="settings-content">
                      <Button variant="subtle" fullWidth>
                        Change Password
                      </Button>
                      <Button variant="subtle" fullWidth>
                        Enable 2FA
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="danger">
                  <AccordionTrigger>⚠️ Danger Zone</AccordionTrigger>
                  <AccordionContent>
                    <div className="settings-content">
                      <Button variant="destructive" fullWidth>
                        Delete Account
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
          <section className="section">
  <h2 className="section-title">Alert Dialog Component</h2>

  <div className="demo-group">
    <h3 className="demo-subtitle">Destructive Action</h3>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">
            Delete Account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>

  <div className="demo-group">
    <h3 className="demo-subtitle">Confirmation Dialog</h3>
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
  </div>

  <div className="demo-group">
    <h3 className="demo-subtitle">Info Dialog</h3>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">View Terms</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Terms of Service</AlertDialogTitle>
          <AlertDialogDescription>
            By using Luna UI, you agree to our terms of service. This is a
            demo component library for educational purposes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction variant="primary">I Agree</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</section>

        </main>

        {/* Footer */}
        <footer className="footer">
          <p>Built with Luna UI • A Notion-inspired component library</p>
        </footer>
      </div>
    </div>
  )
}

export default App