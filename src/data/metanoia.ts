import home from '../assets/metanoia/2026-09-27/01_home.png';
import journal from '../assets/metanoia/2026-09-27/02_journal.png';
import examination from '../assets/metanoia/2026-09-27/04_examine_guided.png';
import penance from '../assets/metanoia/2026-09-27/06_penance.png';
import confession from '../assets/metanoia/2026-09-27/09_confession_mode.png';
import examen from '../assets/metanoia/2026-09-27/10_examen_scripture.png';
import security from '../assets/metanoia/2026-09-27/11_security.png';
import darkJournal from '../assets/metanoia/2026-09-27/12_journal_dark.png';
import icon from '../assets/metanoia/2026-09-27/icon.png';
export const metaImages = { home, journal, examination, penance, confession, examen, security, darkJournal, icon };
export const metaLinks = {
  apple: 'https://apps.apple.com/app/id6759740034',
  google: 'https://play.google.com/store/apps/details?id=dev.holystack.metanoia',
  github: 'https://github.com/holystack-dev/metanoia',
};
export const languages = [
  {code:'en',name:'English'}, {code:'es',name:'Español'}, {code:'pt-BR',name:'Português (Brasil)'},
  {code:'fr',name:'Français'}, {code:'de',name:'Deutsch'}, {code:'it',name:'Italiano'},
  {code:'pl',name:'Polski'}, {code:'tl',name:'Filipino'}, {code:'vi',name:'Tiếng Việt'},
  {code:'id',name:'Bahasa Indonesia'}, {code:'ko',name:'한국어'}, {code:'ml',name:'മലയാളം'},
  {code:'ta',name:'தமிழ்'}, {code:'hi',name:'हिन्दी'},
];
export const metaFaqs = [
  {question:'Is Metanoia free?',answer:'Yes. There are no ads, subscriptions or in-app purchases.'},
  {question:'Do I need an account or an internet connection?',answer:'No account is needed. Examination, confession preparation, journaling, prayers and penance tracking work offline. Opening external links, such as the app stores or GitHub, needs an internet connection.'},
  {question:'Where are my notes stored?',answer:'Your personal entries are encrypted and stored on your device. There is no cloud sync or analytics. Private areas require a PIN. You can also enable supported biometric authentication.'},
  {question:'Can I use it during confession?',answer:'Confession Mode brings together the opening words, your prepared notes, the Act of Contrition, penance and thanksgiving. Metanoia helps you prepare for confession with a priest; it does not replace the sacrament.'},
  {question:'What is the Daily Examen?',answer:'A guided reflection on your day, with Scripture, gratitude, an honest review and a resolution for tomorrow. Your reflections are saved in a private journal that you can revisit by date.'},
  {question:'Is the project open source?',answer:'The app code is available under the MIT licence. Its spiritual content has a separate Creative Commons BY-NC-ND 4.0 licence. You can read the source, report issues and contribute on GitHub.'},
];
