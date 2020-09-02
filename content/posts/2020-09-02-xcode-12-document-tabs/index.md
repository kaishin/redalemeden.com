---
date: 2020-09-02T11:10+02:00
title: "How I Use Xcode 12 Document Tabs"
category:
audience: "developers using Xcode"
tags:
  - Code
---

The new _document tabs_ in Xcode 12 can be rather confusing at first, but it turns out to be quite powerful for many a use case.

For instance, in server-side projects I am typically dealing with half a dozen files related to the same area or feature; the model itself, the repository, migrations, tests, mocks, etc. Before, I used separate window tabs for each "topic", but now I rely heavily on document tabs to fill that need. My current workflow goes roughly like this:

- I usually keep 3 window tabs in every project: _development_, _testing_, and _debugging_. I occasionally create break-out window tabs for self-contained tasks like refactoring, reading the source code of a dependency, etc.

- In the development window tab, I use horizontal areas (panes) to split different topics of the app. Usually these correspond to a model file and/or a feature and their satellite types. In most cases it's one or two, but there are occasionally features that touch many areas of the app.

- Inside each area, I use the new _document tabs_ to keep all the related files open, enabling quick tab switching using the keyboard shortcut <kbd>cmd</kbd> + <kbd>shift</kbd> + <kbd>[</kbd> or <kbd>]</kbd>.

- I use vertical panes when I need to look at different files in the same topic. An example would be the model and its migration file in server-side, or a view and its state object in SwiftUI.

I reason better about code and architecture when I can visualize it, and  I've been enjoying the addition of document tabs as an additional tool to achieve that.
