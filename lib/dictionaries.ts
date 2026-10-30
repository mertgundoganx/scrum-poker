import 'server-only';
import en from './locales/en';
import tr from './locales/tr';
import de from './locales/de';
import fr from './locales/fr';
import it from './locales/it';
import ar from './locales/ar';
import zh from './locales/zh';
import type { Locale, Translations } from './translations';

const DICTIONARIES: Record<Locale, Translations> = { en, tr, de, fr, it, ar, zh };

type Key = keyof Translations;

/**
 * The interface text for a page's language, on the server: content pages render with
 * it directly, so it never reaches the browser.
 */
export function getDictionary(locale: Locale): Translations {
  return DICTIONARIES[locale];
}

/*
 * What goes to the browser (LanguageProvider) is only what client components read.
 * A client component that reads a new key needs it here, or it shows nothing (the
 * development build logs the missing key).
 */

/**
 * Every page: the header, footer, language and theme menus, the error and 404 views,
 * and the room's not-found view (it sits outside the room page).
 */
const CHROME_KEYS = [
  'navGuide', 'navBlog', 'navPricing', 'navMain', 'navMobile', 'menuOpen', 'menuClose',
  'guideLink', 'demoLink', 'btnCreate', 'heroSub', 'footerProduct', 'footerSource', 'footerLegal',
  'footerPrivacy', 'footerTerms', 'footerContact', 'footerDeployed', 'footerMonitored', 'footerEstimation',
  'homeLinkFibTitle', 'homeLinkTshirtTitle', 'homeLinkCardsTitle',
  'language', 'themeDark', 'themeToDark', 'themeToLight',
  'notFoundTitle', 'notFoundSub', 'btnBackHome',
  'errorTitle', 'errorSub', 'btnRetry', 'btnHomePage',
  'roomGoneTitle', 'roomGoneSub', 'btnHome',
] as const satisfies readonly Key[];

/** The home page's form and sections (app/HomeView.tsx), on top of the chrome. */
const HOME_KEYS = [
  'heroTitle', 'heroBadge', 'feat1', 'feat2', 'feat3', 'tabCreate', 'tabJoin', 'nameLabel',
  'avatarPickerLabel', 'avatarUseInitial', 'roomNameLabel', 'roomCodeLabel', 'deckTypeLabel',
  'deckScrum', 'deckFibonacci', 'deckTshirt', 'deckPowers', 'deckCustomLabel',
  'customCardsPlaceholder', 'customCardsHint',
  'errNameRequired', 'errRoomNameRequired', 'errRoomCodeRequired', 'errCustomCardsMin',
  'errCreateRoom', 'errRoomNotFound', 'errRoomCodeInvalid', 'errServerBusy', 'errNetwork', 'errJoin',
  'actionRateLimited',
  'btnCreating', 'btnJoin', 'btnJoining', 'btnCancel', 'noAccountNeeded',
  'keptRoomsTitle', 'keptRoomsRemove', 'stopKeepingTitle', 'stopKeepingConfirm', 'recentRooms', 'recentRoomsJoin',
  'you', 'previewRoomName', 'previewStory', 'copyLink', 'revealVotes', 'homePreviewCaption',
  'howTitle', 'howLead', 'howStep1Title', 'howStep1Desc', 'howStep2Title', 'howStep2Desc',
  'howStep3Title', 'howStep3Desc',
  'homeFeatTitle', 'homeFeatLead', 'homeFeatDecksTitle', 'homeFeatDecksDesc', 'homeFeatRevealTitle',
  'homeFeatRevealDesc', 'homeFeatStatsTitle', 'homeFeatStatsDesc', 'homeFeatChatTitle', 'homeFeatChatDesc',
  'homeFeatQueueTitle', 'homeFeatQueueDesc', 'homeFeatTimerTitle', 'homeFeatTimerDesc',
  'homeFeatSpectatorTitle', 'homeFeatSpectatorDesc', 'homeFeatInviteTitle', 'homeFeatInviteDesc',
  'homeWhatTitle', 'homeWhatP1', 'homeWhatP2', 'homeWhatP3',
  // One pair per entry of FAQ_KEYS (app/homeFaq.ts).
  'homeFaqTitle', 'homeFaqLead', 'homeFaq1Q', 'homeFaq1A', 'homeFaq2Q', 'homeFaq2A', 'homeFaq3Q',
  'homeFaq3A', 'homeFaq4Q', 'homeFaq4A', 'homeFaq5Q', 'homeFaq5A',
  'homeLearnTitle', 'homeLearnLead', 'homeLinkGuideTitle', 'homeLinkGuideDesc', 'homeLinkFibTitle',
  'homeLinkFibDesc', 'homeLinkTshirtTitle', 'homeLinkTshirtDesc', 'homeLinkCardsTitle', 'homeLinkCardsDesc',
  'homeLinkBlogTitle', 'homeLinkBlogDesc', 'homeLinkDemoTitle', 'homeLinkDemoDesc',
  'homeProjectsTitle', 'homeProjectsText', 'homeProjectsShipwickDesc', 'homeProjectsUptimeDesc', 'homeProjectsVisit',
  'proCtaTitle', 'proCtaDesc', 'proCtaBtn', 'demoCtaBtn',
] as const satisfies readonly Key[];

function pick(t: Translations, keep: (key: Key) => boolean): Partial<Translations> {
  return Object.fromEntries(Object.entries(t).filter(([key]) => keep(key as Key)));
}

const chrome = new Set<Key>(CHROME_KEYS);
const home = new Set<Key>(HOME_KEYS);

/** For the root layout: the text every page's client components use. */
export function chromeDictionary(locale: Locale): Partial<Translations> {
  return pick(DICTIONARIES[locale], key => chrome.has(key));
}

/** For the home page, on top of the chrome. */
export function homeDictionary(locale: Locale): Partial<Translations> {
  return pick(DICTIONARIES[locale], key => home.has(key) && !chrome.has(key));
}

/** For the room, on top of the chrome: everything else. */
export function roomDictionary(locale: Locale): Partial<Translations> {
  return pick(DICTIONARIES[locale], key => !chrome.has(key));
}
