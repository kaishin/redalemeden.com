---
date: 2015-03-07T12:24:52+01:00
title: "IPinator"
category: journal
tags:
  - Product
  - macOS
  - App
---

I'm pleased to announce that [IPinator] is *finally* [live on the App Store][appstore]. It's a utility app and Notification Center widget that displays your external IP address and locates it on a map for easy access during local development, VPN setup, etc.

![IPinator screenshot](ipinator-screenshot.jpg) _Application window and Notification Center extension._

IPinator is written in Swift and uses [Argo] for JSON parsing and [Llamakit] for `Result`. During development, I came across a limitation where Today extensions can't display a `MKMapView` directly. I got around it by generating an `NSImage` of the map and displaying it instead.

If you'd like to write about IPinator, feel free to [drop a line][contact] for a promo code.

[ipinator]: http://ipinator.kaishin.co
[appstore]: https://itunes.apple.com/us/app/ipinator/id959111981
[argo]: https://github.com/thoughtbot/Argo
[llamaKit]: https://github.com/LlamaKit/LlamaKit
[contact]: http://ipinator.kaishin.co/support
