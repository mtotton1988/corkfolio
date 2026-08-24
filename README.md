# Corkfolio

See what you have, and learn about it.

---

## Start here

**State of the build, 24 August 2026.** Working and complete enough to use. Not yet
deployed, not yet in git, not yet opened on a phone.

Since 23 August: the sub-region table was widened from France-and-Piedmont to the
classic BBR range and measured against the whole BBX catalogue, which turned up a
producer-inference bug and fixed it; the Windows tab says out loud when it cannot place
a lot; and the donut legend's percentages were dark enough to read.

**The app was also looked at, for the first time.** Every check before 24 August was made
against the DOM. The first screenshot found a layout bug in the first screen — see *The
stat row that would not stay on one line* under *Traps* — which is roughly what you would
expect from a build that had never been seen.

**The donut counts bottles as of 24 August**, not cases, because a BBR case is 3, 6 or 12
bottles. The stat row still counts cases. See *The ring is bottles*.

**The mark now carries the app's initials**, and the home-screen icon is the app's own
rather than Memoire's. See *The mark, and the icon*.

**Estate pronunciations arrived on 24 August**, under the name on the wine sheet, matching
what the appellations already had.

**Sync arrived on 24 August**, to a private GitHub repo, off by default. See *Sync*.

**History arrived on 24 August**, and is now called *Home and consumed*. A bottle that was in one export and not the next has been
pulled from bond for drinking, so it now moves into history with what it cost instead of
disappearing. See *Where the drunk bottles go*.

**Two things were taken out on 24 August, by request.** The evening palette, along with the
Appearance control in Settings: one set of colours is one set to get right. And the delivery
charge, along with its field — there is no delivery charge to pay, so it was a question with
no answer and a line on every price breakdown that always read zero.

**To run it:**

```bash
python -m http.server 8731 --directory corkfolio
```

Open `http://localhost:8731`. A file called `cellar.local.csv` sits beside `index.html`,
so the empty state offers **Load the export in this folder** — one tap and you have the
real cellar. That file is gitignored and must never reach a public repo.

**If the app looks stale after an edit, suspect the caches before the edit.** There are
three stacked: the service worker, the browser HTTP cache, and whatever the page has
already parsed. This cost real time twice. Unregister the worker and delete the caches:

```javascript
navigator.serviceWorker.getRegistrations().then(r => r.forEach(x => x.unregister()));
caches.keys().then(k => k.forEach(n => caches.delete(n)));
```

**What is done:** the funnel, three tabs, the wine sheet with delivered prices, 44 estate
notes, 27 vintage notes, 6 region essays, 6 researched maps, 5 researched drinking
windows, 35 pronunciations, 192 sub-regions, the logo, the reference-coverage report.

**What is open** is at the bottom of this file under *Open items*. The two that matter
most: nothing has been tested on an actual iPhone, and neither outbound link URL has been
verified.

**Archived, one directory up, outside the deployed folder:**
`corkfolio-v0-four-screens.html.bak` and `corkfolio-v0-README.md.bak` — the earlier
version with the BBX bid engine. Recoverable, not lost.

---

## What the app is

**The purpose is to understand what is in bond and when to pull it.** Everything else
follows from that sentence, and most of the questions worth asking about this app are
answered by it.

A bottle that leaves bond stops being owned, as far as the app is concerned. Not because
that is literally true — it is in a rack in the house — but because there is no longer a
decision to make about it. It will be drunk. The totals, the donut, the readiness states
and the timeline all exist to answer *what should I pull next*, and a bottle already pulled
cannot be the answer. So it moves to Home/Consumed with its price frozen, counts towards
nothing, and stops competing for attention with the bottles that still need a decision.

Two things are borrowed from elsewhere, and both are links rather than data. Each wine sheet
carries a **Community tasting notes** button with CellarTracker's mark on it, and a
**Wine-Searcher** mark at the top right of the identity block, beside the maturity chip. The
first opens a search for other people's notes on that wine and vintage; the second opens
Wine-Searcher's page for it, with `/uk` on the end, because a dollar price answers nobody's
question about a bottle that would be delivered to a house in Britain.

Two links, two questions: what is it like, and what is it worth. That is why they sit in
different places - the notes go down with the prose, the price goes up with the app's own
numbers. Thousands of notes per wine, written over years by people who drank
the same bottle, is the one thing a reference file written by anybody cannot be. It is a
link and not a request: the app fetches nothing, and could not - see *Approaches tried and
rejected*. Tapping it hands over the name of one wine and nothing else about the cellar.

Both marks are **drawn in the source, not fetched** - same two reasons as everything else
here, no third-party request and it has to work with no connection - and both are evocations
rather than facsimiles: CellarTracker's two speech bubbles in their two colours, and
Wine-Searcher's bottle-and-lens over its wordmark on a charcoal pill, each set in this app's
own sans. They are somebody else's trademarks, used to say where a button goes, which is
what a trademark is for - worth a thought before this app is published anywhere public, and
the alternative is their names as plain text.

**Both were laid out against measured text, after both were first drawn wrong the same way.**
"TRACKER" finished 0.2 units short of its own bubble's edge; "wine-searcher" was set at 15px
in a 132-unit box the word needed 141 of, and shipped for about ten minutes reading
"wine-search". A word cut off by its own frame reads as a mistake at any size, and the only
reliable fix is to measure the rendered text and size the box from it. If a font size or a
corner radius changes on either mark, measure again.

The Wine-Searcher plate is a **full pill**, matching the maturity chip it sits beside, and
that radius is what sets its width: a pill's curve is still 13 units inside the box at the
height the word sits at, so a 146-unit word needs a 192-unit plate rather than the 178 a
square-cornered one needed. The row it lives in also had to be told `alignItems: 'center'` -
a flex row stretches its children by default, and a mark twice the height of a chip turned
that chip into a tall rounded box.

