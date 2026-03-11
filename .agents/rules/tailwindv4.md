---
trigger: always_on
---

# Tailwind CSS v4

Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs directly in your HTML. Version 4 introduces a completely new high-performance engine built in Rust, CSS-first configuration using the `@theme` directive, native CSS cascade layers, and simplified installation. It offers a vast collection of pre-designed utility classes for spacing, colors, typography, flexbox, grid, animations, and more, allowing developers to rapidly prototype and build production-ready interfaces without writing custom CSS.

The framework is designed around the concept of design tokens stored as CSS custom properties (theme variables), which generate corresponding utility classes. This approach enables real-time customization, seamless theming, and excellent developer experience with automatic class detection and tree-shaking of unused styles. Tailwind CSS v4 works with any modern build tool through official plugins for Vite, PostCSS, and a standalone CLI.

## Installation with Vite

The most seamless way to integrate Tailwind CSS v4 with modern frameworks like React, Vue, SvelteKit, Laravel, Nuxt, and SolidJS using the official Vite plugin.

```bash
# Create a new Vite project
npm create vite@latest my-project
cd my-project

# Install Tailwind CSS and the Vite plugin
npm install tailwindcss @tailwindcss/vite
```

```javascript
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

```css
/* app.css */
@import "tailwindcss";
```

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## Theme Variables and Customization

Theme variables are special CSS variables defined using the `@theme` directive that generate utility classes. Define custom design tokens to extend or override the default theme.

```css
/* app.css */
@import "tailwindcss";

/* Extend the default theme with custom values */
@theme {
  /* Custom colors create utilities like bg-mint-500, text-mint-500 */
  --color-mint-500: oklch(0.72 0.11 178);
  --color-brand-primary: #3b82f6;

  /* Custom fonts create utilities like font-poppins */
  --font-poppins: Poppins, sans-serif;

  /* Custom breakpoints create variants like 3xl:* */
  --breakpoint-3xl: 120rem;

  /* Custom spacing affects all spacing utilities */
  --spacing: 0.25rem;

  /* Custom shadows create utilities like shadow-soft */
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.08);

  /* Custom animations with keyframes */
  --animate-wiggle: wiggle 1s ease-in-out infinite;

  @keyframes wiggle {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
}

/* Override entire namespace with custom-only values */
@theme {
  --color-*: initial;
  --color-white: #fff;
  --color-primary: #3f3cbb;
  --color-secondary: #121063;
}
```

```html
<!-- Using custom theme utilities -->
<div class="bg-mint-500 font-poppins shadow-soft">
  <h1 class="text-brand-primary">Custom themed content</h1>
  <div class="animate-wiggle">Animated element</div>
</div>

<!-- Using theme variables in arbitrary values -->
<div class="bg-[var(--color-mint-500)] p-[var(--spacing)]">
  Using CSS variables directly
</div>
```

## Background Colors

Utilities for controlling an element's background color using the `bg-{color}` pattern with opacity modifiers.

```html
<!-- Basic background colors -->
<button class="bg-blue-500">Blue button</button>
<button class="bg-cyan-500">Cyan button</button>
<button class="bg-pink-500">Pink button</button>

<!-- With opacity modifier (0-100) -->
<button class="bg-sky-500/100">100% opacity</button>
<button class="bg-sky-500/75">75% opacity</button>
<button class="bg-sky-500/50">50% opacity</button>

<!-- Hover state -->
<button class="bg-indigo-500 hover:bg-fuchsia-500">
  Hover to change color
</button>

<!-- Responsive background colors -->
<div class="bg-blue-500 md:bg-green-500 lg:bg-purple-500">
  Changes color at breakpoints
</div>

<!-- Arbitrary values -->
<div class="bg-[#50d71e]">Custom hex color</div>
<div class="bg-[rgb(255,100,50)]">Custom RGB</div>
<div class="bg-(--my-custom-color)">CSS variable reference</div>
```

## Gradients

Create linear, radial, and conic gradients using background image utilities with color stops.

```html
<!-- Linear gradients with direction -->
<div class="bg-linear-to-r from-cyan-500 to-blue-500">Left to right</div>
<div class="bg-linear-to-t from-sky-500 to-indigo-500">Bottom to top</div>
<div class="bg-linear-to-bl from-violet-500 to-fuchsia-500">To bottom-left</div>
<div class="bg-linear-65 from-purple-500 to-pink-500">65 degree angle</div>

<!-- Three-color gradient with via -->
<div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
  Three color stops
</div>

<!-- Gradient stop positions -->
<div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
  Custom stop positions
</div>

<!-- Radial gradients -->
<div class="bg-radial from-pink-400 from-40% to-fuchsia-700">Basic radial</div>
<div class="bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900">
  Positioned radial gradient
</div>

<!-- Conic gradients -->
<div class="bg-conic from-blue-600 to-sky-400 to-50%">Basic conic</div>
<div class="bg-conic-180 from-indigo-600 via-indigo-50 to-indigo-600">
  180 degree start angle
</div>

<!-- Interpolation modes -->
<div class="bg-linear-to-r/srgb from-indigo-500 to-teal-400">sRGB</div>
<div class="bg-linear-to-r/oklch from-indigo-500 to-teal-400">OKLCH</div>
<div class="bg-linear-to-r/longer from-indigo-500 to-teal-400">Longer hue</div>
```

## Spacing (Padding and Margin)

Spacing utilities use a multiplier system based on `--spacing` theme variable (default 0.25rem = 4px per unit).

```html
<!-- Padding on all sides: p-{n} where value = n * 0.25rem -->
<div class="p-4">1rem (16px) padding all sides</div>
<div class="p-8">2rem (32px) padding all sides</div>

