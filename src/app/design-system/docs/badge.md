# Badge Component

Small status indicators and labels.

## Import

```tsx
import { Badge } from '@/components/ui'
```

## Basic Usage

```tsx
<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Approved</Badge>
```

## Variants

- `default` - Gray, neutral information
- `primary` - Blue, primary status
- `secondary` - Gray, secondary information
- `success` - Green, positive status
- `warning` - Yellow, caution status
- `danger` - Red, error/critical status
- `info` - Blue, informational status
- `outline` - Bordered, minimal styling

## Sizes

- `xs` - Very compact, 20px height
- `sm` (default) - Small, 24px height  
- `base` - Standard, 28px height
- `lg` - Large, 32px height

## With Icons

```tsx
<Badge icon={<IconCheck />} variant="success">
  Completed
</Badge>

<Badge icon={<IconAlert />} variant="warning">
  Pending
</Badge>
```

## Status Examples

```tsx
// Booking status
<Badge variant="warning">Pending</Badge>
<Badge variant="success">Approved</Badge>
<Badge variant="danger">Rejected</Badge>

// User roles
<Badge variant="primary">Admin</Badge>
<Badge variant="default">Employee</Badge>

// Experience features
<Badge variant="outline" size="xs">WiFi</Badge>
<Badge variant="outline" size="xs">Parking</Badge>
```