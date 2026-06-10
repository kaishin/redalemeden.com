---
title: "Using Xcode 27 Skills with Any Harness"
description: "Xcode 27 ships with a set of AI coding skills you can export and use with Claude Code, Codex, OpenCode, or any harness that supports the skills format."
audience: "Apple platform developers using AI coding tools"
tags: ["Apple", "Programming", "Swift", "AI"]
pubDate: 2026-06-09T12:00:00
---

Beside [new MCP tools](/derived-data/2026/what-new-in-xcode-27-mcp-bridge), the Xcode 27 beta comes with a half dozen agent skills covering topics such as SwiftUI, security, and testing. These are all available to agents used from within Xcode, but even if you use an external agent like I do, you're in for a treat as these can be exported as skill folders and used by any AI coding harness such as [Claude Code](https://claude.ai/code), [OpenCode](https://opencode.ai), or anything else that supports the skills format.

## How to

Before exporting these skills you need to point `xcode-select` at Xcode 27:

```bash
sudo xcode-select -s <beta-location>/Contents/Developer # Example: /Applications/Xcode-27.0.0-Beta.app/Contents/Developer
```

Then run from wherever you want the output to land:

```bash
xcrun agent skills export
```

This creates an `xcode-skills/` folder containing all the skill folders, but if you want to save these in a different folder, either global or repo-specific, use the following command:

```bash
xcrun agent skills export --replace-existing ~/.claude/skills
```

Once exported, feel free to revert xcode-select to the stable version, as skills stay put regardless of which Xcode version is active afterward.


## The Skills

- **`swiftui-whats-new-27`**: Xcode 27 SwiftUI changes such as the `@State` macro migration, reorderable containers, and the new document model.
- **`swiftui-specialist`**: Provides broader SwiftUI guidance, including soft-deprecated patterns.
- **`uikit-app-modernization`**: Replaces `UIScreen.main`, `interfaceOrientation`, and other legacy shared-state APIs with multi-window-aware alternatives, in both Swift and Objective-C.
- **`c-bounds-safety`**: Adopting C bounds-safety attributes and removing unsafe pointer usage.
- **`test-modernizer`**: Migrating test suites to current testing APIs.
- **`audit-xcode-security-settings`**: Checks project security settings against current best practices.
- **`device-interaction`**: Device-specific interaction patterns.
