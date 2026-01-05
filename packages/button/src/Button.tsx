import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@luna/core"
import styles from "./Button.module.css"

const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      subtle: styles.subtle,
      ghost: styles.ghost,
      outline: styles.outline,
      destructive: styles.destructive,
      link: styles.link,
    },
    size: {
      xs: styles.xs,
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
      icon: styles.icon,
    },
  },
  defaultVariants: {
    variant: "subtle",
    size: "md",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * If true, the button will show a loading spinner and be disabled
   */
  isLoading?: boolean
  
  /**
   * If true, the button will take up the full width of its container
   */
  fullWidth?: boolean
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: React.ReactNode
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: React.ReactNode
  
  /**
   * If true, renders as a child component (for custom elements)
   */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          {
            [styles.loading]: isLoading,
            [styles.fullWidth]: fullWidth,
          },
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        {!isLoading && leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = "LunaButton"

export { Button, buttonVariants }