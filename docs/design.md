# Holystack Web Platform - Design Document

## 1. Brand Overview

### Holystack
**Mission:** Creating high-quality, free Catholic apps for the glory of God and the sanctification of souls.

> *"Freely you have received; freely give."* — Matthew 10:8

**Core Values:**
- **For the Greater Glory of God (Ad Maiorem Dei Gloriam)**: Every app is an offering to the Lord
- **Privacy as Sanctuary**: Your spiritual life is sacred — between you and God alone
- **Excellence in Service**: Professional quality worthy of serving the faithful
- **Freely Given**: No cost, no ads, no compromise — a gift to the Church
- **Faithful to the Magisterium**: Content rooted in authentic Catholic teaching

**Brand Identity:**
- Clean, minimal, sacred aesthetic
- Colors inspired by Catholic liturgical traditions
- Typography that balances reverence with modern readability
- Spirit-filled yet reverent tone

> *"Whatever you do, work at it with all your heart, as working for the Lord."* — Colossians 3:23

---

## 2. Site Architecture

### 2.1 Main Site (holystack.dev)
```
/                     # Home - Brand introduction
/apps                 # App catalog/portfolio
/about                # About the mission
/privacy              # Privacy policy
/contact              # Contact information
```

### 2.2 App Landing Pages (Subdomains)
```
metanoia.holystack.dev    # Metanoia confession app
[future].holystack.dev    # Future apps
```

---

## 3. Design System

### 3.1 Color Palette

#### Primary Colors (Liturgical Inspiration)
```css
/* Deep Sacred Purple - Penitence, Royalty of Christ */
--purple-900: #1e1b4b;
--purple-800: #3730a3;
--purple-700: #4f46e5;
--purple-600: #6366f1;

/* Gold/Cream - Divine Glory, Heavenly Light */
--gold-500: #d4a574;
--gold-400: #e4c49a;
--gold-300: #f5e6d3;
--cream: #faf8f5;

/* Sacred Red - Precious Blood, Martyrdom, Holy Spirit's Fire */
--red-700: #b91c1c;
--red-600: #dc2626;

/* Neutral - Purity and Clarity */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-500: #6b7280;
--gray-700: #374151;
--gray-900: #111827;
```

#### Dark Mode
```css
--dark-bg: #0f0f14;
--dark-surface: #1a1a24;
--dark-border: #2a2a3a;
--dark-text: #e5e5e5;
--dark-muted: #9ca3af;
```

### 3.2 Typography

#### Font Stack
```css
/* Headings - Elegant serif */
font-family: 'Playfair Display', 'Georgia', serif;

/* Body - Clean sans-serif */
font-family: 'Inter', 'system-ui', sans-serif;

/* Scripture & Quotes - Italic serif */
font-family: 'Merriweather', 'Georgia', serif;
```

#### Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### 3.3 Spacing & Layout
```css
--spacing-unit: 0.25rem; /* 4px base */
--max-width-content: 1200px;
--max-width-text: 720px;
--border-radius-sm: 0.375rem;
--border-radius-md: 0.5rem;
--border-radius-lg: 1rem;
--border-radius-xl: 1.5rem;
```

### 3.4 Components

#### Buttons
- **Primary**: Solid purple background, white text
- **Secondary**: Outlined with purple border
- **Ghost**: Text only with hover underline
- **CTA**: Gold gradient background for downloads

#### Cards
- Subtle shadow or border
- Rounded corners (lg)
- Hover lift effect
- Support for images, icons, and content

#### Navigation
- Fixed header with blur backdrop
- Minimal links
- Mobile hamburger menu
- Dark/light mode toggle

---

## 4. Holystack Main Site (holystack.dev)

### 4.1 Homepage Sections

#### Hero Section
```
[Logo: Stylized flame/dove representing the Holy Spirit]

HOLYSTACK

Building for the Kingdom

Catholic apps crafted with prayer,
offered freely for the glory of God.

No ads. No tracking. No cost.
Just tools for holiness.

[Explore Our Apps]

"For we are God's handiwork, created in Christ Jesus
to do good works." — Ephesians 2:10
```

