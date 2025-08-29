# Input Component

Accessible form input with labels, validation, and icons.

## Import

```tsx
import { Input } from '@/components/ui'
```

## Basic Usage

```tsx
<Input placeholder="Enter text" />
<Input label="Email" type="email" />
<Input label="Password" type="password" />
```

## Variants

- `default` - Standard input styling
- `error` - Red border, error state
- `success` - Green border, success state

## Sizes

- `sm` - 32px height, compact forms
- `base` (default) - 40px height, standard
- `lg` - 48px height, prominent fields

## Labels & Validation

```tsx
<Input 
  label="Email Address"
  hint="We'll never share your email"
  placeholder="john@example.com"
/>

<Input 
  label="Password" 
  type="password"
  error="Password must be at least 8 characters"
/>
```

## Icons

```tsx
<Input 
  leftIcon={<IconMail />}
  placeholder="Email"
/>

<Input 
  rightIcon={<IconEye />}
  type="password"
/>
```

## Features

- Auto-generated IDs for accessibility
- Proper label associations
- Error state handling
- Icon positioning
- Focus management