<!-- Directional padding -->
<div class="pt-6">padding-top: 1.5rem</div>
<div class="pr-4">padding-right: 1rem</div>
<div class="pb-8">padding-bottom: 2rem</div>
<div class="pl-2">padding-left: 0.5rem</div>

<!-- Horizontal and vertical padding -->
<div class="px-8">2rem horizontal padding</div>
<div class="py-4">1rem vertical padding</div>

<!-- Logical properties (RTL support) -->
<div class="ps-8">padding-inline-start: 2rem</div>
<div class="pe-4">padding-inline-end: 1rem</div>

<!-- Margin utilities follow same pattern -->
<div class="m-4">margin all sides</div>
<div class="mx-auto">center horizontally</div>
<div class="mt-8 mb-4">top and bottom margin</div>
<div class="-mt-4">negative margin (overlaps)</div>

<!-- Space between children -->
<div class="space-x-4">Horizontal space between children</div>
<div class="space-y-2">Vertical space between children</div>

<!-- Arbitrary values -->
<div class="p-[5px]">Custom 5px padding</div>
<div class="m-[2.5rem]">Custom 2.5rem margin</div>
```

## Width and Height

Set element dimensions using fixed values, percentages, viewport units, or content-based sizing.

```html
<!-- Fixed width based on spacing scale -->
<div class="w-24">6rem (96px)</div>
<div class="w-48">12rem (192px)</div>
<div class="w-64">16rem (256px)</div>
<div class="w-96">24rem (384px)</div>

<!-- Percentage widths -->
<div class="w-1/2">50%</div>
<div class="w-2/3">66.67%</div>
<div class="w-3/4">75%</div>
<div class="w-full">100%</div>

<!-- Container scale widths -->
<div class="w-xs">20rem (320px)</div>
<div class="w-sm">24rem (384px)</div>
<div class="w-md">28rem (448px)</div>
<div class="w-lg">32rem (512px)</div>
<div class="w-xl">36rem (576px)</div>

<!-- Viewport-based -->
<div class="w-screen">100vw</div>
<div class="w-dvw">100dvw (dynamic viewport)</div>
<div class="w-svw">100svw (small viewport)</div>

<!-- Content-based -->
<div class="w-min">min-content</div>
<div class="w-max">max-content</div>
<div class="w-fit">fit-content</div>

<!-- Height utilities (same patterns) -->
<div class="h-64">Fixed height</div>
<div class="h-full">100% height</div>
<div class="h-screen">100vh</div>
<div class="min-h-screen">Minimum full viewport height</div>

<!-- Set both width and height simultaneously -->
<div class="size-16">4rem width and height</div>
<div class="size-24">6rem width and height</div>
<div class="size-full">100% width and height</div>

<!-- Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>
```

## Flexbox

Create flexible layouts with flexbox utilities for direction, alignment, wrapping, and item sizing.

```html
<!-- Basic flex container -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex direction -->
<div class="flex flex-row">Horizontal (default)</div>
<div class="flex flex-col">Vertical</div>
<div class="flex flex-row-reverse">Reverse horizontal</div>
<div class="flex flex-col-reverse">Reverse vertical</div>

<!-- Flex wrapping -->
<div class="flex flex-wrap">Wrap items</div>
<div class="flex flex-nowrap">No wrap (default)</div>

<!-- Justify content (main axis) -->
<div class="flex justify-start">Start</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-end">End</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>

<!-- Align items (cross axis) -->
<div class="flex items-start">Align start</div>
<div class="flex items-center">Align center</div>
<div class="flex items-end">Align end</div>
<div class="flex items-stretch">Stretch (default)</div>
<div class="flex items-baseline">Baseline</div>

<!-- Gap between items -->
<div class="flex gap-4">1rem gap</div>
<div class="flex gap-x-4 gap-y-2">Different x/y gaps</div>

<!-- Flex item sizing -->
<div class="flex">
  <div class="flex-none w-14">Fixed, no grow/shrink</div>
  <div class="flex-1">Grow to fill space</div>
  <div class="flex-1">Grow equally</div>
</div>

<div class="flex">
  <div class="flex-initial w-64">Shrink but don't grow</div>
  <div class="flex-auto">Grow/shrink with initial size</div>
</div>

<!-- Self alignment -->
<div class="flex items-start h-24">
  <div class="self-start">Top</div>
  <div class="self-center">Center</div>
  <div class="self-end">Bottom</div>
  <div class="self-stretch">Stretch</div>
</div>
```

## CSS Grid

Create two-dimensional layouts with grid utilities for columns, rows, gaps, and item placement.

```html
<!-- Basic grid with columns -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>

<!-- Different column counts -->
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-4">4 columns</div>
<div class="grid grid-cols-12">12 column grid</div>

<!-- Subgrid -->
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <div>02</div>
  <div class="col-span-3 grid grid-cols-subgrid gap-4">
    <div class="col-start-2">Subgrid item</div>
  </div>
</div>

<!-- Grid rows -->
<div class="grid grid-rows-3 grid-flow-col">
  Flows into columns, 3 rows
</div>

<!-- Spanning columns/rows -->
<div class="grid grid-cols-6 gap-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div class="col-span-4">Spans 4 columns</div>
  <div class="col-span-full">Spans all columns</div>
</div>

<!-- Column/row start and end -->
<div class="grid grid-cols-6">
  <div class="col-start-2 col-end-5">Columns 2-4</div>
  <div class="col-start-1 col-span-2">Start at 1, span 2</div>
</div>
