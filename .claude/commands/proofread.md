---
description: Proofread blog posts and fix typos, grammar, and style issues
allowed-tools: Read, Edit
---

# Proofread Blog Post

First, check if there is a currently opened file in the IDE. If there is, use
that file for proofreading without asking the user. If no file is open, ask the
user which file to proofread.

Review the blog post content and fix:

- Typos and spelling errors
- Grammar and punctuation issues
- Awkward phrasing or unclear sentences
- Inconsistent formatting
- Title capitalization (use AP style: capitalize all major words)

Make edits directly to improve clarity and correctness while preserving the
author's voice and intent.

---

# Writing Style Guide

## Core Principles

**Direct and Substantive**: Get to the point quickly. Avoid introductory
throat-clearing or hedging language. The first sentence should carry weight.

**Personal but Not Self-Centered**: Use personal experience as evidence, not the
main event. Frame discoveries as observations readers can verify themselves.

**Technical Precision with Natural Flow**: Use exact terminology, but maintain
conversational rhythm. Technical accuracy shouldn't sacrifice readability.

## Sentence Construction

### Preferred Patterns

**Short declarative statements for impact:**

> Chrome is effectively everywhere you look. And that's bad news.

**Em dashes for contextual additions:**

> The browser comes preinstalled in most Android handsets sold outside of
> China, and serves as the UI layer of Chrome OS, Google's foray into desktop
> and tablet operating systems.

**Parallel structure for rhythm:**

> It's empowering, eye-opening, and above all, fun.

### Avoid

- Unnecessary qualifiers ("basically", "essentially", "pretty much")
- Passive constructions when active works
- Question-as-transition devices ("So what does this mean?")
- Overuse of "I think" or "in my opinion" (your byline already establishes this)

## Paragraph Architecture

**Typical paragraph flow:**

1. Topic sentence with concrete detail
2. 1-3 supporting sentences
3. No summary sentence unless transitioning

**Example:**

> Within two years, Chrome accounted for 15% of all Web traffic on desktop—for
> comparison, it took Firefox 6 years to get there. Google managed to deliver a
> fast, thoughtfully designed browser that was an instant hit among users and
> Web developers alike. Their product innovation and engineering prowess was a
> breath of fresh air, and their commitment to open-source was the cherry on
> top.

**Length:** 2-4 sentences typically. Single-sentence paragraphs only for
emphasis or transition.

## Voice Characteristics

### Use of First Person

**When to use:**

- Personal experiences: "I've been Chrome-free since 2014"
- Direct observations: "I noticed that I consistently..."
- Recommendations: "I am hoping to be able to contribute..."

**When to avoid:**

- Stating obvious opinions ("I think Chrome is dominant")
- Unnecessary hedging ("I feel like this might be...")
- Inflating mundane actions ("I decided to investigate...")

### Second Person

**Appropriate uses:**

> You might like it as a browser. And you might not mind the privacy trade-offs
> it comes with.

**Avoid:**

- Patronizing instructions ("you'll want to make sure...")
- Assumed agreement ("as you know...")

## Technical Writing Style

### Code Examples

**Keep them minimal and purposeful:**

```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
grid-gap: 1rem;
```

**Introduce with concrete context:**

> Here is a variable-free version of what I ended up with:

### Technical Explanations

**Lead with the practical application:**

> By default, git fetch gets an updated list of remote branches from the remote
> and sets up remote branch references locally. However, it doesn't delete stale
> references...

**Not with the theory:**

> ❌ Git fetch is a command that communicates with remote repositories by...

## Distinctive Elements

### Metaphors and Analogies

Use sparingly, make them concrete:

> ✓ "A vicious cycle that, if not broken, will result in most other browsers
> disappearing in the oblivion of irrelevance."
>
> ✗ "Like a snowball rolling down a hill, browser dominance grows and grows..."

### Cultural and Historical Context

Integrate naturally when relevant:

> The model managed to capture the meaning of the prompt and even nailed the
> focus blur for that perfect photograph feel.

### Critical Perspective

**Frame critiques with evidence:**

> Making matters worse, the blame often lands on other vendors for "holding back
> the Web". The Web is Google's turf as it stands now; you either do as they do,
> or you are called out for being a laggard.

**Avoid:**

- Snark without substance
- Strawman arguments
- Unqualified absolutism

## Formatting Conventions

### Headings

**Use action-oriented or topic-specific headings:**

> ✓ "Setting up Colima"
> ✓ "Don't Be Evil"
> ✓ "Round 1: Basic Tasks"
>
> ✗ "Introduction"
> ✗ "My Thoughts"
> ✗ "What I Found"

### Lists

**Minimize bullet points. Integrate into prose:**

> ✓ "I first had to install Colima and other Docker components to get started."
>
> ✗ "Requirements:
> • Colima
> • Docker
> • Docker Compose"

**When lists are necessary, make each item substantive:**

> • Multipass: Spins up an Ubuntu virtual machine using HyperKit (which in turn
> is built on top of the first-party Hypervisor framework).

### Emphasis

**Use italics for:**

- Introducing terms: "latent diffusion models"
- Genuine emphasis (sparingly): "never"
- Foreign words: "風任せ (かぜまかせ - kaze-makase)"

**Avoid:**

- Bold for emphasis in prose
- ALL CAPS
- Multiple exclamation points

## Topic-Specific Patterns

### Product Announcements

**Lead with the announcement, then context:**

> Today I am happy to launch SwiftUI Directory, a curated list of open-source
> SwiftUI libraries that are painstakingly scouted, categorized, and tagged for
> anyone who's looking to solve a particular problem within the nascent
> framework.

### Technical Guides

**Structure:**

1. Brief context (why this matters)
2. Core instructions (numbered if sequential)
3. Practical outcomes/verification
4. Caveats or alternatives if relevant

**Example pattern:**

> I first had to install Colima and other Docker components to get started.
>
> [code block]
>
> As part of the installation, Colima sets up shell completion...

### Opinion Pieces

**Opening pattern:**

1. Hook with specific detail or observation
2. Broader context
3. Clear thesis

**Example:**

> Ten years ago, we needed Google Chrome to break the Web free from corporate
> hegemony, and we managed to do so for a brief period. Today, its dominance is
> stifling the very platform it once saved from the clutches of Microsoft.

## Common Pitfalls to Avoid

### Unnecessary Preamble

> ✗ "In this blog post, I'm going to talk about..."
> ✓ [Just start talking about it]

### Over-qualification

> ✗ "It seems like this might potentially be..."
> ✓ "This is..."

### Forced Enthusiasm

> ✗ "I'm super excited to announce that I'm absolutely thrilled..."
> ✓ "Today I am happy to launch..."

### Meta-commentary

> ✗ "As I mentioned earlier..."
> ✗ "As we'll see later..."
> ✓ [Just reference the content directly]

## Checklist for Revision

**Every paragraph should:**

- [ ] Start with a substantive sentence
- [ ] Contain no more than one main idea
- [ ] Flow logically from the previous paragraph
- [ ] Avoid beginning with "So," "Now," or "Well,"

**Every sentence should:**

- [ ] Carry its own weight (no filler)
- [ ] Use active voice unless passive is genuinely better
- [ ] Avoid starting with "There is/are" when possible
- [ ] Prefer concrete nouns over abstract concepts

**Overall piece should:**

- [ ] Lead with the most important information
- [ ] Include specific examples over generalities
- [ ] Maintain consistent terminology
- [ ] End with forward motion, not just summary

## Examples of Style in Action

### Opening Paragraph (Strong)

> Ten years ago, we needed Google Chrome to break the Web free from corporate
> hegemony, and we managed to do so for a brief period. Today, its dominance is
> stifling the very platform it once saved from the clutches of Microsoft. And
> no one, beside Google, needs that.

**Why it works:**

- Specific timeframe establishes context
- Clear thesis in the second sentence
- Punchy conclusion with em dash separation

### Technical Explanation (Strong)

> The other aspect to consider is the ethical one. Using text-to-image to
> replicate the style of living artists without their permission is not only
> possible but on the way to become the norm. The model also is as biased as the
> data it was trained on.

**Why it works:**

- Direct topic sentence
- Concrete examples of the issue
- No hedging or qualification beyond what's necessary

### Personal Anecdote (Strong)

> Initially I was very skeptical of letting machines meddle with art, especially
> when they are developed by for-profit companies behind the curtains. But as
> the novelty started wearing off, I slowly realized that these tools aren't
> meant to replace humans as many skeptics, including myself, tend to believe.

**Why it works:**

- Personal perspective frames the transition
- Acknowledges initial position
- Shows evolution of thinking
- Sets up broader argument

---

This guide captures the essential elements of your writing style. The key is
maintaining that balance between technical precision and conversational
accessibility—being informative without being dry, personal without being
self-indulgent, and opinionated without being dogmatic.
