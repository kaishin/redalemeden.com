---
pubDate: Oct 30 2020
title: "Debugging SwiftUI: Trials and Tribulations"
audience: people interested SwiftUI or UI programming in general
tags:
  - Programming
---

I have been using [SwiftUI](https://developer.apple.com/xcode/swiftui/) since
day one, on both client and side projects. It's an incredibly refreshing way of
coding interfaces for Apple devices, but it's far from being wrinkle-free. The
framework's bold ambitions are sometimes hampered by subpar debugging tools and
arcane, seemingly random limitations.

I previously
[wrote](https://redalemeden.com/blog/2020/this-week-i-learned-24#programming)
about a SwiftUI bug that gave me quite a run for my money:

> The stack trace isn’t of much help and no amount of view hierarchy tweaks got
> rid of it entirely. Initially I was under the impression that either my code
> or one of my external dependencies were doing something horribly wrong, but
> [this post](https://steipete.com/posts/state-of-swiftui/) from Peter
> Steinberger made me realize that it is a rather widespread issue.

Since I didn’t manage to reproduce it on a particular test device at the time, I
assumed it’s yet another simulator quirk. But a little over a month later, the
same bug reared its ugly head on a test device. Fun times!

The app in question uses tab navigation where the first tab is always
accessible, while the second tab shows different content depending on whether
the user is signed in to their account or not. The view code looked roughly like
this:

```swift
TabView {
  Home()
    .tabItem { /* ... */ }
    .tag { /* ... */ }

  if isSignedIn {
    Profile()
      .tabItem { /* ... */ }
      .tag { /* ... */ }
  } else {
    SignIn()
      .tabItem { /* ... */ }
      .tag { /* ... */ }
  }
}
```

To avoid the `isSignedIn` boolean check in multiple modifiers, I opted for an
`if-else` block with separate views and `tabItem` modifiers.[^1] Except that
didn’t seem to sit right with SwiftUI for some reason. The app launches and
displays the content of the first tab exactly as intended. But when I switch
tabs—or god forbid, sign in or out—the app crashes with this cryptic error
message:

```console
[error] precondition failure: invalid size for indirect attribute: <number> vs <number>
```

The call stack points exclusively to SwiftUI internals, with the last call
referring to a certain
`AG::Graph`—[responsible](https://steipete.com/posts/state-of-swiftui/#swiftui-attributegraph-crashes)
for holding the view tree and diffing it. As far as debugging goes, this is
very, *very* little to work with.

With my hands tied, I briefly considered resurrecting the `UITabBarController`
wrapper I used prior to WWDC, especially since I didn’t manage to make a
reproducible test case or submit a feedback to Apple. At first, I spent an
inordinate amount of time tweaking the view hierarchies of the profile and
sign-in screens themselves, with varying—and rather inconsistent—levels of
success. I ran out of both time and patience, so I moved on to other things to
not stall the project any further. Weeks later, I came back to the problematic
screen—pitchfork in hand—ready to gut the entire tab navigation and replace it
with a custom-made solution. I had had enough.

But then came the proverbial aha moment: what if the conditional check took
place *inside* the second tab, instead of *around* it?

```swift
TabView {
  Home()
    .tabItem { /* ... */ }
    .tag { /* ... */ }

  ProfileOrSignIn(isSignedIn: $isSignedIn)
    .tabItem { /* ... */ }
    .tag { /* ... */ }
}
```

And *just* like that, the crasher was gone. Squashed into oblivion.

If this sounds dumb, it’s because it is. At no point did the compiler chastise
me for doing something I wasn't supposed to do. And to make matters worse, the
documentation doesn't mention anything related to... wait, what documentation?

It’s a bittersweet feeling when you fix a bug in a non-deterministic, haphazard
way. On one hand you are elated you’ve managed to fix it at all. On the other,
you feel somewhat powerless and insecure about your ability to handle similar
situations in the future. I adore SwiftUI, but moments like these give me a good
dose of anticipatory anxiety—the kind that erodes trust and dampen the thrill of
being at the bleeding edge.

[^1]: As an aside, apps that greet users with a sign up screen are generally
    trash. You don't ask prospective tenants to sign the contract at the door
    before they've even seen the apartment.