There is no caption under the button. One used to say that it opens CellarTracker and needs
a connection; the mark says the first half and the browser says the second, and a line that
repeats what a logo just told you is how people learn to stop reading the useful ones.

This is also why the app does not try to be a tasting journal. What a wine was like on the
night, who was there, a score out of a hundred: all worth recording, none of it in service
of what to pull next, and all of it a different app. `notes` exists for the things that do
serve the purpose — a drinking window you have pinned by hand, a producer the importer got
wrong — and nothing else.

A funnel, three levels deep, on three tabs.

**Cellar** is the funnel. The whole cellar, then one region, then one sub-region. Each
level answers the same five questions about a smaller set of bottles — bottles, cases,
value in bond, value at market, and the cost duty paid — and the way down is by tapping
a donut segment rather than setting a filter. **The ring divides bottles, and the numbers
above it count cases** — see *The ring is bottles* below for why those are different
units on purpose. A region page adds a background map, an
essay about the region, a computed summary of what you hold there, and a computed list
of gaps. Tapping a sub-region hands over to the Wines tab.

**Wines** is the holdings themselves, carrying whatever region, sub-region and readiness
you arrived with. Always ordered by how much drinking window is left, soonest first.

Two chips at the top say which side of the bonded warehouse you are looking at: **In-bond**
and **Home/Consumed**, each with its bottle count. They are a second axis rather than two
more readiness states - readiness is about a wine, this is about where the bottles are, and
a bottle can be both At best and at home. One of the two is always active, defaulting to
in-bond, because a row of chips with none selected reads as "no filter" and here there is
no such state. Their dots are square where the maturity dots are round, so the two rows can
be told apart without reading them.

Switching sides clears the readiness filter: a count taken from one set says nothing about
the other, and leaving "Closing" lit while the list changed underneath it was the confusing
version. The maturity chips disappear entirely on the Home/Consumed side, because a bottle
that has left bond does not have a live maturity. Both sides honour the funnel, so drilling
into Bordeaux and switching answers "what have I drunk of my Bordeaux".

**Windows** is every lot drawn as a bar across its drinking window with a line for today,
sorted soonest-to-close, whole cellar regardless of where you are in the funnel. The year
axis is sticky.

Tap any wine anywhere for the detail sheet: the duty-paid delivered price of one bottle
with its breakdown, the holding, then prose on the estate, who makes it, how it tastes,
how to drink it, and the character of that vintage in that region.

No build step. Edit `index.html` and push.

### Why the funnel replaced a mode switch

An earlier version put Windows, Regions and Vintages on a segmented control. The funnel
is better because the question is nested: how much have I got, then how much is Bordeaux,
then what is my Pauillac, then what is this bottle. A mode switch answers those in the
wrong order and makes you rebuild your place every time you change mode.

Before that it was four screens — Tonight, Cellar, a BBX market screen with a bid engine,
and Verdicts. The bid engine was the most interesting thing in it and the least used: it
calibrated a price ladder against wines already owned, screened twenty thousand asks to a
shortlist and produced a bid for each, and then sat there, because the cellar it was
buying for was already full of wine that wanted drinking.

## What's in the folder

| | |
| --- | --- |
| `index.html` | the whole app — every constant, all the logic, all three tabs |
| `wines.json` | 44 estate notes, 43 of them with a pronunciation |
| `vintages.json` | 27 region-years of vintage character |
| `regions.json` | 6 region essays, 35 pronunciations, 41 notable appellations |
| `maps.json` | researched map geometry for 6 regions |
| `windows.json` | 5 researched drinking windows |
| `vendor/` | React, served from here rather than a CDN |
| `fonts/` | Newsreader, four woff2 files |
| `sw.js` | the service worker |
| `manifest.webmanifest` | name, colours, icon |
| `app-icon.png` | home-screen icon, 512×512. The app's own mark, drawn from the same geometry the header uses |
| `.gitignore` | keeps `cellar.local.csv` out of the repo |
| `cellar.local.csv` | your holdings. Local convenience only, never committed |

**Nothing leaves the device unless you turn sync on.** React and the typeface are served
from this repo, all five reference files ship with the app, and there is no CDN, no
analytics, no telemetry and no third-party anything. The BBR export is read by the browser
and never uploaded.

The one exception is deliberate and off by default: **GitHub sync**, which writes one file
to a private repository you own. Set it up and your holdings and prices do leave the
device — to your own repo, over https, and nowhere else. Until then the app makes no
network call of its own at all, which is why the service worker treats any cross-origin
request other than `api.github.com` as a sign that something was added that should not
have been.

The typeface and vendored React are copied from Memoire deliberately — same hand, same
shelf, and it guarantees the two apps run the same React build.

## Deploy on GitHub Pages

1. Push this folder to a **public** repository.
2. **Settings → Pages → Source**: your branch, root folder.
3. Live at `https://<username>.github.io/<repo>/`.

The app is public; your cellar is not. Nothing in the repo contains a bottle or a price.
The reference files are general knowledge about wine — the sort of thing a reference book
holds — which is why they can be public. Holdings live in browser storage and nowhere else.

**There is no git repo yet.** The folder syncs via OneDrive, which is how it reaches
another machine today. Initialising git and pushing is an open item.

## Use on iPhone

Safari → **Share → Add to Home Screen**. Designed phone-first: one-handed, one screen at
a time, a breadcrumb rather than a back button, everything else in sheets.

## Offline

Open once with a connection and the worker copies the app, React, the fonts and all five
reference files onto the device.

Three caching rules, in order of how much staleness each can tolerate. **The page and
every `.json` are network-first**, so an edit lands as soon as you open the app online,
with the cached copy as the offline fallback. **React and the fonts are cache-first**,
because they never change. Anything cross-origin passes straight through uncached — and
since the app makes no network call of its own, a cross-origin request means something
was added that should not have been.

Only a change to the *file list* in `sw.js` needs `CACHE` bumped. Currently
`corkfolio-v6`.

