// Keep the product page and discovery cards on the same capture set.
export const SHEMA_GITHUB = 'https://github.com/holystack-dev/shema';
export const SHEMA_CAPTURE = '2026-09-26';
export const screen = (name: string) => `/images/shema/screens/${SHEMA_CAPTURE}/${name}.png`;
export const tour = {
  src: `/videos/shema/${SHEMA_CAPTURE}/navigation-tour.mp4`,
  poster: screen('home'),
  duration: 157.7,
  chapters: [
    { label: 'Home', time: 0 },
    { label: 'Bible', time: 2.503 },
    { label: 'Bible in a Year', time: 19.450 },
    { label: 'Library', time: 35.378 },
    { label: 'Favourites', time: 63.836 },
    { label: 'Player & sleep timer', time: 75.992 },
    { label: 'Recent listening', time: 114.641 },
    { label: 'Settings', time: 120.731 },
  ],
};

export const listening = [
  { title: 'Browse the Bible', eyebrow: 'BIBLE', image: 'books-old-01', alt: 'Old Testament books on the Shema display', text: 'Browse all 73 books and choose a chapter. Switch between the languages and recordings on your card.' },
  { title: 'Bible in a Year', eyebrow: 'DAILY LISTENING', image: 'year-01', alt: 'Bible in a Year periods with their day ranges', text: 'BIY means Bible in a Year, a 365-day Bible listening plan. Episodes are grouped by period, with separate introductions and checkpoints.' },
  { title: 'Your audio library', eyebrow: 'LIBRARY', image: 'library-01', alt: 'Library folders for talks, prayers and songs', text: 'Organise songs, prayers and talks in folders. Browse subfolders, jump by letter or shuffle the tracks in a folder.' },
];

export const gallery = [
  { image: 'home', title: 'Home', text: 'Open Bible, Bible in a Year, Library, Recent, Favourites or Settings.' },
  { image: 'chapters-01', title: 'Chapters', text: 'A clear chapter grid with markers for what you have played.' },
  { image: 'year-days-01', title: 'Daily episodes', text: 'Daily episodes, organised into periods of the biblical story.' },
  { image: 'favourites', title: 'Favourites', text: 'Separate favourites for Bible chapters, daily episodes and Library tracks.' },
  { image: 'recent-01', title: 'Recent listening', text: 'Return to recent listening and resume where you left off.' },
  { image: 'sleep-01', title: 'Sleep timer', text: 'Set a sleep timer from 15 minutes to two hours.' },
  { image: 'settings-01', title: 'Bible settings', text: 'Choose your Bible recording and adjust display brightness.' },
  { image: 'settings-05', title: 'Appearance', text: 'Choose an accent colour, with screen timeout and power-off settings too.' },
];
