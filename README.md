# holystack.dev

Source code for [holystack.dev](https://holystack.dev) — the website for HolyStack, a Catholic initiative building free, open-source spiritual apps.

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [TypeScript](https://www.typescriptlang.org)

## Project Structure

```
src/
├── pages/
│   ├── index.astro            # Homepage
│   ├── apps.astro             # Apps showcase
│   ├── privacy.astro          # Privacy policy
│   ├── contact.astro          # Contact page
│   └── metanoia/              # Metanoia app pages
├── layouts/
│   ├── BaseLayout.astro       # HTML base with SEO
│   ├── MainLayout.astro       # Site layout (header/footer)
│   └── MetanoiaLayout.astro   # Metanoia-specific layout
├── components/
│   ├── common/                # Shared components
│   ├── home/                  # Homepage sections
│   └── metanoia/              # Metanoia landing page sections
└── styles/
    └── global.css
```

## Development

```sh
npm install
npm run dev        # localhost:4321
npm run build      # build to ./dist/
npm run preview    # preview production build
```

## License

MIT
