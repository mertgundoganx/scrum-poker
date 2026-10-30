/*
 * The site's own inline scripts (rendered with app/InlineScript.tsx). The room's
 * Content-Security-Policy allows exactly these texts by their hash (proxy.ts hashes
 * them from here), so a change to one can't leave its hash behind.
 */

/** In <head> on every page: the theme before paint, so a dark page doesn't flash light. */
export const SET_THEME = `(function(){try{var t=localStorage.getItem('scrumPoker_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

/** At the end of <body> on every page: the service worker, once the page has loaded. */
export const REGISTER_SERVICE_WORKER = `if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js'))}`;

// Runs while the room page is still loading, before the page's own code and the
// analytics beacon: the owner key leaves the address bar (where scripts read
// the URL) at once; the room page picks it up from sessionStorage.
export const TAKE_OWNER_KEY = `try{var m=/(?:^#|&)owner=([A-Za-z0-9_-]{43})/.exec(location.hash);if(m){sessionStorage.setItem('scrumPoker_ownerKey',location.pathname.split('/').pop().toUpperCase()+' '+m[1]);history.replaceState(history.state,'',location.pathname+location.search)}}catch(e){}`;

/** Every inline script a room page can carry. */
export const ROOM_INLINE_SCRIPTS = [SET_THEME, REGISTER_SERVICE_WORKER, TAKE_OWNER_KEY];
