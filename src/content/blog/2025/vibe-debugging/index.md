---
title: "Vibe Debugging"
pubDate: May 16 2025
description: "A short guide to using coding agents for debugging."
tags:
  - Programming
  - AI
  - Guide
---

I'm pretty sure that at this point you've heard about _vibe coding_. There's a
lot being said about the topic everywhere you look, both from people who hail it
as the panacea of programmer productivity, and those who insist it's a tad bit
of horse manure, if you pardon my French.

The unfortunate part is that black and white thinking has hogged the
conversation, leaving little space for more nuanced explorations of how these
tools can help us become better at what we do as software developers.

Like any approach that came before agentic coding, it doesn't have to be an
all-or-nothing choice. We can enlist their help in areas they excel at, many of
which remain under-explored amidst all the noise.

Recently I have been exploring some of these areas, such as scaffolding,
testing, and debugging, and the results have been quite promising. In
particular, I've started appreciating how exceptional coding agents can be as
debugging companions with their pattern recognition and analytical skills that
prove invaluable when tackling hard-to-pinpoint bugs.

For example, I recently found myself looking at a chat message duplication bug
in the Circle iOS app. The reported issue proved quite difficult to reproduce
with any semblance of consistency, likely due to an elusive race condition
taking place somewhere in the codebase. These kinds of issues are notoriously
hard to nail down since they can materialize in seemingly unrelated parts of the
program. After spending an afternoon sprinkling semi-random `print` statements
in the hope of finding any inconsistencies, I surrendered to our AI overlords.

## Step 1: Establishing Context

One thing I found extremely helpful and time-saving is establishing proper
context from the outset by explaining the issue and providing some additional
hints either directly or via markdown files documenting the project's structure
and coding style preferences. It might help to use a dictation program if you
find yourself typing a lot to explain the issue (I use Wispr Flow).

This initial investment helps the agent keep the suggestions relevant and
focused on the issue at hand. Thinking models tend to be more suitable for bugs
related to business logic, but your experience may vary depending on the
codebase and the bug. I often start with a non-thinking model first, then move
to a thinking one if the bug remains unresolved. If your editor supports
referencing previous chats (both Cursor and Windsurf do), use that to avoid
having to start the conversation from scratch when trying other models or
approaches.

While working on my message duplication bug, I laid down the issue
and attached the screenshot from the bug report, in case there are any revealing
details I missed. The project was already documented using Cursor rules, so all
I had to do was to attach a couple of relevant ones to the chat.

## Step 2: Debugging

Complex bugs rarely yield to frontal assaults. Instead of asking for a
comprehensive solution from the get-go, I often try to decompose the debugging
process into discrete steps—especially for non-thinking models. I start by
asking the model to add some `print` statements (or `console.log` for you
JavaScript heads) in specific files or folders. If the feature is well
documented, I found equal success with leaving the model to decide where these
should be added. I almost never tell the model what to log exactly, as most
models nowadays are good enough to figure that out on their own.

```swift
func handleMessage(_ message: Message) {
    print("→ Handling message: \(message.id)")
    // ... rest of the logic
}
```

After running the program, I typically attach all resulting console logs to the
chat for the agent to examine. In verbose contexts that produce a lot of logs
(UI updates, sockets, etc) this turned out to be a massive time saver that plays
to the strengths of these AI models.

Note that some agentic coding tools have direct access to the console logs, so
you might not need to manually attach them to the chat.

In most cases, the agent finds the issue at this step, but if it doesn't, I
often iterate a couple of times before the logs surface the issue. If the agent
overlooks certain critical sections of the program, it's beneficial to bring
them to their attention specifically.

Back to message duplication, the agent initially focused on the UI layer, which
didn't yield any meaningful results. After I nudged it to inspect the
WebSocket client, it quickly spotted the issue by looking at the console logs.
For the curious, it was a race condition where the socket event arrived before
the UI state write operation completed.

## Step 3: Fixing the Bug

Once we identify the issue, I either ask the agent to fix it or do so myself,
depending on my level of confidence in the model to pull it off without
introducing new bugs. Either way, I try to keep the print statements around in
order to verify that the fix is working. If you have tests, they can also be
used to that end, instead of relying solely on logs.

Before committing the fix, I find it far easier to directly ask the agent to
clean up all the artifacts created solely for debugging purposes, that way I
don't have to hunt down every print statement myself.

For my message duplication bug, the fix was relatively simple and risk-free, so
I went ahead and asked the agent to implement it.

## Takeaways

In the context of debugging—and really, in any coding context—it's more
effective to think of coding agents as collaborators rather than all-knowing
oracles. They excel at offering alternative viewpoints, suggesting logging
approaches, and assisting in formulating diverse hypotheses that might have
escaped the developer.

Human engineering judgment remains irreplaceable, at least as of this writing.
The tasks of evaluating suggestions, testing theories systematically, and making
architectural decisions still require human expertise. But coding agents are
here to stay and we'd better learn how to work with them by being specific,
providing relevant context, and guiding their focus to get the best results.
