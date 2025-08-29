# Card Component

Flexible container for grouping content with consistent styling.

## Import

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui'
```

## Basic Structure

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Optional description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Variants

- `default` - Standard card with subtle border
- `outlined` - Emphasized border
- `elevated` - Enhanced shadow for prominence
- `interactive` - Hover effects, clickable

## Padding Options

- `none` - No padding, full control
- `sm` - 16px padding, compact
- `base` (default) - 24px padding, standard
- `lg` - 32px padding, spacious

## Simple Examples

```tsx
// Minimal card
<Card>
  <CardContent>Simple content</CardContent>
</Card>

// Interactive card
<Card variant="interactive">
  <CardHeader>
    <CardTitle>Clickable Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Click anywhere on this card</p>
  </CardContent>
</Card>

// Elevated card for emphasis
<Card variant="elevated" padding="lg">
  <CardContent>Important content</CardContent>
</Card>
```