**Offline needs https.** Service workers only run on a secure origin or `localhost`.

## Where your cellar lives

Browser storage, on that device. **Never rename a key** — existing data becomes unreachable.

| Key | Holds |
| --- | --- |
| `corkfolio.lots.v1` | the cellar as last imported. Facts: replaced wholesale by each import |
| `corkfolio.notes.v1` | opinions, one per lot key. Nothing writes to it yet |
| `corkfolio.history.v1` | **Home and consumed.** Bottles that have left bond, with their prices frozen. Accumulated by the app, never counted in a total. Still called `history` because a key cannot be renamed without orphaning what is under it |
| `corkfolio.history-deleted.v1` | tombstones, so removing an entry survives a sync instead of being pushed back by the other device |
| `corkfolio.sync.v1` | `{ token, repo }` if sync is set up. Belongs to one device and is never synced itself |
| `corkfolio.prefs.v1` | **nothing, now.** It held the theme and the delivery charge, and both went on 24 August. Nothing reads or writes it; an old copy may still sit on a device, which is harmless. Do not reuse the name for something of a different shape |
| `corkfolio.preupgrade.v1` | a one-off copy, written once on a new version's first run |

`corkfolio.notes.v1` is empty by design and exists anyway. The importer already reads a
pinned drinking window and a corrected producer out of it, and a pinned window already
beats the export's. Fixing the shape now, while there is nothing in it, is far cheaper
than inventing it on the day you first need it and then migrating records written before
you understood the problem.

## Home and consumed

The export is the whole truth about what sits in bond, and the only file there is to import.
So a lot that drops out of it, or a case that comes back with six bottles instead of twelve,
means those bottles were pulled for drinking. Losing them from the app would be losing the
most interesting thing about a drinking cellar — what you actually drank, and what it had
cost by the time it reached the table.

On import, Corkfolio compares the bottle count of every lot against the last import and
moves whatever has gone into `history`. **It counts bottles, not wines**, because pulling six
of twelve is how a cellar is actually drunk: waiting for a lot to disappear entirely would
leave history empty for years, and the common case invisible. A lot can be half live and
half in history, and a lot that shrinks and later grows was drunk and then bought again —
both true at once, which only bottle-level accounting can say.

**The prices freeze.** Each entry keeps what was paid, what the mark was, and what a bottle
cost delivered on the day it left. A wine you have drunk cost what it cost; a market value
that carried on moving afterwards would be a number about a bottle you no longer own.

**Nothing in Home/Consumed counts towards any total.** The totals read `lots`, and this is a
separate key, so it is structural rather than a rule someone has to remember. It follows
from the purpose: the totals answer what is in bond and what pulling it would cost, and a
bottle already at home is not part of that question.

One consequence, and it is correct rather than a defect: **a region drunk to its last bottle
leaves the funnel.** The donut draws what is in bond, so a region with nothing left there has
no segment to tap and no page to reach — which is right, because there is nothing left to
decide about it. The bottles are still in Home/Consumed and still findable by search, and the
region comes back the day you buy there again.

**On the name.** It was called *history* while it was being built, and the label is now
*Home and consumed*, because leaving bond is not the same as being drunk: six bottles
collected in March may sit in a rack until Christmas. One bucket still covers both, which
is honest about what the app can actually know — the export says a bottle left bond and
says nothing about what happened next. The code and the storage key still say `history`,
and will keep saying it: a label can change freely, a key cannot be renamed without
orphaning the data already under it.

It is reached from the Cellar screen — "9 bottles at home or consumed", under the funnel —
rather than from Settings, because "what happened to that case" is a question you ask while
looking at a total it has deliberately been left out of. The line only appears once there is
something to show.

### Search finds it, at the bottom

A bottle you have drunk is still a bottle you might look for — more so, arguably, since the
app is the only place that remembers it. So a search covers history as well, and every
history hit sits **below every live one**: "have I got any" is answered by the cellar, and
"did I have any" by what follows it.

The tile is washed in wine red with **AT HOME** at the right where the maturity state would
be, so it is unmistakable before a word is read. It keeps the shape of a wine row with three
things swapped: no maturity state, because a bottle that has gone does not have one; the date
it left where the drinking window would be; and the price frozen at what it cost delivered.
Tapping it opens history rather than a lot sheet — the lot is gone, and the next import will
not bring it back.

History stays out of the five numbers above the results, which count what you hold. If a
search matches only history the eyebrow says **"Nothing in the cellar matches"** rather than
"Nothing matches", and no numbers are shown — there is nothing to add up.

The wash is `--hist`, the same wine red as the Burgundy region marker. That is a coincidence
rather than a statement, and it is a separate token so that changing one never quietly
changes the other: this one is a tint across a whole tile, not a 3px swatch, and the word
carries the meaning. Measured on the page: the title reads 12.88:1 against the wash and the
HISTORY label 8.59:1.

### The two things that could go wrong, and what stops them

**Importing an older export.** A stale or truncated file looks exactly like a cellar someone
drank most of. So an import that would move more than a quarter of the bottles into history
stops and says how many, across how many wines, and cancelling changes nothing at all.
Tested: a file 156 bottles lighter than the loaded one asked first, and after cancelling both
storage keys were byte-for-byte identical.

**A bottle recorded as drunk that was not.** BBR dropping a row and putting it back, or two
exports imported out of order, invents a bottle. Every entry therefore carries **Not drunk —
remove**, which is the only thing that ever deletes from history. The import path only ever
appends.

The app cannot know the evening a bottle was opened — only which import first noticed it was
gone — so an entry says "left 24 Aug 2026" and never states a time.

## Sync

Off by default. Settings → *Set up sync to a private repo*, and the app keeps one
`cellar.json` in a repository you own, so a second device sees the same cellar.

Ported from Memoire, whose sync has been running longer, and whose shape is the part worth
copying: pull, merge, write back **only if the merge differs from what is already there**,
and retry once against the newer file if another device wrote in between. Serialising with
sorted keys is what makes that comparison possible — two runs over the same data produce
byte-identical JSON, so opening the app does not create a commit.

