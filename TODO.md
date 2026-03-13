# TODO

## Astro 6 Upgrade

- [ ] Run `npx @astrojs/upgrade` to automate the migration
- [ ] Review and update dependencies (Vite 7, Shiki 4, Zod 4)
- [ ] Update Node.js requirement to v22+
- [ ] Verify Cloudflare Pages adapter compatibility
- [ ] Test dev server with new Environment API
- [ ] Update any custom Vite plugins (if used)

## Tasks

- [ ] Add analytics https://4rays.goatcounter.com/settings/main
- [ ] Integrate turnstile in contact form

## Neo Samurai Blog Migration (87 posts total)

Track migration in batches of 12 posts. For each post:

1. Clean up formatting and improve writing while keeping original style/tone
2. Add proper front matter (title, pubDate, tags: ["neosamurai"], isArchived: true)
3. Move to `src/content/blog/YYYY/MM/slug/index.md`

### Writing Cleanup Recipe

Clean up the original writing, but keep the author's voice.
The goal is editing, not rewriting.

**Do:**

- Fix grammar, spelling, and typos
- Break up run-on sentences
- Remove filler and hedging ("luckily enough",
  "almost impossible", "as you might be wondering")
- Remove self-conscious asides and excessive punctuation
  (!!!, …ahem…)
- Tighten verbose passages into clearer statements
- Make titles descriptive and direct (no clickbait ellipses)
- Emphasize Japanese romaji words with single underscores
  (_obake_, _koban_, _nihongo_)
- Use em dash (—) only when the original did; otherwise use
  commas, colons, or semicolons

**Don't:**

- Rewrite from scratch in a different voice
- Add punchy openers ("Picture this:", "Here's the thing:")
- Use triple-beat rhetorical structures
  ("look twice, think harder, question everything")
- Over-explain why the subject is interesting—let the
  author's interest speak for itself
- Inject vocabulary the author wouldn't use
  ("weaponizing", "audacious visual collision")
- Turn casual observations into dramatic statements

**Preserve:**

- The author's framing and narrative arc (e.g., "I had two
  topics and found something that connects them")
- Personal voice, first-person perspective, genuine enthusiasm
- The author's own descriptions and characterizations
- Specific terms and phrases from the original (e.g.,
  "sarcastic disharmony" as the artist's concept,
  not a clever aside)
- Links, attributions, and cultural/historical context
- The overall tone: someone writing a blog post,
  not a magazine article

**In short:** if the original says something well enough,
keep it. Clean up the rough edges,
don't sand away the fingerprints.

### Batch 1 (Posts 1-12) ✅ COMPLETED

- [x] 53 stages on the Toukaidou… (Oct 2006)
- [x] J-pop battle rages, and Hyde is…..well!! (Aug 2006)
- [x] From Geisha to Shinzo Abe…daily gibberish! (Sep 2006)
- [x] Browser related problems (May 2006)
- [x] It's a Kappa! (Nov 2006)
- [x] Cast pearls before swine (Sep 2006)
- [x] Edo Soccer! (Jun 2006)
- [x] At the gates of 2007 (Dec 2006)
- [x] 12 Most instructive DS Japanese softwares (Dec 2006)
- [x] I recommend you to… (Feb 2007)
- [x] Fun 金曜日! Vol.1 (Jan 2007)
- [x] Furusato!! My hometown!! (May 2006)

### Batch 2 (Posts 13-23) ✅ COMPLETED

- [x] The Way of the Samurai (May 2006)
- [~] Michael Jackson, Samurai-Wise (May 2006) — skipped, not worth migrating
- [x] Japanese Mythology: Origins (Jun 2006)
- [x] The Nihonshoki (Jun 2006)
- [x] Personal Notes (Jun 2006)
- [x] Kikunokai (Jun 2006)
- [x] Kikunokai: A Bit of History (Jun 2006)
- [x] WIIRE Samurai Campaign (Jun 2006)
- [x] Kiyomori (Jun 2006)
- [x] Neo Samurai V3.0 (Aug 2006)
- [x] Stereotypes (Aug 2006)
- [x] Wabi-Sabi (Aug 2006)

### Batch 3 (Posts 24-38) ✅ COMPLETED

- [x] Nō (Aug 2006)
- [~] I am Nipponjin (Aug 2006) — skipped, redundant with Stereotypes
- [~] Samurai Clay (Aug 2006) — skipped, just a dead YouTube embed
- [x] Musings (Sep 2006)
- [~] Internet Trends (Sep 2006) — skipped, too dated
- [x] Shinwa: The Creation of the Universe (Sep 2006)
- [x] Shinwa: The Birth of Japan (Sep 2006)
- [x] Shinwa: The Birth of Gods (Sep 2006)
- [x] Shinwa: The Slaying of Kagutsushi (Sep 2006)
- [x] Shinwa: The Realm of Hades (Sep 2006)
- [x] Shinwa: The Purification of Izanagi (Sep 2006)
- [x] Shinwa Wrap Up: The Beginnings (Oct 2006)
- [x] Shinwa: Susanowo's Visit (Oct 2006)
- [x] Shinwa: The Missing Sun (Oct 2006)
- [x] Shinwa: Orochi, the Eight-Headed Snake (Oct 2006)
- [x] Shinwa: The Palace of Suga (Oct 2006)
- [x] Neo? (Oct 2006)
- [x] Shinwa Wrap Up: Amaterasu and Susanowo (Nov 2006)

### Batch 4 (Posts 39-56) ✅ COMPLETED

- [x] Kotowaza Vol. 1 (May 2006)
- [x] Kotowaza Vol. 2 (May 2006)
- [x] Geisha and the World Wide Web (Sep 2006)
- [x] Otome Road to BL (Sep 2006)
- [x] Jindies, Anyone? (Oct 2006)
- [x] Shinwa: The White Hare of Inaba (Nov 2006)
- [x] Shinwa: Oonamuji's Hardships (Nov 2006)
- [x] To Err Is Human (Nov 2006)
- [x] Two Thousand and Six (Dec 2006)
- [~] Kotowaza Vol. 3 (Jun 2006) — list only, no prose
- [~] Here and there Japan-related web picks! (Sep 2006) — link dump, too dated
- [~] Katana manufacturing (Oct 2006) — one video link, no content
- [~] You'll never know until you try (Oct 2006) — empty/unreadable
- [~] Irrelevant title: Sake (Oct 2006) — brief filler, no lasting content
- [~] Jindies, Anyone? Part II (Oct 2006) — mostly a podcast link
- [~] J-indies on Neo Samurai (Nov 2006) — announcement stub
- [~] Updates (a lack of) (Nov 2006) — filler update
- [~] Koremon (Dec 2006) — single meme caption

### Batch 5-8 (Posts 57-87)

- [ ] To be populated as we progress

### Progress

**Completed:** 51 migrated posts (batches 1-4)
**Remaining:** ~36 posts (posts 57-87) + 12 skipped/not worth migrating
**Total in archive:** 101 posts
