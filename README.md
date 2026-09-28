# holystack.dev

Source code for [holystack.dev](https://holystack.dev), a Catholic development
studio creating free Catholic apps and open projects to support prayer, growth
in holiness, and a deeper relationship with God through Scripture and the
sacramental life.

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [TypeScript](https://www.typescriptlang.org)

## Project structure

- `src/pages/`: home, Projects, contact, privacy, Metanoia, confession guide,
  Shema and browser installer.
- `src/layouts/`: shared HTML/SEO and site layout.
- `src/components/common/`: navigation, theme picker, product cards, icons and phone frame.
- `src/components/metanoia/`: shared store links.
- `src/components/shema/`: device frame and interactive tour.
- `src/data/`: shared product content, media paths and guide text.
- `src/assets/metanoia/`: original product captures and provenance manifest.
- `src/styles/site.css`: shared design tokens and layout classes.
- `scripts/`: repeatable media imports, logo exports and browser interaction checks.

See [design, content and screenshot maintenance](docs/site-design.md) for source
references and the complete preview/review workflow.

## Development

```sh
npm install
npm run dev        # localhost:4321
npm run build      # build to ./dist/
npm run preview    # preview production build
```

## Shema product media

See [the media guide](docs/shema-media.md) for the current screenshot set, circular
video component, capture workflow and repeatable refresh script.

## License

MIT

## Brand assets

See [the identity guide](docs/brand/README.md) for the vector master, complete
SVG/PNG kit, favicons and usage. Run `npm run brand:build` to regenerate assets.
The local [brand preview](http://127.0.0.1:4322/brand/preview.html) includes downloads.
