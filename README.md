# M.A Physics - Landing Page

A modern, responsive, and accessible single-page landing site for M.A Physics tuition.

## Features
- **Vanilla Tech Stack:** HTML5, CSS3, and plain JavaScript. No frameworks or heavy libraries.
- **Responsive Design:** Mobile-first approach, optimized for all screen sizes.
- **Theming:** Dark and White modes with persistent user preference.
- **Accessibility:** Semantic markup, ARIA roles, keyboard navigation, and skip-to-content link.
- **SEO Optimized:** Meta tags, Open Graph, Twitter cards, and JSON-LD structured data.
- **Hero Slider:** Autoplay, accessible controls, and keyboard navigation.
- **Performance:** Minimal bundle size, lazy loading for non-critical images.

## Project Structure
- `index.html`: Main semantic markup.
- `styles.css`: BEM-naming styles with CSS variables for theming.
- `script.js`: Vanilla JS for slider, theme toggle, and interactions.
- `assets/hero/`: Hero slider images (hero1.jpg to hero10.jpg).
- `assets/icons/`: SVG icons and placeholders.
- `assets/location/`: Map and location-related assets.

## How to Run Locally
Simply open `index.html` in any modern web browser. No server is required.

## Customization

### Replacing Assets
- **Hero Images:** Replace files in `assets/hero/` with your own images. Recommended size: 1920x1080px, <=200KB.
- **Map:** Replace `assets/location/map.png` with a static map image of your location.
- **QR Code:** Replace `assets/icons/qr-placeholder.svg` with your actual contact QR code.

### Changing Contact Info
- **Phone Number:** Search for `+917797615088` in `index.html` and `script.js` to update the phone number and links.
- **Address:** Update the address in the `Location` section of `index.html` and the JSON-LD script.

### Layout Variants
The codebase supports two hero layout variants:
1. **Left-Aligned Text (Default):** The current layout with text on the left and slider on the right.
2. **Centered Hero:** To switch, add the class `hero--centered` to the `<section class="hero">` element in `index.html` and update the corresponding CSS in `styles.css`.

## Accessibility Checklist
- [x] Semantic HTML elements used throughout.
- [x] Skip-to-content link provided.
- [x] Images have descriptive `alt` text.
- [x] Controls are keyboard-focusable with visible outlines.
- [x] Color contrast meets WCAG AA standards.
- [x] `prefers-reduced-motion` media query respected.

## SEO Notes
- The site includes JSON-LD structured data for a `LocalBusiness`.
- Meta tags are configured for search engines and social media sharing.
- Ensure the `og:url` and `og:image` tags are updated with the final production URL.

## License
This project is provided as-is for informational and educational purposes.
