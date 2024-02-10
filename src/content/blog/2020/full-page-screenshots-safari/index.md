---
pubDate: Mar 23 2020
title: "Full-Page Screenshots in MacOS Safari without Extensions"
tags:
  - Tips
---

Here's a new trick I picked up this morning: you can take full-page screenshots
of any Web page in Safari for macOS without using third-party extensions.

Before trying this at home, make sure you have the _Develop menu_ enabled. In
case it's not visible in the menu bar, head to **Safari ▶ Preferences ▶ Advanced
▶ Show Develop menu in menu bar**.

Once that's taken care of, follow these steps:

1. Head to **Develop ▶ Show Web Inspector** or use the <kbd>Option</kbd> +
   <kbd>Command</kbd> + <kbd>I</kbd> shortcut.
2. In the first _Elements_ tab, look for the `html` tag in the source tree.
3. Right-click the `html` tag and choose _Capture Screenshot_.
4. Choose a destination and save the file. Append the `.png` extension to the
   name if you want preview to properly recognize it as an image.

Bonus: You can capture any HTML tag in the source tree, not just the root
element.