### Setting it up

1. Create a repository on GitHub and make it **private**.
2. Create a fine-grained token with **Contents: read and write**, scoped to that repository
   and nothing else.
3. Paste both into Settings. The token is kept on that device and sent to nobody but GitHub.

**Do not point it at the repository the app is published from.** That one is public by
necessity — it is how GitHub Pages serves the app — and `cellar.json` holds every bottle
you own and what you paid. Two repos: a public one for the code, a private one for the
cellar. This is the single mistake in this whole app that could not be undone.

Fine-grained tokens expire, a year at most. When one does, sync says the token has likely
expired rather than reporting a mystery failure.

### Three kinds of data, three merge rules

A single rule would be wrong for two of them.

**Lots are a snapshot: newest import wins, whole.** Two devices holding different exports
is not a conflict to resolve row by row — it is a question of which export is more recent,
and merging them would invent a cellar that never existed. A snapshot with no `importedAt`
loses to one that has it.

**Home and consumed is an append-only log: union by event id.** Nothing edits an event, so
there is no newest-wins question. An event's id is its lot key and the import stamp, which
is unique because a lot yields at most one event per import; entries written before sync
existed have one backfilled on read.

**Notes are per lot key: newest edit wins**, which is why every note carries `updatedAt`.
Nothing writes notes yet, so that field was added now rather than invented on the day there
is data to migrate — the same argument that created the key in the first place.

### Removals need tombstones

Removing an entry by hand and simply keeping a shorter list does not work: the other device
still holds it, cannot tell a removal from news it has not heard, and pushes it straight
back. So a removal writes a tombstone, tombstones travel in the same file, and they expire
after 90 days. A device that has not synced in longer than that can still resurrect
something it never heard was removed — unavoidable without keeping deletion records forever.

### What is not synced

The token and repo, which belong to one device. And `corkfolio.preupgrade.v1`, which is a
local escape hatch — a copy of it arriving from another device would be worse than useless.

### Tested, and not tested

The merge rules and the sync loop were tested against a stubbed GitHub in the page: first
run against an empty repo, a no-op sync that correctly writes nothing, pulling an entry this
device had never seen, a removal surviving two subsequent syncs, and a lost race answered
with one retry that kept both devices' entries. Also the 401 and 404 messages.

**It has never run against real GitHub.** That needs a token, which belongs to you and
should not pass through anyone else's hands, so the last mile is yours to walk: create the
private repo, connect, and check that `cellar.json` appears with the right contents.

## Facts and opinions never touch

You will re-import the export dozens of times. Everything that would make this app yours
rather than BBR's is data BBR does not hold and would overwrite. So **facts** (`lots`) are
regenerated wholesale by each import and never hand-edited, and **opinions** (`notes`) are
hand-owned and survive every re-import. Different keys, so the mistake is impossible
rather than merely unlikely.

`history` is a third kind, and it needed its own key for a reason worth stating: it is
neither a fact BBR holds nor an opinion you typed, but something **only the app can know**,
because it comes from noticing a difference between two imports. Nobody else was watching.
Had it lived in `lots` it would have been erased by the very next import — by the same
wholesale replacement that makes `lots` trustworthy.

### The lot key, and why Parent ID is not enough

A lot is a holding, not a wine. `Parent ID` identifies a wine and a vintage, so on its own
it matched a case of d'Issan 2010 *bottles* to a case of *magnums*, and a Volnay
Taillepieds to a *jeroboam*. And you hold two lots of Batailley 2022 differing only in
what you paid.

    lot_key = Parent ID + Bottle Volume + Purchase Price per Case

Colliding keys get a `#2` suffix rather than one being dropped. A duplicate you can see is
a data question; a lot that vanished is a bug you find months later, when you no longer
know what went missing.

## Duty, and the delivered price

Duty is charged per litre of pure alcohol, and the easement treating everything from 11.5%
to 14.5% as if it were 12.5% ended on **1 February 2025**. The £2.67 a bottle still widely
quoted predates that. At £29.54 per litre of pure alcohol a 12.5% bottle pays £2.77 and a
14.5% Châteauneuf pays £3.21. The export carries an alcohol content per row, so each wine
pays its own duty.

**`DUTY_PER_LPA` must be verified against HMRC.** It is uprated most years and a wrong
value misprices every bottle in the app. It is one named constant for exactly that reason.

Delivered = `(in bond + duty) × 1.20`, plus the £10 part-case fee spread across the bottles
actually pulled. There is no delivery charge: one was configurable in Settings until 24
August, and it came out because there is none to pay.

**All prices display in whole pounds.** Rounding each line of the breakdown independently
made it stop adding up — 46.67 + 2.77 + 9.89 rounds to 47 + 3 + 10 = 60 against a total of
59 — so `reconcileToTotal()` rounds every line then pushes the residue onto the largest,
where a pound is proportionally least visible.

## Drinking windows: four sources, and the app says which

Precedence, strongest first:

1. **Yours** — a window pinned in `notes`. Deliberate, never recomputed.
2. **Per BBR** — the window in the export.
3. **Researched** — `windows.json`, for the five lots the export leaves blank. Carries a
   `basis` sentence naming who says what, shown on the sheet.
4. **Estimated** — from vintage and sub-region, via `ESTIMATED_SPANS`. Flagged as an
   estimate everywhere it appears.

The distinction matters: a published window and a rule of thumb deserve different amounts
of trust. The Ramonet Monthélie 2020 says plainly that no published window exists for that
bottling and it is an appellation norm.

The five researched windows: Pommard Les Cras 2015 (2021–2035), Daumas Gassac 2015
(2020–2034), Barolo Roggeri 2016 (2024–2036), Monthélie 1er Ramonet 2020 (2025–2036),
Larcis Ducasse 2025 (2031–2060). Sourcing is thinner than it looks — Vinous, Decanter
Premium, CellarTracker and Wine Enthusiast all paywall or block, so several came via
merchant aggregation and search snippets. No URLs were invented.

