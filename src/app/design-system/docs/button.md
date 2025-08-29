# Button Component

Simple, accessible button with variants and states.

## Import

```tsx
import { Button } from '@/components/ui'
```

## Basic Usage

```tsx
<Button>Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button size="lg">Large Button</Button>
```

## Variants

- `primary` (default) - Blue, main actions
- `secondary` - Gray, secondary actions  
- `outline` - Bordered, subtle actions
- `ghost` - Minimal, low-priority actions
- `danger` - Red, destructive actions
- `success` - Green, positive actions

## Sizes

- `xs` - 28px height, compact spaces
- `sm` - 32px height, tight layouts
- `base` (default) - 40px height, standard
- `lg` - 44px height, prominent actions
- `xl` - 48px height, hero sections
- `icon` - 40x40px square, icon-only

## States

```tsx
<Button loading>Processing...</Button>
<Button disabled>Unavailable</Button>
```

## Icons

```tsx
<Button leftIcon={<IconUser />}>Profile</Button>
<Button rightIcon={<IconArrow />}>Continue</Button>
```

## Full Width

```tsx
<Button fullWidth>Expand Full Width</Button>
```