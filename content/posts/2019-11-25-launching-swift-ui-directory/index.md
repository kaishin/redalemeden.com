---
date: 2019-11-25T09:25+01:00
title: "Launching SwiftUI Directory"
category: journal
tags:
  - Swift
  - SwiftUI
  - OSS
audience: "SwiftUI developers having a hard time finding the right open source library"
---

Today I am happy to launch [SwiftUI Directory],
a curated list of open-source SwiftUI libraries that are painstakingly scouted,
categorized, and tagged for anyone who’s looking to solve a particular problem within the nascent framework.

![SwiftUI Directory](header-image.png)

SwiftUI represents an exciting opportunity for the open-source ecosystem around Apple platforms.
An opportunity that many good samaritans are jumping on to fill the gaps of SwiftUI’s current embryonic state.

This constant stream of work, however, is getting increasingly harder to navigate for anyone not spending a good chunk of their time on Twitter and Github.

[SwiftUI Directory] is my attempt to solve this problem by focusing primarily on search and categorization. All libraries are cached on the client, making search instantaneous and offline-friendly. For those who want to follow along, [Twitter], [RSS], or [JSON] feeds are in place. I also included [an endpoint] that will return all indexed libraries as JSON for those interested to use that data for whatever purpose.

Here are some highlights:

* The website is open-source, and suggesting new libraries is one [GitHub issue] or [tweet][Twitter] away. You can find more information on contributing [here](https://github.com/kaishin/swiftui.directory/blob/master/CONTRIBUTE.md).
* I am currently not going to consider architecture and data flow projects, full-fledged apps, and playgrounds. This might change in the future.
* The website supports dark mode. A manual toggle will be added down the line.
* Currently the website is in english only. I will consider localizing it to other languages if there is enough user and contributor interest.

Hope you have a pleasant experience using SwiftUI Directory and don’t hesitate to [reach out](/contact) if you have any questions or suggestions!

[SwiftUI Directory]: https://swiftui.directory
[Twitter]: https://twitter.com/swiftuidir
[RSS]: https://swiftui.directory/feed.xml
[JSON]: https://swiftui.directory/feed.json
[an endpoint]: https://swiftui.directory/all.json
[GitHub issue]: https://github.com/kaishin/swiftui.directory/issues/new?&template=new-library-template.md