## The maps

A region page draws a map behind it: rivers, wooded ground, towns, district names and
appellation names, in that region's own colour. Geometry lives in `maps.json`.

These are **stylised**. Coordinates were derived from published region maps and, for
Bordeaux and Burgundy, from real lat/lon projected linearly onto a 0–100 grid. What they
get right is topology — which bank an appellation sits on, the order of communes down a
slope. Do not measure anything off them.

Known approximations, from the researchers' own reports: Listrac, Moulis and Barsac are
absorbed into neighbours; Haut-Médoc is drawn as an inland ribbon because it really wraps
the named communes and polygons cannot overlap; Fronsac is nudged ~5km north to fit beside
the river; the eastern edges of Entre-Deux-Mers are invented; the Rhône's longitudes are
stretched ~2× to fill the square, so the northern gorge reads wider than it is.

**Appellation polygons are not drawn.** They were, once, and the map became a quilt — forty
overlapping blocks of one hue, none legible, all fighting the numbers on top. The names
alone, placed at the polygon centroid, carry the same information. The geometry is still in
`maps.json` and the label anchors are computed from it.

**Labels are decluttered.** Burgundy has 31 appellations, five towns and four districts;
drawn all at once that is a thicket. `declutter()` walks candidates in priority order —
districts first to orient you, then appellations you own, then towns, then appellations you
do not — and skips any whose box overlaps one already placed. Real maps drop type rather
than shrink it. It also drops a repeated name: Blaye is both an appellation and a town, and
printing it twice looks like a bug.

Bordeaux deliberately omits the Atlantic and the Landes forest: they filled the western
third of the frame with ground that holds no wine.

## The region panels

Under the donut, a region page carries three panels.

**About** is authored prose from `regions.json` — headline, character, structure, interest.
Character is what the wines taste like and the physical reason why. Structure is how the
region organises itself, which differs sharply and is where the value logic lives.

**In your cellar** and **Gaps** are **computed**, not written. A written summary is wrong
the day after the next case arrives. The only authored input is the `notable` array per
region — what a rounded holding there would draw on — and the gaps are that list minus what
you own, plus what the numbers themselves say: vintage concentration over a third, nothing
held back for later, a suspiciously narrow price band.

When a region has no `notable` list, Gaps says **"Not assessed — silence here means the app
does not know, not that there is nothing to find."** It previously said "Nothing obvious,
this region is well spread", which was a confident claim made from total ignorance.

## Reference coverage

The data layer maintains itself: import a new export and bottles, valuations, windows, the
timeline and the funnel are all correct immediately. The **written** layer does not, and it
degrades silently — a wine from an unknown estate appears everywhere and prices correctly,
it just has nothing to say about itself.

Settings carries a **Reference coverage** section listing exactly what is missing, and a
**Download what is missing** button producing a brief that names each gap, the shape of each
entry and the house rules, ready to hand to a model.

Tested by appending four unknown wines to the export and importing: 60 wines, 411 bottles,
4 new, no errors. Everything numeric correct instantly — a Brunello priced at £58 delivered
with its window read from the export. The report said, unprompted: *"Missing: 4 without an
estate note, 4 region-vintages undescribed, 2 regions with no essay, 2 regions with no map,
3 appellations unrecognised."*

Cost of each kind of gap, cheapest first: a new **wine** is one entry in `wines.json`. A new
**vintage** is one entry in `vintages.json`. A new **appellation** is one line in
`SUBREGIONS`. A new **region** needs `regions.json`, `maps.json` and a colour — the map alone
took a researcher about an hour.

## Design decisions worth not re-litigating

**Region colours.** Burgundy is burgundy `#6e1b32` — the one region whose name is already a
colour. Bordeaux takes the Gironde's estuary blue `#33465e` rather than another red: it is
66% of the cellar, it has to be unmistakable, and blue against wine-red is the strongest
pair available once Burgundy has claimed red. Rhône rust, Piedmont vine-green, Champagne
straw gold, everything else warm grey.

**The plate.** Anything sitting over a map — the donut, the essay, In your cellar, Gaps —
uses `PLATE`, one constant at `rgba(var(--card-rgb),0.82)`. Over a map drawn at 0.15 the
geography lands at roughly 2%: present enough to read as continuous ground, nowhere near
enough to compete with a percentage. Defined once because two panels at slightly different
values looks like a bug.

**The ring is bottles, the numbers above it are cases.** BBR's case size is not one number:
this cellar holds 48 lots in sixes, 5 in twelves and 3 in threes, so counting cases adds a
twelve and a three together as though they were the same thing. Cases are still the right
unit for *how much have I got* — it is what BBR sells, stores and charges in, and what you
would say to them on the phone — so the stat row keeps them. They are the wrong unit for a
proportion, which is all the ring is.

Measured on the August 2026 cellar the two splits agree within 2.2 points, so this changed
very little today:

| Region | % of cases | % of bottles |
| --- | --- | --- |
| Bordeaux | 65.6% | 65.1% |
| Burgundy | 16.4% | **18.6%** |
| Rhône | 9.8% | 9.3% |
| Piedmont | 4.9% | 4.7% |
| Languedoc-Roussillon | 1.6% | 1.6% |
| Champagne | 1.6% | **0.8%** |

Champagne is the clearest case of the problem: three bottles taking the same slice a twelve
would, twice its share of the actual wine. The size of the error is a function of what gets
bought next rather than anything fixed, which is the argument for a denominator that cannot
drift.

Bottles are not perfect either, and the README should say so: one lot is in **150cl**, and a
magnum counts here as one bottle while holding two bottles' worth of wine. The only strictly
uniform measure is volume, and "290 bottle-equivalents by region" is not a thing anyone says.
One lot in 56 is a footnote, not a unit.

