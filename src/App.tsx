import { useState } from "react"
import { Button } from "./components/ui"
import "./App.css"

function App() {
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">🌙</span>
              <h1 className="logo-text">Luna UI</h1>
            </div>
            <p className="tagline">A React component library</p>
          </div>
          <Button
            variant="subtle"
            size='sm'
            onClick={toggleTheme}
            leftIcon={isDark ? "☀️" : "🌙"}
          >
            {isDark ? "Light" : "Dark"}
          </Button>
        </header>

        <main className="main">
          {/* Variants Section */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Button Variants</h2>
              <p className="section-description">
                Luna offers multiple button styles to suit different use cases
              </p>
            </div>
            <div className="button-grid">
              <div className="demo-group">
                <span className="demo-label">Primary</span>
                <Button variant="primary">Create new</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Secondary</span>
                <Button variant="secondary">Save draft</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Subtle (default)</span>
                <Button variant="subtle">Edit page</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Ghost</span>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Outline</span>
                <Button variant="outline">Share</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Destructive</span>
                <Button variant="destructive">Delete</Button>
              </div>
              <div className="demo-group">
                <span className="demo-label">Link</span>
                <Button variant="link">Learn more</Button>
              </div>
            </div>
          </section>

          {/* Sizes Section */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Button Sizes</h2>
              <p className="section-description">
                From compact to comfortable spacing
              </p>
            </div>
            <div className="button-row">
              <Button variant="subtle" size="xs">
                Extra Small
              </Button>
              <Button variant="subtle" size="sm">
                Small
              </Button>
              <Button variant="subtle" size="md">
                Medium
              </Button>
              <Button variant="subtle" size="lg">
                Large
              </Button>
            </div>
          </section>

          {/* Icons Section */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Buttons with Icons</h2>
              <p className="section-description">
                Icons can be placed before or after text
              </p>
            </div>
            <div className="button-row">
              <Button variant="primary" leftIcon="✨">
                New Page
              </Button>
              <Button variant="subtle" leftIcon="📝">
                Edit
              </Button>
              <Button variant="subtle" leftIcon="💬">
                Comment
              </Button>
              <Button variant="subtle" rightIcon="→">
                Next
              </Button>
              <Button variant="outline" leftIcon="↗">
                Open
              </Button>
              <Button variant="subtle" size="icon">
                ⋮
              </Button>
            </div>
          </section>

          {/* States Section */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Button States</h2>
              <p className="section-description">
                Loading and disabled states
              </p>
            </div>
            <div className="button-row">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button
                variant="primary"
                isLoading={isLoading}
                onClick={handleLoadingDemo}
              >
                {isLoading ? "Loading..." : "Click to load"}
              </Button>
            </div>
          </section>

          {/* Real-world Examples */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Real-world Examples</h2>
              <p className="section-description">
                Common button patterns 
              </p>
            </div>

            {/* Toolbar Example */}
            <div className="example-container">
              <h3 className="example-title">Toolbar</h3>
              <div className="toolbar">
                <Button variant="subtle" size="sm" leftIcon="✏️">
                  Edit
                </Button>
                <Button variant="subtle" size="sm" leftIcon="💬">
                  Comment
                </Button>
                <Button variant="subtle" size="sm" leftIcon="👁">
                  View
                </Button>
                <div className="toolbar-divider" />
                <Button variant="subtle" size="sm" leftIcon="⋯">
                  More
                </Button>
              </div>
            </div>

            {/* Modal Footer Example */}
            <div className="example-container">
              <h3 className="example-title">Modal Footer</h3>
              <div className="modal-footer">
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </div>
            </div>

            {/* Form Example */}
            <div className="example-container">
              <h3 className="example-title">Form Actions</h3>
              <div className="form-actions">
                <Button variant="subtle" fullWidth>
                  Save as draft
                </Button>
                <Button variant="primary" fullWidth>
                  Publish
                </Button>
              </div>
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Interactive Demo</h2>
              <p className="section-description">
                Try clicking these buttons
              </p>
            </div>
            <div className="button-row">
              <Button
                variant="primary"
                leftIcon="✨"
                onClick={() => alert("Creating new page...")}
              >
                New Page
              </Button>
              <Button
                variant="subtle"
                leftIcon="📤"
                onClick={() => alert("Sharing...")}
          >
            Share
          </Button>
          <Button
            variant="destructive"
            leftIcon="🗑"
            onClick={() =>
              confirm("Are you sure you want to delete this?") &&
              alert("Deleted!")
            }
          >
            Delete
          </Button>
        </div>
      </section>
    </main>
    {/* Footer */}
    <footer className="footer">
      <p className="footer-text">
        Built with Luna UI ❤️
      </p>
    </footer>
  </div>
</div>
  )
}
export default App