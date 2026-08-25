/* ============================================================================
   Corkfolio service worker — makes the app work with no connection.

   On first visit it copies the app and everything it needs into a local
   cache. After that it opens instantly, offline, from the home screen.

   Three rules, in order of how much staleness each can tolerate:

     the page itself   network first, cache as backup
                       so a pushed update always lands when there is signal
     the reference     network first, cache as backup
       JSON            wines.json and vintages.json are content, not vendor
                       assets - they get corrected often, and cache-first
                       meant an edit silently never arrived. This was found
                       the hard way: a corrected vintage note was invisible
                       in the app for a good while after the file changed.
     our own assets    cache first
                       React and the fonts never change; never re-fetch them
     everything else   pass straight through
                       api.github.com, when sync is set up, and nothing else.
                       A sync reply must never be cached: a stale one would
                       make the next merge run against the wrong data and
                       could push a bottle back that was already drunk.
                       Anything else cross-origin means something was added
                       that was not meant to be, and letting it through
                       uncached is the right response either way.

   Bump CACHE when the PRECACHE list changes, so old copies get cleared out.
   Editing index.html alone needs no bump: the page is fetched network-first.
============================================================================ */

const CACHE = 'corkfolio-v11';

const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './wines.json',
  './vintages.json',
  './maps.json',
  './regions.json',
  './windows.json',
  './app-icon.png',
  './vendor/react.js',
  './vendor/react-dom.js',
  './fonts/newsreader-latin.woff2',
  './fonts/newsreader-latin-ext.woff2',
  './fonts/newsreader-italic-latin.woff2',
  './fonts/newsreader-italic-latin-ext.woff2',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    /* One at a time rather than addAll, so a single failure cannot throw the
       whole install away and leave the app with no offline copy at all. */
    await Promise.all(PRECACHE.map(async url => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (e) {
        console.warn('[sw] could not precache', url, e);
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    /* Only ever delete caches that are ours. Another app on the same origin
       is not this worker's business. */
    await Promise.all(names.map(n =>
      (n === CACHE || !n.startsWith('corkfolio-')) ? null : caches.delete(n)));
    await self.clients.claim();
  })());
});

/* Let the page ask for an immediate update rather than waiting for a reload. */
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   /* never cache anything third-party */

  /* The page AND the reference JSON: prefer the network so edits arrive, fall
     back to the copy so both still work with no signal. Anything served this
     way needs no CACHE bump when it changes, which is the point - the
     reference notes are the files most likely to be edited. */
  const isRef = url.pathname.endsWith('.json') && !url.pathname.endsWith('.webmanifest');
  if (isRef || req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith((async () => {
      try {
        /* cache: 'reload' matters more than it looks. A plain fetch(req)
           here is allowed to be answered from the browser's own HTTP
           cache, so "network first" quietly became "whatever the browser
           had" - the page ran a stale copy of itself for a while and the
           edit looked as though it had never been made. Forcing a
           revalidation is what makes the rule mean what it says. */
        const fresh = await fetch(req.url, { cache: 'reload', credentials: 'same-origin' });
        const cache = await caches.open(CACHE);
        cache.put(isRef ? req : './index.html', fresh.clone());
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE);
        if (isRef) {
          const hit = await cache.match(req);
          /* An empty reference file is better than a failed fetch: the app
             reads it as "no notes yet" and every other screen still works. */
          return hit || new Response('{"wines":[],"vintages":{}}',
                                     { headers: { 'Content-Type': 'application/json' } });
        }
        return (await cache.match('./index.html')) ||
               (await cache.match('./')) ||
               new Response('Corkfolio is offline and has no saved copy yet.',
                            { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    })());
    return;
  }

  /* Our own assets: cache first, and remember anything new we had to fetch. */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    } catch (e) {
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});
