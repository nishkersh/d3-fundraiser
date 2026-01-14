x# D3 PROJECT MASTER PLAN (FINAL MERGED)

## 1. PROJECT IDENTITY
- **Name:** D3 - Donate Dosti and Dance.
- **Goal:** Fundraiser for TB Patients by Rotaract Club Chandigarh.
- **Dates:** Jan 31 & Feb 1, 2025.
- **Theme:** "The Golden Portal" (Valentine + Charity).
- **Vibe:** Cinematic, Mobile-First, Sticky Reveal Footer.

## 2. DESIGN SYSTEM (Tailwind CSS)
- **Primary Background:** Deep Burgundy (`#4A0404`) to Vanta Black (`#050505`) gradients.
- **Accent Color:** Gold (`#D4AF37`) and Cream (`#F5F5F0`).
- **Typography:** 
  - Headings: 'Playfair Display' (Serif).
  - Body: 'Lato' (Sans-serif).
- **Key UI Elements:**
  - **Glassmorphism:** Blur effects on dark backgrounds.
  - **Inset Cards:** The "Gold Glow Card" logic (Scales down on hover, gold border glows).
  - **Hero Text:** "D3" headline must use CSS text-stroke (Gold outline) with a **Low Opacity Gold Fill** (e.g., `rgba(212, 175, 55, 0.1)`). On hover, it magnifies (`scale 1.1`).

## 3. MOTION LANGUAGE (Framer Motion)
- **Intro:** Full-screen Particle Spiral (Canvas) that fades out on entry.
- **Scroll Reveal:** All sections fade in + move up (`y: 50` -> `y: 0`) when in view.
- **Hero Text:** Letters "D" and "3" stagger in from sides.
- **Footer:** **"Sticky Reveal" Effect.** The footer container is fixed at the bottom, and the previous content scrolls *up* to reveal it.

## 4. COMPONENT ARCHITECTURE
- **Navbar:** Glassmorphism. **Logo must be large** (`h-20` or similar) to be clearly visible.
- **Hero:** Background Video (`/assets/hero-bg.webm`). Functional Countdown Timer (Target: Jan 31).
- **IntroPortal:** Canvas animation (Burgundy/Gold particles).
- **About:** Text section detailing the Rotaract Legacy (Est. 1972).
- **Gallery:** Masonry Grid. Supports Mixed Media (`<video>` and `<img>`).
- **Board:** Horizontal Scroll Container. Uses `GoldGlowCard`.
- **EventDetails:** Pricing Cards (Gold Glow style).
- **Footer:** 
  - Layout: Sticky Reveal.
  - Content: **Partner Panel Image** (`/assets/footer-panel.png`) must be at the **TOP** of the footer content, full width.

## 5. LOGIC & DATA FLOW (Simplified)
- **Registration Modal:**
  - UI: Glass popup with QR Code Image (`/assets/payment-qr.png`).
  - **Fields:** Full Name, Phone (+91), UTR/Transaction ID. (**NO Email Field**).
- **Database (Google Sheets):**
  - Use `fetch` to POST data to SheetDB API.
  - Schema: `Name`, `Phone`, `UTR`, `Date`, `Status`.
- **Notifications:** **NONE.** No EmailJS. Logic is purely "Save to Sheet -> Redirect".
- **Success Action:**
  - On submit success, wait 1s, then open the **Ticket Page** in a new tab.

## 6. ASSETS LOCATION
All static assets are located in `/public/assets/`.
- `hero-bg.webm`, `hero-still.jpg`
- `ticket-bg.jpg`
- `payment-qr.png`
- `footer-panel.png`
- `logo-main.png`