# Challenge 3: Responsive Image Gallery with Lazy Loading

## Problem Statement

You're building a responsive image gallery component for a photo-sharing application. The gallery should efficiently handle a large number of images while maintaining good performance and user experience. Your task is to implement a React component that displays images in a responsive grid layout with lazy loading capabilities.

## Requirements

1. The gallery should display images in a responsive grid layout that adapts to different screen sizes
2. Implement lazy loading to only load images when they come into view
3. Add a loading placeholder while images are being loaded
4. Support infinite scrolling to load more images as the user scrolls
5. Optimize performance by preventing unnecessary re-renders
6. Handle edge cases (empty gallery, loading states, error states)

## Example

```javascript
// Input: Array of image objects
const images = [
  {
    id: 1,
    url: "https://example.com/image1.jpg",
    title: "Image 1",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    url: "https://example.com/image2.jpg",
    title: "Image 2",
    width: 1200,
    height: 800,
  },
  // ... more images
];

// Expected output: A responsive grid of images that:
// - Adapts to screen size
// - Lazy loads images as they come into view
// - Shows loading placeholders
// - Supports infinite scrolling
```

## Implementation

Implement your solution in `ImageGallery.jsx`. The component should:

- Accept an array of image objects as props
- Handle loading states and errors
- Implement responsive grid layout
- Support lazy loading
- Include infinite scrolling functionality

## Notes

- Use React hooks for state management
- Implement proper error boundaries
- Consider accessibility requirements
- Optimize for performance
- Use CSS Grid or Flexbox for the responsive layout
- Handle image loading failures gracefully

## My Approach

In building this responsive image gallery, I focused on creating a simple, efficient, and user-friendly solution. Here's how I approached it:

1. **Responsive Grid Layout**
   - I used CSS Grid with `auto-fill` and `minmax()` to create a layout that adjusts automatically to different screen sizes. This ensures the gallery looks good on all devices.

2. **Lazy Loading**
   - I implemented lazy loading using the Intersection Observer API. Images are only loaded when they come into view, which improves performance and reduces the initial load time.

3. **Loading Placeholders**
   - While images are loading, placeholders are displayed to enhance the user experience and prevent layout shifts.

4. **Infinite Scrolling**
   - I added infinite scrolling by detecting when the user reaches the bottom of the page. More images are automatically loaded as needed.

5. **Error Handling**
   - I handled edge cases like empty galleries and image loading failures. If an image fails to load, an error message is displayed.

6. **Performance Optimization**
   - I optimized performance by preventing unnecessary re-renders and efficiently managing the visibility state of images.

7. **Reusability**
   - The `ImageGallery` component is designed to be reusable and customizable through props, making it easy to integrate into other projects.

### Video Demo: Responsive Image Gallery

You can download and view the demo video here:

[Download Video Demo(click on View raw)](Recording.mp4)

### Note

I have renamed the parent component to `App`, which passes the required props like `images` to the child `ImageGallery` component.
