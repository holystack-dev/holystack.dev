import { examinationLocales } from './examination';

export interface ReadingSection { id?: string; title: string; subtitle?: string; content: string; }
interface Guide { title: string; subtitle: string; sections: ReadingSection[]; }
interface Prayer extends Omit<ReadingSection, 'content'> { id: string; content?: string; sections?: ReadingSection[]; }
interface Prayers { subtitle: string; categories: { id: string; title: string; prayers: Prayer[] }[]; }
interface FAQ { heading: string; title: string; content: string; }
interface Invitation { subtitle: string; sections: ReadingSection[]; }

const guides = import.meta.glob<Guide>('./metanoia-content/confession_guide/*.json', { eager: true, import: 'default' });
const prayers = import.meta.glob<Prayers>('./metanoia-content/prayers/*.json', { eager: true, import: 'default' });
const faqs = import.meta.glob<FAQ[]>('./metanoia-content/faqs/*.json', { eager: true, import: 'default' });
const invitations = import.meta.glob<Invitation>('./metanoia-content/invitation/*.json', { eager: true, import: 'default' });

export const guideLocales = examinationLocales.map(locale => ({ ...locale, href: locale.slug === 'en' ? '/metanoia/guide/' : `/metanoia/guide/${locale.slug}/` }));

// Omit mobile-only promotion and saved-progress instructions in the reading website.
// The same three paragraphs occur at these positions in all 14 source translations.
export function webReadingContent(content: string, section: string, kind: 'guide' | 'invitation') {
  const omitted = kind === 'guide' && ['before_confession', 'tips'].includes(section) ? 3 : kind === 'invitation' && section === 'fear_memory' ? 5 : -1;
  return content.split('\n\n').filter((_, index) => index !== omitted).join('\n\n');
}

export function getGuide(slug = 'en') {
  const locale = guideLocales.find(locale => locale.slug === slug);
  if (!locale) throw new Error(`Unknown guide language: ${slug}`);
  const guide = guides[`./metanoia-content/confession_guide/confession_guide_${locale.fileCode}.json`];
  const prayerBook = prayers[`./metanoia-content/prayers/prayers_${locale.fileCode}.json`];
  const questions = faqs[`./metanoia-content/faqs/faqs_${locale.fileCode}.json`];
  const invitation = invitations[`./metanoia-content/invitation/invitation_${locale.fileCode}.json`];
  if (!guide || !prayerBook || !questions || !invitation) throw new Error(`Missing guide content: ${slug}`);
  return {
    locale,
    guide: { ...guide, sections: guide.sections.map(section => ({ ...section, content: webReadingContent(section.content, section.id!, 'guide') })) },
    prayerBook,
    faqGroups: [...new Set(questions.map(item => item.heading))].map(heading => ({ heading, items: questions.filter(item => item.heading === heading) })),
    invitation: { ...invitation, sections: invitation.sections.map(section => ({ ...section, content: webReadingContent(section.content, section.id!, 'invitation') })) },
    examinationHref: examinationLocales.find(item => item.slug === slug)!.href,
  };
}
