import type { ImageMetadata } from 'astro';
import { metaImages } from './metanoia';
import { screen } from './shema';

type ProjectMedia =
  | { kind: 'phone'; src: ImageMetadata; alt: string }
  | { kind: 'device'; src: string; alt: string };

export interface Project {
  id: string;
  name: string;
  href: string;
  category: string;
  description: string;
  tags: string[];
  media: ProjectMedia;
}

// The home page and project catalogue share this collection.
export const projects: Project[] = [
  {
    id: 'metanoia', name: 'Metanoia', href: '/metanoia', category: 'iOS & Android',
    description: 'Prepare for confession, reflect with the Daily Examen and keep a private journal. A companion for the Sacrament of Reconciliation and daily prayer.',
    tags: ['Confession', 'Daily Examen', '14 languages'],
    media: { kind: 'phone', src: metaImages.examination, alt: 'Metanoia examination of conscience with Quick Review questions and selected notes' },
  },
  {
    id: 'shema', name: 'Shema', href: '/shema', category: 'Offline audio Bible',
    description: 'Listen to Scripture on a device of its own. Browse Bible chapters, follow Bible in a Year, and add your own recordings of prayers, music and talks.',
    tags: ['Bible chapters', 'Audio library', 'Open firmware'],
    media: { kind: 'device', src: screen('home'), alt: 'The full Shema device, including its round touchscreen, speaker enclosure and USB ports' },
  },
];