#### Mission Statement
```
Our Mission

We believe the faithful deserve beautiful,
trustworthy tools for their spiritual journey —
free from the distractions of the world.

Every app we create is:
- A gift to the Church, freely given
- Ad-free and tracking-free, always
- Faithful to Catholic teaching
- Crafted with prayer and excellence

"Each of you should use whatever gift you have received
to serve others, as faithful stewards of God's grace."
— 1 Peter 4:10
```

#### App Showcase
```
Apps for the Faithful

[Metanoia Card]
Metanoia: Catholic Confession
Turn Back to Grace

Your faithful companion for the
Sacrament of Reconciliation.

[Learn More] [Download]

---

More apps coming soon.
If you have ideas for Catholic apps that would
serve the Church, we'd love to hear from you.
```

#### Values Section
```
Our Principles

[Icon: Shield] Privacy as Sanctuary
Your spiritual life is between you and God.
No tracking. No analytics. No ads.
Your data never leaves your device.

[Icon: Heart] Freely Given
"Freely you have received; freely give."
These apps are our offering to the Church —
no cost, no strings attached.

[Icon: Cross] Faithful to the Church
All content is rooted in Sacred Scripture,
Sacred Tradition, and the Magisterium.
We build in communion with the Church.

[Icon: Flame] Crafted with Excellence
"Whatever you do, do it all for the glory of God."
Professional quality, prayerfully made,
worthy of serving the faithful.
```

#### Closing Section
```
Built with Prayer

Holystack is a labor of love for the Church.
We ask only for your prayers as we continue
this work for the Kingdom.

"Let us not become weary in doing good, for at the
proper time we will reap a harvest if we do not give up."
— Galatians 6:9

[Contact Us]
```

#### Footer
```
HOLYSTACK
Building for the Kingdom

[Links: Apps | About | Privacy | Contact]

Ad Maiorem Dei Gloriam
For the Greater Glory of God
```

---

## 5. Metanoia Landing Page (metanoia.holystack.dev)

### 5.1 About Metanoia

**App Name:** Metanoia: Catholic Confession
**Tagline:** *Turn Back to Grace*

> *"Metanoia"* (μετάνοια) — Greek for "conversion of heart," "repentance," a complete transformation of mind and soul toward God.

**Purpose:** A faithful digital companion to help Catholics prepare for and participate in the Sacrament of Reconciliation. Metanoia provides a guided examination of conscience, prayers, and step-by-step guidance through the confession process — all within a secure, private environment worthy of this sacred encounter with God's mercy.

> *"Return to me with all your heart, with fasting and weeping and mourning. Rend your heart and not your garments. Return to the Lord your God, for he is gracious and compassionate, slow to anger and abounding in love."* — Joel 2:12-13

**Target Audience:**
- **Primary**: Catholics seeking to make a good confession — from those who go regularly to those returning after many years
- **Secondary**: Anyone curious about the beauty of this sacrament of mercy

### 5.2 Core App Features (For Landing Page Content)

#### Examination of Conscience
- Thoughtful questions based on the Ten Commandments
- Search and filter functionality
- Progress tracking with visual counter
- Expandable/collapsible commandment sections
- Yes/No style reflection questions
- Automatic draft restoration
- Custom sins: Add personal notes linked to specific commandments

> *"Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way everlasting."* — Psalm 139:23-24

#### Confession Mode
- Step-by-step ritual walkthrough:
  1. Greeting the priest
  2. Confession of sins
  3. Act of Contrition
  4. Absolution
  5. Penance
- Sin list display with numbered items
- Quick access to necessary prayers
- Mark confession as complete with timestamp

#### Confession History
- Chronological list of past confessions
- Date and completion status
- Detail view for each confession
- Optional history clearing
- All data encrypted and stored locally

#### Spiritual Guide & Resources
- FAQ section with expandable answers
- Prayers collection (Act of Contrition, etc.)
- Catechism excerpts and Church guidance
- Search functionality

#### Privacy & Security
- All data stored locally on device
- SQLCipher encryption
- Biometric authentication option
- No accounts required
- No data collection or tracking

