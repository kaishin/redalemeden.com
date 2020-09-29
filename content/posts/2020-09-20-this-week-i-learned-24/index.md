---
date: 2020-09-20T14:08+02:00
title: "This Week I Learned #24"
category: learning
audience: "people interested in learning and metacognitive tools"
tags:
  - TWIL
---

Here are some of the things I learned this week, in the order I’ve noted them down.

### Programming

- [Moment.js](https://momentjs.com) is now in [maintenance mode](https://momentjs.com/docs/#/-project-status/). I have used it on several occasions in the past, without realizing that it has fallen out of favor as of late. I looked for an alternative to display relative dates on the [microblog](/microblog) page and settled up on the more lightweight [date-fns](https://date-fns.org).

- This week I have been grappling with an annoying SwiftUI bug that only affects simulator builds. The stack trace isn’t of much help and no amount of view hierarchy tweaks got rid of it entirely. Initially I was under the impression that either my code or one of my external dependencies were doing something horribly wrong, but [this post](https://steipete.com/posts/state-of-swiftui/) from Peter Steinberger made me realize that it is a rather widespread issue. For the time being, I am commenting out the code branch that triggers the issue when running the app on the simulator.

- I refreshed my knowledge on variable fonts in CSS and the considerations to make when working with them thanks to this wonderful [guest lecture](https://gist.github.com/ubuwaits/81bd4945c94ab905333a5ce686daca11) by [Chad Mazzola](https://chad.is). Hope my students enjoyed it as much as I did!