The legend shows bottles and a bottle percentage, so the ring and the numbers beside it
cannot disagree — the per-slice case count is gone, and the level's own case total is in the
stat row directly above. The slices are also **ordered by bottles**, because sorting by cases
while drawing bottles would put a three-bottle case above a larger holding.

**The mark, and the icon.** A lowercase `c` and `f` flank the wine glass inside the ring, set
in the italic Newsreader the wordmark uses, so the mark says the app's initials in the app's
own hand. The same drawing is the home-screen icon at 512×512, on the paper background, with
the artwork at 82% so a maskable crop cannot bite into the ring.

Both letters are placed against **measured glyph boxes**, because the italic `f` is the
awkward one: its top hook reaches right and its tail reaches left, making it 11 units wide
against the `c`'s 6, on a 48-unit grid. The first attempt had it touching the ring on one
side and lapping over the bowl on the other — as set now it clears the ring by 0.57 units and
the glass by 1.35. Change a size and those want re-measuring.

The icon is drawn by the app's own canvas rather than in an image editor, because the browser
is the only thing on this machine that has the Newsreader webfont: the fonts are `woff2`, and
nothing else installed can read one. To redraw it, build the mark on a canvas in the page and
POST the blob to a two-minute local receiver that writes the file — carrying 30KB of base64
out through anything else is worse in every way.

**Daylight only.** There was an evening palette, taken from the system preference or set by
hand in Settings, measured as carefully as the daylight one. It went on 24 August by
request. What is left is one palette to keep honest instead of two, and `--ink` and `--card`
still stand between every style object and a hex value, so a second palette would be a block
of CSS rather than a rewrite.

**Pronunciations** appear only where an English speaker would get it wrong. Burgundy and
Piedmont get nothing; printing "BUR-gun-dee" reads as padding and makes the useful ones
easier to ignore.

There are two sets, in the same notation — syllables hyphenated, the stressed one in
capitals. **Appellations** live in `regions.json` and sit beside the heading on a funnel
page: 35 of them. **Estates** live in `wines.json` as an optional `say` field and sit on
their own line under the name on the wine sheet — "Haut-Bailly II", then *oh bye-YEE*. 43
of the 44 have one; Château Gloria does not, because nobody needs telling.

Neither set spells out "Château" or "Domaine". An English speaker can already say those, and
a pronunciation that starts by telling you what you know is one you stop reading. The field
is optional rather than blank-by-default for the same reason: an estate with no `say` prints
no line at all, which is what keeps the ones that do appear worth looking at.

The same italic Newsreader carries both, so the idea is recognised rather than read.

**Five maturity states, not BBR's four.** *Closing* is the one that should make you act, and
BBR does not distinguish it.

## Traps

**The flexShrink trap.** The screen body is a scrolling flex column and flex children default
to `flex-shrink: 1`, so tall content gets squashed instead of scrolling. Every style used as
a direct child of a scrolling pane carries `flexShrink: 0` — `card`, `row`, `panel`, `section`,
`eyebrow`, `statRow`, `chipRow`, `note`, `empty`, plus the `Bar`, `Donut` and timeline
components. Add one and it needs the same.

**The caches will serve you a stale build, twice over.** First: the reference JSON was
cache-first alongside React and the fonts, so a batch of corrections to `vintages.json` was
invisible long after the file changed. Second, subtler: the network-first branch called
`fetch(req)`, and a plain `fetch` may be answered from the *browser's* HTTP cache — so
"network first" quietly meant "whatever the browser had", and the page ran a copy of itself
from before a rebuild while every check of the file on disk said the edit was there. It now
fetches with `cache: 'reload'`.

**Invisible characters in the source.** A combining-accent range and a byte-order mark were
originally literals; one was silently mangled so it matched nothing. Both are built from
`String.fromCharCode` — `COMBINING`, `BOM`, `NUMBERS_IN_PATH`. Do not put an unprintable
character back into this file.

**Floating-point percentages.** `0.55 * 100` is `55.00000000000001` and reached the screen as
exactly that. Percentages from fractional constants go through `Math.round`.

**`num()` must strip `%`.** The export writes alcohol as "14.5%" and without stripping it
every lot silently fell back to an assumed strength and the wrong duty.

**Heredocs in this environment collapse backslashes.** A `python - <<'EOF'` block containing
`\\u0300` or `[^'\\]` arrives mangled. Write regexes with `String.fromCharCode`, or put the
block in a file first.

**Debugging a stray delimiter in ~2,400 lines of `createElement`.** The browser says "missing
) after argument list" with no line number for an inline script. What works: fetch the page's
own source, cut out the script, walk it with a small lexer that skips strings, comments and
regex literals, and report the line of the delimiter that never closed. A naive brace count
fails — the first attempt mis-lexed `return /[",\n]/` as division and blamed a line 1,500 away.

**The stat row that would not stay on one line.** The hairlines between the stat cells are
the container's own colour showing through 1px gaps — cheap, and right until the cells do
not fill their last row. `statRow` was a grid of `repeat(auto-fit,minmax(80px,1fr))`, which
at phone width resolves to four columns, and the Cellar overview and every region page put
**five** stats in it. The three empty columns were painted in the separator grey as one
slab. On a region page that grey is translucent enough to read the map through, so Pauillac
and St Julien appeared *inside* the empty cell, and it was worse against the evening
palette, where the slab came out lighter than the cells beside it and read as something
selected.

Wrapping flex closed the hole but still broke the row in two, and the five figures are meant
to be read across. The row is now `nowrap` with `flex: 1 1 0` and `minWidth: 0` on every
cell, and the type is sized against the width with `clamp()` rather than fixed: 18px down to
11px for the figure, 9.5px down to 7.5px for the label. Five cells on a 390-point phone is
about 70 points each, which `£10,167` does not fit at 18px and does at 13px. Measured at
320, 390 and 483 points: one row every time, nothing clipped, no horizontal overflow.
`minWidth: 0` is the part that is easy to miss — a flex item will not shrink below its own
content without it, and the row pushes off the screen instead.