> *"The Lord is close to the brokenhearted and saves those who are crushed in spirit."* — Psalm 34:18

#### Additional Features
- Daily inspirational quotes from Scripture and the Saints
- Reminder notifications (customizable frequency, day, time)
- Dark/Light/System theme modes
- Multiple languages: English and Malayalam
- Tutorial system for first-time users

### 5.3 Landing Page Sections

#### Hero Section
```
[App Icon - Stylized dove descending with flame, representing the Holy Spirit]

METANOIA
Catholic Confession

Turn Back to Grace

Your faithful companion for preparing
and receiving the Sacrament of Reconciliation.

Examine your conscience. Open your heart.
Receive His mercy.

[Download on App Store] [Get on Google Play]

[Hero Image: iPhone and Android device mockups showing app]

"Come now, let us settle the matter," says the Lord.
"Though your sins are like scarlet, they shall be as white as snow."
— Isaiah 1:18
```

**Design Notes:**
- Full viewport height hero
- Gradient background: deep purple fading to dark
- Subtle animated light rays or gentle particle effect (like grace descending)
- App icon prominently displayed
- Device mockups showing Home screen with daily quote

#### The Gift of Confession Section
```
The Father Waits for You

The Sacrament of Reconciliation is one of
the greatest gifts Christ gave His Church —
the assurance of forgiveness, the healing
of the soul, and restoration to grace.

Yet many of us approach it with anxiety:
- What should I confess?
- What if I forget something?
- I don't remember the prayers...
- It's been so long since my last confession...

Metanoia walks beside you, helping you
prepare your heart so you can focus on
what matters most: encountering the
merciful love of the Father.

"In him we have redemption through his blood,
the forgiveness of sins, in accordance with
the riches of God's grace." — Ephesians 1:7
```

**Design Notes:**
- Warm, inviting tone
- Soft cream/gold accent background
- Perhaps an image of the Prodigal Son or open arms

#### Features Section
```
Prepare Your Heart

[Feature Card 1]
Examination of Conscience
Reflect on your life with thoughtful questions
rooted in the Ten Commandments. Take your time.
The Holy Spirit will guide you.

"Create in me a pure heart, O God, and renew
a steadfast spirit within me." — Psalm 51:10

[Feature Card 2]
Step-by-Step Guide
Never feel lost. Follow along with prayers
and prompts through the entire rite —
from greeting to absolution to penance.

[Feature Card 3]
Complete Privacy
Your examination of conscience is between
you and God. All data stays on your device,
encrypted and secure. No accounts. No tracking.

"You have searched me, Lord, and you know me."
— Psalm 139:1

[Feature Card 4]
Personal Reflections
Add your own notes and reflections.
Link them to specific commandments for
a thorough, honest examination.

[Feature Card 5]
Your Spiritual Journey
Optionally keep a private record of your
confessions. Watch your growth in grace
over time.

[Feature Card 6]
Gentle Reminders
Set reminders to maintain the beautiful
practice of frequent confession — a wellspring
of grace for the spiritual life.
```

**Design Notes:**
- 3-column grid on desktop, single column on mobile
- Icon + heading + description format
- Scripture integrated naturally
- Hover lift effect on cards

#### App Preview Section
```
Designed for Prayerful Reflection

[Large device mockup carousel/grid showing:]

Screen 1: Home Dashboard
"Begin each session with an inspiring word
from Scripture or the Saints."

Screen 2: Examination of Conscience
"Work through the commandments at your
own pace. Your progress is always saved."

Screen 3: Confession Mode
"During the sacrament, follow along with
prayers and your prepared list."

Screen 4: Prayers
"Access the Act of Contrition and other
prayers whenever you need them."

Screen 5: Dark Mode
"Full dark theme for comfortable use
in the quiet of the confessional."
```

**Design Notes:**
- Interactive carousel or static grid
- Large, high-quality device mockups
- Captions below each screen
- Show both light and dark mode

