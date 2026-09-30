import examination from '../assets/metanoia/2026-09-30/01_examine.png';
import examen from '../assets/metanoia/2026-09-30/02_journal.png';
import confession from '../assets/metanoia/2026-09-30/03_confess.png';
import prayers from '../assets/metanoia/2026-09-30/04_prayers.png';
import guide from '../assets/metanoia/2026-09-30/05_guide.png';
import languageSettings from '../assets/metanoia/2026-09-30/06_languages.png';
import privacy from '../assets/metanoia/2026-09-30/07_privacy.png';
import penance from '../assets/metanoia/2026-09-30/08_penance.png';
import journal from '../assets/metanoia/2026-09-30/extras/alt_journal_calendar.png';
import security from '../assets/metanoia/2026-09-30/extras/alt_security.png';
import icon from '../assets/metanoia/2026-09-27/icon.png';
export const metaImages = { examination, examen, confession, prayers, guide, languageSettings, privacy, penance, journal, security, icon };
export const metaLinks = {
  apple: 'https://apps.apple.com/app/id6759740034',
  google: 'https://play.google.com/store/apps/details?id=dev.holystack.metanoia',
  github: 'https://github.com/holystack-dev/metanoia',
};
// Reviews supplied by the user from store screenshots and the Play Console.
// App Store screenshots omit the year. Ratings are visible in supplied screenshots.
export const metaReviews = [
  {title:'Great app',author:'GoDisney2005',platform:'apple',date:'4 September',rating:5,
    quote:'If you’re looking for an awesome app to help you with confession this is it. Whether your last confession was one day ago or ten years ago Metanoia walks you through confession step by step.',excerpt:true,translated:false},
  {title:'Best Confession App I’ve Used',author:'ClintYeastwood',platform:'apple',date:'29 May',rating:5,
    quote:'I’ve used probably half a dozen different apps for confession in the past, and this is certainly the best. It combines features that I have really liked across all of the different ones.',excerpt:true,translated:false},
  {title:null,author:'Giorgos Michailidis',platform:'google',date:'30 September 2026',rating:5,
    quote:'This is the first time I\'ve used this type of application and I can say that I\'m pleased. … This app helped me to realise how incomplete my confessions have been until now.',excerpt:true,translated:false},
  {title:null,author:'Vanessa Villada',platform:'google',date:'10 August 2026',rating:5,
    quote:'I loved it, I\'m still exploring it but what I\'ve found so far has delighted me',excerpt:false,translated:true},
] as const;
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