The wine sheet never showed the original bug, because four stats divide by four exactly —
which is why every DOM check passed. Bounding boxes were all correct; the defect was in what
was painted in the space between them. This is the argument for looking at the screen.

**A place name hyphenated onto a surname.** The producer is found by stripping the
geographic tail off the description, and a segment counted as geography if it *contained*
a sub-region keyword. Growers named after their village do not survive that: Pierre-Yves
Colin-Morey, Thomas Morey and Jobard-Morey were all stripped out as Morey-St Denis,
leaving the appellation standing as the producer, and "Château de Puligny-Montrachet"
went the same way. Two rules now protect them — a segment naming itself a producer is
never a place, and a keyword is ignored when a hyphen runs into it, so Colin-Morey is a
person and Morey-St Denis is still a village. The catalogue found all eight; the 56 lots
in the cellar found none of them, which is the argument for testing against 6,000 wines
you do not own.

**Two controls with the same label.** Happened twice: a "Cellar" header button beside a
"Cellar" breadcrumb root, and again when Cellar became a tab. Renamed to Settings and
"All regions". It also caught out the automated checks, which is how it was found.

## Approaches tried and rejected

- **A treemap of regions.** Six unlabelled rectangles on a phone; the labels are the useful
  part. Horizontal bars, then a donut.
- **Appellation polygons on the map.** A quilt. See above.
- **`color-mix` for graded sub-region colours.** Needs a recent Safari, which is exactly the
  browser this has to work in on a phone. Graded opacity instead.
- **A flat duty per bottle.** The export has the alcohol content; using it costs nothing and
  the answer is materially different.
- **Parent ID as the lot key.** See above.
- **Scraping Wine-Searcher or CellarTracker.** Both prohibit it, both block, and a scraper
  breaks silently. Confirmed again on 24 August: an automated request to CellarTracker came
  back as a bot-defence interstitial rather than a page, which is exactly why the community
  notes button is a link the browser follows rather than anything the app reads. Unnecessary for WS anyway: the export carries a Wine-Searcher price whose
  median ratio to Liv-ex across the 56 lots is exactly 1.000.
- **A Python import script.** Parsing in the browser means no toolchain, and you can import
  on a phone.
- **Written region summaries.** Stale the day the next case arrives. Computed instead.

## Honest measurements

- **Contrast was measured, not eyeballed.** Daylight is the only palette now, so the
  daylight figures are the live ones and the evening figures are history. Body text 15.1:1
  on the page and 16.6:1 on a card in daylight; 14.8:1 and 13.7:1 in the evening. Claret accent 7.3:1 and 5.9:1. All six
  maturity-state colours clear the 3:1 a graphical element needs on both grounds — lowest
  3.91:1 (At best, daylight) and 4.48:1 (Past, evening). `--st-past` had to be lightened from
  `#8c2f3a` to `#b04351` for dark, where as a 3px spine it measured **2.89:1**. All six region
  colours clear 3:1 on both grounds; Champagne's first gold reached only 2.83:1 and was
  darkened to `#8a7328`. The donut legend was measured again on 24 August, against the
  plate rather than the card: the percentages were `ink(0.4)`, which is **2.46:1** — fine
  for a graphical element and nowhere near enough for type — and are now `ink(0.62)`, or
  4.70:1 in daylight and 6.05:1 in the evening.
- **Sub-region inference** is a keyword list of 192 appellations. It places 56 of 56 lots,
  which is a low bar, and **5,370 of the 6,123 distinct wines in the BBX catalogue**, which
  is not: 88%, and 2,334 of Burgundy's 2,430. What is left unplaced is mostly wine with no
  appellation to place — "Vin de France", a Champagne house's non-vintage brut. No
  sub-region matched wines from two different countries, which is the check that catches a
  keyword quietly claiming the wrong hemisphere.
- **Producer inference** gets all 56 lots right and, on the same 6,123 catalogue wines,
  returns a place as the producer **0 times, down from 8**. Rule: strip the geographic
  tail, prefer a segment naming itself a producer, else the last remaining segment. Four
  versions have been wrong — `^château` matched "Châteauneu" so four Châteauneuf lots had
  the appellation as their producer; a five-segment Italian description returned
  "Piedmont"; and the widened table exposed the two the catalogue found (see *Traps*).
  To repeat the measurement, pull the `Description` column out of the BBX product export
  into a JSON array, drop it beside `index.html`, and run `subRegionOf` and `producerOf`
  over it from the console. It takes about a second and it is the only check here that
  looks at more than 56 wines.
- **The reference prose** is model-written from general knowledge, not quoted criticism, and
  carries no scores on purpose. 18 of 44 estate notes and most vintage notes were corrected
  against Decanter, Jancis Robinson, Jane Anson and the trade bodies. Nothing in the app now
  tells the reader this — the disclaimer was removed by request. It is recorded here and in
  each file's `about` field.

### Not yet tested

- **iPhone install and offline on a real device.** The manifest and worker are conventional
  and copied from a working app, but have never been through a home-screen install.
- **A real device.** The screens have now been photographed at 320, 390 and 483 points
  wide: the funnel, a region page with its map, Wines, Windows, and the wine sheet.
  That found two things the DOM could not (the stat row, and the map labels colliding with
  the interface) and cleared everything else. It is still a desktop browser at phone width,
  not a phone.
- **Nothing is checked against a picture automatically.** The screenshots were read by eye,
  once. There is no baseline to compare against, so the next layout bug will be found the
  same way this one was — by someone looking.

## Open items

1. **No git repo.** Initialise, push to a public repo, enable Pages. Check `.gitignore` covers
   `cellar.local.csv` before the first commit.
