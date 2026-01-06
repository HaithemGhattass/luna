import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@luna/core"
import { Button } from "@luna/button"
import type { ButtonProps } from "@luna/button"
import styles from "./AlertDialog.module.css"

// ============================================
// Portal Component for rendering outside DOM
// ============================================

interface PortalProps {
  children: React.ReactNode
  container?: Element | DocumentFragment
}

function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return null

  const target = container || document.body

  return createPortal(children, target)
}

// ============================================
// Alert Dialog Context
// ============================================

type AlertDialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext)
  if (!context) {
    throw new Error("AlertDialog components must be used within AlertDialog")
  }
  return context
}

// ============================================
// Alert Dialog Root Component
// ============================================

export interface AlertDialogProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean
  
  /**
   * Default open state (uncontrolled)
   */
  defaultOpen?: boolean
  
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void
  
  /**
   * The dialog content
   */
  children: React.ReactNode
}

export function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: AlertDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen)
      }
      onOpenChange?.(newOpen)
    },
    [isControlled, onOpenChange]
  )

  const contextValue = React.useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
    }),
    [open, handleOpenChange]
  )

  return (
    <AlertDialogContext.Provider value={contextValue}>
      {children}
    </AlertDialogContext.Provider>
  )
}

// ============================================
// Alert Dialog Trigger
// ============================================

export interface AlertDialogTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(({ className, onClick, children, asChild, ...props }, ref) => {
  const { onOpenChange } = useAlertDialog()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onOpenChange(true)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    } as any)
  }

  return (
    <button
      ref={ref}
      className={cn(styles.trigger, className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
})

AlertDialogTrigger.displayName = "AlertDialogTrigger"

// ============================================
// Alert Dialog Portal
// ============================================

export interface AlertDialogPortalProps {
  children: React.ReactNode
  container?: Element | DocumentFragment
}

export function AlertDialogPortal({ children, container }: AlertDialogPortalProps) {
  return <Portal container={container}>{children}</Portal>
}

// ============================================
// Alert Dialog Overlay
// ============================================

export interface AlertDialogOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogOverlay = React.forwardRef<HTMLDivElement, AlertDialogOverlayProps>(({ className, ...props }, ref) => {
  const { open, onOpenChange } = useAlertDialog()

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(styles.overlay, className)}
      onClick={() => onOpenChange(false)}
      {...props}
    />
  )
})

AlertDialogOverlay.displayName = "AlertDialogOverlay"

// ============================================
// Alert Dialog Content
// ============================================

export interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether clicking outside should close the dialog
   */
  closeOnClickOutside?: boolean
  
  /**
   * Whether pressing Escape should close the dialog
   */
  closeOnEscape?: boolean
}

export const AlertDialogContent = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(
  (
    {
      className,
      closeOnClickOutside = false,
      closeOnEscape = true,
      children,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useAlertDialog()
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => contentRef.current!)

    // Handle Escape key
    React.useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false)
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }, [open, closeOnEscape, onOpenChange])

    // Focus trap and body scroll lock
    React.useEffect(() => {
      if (!open) return

      // Lock body scroll
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"

      // Focus first focusable element
      const content = contentRef.current
      if (content) {
        const focusable = content.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.focus()
      }

      return () => {
        document.body.style.overflow = originalOverflow
      }
    }, [open])

    if (!open) return null

    return (
      <AlertDialogPortal>
        <div className={styles.container}>
          <AlertDialogOverlay />
          <div
            ref={contentRef}
            className={cn(styles.content, className)}
            role="alertdialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </AlertDialogPortal>
    )
  }
)

AlertDialogContent.displayName = "AlertDialogContent"

// ============================================
// Alert Dialog Header
// ============================================

export interface AlertDialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogHeader = React.forwardRef<HTMLDivElement, AlertDialogHeaderProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.header, className)} {...props} />
))

AlertDialogHeader.displayName = "AlertDialogHeader"

// ============================================
// Alert Dialog Title
// ============================================

export interface AlertDialogTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const AlertDialogTitle = React.forwardRef<HTMLHeadingElement, AlertDialogTitleProps>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn(styles.title, className)} {...props} />
))

AlertDialogTitle.displayName = "AlertDialogTitle"

// ============================================
// Alert Dialog Description
// ============================================

export interface AlertDialogDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDialogDescription = React.forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn(styles.description, className)} {...props} />
))

AlertDialogDescription.displayName = "AlertDialogDescription"

// ============================================
// Alert Dialog Footer
// ============================================

export interface AlertDialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertDialogFooter = React.forwardRef<HTMLDivElement, AlertDialogFooterProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(styles.footer, className)} {...props} />
))

AlertDialogFooter.displayName = "AlertDialogFooter"

// ============================================
// Alert Dialog Action
// ============================================

export interface AlertDialogActionProps extends ButtonProps {}

export const AlertDialogAction = React.forwardRef<HTMLButtonElement, AlertDialogActionProps>(({ className, onClick, ...props }, ref) => {
  const { onOpenChange } = useAlertDialog()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onOpenChange(false)
  }

  return (
    <Button
      ref={ref}
      className={className}
      onClick={handleClick}
      {...props}
    />
  )
})

AlertDialogAction.displayName = "AlertDialogAction"

// ============================================
// Alert Dialog Cancel
// ============================================

export interface AlertDialogCancelProps extends ButtonProps {}

export const AlertDialogCancel = React.forwardRef<HTMLButtonElement, AlertDialogCancelProps>(({ className, onClick, variant = "ghost", ...props }, ref) => {
  const { onOpenChange } = useAlertDialog()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onOpenChange(false)
  }

  return (
    <Button
      ref={ref}
      variant={variant}
      className={className}
      onClick={handleClick}
      {...props}
    />
  )
})

AlertDialogCancel.displayName = "AlertDialogCancel"