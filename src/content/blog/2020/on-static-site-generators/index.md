---
pubDate: Jul 07 2020
title: "On Static Site Generators"
tags:
  - Web
---

Peter Zignego [writes about his experience](https://bytesized.co/posts/plot)
with Swift static site generators:

> After a bit of spelunking, I realized that it had been built with some beta
> version of Xcode long since lost to the sands of time — I was stuck with a
> binary I couldn’t run.  

Luckily most of this is behind us now. Prior to 4.0, this was a major drawback
of using the language for general purpose programming.

> Over the course of the week I spent converting this site to use Publish, I was
> frustrated by a lot of the built-in assumptions and general inflexibility.
> While I am sure that it is a great Swift by Sundell generator, it is not (yet)
> a great general-purpose static site generator.

As a Website maintainer, finding a static site generator that works exactly the
way you want is no small feat. I used a handful in the past 10 years, across
personal  and client projects, and I still haven’t found _the one_. Plugins and
extensions do help, but there will always be a set of assumptions that are not
true for every project.

> But the beauty of open source is exactly that, so I  forked it  and fixed my
> two biggest issues.

If you’re going to use a static site generator, use one written in a language
you are comfortable with. Sooner or later, you’ll find yourself in a position
where you need to patch the build system to add new functionality or modify
existing one, especially if you are making Websites for a living.

> In practice I found [using an HTML DSL] to be more clunky and mistake-prone
> than just writing HTML with Mustache templates, which is what I was converting
> from.  

Couldn’t agree more as someone who always preferred templating languages
(Mustache, Liquid, etc) to DSLs. The latter often introduce friction that seems
unnecessary if you are already comfortable with HTML and CSS.

I‘m not head over heels in love with [Gatsby](https://www.gatsbyjs.org/), but
it’s versatile and battle-tested. I‘ll eventually look into migrating to a Swift
build system, but I can’t afford the time to do so for the time being.
