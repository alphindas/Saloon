# Boutique and beauty parlour demo site

A fast one-page website for beauty parlours and boutiques. Pale gold and white, scroll animations, every price written down, and booking through WhatsApp. No build step and no framework: plain HTML, CSS and JavaScript.

## Make a site for a new client

1. Open `site-config.js` and change the name, phone, WhatsApp number, address, hours, services and prices, packages and reviews.
2. Put the client's photos in `assets/` and point to them in the config (`images.hero`, and `image:` on each gallery item).
3. Paste a Google Maps embed link into `mapEmbed` to show a live map.
4. Set `demo: false` to remove the "sample content" notes.
5. Pick a theme with `theme: "pale-gold"` or `theme: "ice-plum"`. New themes go in `css/styles.css`, next to the `ice-plum` block.

The demo photo in `assets/hero.jpg` is only a stand-in. Replace it with a photo you have the right to use before showing the site to a client.

## Run it on your computer

```
python3 -m http.server 8000
```

Then open http://localhost:8000

## Put it online (Cloudflare Pages)

- Connect this repo in Cloudflare Pages. Build command: leave empty. Output folder: `/`.
- Or from a terminal: `npx wrangler pages deploy .`

## What is where

- `index.html` is the page structure.
- `site-config.js` holds all client details.
- `js/main.js` fills the page from the config and runs the animations.
- `css/styles.css` holds the colours, fonts and layout. Colours are CSS variables at the top.
- `assets/` holds the fonts (Bodoni Moda and Jost, open source) and photos.

## Good to know

- Booking buttons open WhatsApp with the message already typed (service, time slot or wedding date).
- Animations switch off for visitors who have "reduce motion" turned on.
- Search engines get a `BeautySalon` data block built from the config.
