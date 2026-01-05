# @luna/accordion

A Notion-inspired React accordion component with smooth animations and multiple variants.

## Installation
```bash
npm install @luna/accordion @luna/core
```

## Usage
```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@luna/accordion'
import '@luna/accordion/styles'
import '@luna/core/styles'

function App() {
  return (
    <Accordion type="single" defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with Notion-inspired styling out of the box.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## API Reference

### Accordion

The root container for accordion items.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'single'` | Whether one or multiple items can be open |
| `variant` | `'default' \| 'bordered' \| 'ghost'` | `'default'` | Visual style variant |
| `value` | `string[]` | - | Controlled open items |
| `defaultValue` | `string[]` | `[]` | Default open items (uncontrolled) |
| `onValueChange` | `(value: string[]) => void` | - | Callback when items open/close |
| `collapsible` | `boolean` | `true` | Whether items can be collapsed |

### AccordionItem

A single accordion item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | Required | Unique identifier for this item |
| `disabled` | `boolean` | `false` | Whether this item is disabled |

### AccordionTrigger

The clickable header that toggles the accordion item.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | `›` | Custom icon to display |
| `hideIcon` | `boolean` | `false` | Whether to hide the icon |

### AccordionContent

The collapsible content area.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `forceMount` | `boolean` | `false` | Keep content in DOM when closed |

## Examples

### Multiple Open Items
```tsx
<Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>First content</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>Second content</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Bordered Variant
```tsx
<Accordion variant="bordered">
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Custom Icons
```tsx
<AccordionItem value="item-1">
  <AccordionTrigger icon="▶">
    Custom Icon
  </AccordionTrigger>
  <AccordionContent>Content</AccordionContent>
</AccordionItem>
```

### Controlled
```tsx
const [value, setValue] = useState(['item-1'])

<Accordion value={value} onValueChange={setValue}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Accessibility

- Uses proper ARIA attributes (`aria-expanded`)
- Keyboard navigation support
- Focus management
- Semantic HTML structure

## License

MIT