#### Scripture & Teaching Section
```
Rooted in Truth

All content in Metanoia is drawn from:
- Sacred Scripture
- The Catechism of the Catholic Church
- Approved liturgical texts
- The wisdom of the Saints

Available in English and Malayalam,
with more languages coming soon.

---

[Decorative scripture block]

"If we confess our sins, he is faithful and just
and will forgive us our sins and purify us
from all unrighteousness."
— 1 John 1:9

[Secondary quote]

"The Lord is compassionate and gracious,
slow to anger, abounding in love.
He does not treat us as our sins deserve
or repay us according to our iniquities."
— Psalm 103:8-10

[Third quote]

"I will give you a new heart and put a new spirit in you;
I will remove from you your heart of stone
and give you a heart of flesh."
— Ezekiel 36:26
```

**Design Notes:**
- Centered, elegant layout
- Decorative borders or subtle flourishes
- Merriweather italic for scripture
- Gold accents

#### Privacy Section
```
Your Sanctuary

We believe your spiritual life is sacred —
a conversation between you and the Lord.

That's why Metanoia:

✓ Stores everything locally on your device
✓ Encrypts all data with bank-level security
✓ Never requires an account or sign-up
✓ Contains absolutely no tracking or analytics
✓ Has no advertisements, ever
✓ Is completely free — a gift to the Church

"But when you pray, go into your room,
close the door and pray to your Father, who is unseen."
— Matthew 6:6

[Privacy Policy]
```

**Design Notes:**
- Clean checklist format
- Shield or dove icon
- Link to detailed privacy policy

#### Testimonials Section (Future)
```
Stories of Grace

[Placeholder for testimonials]

"After 20 years away, Metanoia helped me
prepare for my return to confession.
I was finally able to experience
God's mercy in a profound way..."

[Add testimonials as they come in]
```

**Design Notes:**
- Quote cards
- Could incorporate app store reviews
- Gentle, hopeful tone

#### Download CTA Section
```
Turn Back to Grace

Download Metanoia free on iOS and Android.
No ads. No tracking. No cost.
Just a simple tool to help you encounter mercy.

[App Store Badge] [Play Store Badge]

Available in English and Malayalam.

"The sacrifice acceptable to God is a broken spirit;
a broken and contrite heart, O God, you will not despise."
— Psalm 51:17
```

**Design Notes:**
- Deep purple or gradient background
- Large, prominent store badges
- Scripture reinforces the invitation

#### FAQ Section
```
Common Questions

Q: Is Metanoia really free?
A: Yes, completely free. No ads, no in-app purchases, no hidden costs.
   It's our gift to the Church.

Q: Do I need to create an account?
A: No. We don't want your email or personal information.
   Everything stays on your device.

Q: Is my data truly private?
A: Absolutely. All data is encrypted and stored only on your device.
   We have no servers, no database of users. Your spiritual life
   is between you and God alone.

Q: What languages are supported?
A: Currently English and Malayalam. More languages coming soon.

Q: Can I use this during confession?
A: Yes! The Confession Mode is designed for discreet use
   during the sacrament itself.

Q: Who made this app?
A: Metanoia is created by Holystack, a Catholic initiative
   dedicated to building free, faithful apps for the Church.

Q: How can I help?
A: Pray for us! And if Metanoia has blessed you, share it
   with others who might benefit.
```

**Design Notes:**
- Accordion/expandable format
- Clean, scannable
- Warm, personal tone

#### Closing Section
```
Go in Peace

We pray that Metanoia helps you encounter
the boundless mercy of our Heavenly Father.

May this tool serve your journey toward holiness,
and may you always know the joy of returning to grace.

"Peace I leave with you; my peace I give you.
I do not give to you as the world gives.
Do not let your hearts be troubled and do not be afraid."
— John 14:27

God bless you.
```

#### Footer
```
METANOIA
by Holystack

A free Catholic app — no ads, no tracking.
Made with prayer for the glory of God.

[Visit Holystack] [Privacy Policy] [Contact]

---

"Go in peace, your sins are forgiven."
```

**Design Notes:**
- Simple, reverent footer
- Link to main Holystack site
- Blessing as closing

