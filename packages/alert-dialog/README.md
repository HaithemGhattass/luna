# @luna/alert-dialog

A Notion-inspired React alert dialog component with overlay, animations, and full accessibility.

## Installation
```bash
npm install @luna/alert-dialog @luna/button @luna/core
```

## Usage
```tsx
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

function App() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
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
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## API Reference

### AlertDialog

The root component.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | - | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Default open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | - | Callback when open state changes |

### AlertDialogContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closeOnClickOutside` | `boolean` | `false` | Close when clicking outside |
| `closeOnEscape` | `boolean` | `true` | Close when pressing Escape |

## Features

- ✅ Fully accessible with ARIA attributes
- ✅ Focus trap and management
- ✅ Keyboard navigation (Escape to close)
- ✅ Smooth animations
- ✅ Portal rendering
- ✅ Body scroll lock
- ✅ Responsive design
- ✅ Notion-inspired styling

## License

MIT