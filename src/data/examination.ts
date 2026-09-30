import { languages } from './metanoia';

interface Commandment { code: string; content: string; custom_title: string; }
interface Question { id: string; text: string; }
interface QuestionGroup { commandmentCode: string; questions: Question[]; }

const commandments = import.meta.glob<Commandment[]>('./metanoia-content/commandments/*.json', { eager: true, import: 'default' });
const questions = import.meta.glob<QuestionGroup[]>('./metanoia-content/questions/*.json', { eager: true, import: 'default' });

export const examinationLocales = languages.map(language => ({
  ...language,
  slug: language.code.toLowerCase(),
  fileCode: language.code === 'pt-BR' ? 'pt_BR' : language.code,
  href: language.code === 'en' ? '/metanoia/examine/' : `/metanoia/examine/${language.code.toLowerCase()}/`,
}));

export function getExamination(slug = 'en') {
  const locale = examinationLocales.find(language => language.slug === slug);
  if (!locale) throw new Error(`Unknown examination language: ${slug}`);
  const titles = commandments[`./metanoia-content/commandments/commandments_${locale.fileCode}.json`];
  const groups = questions[`./metanoia-content/questions/questions_${locale.fileCode}.json`];
  if (!titles || !groups) throw new Error(`Missing examination content: ${slug}`);
  return {
    locale,
    total: groups.reduce((count, group) => count + group.questions.length, 0),
    sections: titles.map((commandment, index) => {
      const group = groups.find(group => group.commandmentCode === commandment.code);
      if (!group) throw new Error(`Missing questions for ${commandment.code}`);
      return { ...commandment, number: index + 1, anchor: `section-${index + 1}`, questions: group.questions };
    }),
  };
}