---

## 6. Technical Stack

### Astro + Tailwind + Cloudflare Pages

#### Why Astro?
- **Zero JS by default**: Lightning fast static pages
- **Partial hydration**: Add interactivity only where needed
- **Built-in optimizations**: Image optimization, CSS inlining
- **Tailwind integration**: First-class support
- **Cloudflare adapter**: Native deployment support
- **Simple**: Perfect for marketing/landing pages

#### Stack
```
Framework:     Astro 4.x
Styling:       Tailwind CSS 3.4+
Animations:    CSS animations + optional view transitions
Fonts:         Fontsource (self-hosted Google Fonts)
Icons:         Astro Icon + Lucide icons
Deployment:    Cloudflare Pages
```

#### Project Structure
```
holystack-web/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Section.astro
│   │   │   ├── Scripture.astro      # Styled scripture quotes
│   │   │   └── ThemeToggle.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── Mission.astro
│   │   │   ├── AppShowcase.astro
│   │   │   ├── Values.astro
│   │   │   └── Closing.astro
│   │   └── metanoia/
│   │       ├── Hero.astro
│   │       ├── GiftOfConfession.astro
│   │       ├── Features.astro
│   │       ├── AppPreview.astro
│   │       ├── Scripture.astro
│   │       ├── Privacy.astro
│   │       ├── Download.astro
│   │       ├── FAQ.astro
│   │       └── Closing.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Shared HTML structure
│   │   ├── MainLayout.astro      # holystack.dev layout
│   │   └── MetanoiaLayout.astro  # metanoia subdomain layout
│   │
│   ├── pages/
│   │   ├── index.astro           # holystack.dev homepage
│   │   ├── apps.astro
│   │   ├── about.astro
│   │   ├── privacy.astro
│   │   └── contact.astro
│   │
│   ├── styles/
│   │   └── global.css            # Tailwind imports + custom CSS
│   │
│   └── data/
│       └── scriptures.ts         # Scripture quotes collection
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── logo/
│   │   ├── metanoia/
│   │   │   ├── icon.png
│   │   │   ├── screenshots/
│   │   │   └── mockups/
│   │   └── og/                   # Open Graph images
│   └── favicon.ico
│
├── metanoia/                     # Separate Astro project for subdomain
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   └── index.astro       # metanoia.holystack.dev
│   │   └── styles/
│   ├── public/
│   ├── astro.config.mjs
│   └── package.json
│
├── docs/
│   └── design.md
│
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── wrangler.toml                 # Cloudflare config
```

#### Cloudflare Pages Setup

**Domain Configuration:**
```
holystack.dev           -> Main site
metanoia.holystack.dev  -> Metanoia landing (separate project)
```

**Deployment: Two separate Cloudflare Pages projects**
- `holystack-main` -> holystack.dev
- `holystack-metanoia` -> metanoia.holystack.dev

---

## 7. SEO & Meta

### Main Site Meta
```html
<title>Holystack - Catholic Apps for the Glory of God</title>
<meta name="description" content="Free Catholic apps crafted with prayer. No ads, no tracking, no cost. Tools for holiness, offered freely to the Church.">
<meta property="og:title" content="Holystack - Building for the Kingdom">
<meta property="og:description" content="Free Catholic apps crafted with prayer. No ads, no tracking.">
<meta property="og:image" content="/og/holystack.png">
<meta property="og:type" content="website">
```

### Metanoia Meta
```html
<title>Metanoia - Catholic Confession App | Turn Back to Grace</title>
<meta name="description" content="Prepare for the Sacrament of Reconciliation with Metanoia. A free Catholic confession app with examination of conscience, prayers, and step-by-step guidance. No ads, no tracking — just grace.">
<meta property="og:title" content="Metanoia - Turn Back to Grace">
<meta property="og:description" content="Your faithful companion for the Sacrament of Reconciliation. Free, private, faithful to the Church.">
<meta property="og:image" content="/og/metanoia.png">
<meta property="og:type" content="website">
<meta name="keywords" content="catholic confession app, examination of conscience, sacrament of reconciliation, catholic app, confession guide, act of contrition, reconciliation, penance">
```

### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "Metanoia: Catholic Confession",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "LifestyleApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "A Catholic confession app with examination of conscience, step-by-step guidance, and complete privacy. Free, faithful, and ad-free.",
  "author": {
    "@type": "Organization",
    "name": "Holystack"
  }
}
```

---

## 8. Key Scripture References

### For Holystack Brand
- **Matthew 10:8** — "Freely you have received; freely give."
- **Colossians 3:23** — "Whatever you do, work at it with all your heart, as working for the Lord."
- **1 Peter 4:10** — "Use whatever gift you have received to serve others."
- **Ephesians 2:10** — "We are God's handiwork, created in Christ Jesus to do good works."
- **Galatians 6:9** — "Let us not become weary in doing good."
- **1 Corinthians 10:31** — "Whatever you do, do it all for the glory of God."

### For Metanoia / Confession
- **Isaiah 1:18** — "Though your sins are like scarlet, they shall be as white as snow."
- **Joel 2:12-13** — "Return to me with all your heart... Return to the Lord your God, for he is gracious and compassionate."
- **Psalm 51:10** — "Create in me a pure heart, O God."
- **Psalm 51:17** — "A broken and contrite heart, O God, you will not despise."
- **Psalm 103:8-10** — "The Lord is compassionate and gracious, slow to anger, abounding in love."
- **Psalm 139:23-24** — "Search me, God, and know my heart."
- **Psalm 34:18** — "The Lord is close to the brokenhearted."
- **1 John 1:9** — "If we confess our sins, he is faithful and just and will forgive us."
- **Ephesians 1:7** — "In him we have redemption through his blood, the forgiveness of sins."
- **Ezekiel 36:26** — "I will give you a new heart and put a new spirit in you."
- **Matthew 6:6** — "When you pray, go into your room, close the door."
- **John 14:27** — "Peace I leave with you; my peace I give you."
- **2 Corinthians 5:17** — "If anyone is in Christ, the new creation has come."
- **Romans 8:1** — "There is now no condemnation for those who are in Christ Jesus."
- **Luke 15:7** — "There will be more rejoicing in heaven over one sinner who repents."

---

## 9. Accessibility

- WCAG 2.1 AA compliance
- Semantic HTML structure
- Proper heading hierarchy (h1 -> h2 -> h3)
- Alt text for all images
- Keyboard navigation support
- Visible focus indicators
- Sufficient color contrast (4.5:1 minimum)
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader friendly
- Skip to content link
- Responsive text sizing

---

## 10. Performance Goals

- Lighthouse score: 95+ (all categories)
- First Contentful Paint: < 1.0s
- Largest Contentful Paint: < 2.0s
- Time to Interactive: < 2.0s
- Cumulative Layout Shift: < 0.1
- Total page size: < 500KB
- Zero JavaScript by default (Astro islands only where needed)
- Optimized images (WebP/AVIF, responsive srcset)
- Self-hosted fonts (subset, preload)
- Cloudflare CDN caching

---

## 11. Assets Needed

### Holystack Brand
- [ ] Logo (SVG, multiple sizes) — flame/dove motif
- [ ] Favicon set (ico, png, apple-touch-icon)
- [ ] Open Graph image (1200x630)
- [ ] Brand colors finalized

### Metanoia Landing Page
- [ ] App icon (high resolution PNG)
- [ ] App Store badge
- [ ] Google Play badge
- [ ] Device mockups (iPhone, Android)
- [ ] Screenshots of key app screens:
  - Home/Dashboard with quote
  - Examination of Conscience
  - Confession Mode
  - Prayers
  - Dark Mode variants
- [ ] Open Graph image (1200x630)
- [ ] Hero background gradient/image

---

## 12. Future Considerations

- Multi-language support for websites (Spanish, etc.)
- Additional app landing pages as new apps launch
- Testimonials/stories of grace section
- App update changelog pages
- Press kit / media resources
- Blog for Catholic reflections (if led to)
- Prayer request form (anonymous)