2. **New regions get grey.** `REGION_COLOUR` has five entries and a fallback, so two regions
   the app has never met are the same colour as each other in the donut. The palette has
   room for about three more hues, not for thirty: blue, wine-red, rust, vine-green and
   straw gold are already spoken for, and a sixth and seventh that are genuinely
   distinguishable at the size of the smallest slice are the practical limit. Which three
   depends on what gets bought next.
3. **Sync has never talked to real GitHub.** Everything up to the network boundary is
   tested against a stub. The first connection is the test that matters.
4. **Neither outbound URL is verified.** `CT_SEARCH` and `WS_FIND` are written from
   knowledge. CellarTracker answered an automated check with a bot wall, and Wine-Searcher
   with a press-and-hold challenge, so neither path could be tested from here - which is
   the same reason scraping either was rejected years ago. Tap both once on a real phone.
   If either lands somewhere unhelpful, that one constant is the fix.
5. **The `Region` strings for everything outside France are unverified.** `SUBREGIONS` and
   `ESTIMATED_SPANS` now carry Tuscany, Rioja, Douro, Mosel, Napa Valley and the rest,
   spelled the way the BBX catalogue writes them in a description tail; `REGION_COLOUR`
   still holds five, which is item 3. The cellar export's own `Region` column has only
   ever been seen holding the six regions actually owned, so a spelling could be off by a
   word. The reference-coverage
   report says so the first time a bottle arrives — an unrecognised region is exactly what
   it is built to notice.
6. **The quiet greys are under 4.5:1.** Bottle counts in the donut legend measure 3.78:1;
   that is `ink(0.55)`, the app's standard secondary grey, used in ten places. The same grey
   on a history tile measures **3.51:1**, because the wine wash is darker than a card. The
   pronunciation line, which is `ink(0.45)`, measures **2.78:1** — the lowest piece of type
   in the app, and it inherits that from the appellation headings, which have always been
   set the same way. All of it is one palette decision rather than a line to change, which
   is why it is here rather than done; a single adjustment to the grey scale fixes every
   instance. The chevron ending a legend row is `ink(0.3)` at 1.91:1, but that is an
   affordance on an already-labelled button rather than type.
7. **Map labels collide with the interface.** The rule is that anything sitting over a map
   uses `PLATE`; the breadcrumb and the section eyebrows do not. Measuring all 17 Bordeaux
   labels against what covers them, "Dordogne" and "Margaux" sit directly under "BOTTLES BY
   SUB-REGION" and "Pomerol" under the breadcrumb, with nothing between them. `declutter()`
   stops labels colliding with each other and knows nothing about the interface on top. The
   map is also drawn behind the Wines tab, where labels surface in the gaps between cards.
   Two ways out: plate the eyebrow and the breadcrumb, or stop the map short of them.
8. **Sub-region pages have no essay.** Only regions do. A natural extension.
9. **`notes` is still write-nothing.** The shape is fixed, the importer reads it and the
   sync merges it, but no UI writes to it yet. A pinned drinking window is the one that
   would earn its keep first: it already beats BBR's, and it is the only kind of note that
   changes what the app tells you to pull.

## The numbers that look arbitrary

| | | |
| --- | --- | --- |
| `DUTY_PER_LPA` | 29.54 | £ per litre of pure alcohol. **Verify against HMRC** |
| `PART_CASE_FEE` | 10 | BBR's charge per product for breaking a case |
| `CLOSING_YEARS` | 3 | enough to drink a twelve in tranches without rushing |
| `OUTLIER_MULTIPLE` | 2 | a comp above 2× the Liv-ex mark is a bad print, not a market |
| `AXIS_BACK` / `AXIS_FORWARD` | 4 / 26 | the timeline's window. True span is 2006–2067 and would squeeze every bar to nothing; bars running past either edge are squared off rather than rounded, so a clipped window never reads as one that ends there |
| `PLATE` | 0.82 alpha | see *Design decisions* |
| `MAP_ALPHA` | 0.05–0.24 | pushed up until the map was legible, then backed off until a price on top of it still was |
| `LABEL_CHAR_W` / `LABEL_PAD` | 0.52 / 0.8 | the declutterer's estimate of a character's width and the breathing room around a label |
| `DONUT_GAP` | 1.6 | any larger and the smallest slice disappears into its own gaps |

`ESTIMATED_SPANS` is a preference table, deliberately conservative at the top end: an estimate
that says "drink it" is more dangerous than one that says "wait". It is looked up by
sub-region, then region, then a default of `[5, 20]`, and a sub-region is listed only where
it says something its region does not. Vintage Port at `[15, 50]` and Madeira at `[10, 60]`
are why: both would otherwise have read as a five-to-twenty-year Douro red.

## Editing the app

Plain React via `React.createElement` — no JSX, no bundler — so it runs exactly as written.
Structure, top to bottom:

- **Header comment** — what the app is, and every storage key
- **Constants** — the tuning table above, `SUBREGIONS`, `STATES`, `ESTIMATED_SPANS`
- **Pure logic** — parsing, `windowOf`, `stateOf`, `dutyPerBottle`, `deliveredPerBottle`,
  `matchWine`, `matchVintage`. No side effects, no React
- **Styles** — the `sx` object, `PLATE`, the shared components
- **Map rendering** — `MAP_ALPHA`, `declutter`, `RegionMap`
- **The mark** — `Logo`, `Wordmark`
- **`class App`** — state, storage, import, coverage, the region shape computations, then one
  render method per tab, then the sheets

Two wrappers exist because forgetting to thread state through was a real bug: `this.win(lot)`
and `this.lotState(lot)` close over the notes and the researched windows, so no call site has
to remember them.

## Voice

Every string is written as a person would say it. No exclamation marks, no cheerfulness, no
"Oops". Errors say what happened and what to do. Empty states say what the screen is for.
Destructive confirmations state the number of things at stake.

The reference prose carries **no critic scores, ever**. That is a decision, not an omission:
an invented number would be worse than none, and a real one dates.
