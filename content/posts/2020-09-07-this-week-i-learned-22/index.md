---
date: 2020-09-07T00:30+02:00
title: "This Week I Learned #22"
category: learning
audience: "people interested in learning and metacognitive tools"
tags:
  - TWIL
---

* I picked up several new Japanese expressions this week, but this one stood out to me: <ruby><rb>売</rb><rp>(</rp><rt>う</rt><rp>)</rp></ruby>り<ruby><rb>言葉</rb><rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>に<ruby><rb>買</rb><rp>(</rp><rt>か</rt><rp>)</rp></ruby>い<ruby><rb>言葉</rb><rp>(</rp><rt>ことば</rt><rp>)</rp></ruby>. An English equivalent would be _tit for tat_. The origin of this expression is likely related to the expression <ruby><rb>喧嘩</rb><rp>(</rp><rt>けんか</rt><rp>)</rp></ruby>を<ruby><rb>売</rb><rp>(</rp><rt>う</rt><rp>)</rp></ruby>る, to _"sell"_ a fight, meaning to provoke it. In this transactional analogy, _"buying"_ the fight is analogous to retaliating.

### Programming

* A good refresher on password storage best practices: [We Didn't Encrypt Your Password, We Hashed It](https://www.troyhunt.com/we-didnt-encrypt-your-password-we-hashed-it-heres-what-that-means/). I knew about using salts (and [peppers](https://dropbox.tech/security/how-dropbox-securely-stores-your-passwords)!) to secure password storage, but I have yet to add these extra security measures to the server-side app I am currently working on.

* I learned how to do SQL joins with their different flavors. I always procrastinated on learning SQL, for various reasons, but I got to a point where I had to choose between taking a step back and doing things right, or hacking my way through the feature I was working on without understanding the performance implications of the queries used.
