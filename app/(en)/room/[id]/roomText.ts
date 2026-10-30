import type { Locale } from '@/lib/translations';

/**
 * Room-only UI strings that are not (yet) part of lib/translations.ts.
 * Everything else in the room reuses the shared `t.*` keys.
 */
export interface RoomText {
  more: string;
  language: string;
  darkTheme: string;
  story: string;
  vote: string;
  inQueue: string;
  close: string;
  send: string;
  avatar: string;
  deck: string;
  host: string;
  spectator: string;
  away: string;
  remove: string;
  removeStory: string;
  recentRounds: string;
}

export const ROOM_TEXT: Record<Locale, RoomText> = {
  en: {
    more: 'More', language: 'Language', darkTheme: 'Dark theme', story: 'Story', vote: 'Vote',
    inQueue: 'in queue', close: 'Close', send: 'Send', avatar: 'Avatar', deck: 'Deck',
    host: 'Host', spectator: 'Spectator', away: 'Away', remove: 'Remove', removeStory: 'Remove story',
    recentRounds: 'Recent rounds',
  },
  tr: {
    more: 'Diğer', language: 'Dil', darkTheme: 'Koyu tema', story: 'Hikaye', vote: 'Oy ver',
    inQueue: 'sırada', close: 'Kapat', send: 'Gönder', avatar: 'Avatar', deck: 'Deste',
    host: 'Oda sahibi', spectator: 'İzleyici', away: 'Uzakta', remove: 'Çıkar', removeStory: 'Hikayeyi kaldır',
    recentRounds: 'Son turlar',
  },
  it: {
    more: 'Altro', language: 'Lingua', darkTheme: 'Tema scuro', story: 'Storia', vote: 'Vota',
    inQueue: 'in coda', close: 'Chiudi', send: 'Invia', avatar: 'Avatar', deck: 'Mazzo',
    host: 'Host', spectator: 'Spettatore', away: 'Assente', remove: 'Rimuovi', removeStory: 'Rimuovi storia',
    recentRounds: 'Round recenti',
  },
  fr: {
    more: 'Plus', language: 'Langue', darkTheme: 'Thème sombre', story: 'Story', vote: 'Voter',
    inQueue: 'en file d’attente', close: 'Fermer', send: 'Envoyer', avatar: 'Avatar', deck: 'Jeu de cartes',
    host: 'Hôte', spectator: 'Spectateur', away: 'Absent', remove: 'Retirer', removeStory: 'Retirer la story',
    recentRounds: 'Tours récents',
  },
  ar: {
    more: 'المزيد', language: 'اللغة', darkTheme: 'الوضع الداكن', story: 'القصة', vote: 'صوّت',
    inQueue: 'في القائمة', close: 'إغلاق', send: 'إرسال', avatar: 'الصورة الرمزية', deck: 'مجموعة البطاقات',
    host: 'المضيف', spectator: 'مشاهد', away: 'غائب', remove: 'إزالة', removeStory: 'إزالة القصة',
    recentRounds: 'الجولات الأخيرة',
  },
  de: {
    more: 'Mehr', language: 'Sprache', darkTheme: 'Dunkles Design', story: 'Story', vote: 'Abstimmen',
    inQueue: 'in der Warteschlange', close: 'Schließen', send: 'Senden', avatar: 'Avatar', deck: 'Deck',
    host: 'Host', spectator: 'Zuschauer', away: 'Abwesend', remove: 'Entfernen', removeStory: 'Story entfernen',
    recentRounds: 'Letzte Runden',
  },
  zh: {
    more: '更多', language: '语言', darkTheme: '深色主题', story: '故事', vote: '投票',
    inQueue: '在队列中', close: '关闭', send: '发送', avatar: '头像', deck: '牌组',
    host: '主持人', spectator: '旁观者', away: '暂时离开', remove: '移除', removeStory: '移除故事',
    recentRounds: '最近几轮',
  },
};
