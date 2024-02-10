---
pubDate: Sep 06 2019
title: "RSS Feed Issues"
tags:
  - Announcement
---

I've been running into several abstruse issues when smoke testing this website's
feeds in some RSS readers, including the newly released [NetNewsWire
5](https://ranchero.com/netnewswire/). Upon further investigation, I found out
that due to a glaring misuse of some *Node.js* APIs, all URLs have been missing
a `/` after the `https` part[^1].

The bad news? Once the fix is deployed, most RSS readers will reset the read
status of the entire feed, since the individual entries are uniquely identified
by their URLs. What's worse, readers that cache previous entries will end up
with duplicate content.

I apologize for the inconvenience that this might cause and promise to be more
careful to avoid syndication-related bugs like these in the future.

[^1]: For the curious, I inadvertently used the `path.join(…)` method instead of
    `url.resolve(…)` to construct these URLs. The former is only supposed to be
    used in the context of file system paths, *not* URLs.
