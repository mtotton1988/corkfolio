# Corkfolio

See what you have, and learn about it. A single-page app for a wine cellar held in bond:
what is there, when each bottle is ready, and what one costs once duty and VAT are paid.

Live at **https://mtotton1988.github.io/corkfolio/**

## What it does

A funnel, three levels deep, on three tabs.

**Cellar** — the whole cellar, then one region, then one sub-region. Each level answers the
same five questions about a smaller set of bottles: bottles, cases, value in bond, value at
market, and the cost duty paid. A region page adds a stylised map of the region behind it,
an essay on what distinguishes its wines, and a computed read of what the holding covers and
what it is missing.

**Wines** — the holdings themselves, ordered by how much drinking window is left, soonest
first.

**Windows** — every lot drawn as a bar across its drinking window, with a line for today.

Tap any wine for the duty-paid delivered price of one bottle with its breakdown, then notes
on the estate, who makes it, how it tastes, how to drink it, and the character of that
vintage in that region. Two links out: community tasting notes, and the market price.

Bottles that have left bond move to Home and consumed, with their prices frozen. They count
towards no total, because every total in the app is about what is still in bond and what
pulling it would cost.

## Privacy

**The app is public. The cellar is not.** Nothing in this repo contains a holding, a price or
a token. The reference files are general knowledge about wine — the sort of thing a reference
book holds — which is why they can ship with the app.

Your own holdings live in browser storage on your device, and optionally sync to a **private**
repo you own as a single `cellar.json`. Two files, `cellar.local.csv` and `home.local.csv`,
give a one-tap load when running locally; both are gitignored and must never be committed.

**No request ever leaves the device.** React and the typeface are served from this repo, all
five reference files ship with the app, and there is no CDN, no analytics and no telemetry.
The only outbound calls are the GitHub API, if you turn sync on, and the two links above when
you tap them.

## Running it

```bash
python -m http.server 8731 --directory corkfolio
```

No build step. Edit `index.html` and push.

## What's in the folder

| | |
| --- | --- |
| `index.html` | the whole app — every constant, all the logic, all three tabs |
| `wines.json` | estate notes |
| `vintages.json` | vintage character by region and year |
| `regions.json` | region essays, pronunciations, notable appellations |
| `maps.json` | stylised map geometry per region |
| `windows.json` | researched drinking windows |
| `vendor/` | React, served from here rather than a CDN |
| `fonts/` | the Newsreader typeface |
| `sw.js` | the service worker that makes it work offline |
| `manifest.webmanifest`, `app-icon.png` | installed-app name, colours and icon |

The reference notes carry **no critic scores**, deliberately: an invented number would be
worse than none, and a real one dates.

The maps are **stylised**. They get topology right — which bank an appellation sits on, the
order of communes down a slope — and are approximate in everything else. Do not measure
anything off them.

## Deploy

Push to a public repo, then **Settings → Pages → Source**: your branch, root folder.
Offline needs https, so it works on Pages and not from a local file.

If a change seems not to have arrived, suspect the caches before the edit — there are three
stacked: the service worker, the browser's HTTP cache, and whatever the page has already
parsed.

```javascript
navigator.serviceWorker.getRegistrations().then(r => r.forEach(x => x.unregister()));
caches.keys().then(k => k.forEach(n => caches.delete(n)));
```

## The engineering journal

The full notes — architecture, every design decision and why, the traps, the approaches
tried and rejected, measured contrast figures, open items — live in the **private** data
repo, `corkfolio-data`, as `NOTES.md`. They are kept out of this repo because they quote
real holdings and real values as worked examples.

Read them before changing anything non-obvious. Several decisions here look arbitrary and
are not, and at least four of the traps cost real time to find.
