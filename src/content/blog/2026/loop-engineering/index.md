---
title: "Loop Engineering"
description: "Making sense of the latest buzzword: agents that own the process through outer loops, not just one-off agentic sessions."
audience: ""
tags:
  - AI
  - Opinion
  - Programming
pubDate: 2026-06-10
image: ""
draft: true
---

If you've spent any time on the timeline this week, you've seen the phrase
_Loop Engineering_ everywhere. And like most things that go viral in our corner
of the internet, the signal-to-noise ratio has been abysmal. For every person
trying to explain what's actually going on, there are ten more spinning up
threads that confuse the matter further, or worse, generating slop that
recycles the confusion at scale.

So let me try to cut through it, with the usual caveat that this is my read of a
fast-moving conversation, not gospel.

## What people are actually saying

The gist, as far as I can tell, is that some of the more prominent voices
working on coding agents have started saying they no longer _prompt_ agents
directly. Instead, they build loops that do the prompting for them.

That sentence is doing a lot of work, so it's worth slowing down. The claim
isn't "I automated my prompts" in the sense of saving a few keystrokes. It's
that the act of deciding what to build, breaking it into work, kicking off the
agent, reviewing the result, and deciding what comes next, has itself been moved
into code.

## Why this isn't just Ralph

A lot of people heard "loop" and immediately pattern-matched to goal-driven
loops in the style of Ralph: give an agent an objective, let it churn until it
thinks it's done. That's a reasonable thing to assume, but it's not what's
being described here.

The distinction is about where the judgment lives. A goal-driven loop is still
fundamentally one agent grinding toward one target. What the Loop Engineering
crowd is talking about is an _outer_ loop that behaves more like a product
owner: it decides what to build and how, prompts the coding agent to build it,
reviews the output, and then decides what to do next, all on its own clock.

The inner agentic session is just the muscle. The outer loop is the brain that
keeps the whole thing pointed in a useful direction over time.

## Agents that own the process

That, I think, is the actual shift worth paying attention to. We've spent the
last couple of years getting comfortable with agents that own a _task_, a single
bounded session where you hand off some work and grade the result. Loop
Engineering is about agents that own the _process_: the prioritization, the
sequencing, the review, the decision to keep going or stop.

It's a subtle reframing, but the implications aren't subtle at all. If it holds
up, the unit of work stops being "the session" and becomes "the loop." Your job
drifts away from writing good prompts and toward designing good loops: what the
loop optimizes for, how it decides what's next, what guardrails keep it from
wandering off, and when a human gets pulled back in.

## A healthy dose of skepticism

I'd be doing you a disservice if I presented this as settled. As with vibe
coding before it, the loudest takes are landing at the two extremes: either this
is the end of prompting as we know it, or it's the same Ralph loop wearing a new
hat to farm engagement.

The truth is almost certainly somewhere in the messy middle, as it usually is.
Building a loop that genuinely acts like a competent product owner is a much
taller order than building one that keeps an agent busy, and "the agent reviews
its own work" has a way of sounding better in a thread than it does in
production. I'm curious, not yet convinced.

But the underlying idea, moving up the abstraction ladder from prompting
individual sessions to engineering the loop that orchestrates them, feels like a
direction of travel, not a fad. Even if the term doesn't survive the month, the
shift it's gesturing at probably will.
