import * as React from "react"
import { cva, type VariantProps } from "@luna/core"
import { cn } from "@luna/core"
import styles from "./Accordion.module.css"

// ============================================
// Context for Accordion State Management
// ============================================

type AccordionContextValue = {
  value: string[]
  onValueChange: (value: string[]) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion")
  }
  return context
}

// ============================================
// Accordion Root Component
// ============================================

const accordionVariants = cva(styles.accordion, {
  variants: {
    variant: {
      default: styles.default,
      bordered: styles.bordered,
      ghost: styles.ghost,
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof accordionVariants> {
  /**
   * The type of accordion - single allows one item open, multiple allows many
   */
  type?: "single" | "multiple"
  
  /**
   * The controlled value(s) of the accordion
   */
  value?: string[]
  
  /**
   * The default value(s) when uncontrolled
   */
  defaultValue?: string[]
  
  /**
   * Callback when the accordion value changes
   */
  onValueChange?: (value: string[]) => void
  
  /**
   * Whether the accordion items should be collapsible when they are the only item open
   */
  collapsible?: boolean
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant,
      type = "single",
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      collapsible = true,
      children,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string[]>(defaultValue)
    
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = React.useCallback(
      (newValue: string[]) => {
        if (!isControlled) {
          setUncontrolledValue(newValue)
        }
        onValueChange?.(newValue)
      },
      [isControlled, onValueChange]
    )

    const contextValue = React.useMemo(
      () => ({
        value,
        onValueChange: handleValueChange,
        type,
      }),
      [value, handleValueChange, type]
    )

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(accordionVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = "LunaAccordion"

// ============================================
// Accordion Item Component
// ============================================

type AccordionItemContextValue = {
  value: string
  isOpen: boolean
  toggle: () => void
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null)

function useAccordionItem() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("AccordionItem components must be used within an AccordionItem")
  }
  return context
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Unique value for this accordion item
   */
  value: string
  
  /**
   * Whether this item is disabled
   */
  disabled?: boolean
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    const { value: openValues, onValueChange, type } = useAccordion()
    
    const isOpen = openValues.includes(value)

    const toggle = React.useCallback(() => {
      if (disabled) return

      if (type === "single") {
        // For single type, toggle or switch to new item
        const newValue = isOpen ? [] : [value]
        onValueChange(newValue)
      } else {
        // For multiple type, add or remove from array
        const newValue = isOpen
          ? openValues.filter((v) => v !== value)
          : [...openValues, value]
        onValueChange(newValue)
      }
    }, [disabled, isOpen, value, openValues, onValueChange, type])

    const contextValue = React.useMemo(
      () => ({
        value,
        isOpen,
        toggle,
      }),
      [value, isOpen, toggle]
    )

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(styles.item, { [styles.disabled]: disabled }, className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)

AccordionItem.displayName = "LunaAccordionItem"

// ============================================
// Accordion Trigger Component
// ============================================

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to show when closed (default: chevron)
   */
  icon?: React.ReactNode
  
  /**
   * Whether to hide the icon
   */
  hideIcon?: boolean
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, icon, hideIcon = false, children, ...props }, ref) => {
    const { isOpen, toggle } = useAccordionItem()

    return (
      <button
        ref={ref}
        type="button"
        className={cn(styles.trigger, className)}
        onClick={toggle}
        aria-expanded={isOpen}
        {...props}
      >
        <span className={styles.triggerText}>{children}</span>
        {!hideIcon && (
          <span
            className={cn(styles.icon, { [styles.iconOpen]: isOpen })}
            aria-hidden="true"
          >
            {icon || "›"}
          </span>
        )}
      </button>
    )
  }
)

AccordionTrigger.displayName = "LunaAccordionTrigger"

// ============================================
// Accordion Content Component
// ============================================

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to force mount the content (keeps it in DOM when closed)
   */
  forceMount?: boolean
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, forceMount = false, children, ...props }, ref) => {
    const { isOpen } = useAccordionItem()
    const contentRef = React.useRef<HTMLDivElement>(null)
    const [height, setHeight] = React.useState<number | undefined>(isOpen ? undefined : 0)

    React.useImperativeHandle(ref, () => contentRef.current!)

    // Animate height on open/close
    React.useEffect(() => {
      const content = contentRef.current
      if (!content) return

      if (isOpen) {
        // Opening: measure content height
        const contentHeight = content.scrollHeight
        setHeight(contentHeight)
        
        // After animation, set to auto for dynamic content
        const timer = setTimeout(() => {
          setHeight(undefined)
        }, 200)
        
        return () => clearTimeout(timer)
      } else {
        // Closing: set explicit height first, then animate to 0
        const contentHeight = content.scrollHeight
        setHeight(contentHeight)
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight(0)
          })
        })
      }
    }, [isOpen])

    // Don't render if closed and not force mounted
    if (!isOpen && !forceMount) {
      return null
    }

    return (
      <div
        ref={contentRef}
        className={cn(styles.content, className)}
        style={{ height: height !== undefined ? `${height}px` : undefined }}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    )
  }
)

AccordionContent.displayName = "LunaAccordionContent"

// ============================================
// Exports
// ============================================

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }