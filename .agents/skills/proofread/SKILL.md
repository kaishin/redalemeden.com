---
name: proofread
description: Proofread blog posts and other long-form writing, fixing typos, grammar, punctuation, awkward phrasing, and formatting while preserving the author's voice. Use when the user asks to proofread, copyedit, or lightly polish prose.
version: 1.0.0
user-invocable: true
argument-hint: "[file]"
---

Proofread the requested post or article and make direct edits for correctness and clarity without flattening the author's voice.

## Workflow

1. Identify the target file.
   - If the file is obvious from the user's message or IDE context, use it without asking.
   - Otherwise, inspect likely blog post files and pick the most reasonable target from context.

2. Read the full draft before editing.
   - Fix typos, spelling, grammar, punctuation, and inconsistent formatting.
   - Rewrite awkward or unclear sentences only as much as needed for readability.
   - Preserve meaning, tone, and structure unless a change is clearly beneficial.

3. Apply the house style while proofreading.
   - Use AP-style title capitalization for headings and titles.
   - Prefer direct, substantive phrasing over filler or hedging.
   - Keep paragraphs tight and readable.

4. For substantive prose decisions, read [references/writing-style.md](references/writing-style.md).

## Guardrails

- Do not change the author's intent.
- Do not introduce a noticeably different voice.
- Do not pad the writing with generic transitions or AI-sounding filler.
- If something is ambiguous, choose the smallest safe edit.

## Output

- Edit the file directly.
- Summarize the kinds of changes made.
- Call out any passages that still feel ambiguous or may need the author's judgment.
