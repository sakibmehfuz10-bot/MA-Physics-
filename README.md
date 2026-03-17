# M.A Physics - Website Instructions

This is a production-ready single-page website for M.A Physics (Mamon Aktar).

## How to use
1. **Local Development**: Run `npm run dev` to see the site in the AI Studio preview.
2. **Exporting**: Use the "Settings" menu in AI Studio to "Export to ZIP" or "Export to GitHub".
3. **Assets**: 
   - Place your hero images in `public/assets/hero/` named `hero1.jpg` through `hero10.jpg`.
   - Place a map image in `public/assets/location/map.png` (optional).
   - The current code uses high-quality placeholders from Unsplash/Picsum.

## Customization
- **Phone Number**: Update the `PHONE_NUMBER` constant in `src/App.tsx`.
- **Theme**: The site defaults to Dark mode. Users can toggle to Light mode using the sun/moon icon in the header.
- **Content**: All text content is managed within the `src/App.tsx` file for easy editing.

## Accessibility
- Semantic HTML5 tags used throughout.
- ARIA labels added to the slider and navigation.
- Keyboard navigation supported for all interactive elements.
- High contrast colors for readability.

## SEO
- JSON-LD structured data included for Person and Organization.
- OpenGraph and Twitter meta tags included in `index.html`.
