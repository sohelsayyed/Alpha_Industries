# Commercial Kitchen Equipment Catalogue Website

A static, mobile-first HTML/CSS/JavaScript catalogue website for a commercial
kitchen equipment, display counter and food stall counter manufacturer. No
build tools, frameworks, backend, database or login system are used —
just plain HTML, CSS and vanilla JS, so it can be opened directly in a
browser or uploaded to any basic web host.

## Structure

```
commercial-kitchen-website/
├── index.html            Home page
├── products.html          Full catalogue with filter + search
├── product-details.html   Dynamic product details page (?id=...)
├── about.html
├── gallery.html            Gallery with category filter + lightbox
├── contact.html            Contact info + Request a Quote form
├── css/style.css           All styling and responsive rules
├── js/products.js          Site config + product/category data
├── js/script.js             Navigation, filtering, search, forms, WhatsApp, lightbox
└── images/                  Put product/gallery photos here (see below)
```

## First things to edit

1. **`js/products.js` → `SITE_CONFIG`**
   - `BUSINESS_WHATSAPP`: your WhatsApp number, digits only with country
     code (e.g. `"919999999999"`). This is the **only** place the number
     needs to change — every WhatsApp button on the site reads from here.
   - `phone`, `email`, `address`, `hours`, `mapLink`.
   - Also replace the placeholder phone number `+919999999999` used in
     `tel:` links across the HTML files with your real number.

2. **`js/products.js` → `PRODUCTS` array**
   - Add, edit or remove products here. Each product automatically
     appears in the catalogue, filters, search and its own details page —
     no HTML editing required.
   - To add a new product, copy an existing object and give it a new
     unique `id`.
   - Leave `specifications`/`customization` as an empty string `""` if
     you don't have that information yet — the site will automatically
     show "Contact us for specifications and quotation." instead of
     inventing details.

3. **`js/products.js` → `CATEGORIES` array**
   - Add a new category here, then set matching product objects'
     `category` field to its `slug`.

4. **Images**
   - Drop real photos into `images/products/`, `images/gallery/` and
     `images/logo/` using the file names already referenced in the code
     (e.g. `images/products/bakery-display-counter.jpg`).
   - Until real photos are added, every image automatically falls back
     to a placeholder box (via the `imgFallback()` function in
     `js/script.js`), so the site still looks complete.

## How the enquiry form works

This is a frontend-only site with no backend or database. The
**Request a Quote** form on `contact.html`:

1. Validates required fields with JavaScript.
2. Shows a success message.
3. Builds a pre-filled WhatsApp message from the form fields and opens
   WhatsApp so the enquiry reaches you directly.

If you later add a backend or a form service (e.g. an email API), you
can extend the `submit` handler in `js/script.js` (`initQuoteForm`) to
also send the data there.

## Notes

- No prices, dimensions, material grades, certifications or company
  history have been invented. Anywhere this information wasn't
  supplied, the site shows "Contact us for specifications and
  quotation."
- The site is mobile-first and works down to small phone widths,
  with a hamburger menu, floating WhatsApp button and stacked layouts.

## v2 additions
- **New pages:** `projects.html`, `testimonials.html`, `catalogue.html`.
- **Content data:** `js/content.js` — edit `PROJECTS`, `TESTIMONIALS`, `CATALOGUES` (PDFs), `PROCESS`, `FAQS`. Entries with `placeholder: true` show a "Sample" badge; replace them with real content.
- **PDF catalogues:** put the PDF in `catalogues/` and add an entry in `CATALOGUES`. Per product, add `brochure: "catalogues/x.pdf"` and `images: ["images/products/x-2.jpg"]` for a PDF button and extra photos.
- **Categories:** filter buttons on the Products page are generated from `CATEGORIES`, so adding a category needs no HTML edits.

## v3 additions (modern layout + multi-view products)
- **Header dropdown:** hovering/focusing "Products" in the nav shows a dropdown of every category with a live product count, built from `CATEGORIES` — add a category there and it appears automatically.
- **Quick View:** every product card now has a "Quick View" button (shown on hover/focus) that opens a modal with the product's photo gallery, description, features and quote/WhatsApp actions — without leaving the catalogue, similar to an ecommerce listing.
- **Multi-view product gallery:** the product details page and Quick View modal share one gallery component (`galleryMarkup()` in `js/script.js`). Add extra angles/photos to a product's `images: []` array in `js/products.js` and they appear as clickable thumbnails; clicking the main photo opens it full-size in the lightbox.
- **Hover image swap on cards:** if a product's `images[0]` is set, the catalogue/home product cards swap to that photo on hover — a common ecommerce pattern. Leave `images: []` empty to skip this.
- **Clients strip:** a placeholder logo row on the home page (`.clients-strip` in `index.html`) — replace the "Client Logo" boxes with real client logos once available.
- Design reference: layout ideas (category navigation, product card hover state, process/journey steps, quick-view-style browsing) were informed by publicly viewable structure/layout patterns on MABTECH, Gurubhai Equipments and Alister's commercial kitchen equipment sites — no text, images or specific claims were copied from them.

## v4: images
- Every image slot now has a bundled **vector illustration** (`.svg`) so nothing looks empty. To use a real or AI-generated photo, save it with the same name but `.jpg` (e.g. `images/products/bakery-display-counter.jpg`); the site shows the `.jpg` when it exists and falls back to the `.svg` otherwise. For the home hero, use `images/gallery/hero.jpg`.
- Home page now includes a Testimonials section (data in `js/content.js`; replace the "Sample" entries with real feedback).

## v5: home hero + section order
- Home hero is full-screen and sits behind a transparent header (top bar, logo, nav); the header turns solid white once you scroll.
- Three crossfading slides (5.5 s each, dots to jump, paused for reduced-motion users). Replace `images/gallery/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` with your photos (the `.svg` illustrations show until you do).
- Home page order: Hero → Categories → Featured products → Why choose us → How it works → Recent projects → Clients → Testimonials → FAQ → Enquiry CTA → Footer.
