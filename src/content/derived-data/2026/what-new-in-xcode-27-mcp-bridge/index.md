---
title: "What's New in Xcode 27 MCP Bridge"
description: "Xcode 27 beta expands the mcpbridge catalog of tools from 21 to 48, adding deep device interaction, live debugging, crash analytics, localization support, and more."
audience: "Apple platform developers using AI coding tools"
tags: ["Apple", "Programming", "AI"]
pubDate: 2026-06-09
image: ""
---

WWDC 2026 kicked off yesterday with the usual keynote, State of the Union, and beta software for those who like to live life dangerously. Xcode 27 beta is also out, and it includes a significant expansion of the `mcpbridge` toolset. I have been using the bridge for a while in my agentic coding workflow, and this beta goes from 21 tools to 48, adding deep device interaction, live debugging, crash analytics, localization, and more. This will solve a lot of the problems I've been patching around in my workflow, inlcuding interacting with the simulator and debugging.

Here's every new tool and what it does.

## Running & Debugging

- **RunProject**: The biggest new addition, builds and runs the current scheme, the equivalent of pressing Cmd+R. Returns once the app has launched. Pair it with InvokeDebuggerCommand and GetConsoleOutput to drive a full debug session.
- **StopProject**: Stops the running app, the equivalent of Cmd+. Returns immediately if nothing is running.
- **InvokeDebuggerCommand**: Sends any lldb command to Xcode's active debug session and returns the output. The process must already be running with the debugger attached. Supports the full lldb surface: `bt`, `po`, `breakpoint set`, `thread step-over`, `frame variable`, etc. The agent and Xcode UI share the same lldb session, so state is consistent on both sides.
- **GetConsoleOutput**: Retrieves stdout, stderr, and OSLog output from a running or completed app session. Supports regex filtering, severity filtering, and context extraction.
- **RunCodeSnippet** *(replaces ExecuteSnippet)*: Builds and runs a code snippet in the context of a specific source file and waits for results. Returns the output of any `print` statements in the snippet. Works for app, framework, library, and command-line targets.

## Device Interaction

- **DeviceInteractionStartSession**: Prepares a simulator or physical device for interaction and boots it if needed. Designed to be called early so the device is ready in parallel with other work. Keeping a session open is expensive, so always close it when done.
- **DeviceInteractionEndSession**: Closes an open device session. Must be called when interaction is finished.
- **DeviceInteractionInstallAndRun**: Builds, installs, and launches the app on the currently targeted device. Should be called every time the project changes, the target device changes, or the previous debug session has disconnected.
- **DeviceInteractionSynthesize**: Synthesizes device events: taps, swipes, text input, hardware button presses, orientation changes, etc. then captures the resulting state as a screenshot and UI hierarchy. Always base coordinates on the latest hierarchy dump, not a screenshot.

## Crash Reporting & Field Performance

- **GetTopCrashIssues**: Pulls the top crash signatures for an app from Apple's crash reporting service, sorted by number of affected devices over the last 14 days. Supports filtering by platform, version, and release channel (App Store vs. TestFlight).
- **GetCrashIssueLogs**: Drills into a specific crash signature to retrieve raw crash logs plus expert triage analysis and actionable recommendations. Use after GetTopCrashIssues.
- **GetTopFieldPerformanceIssues**: Surfaces the top performance regressions from Apple's field report APIs. Covers four diagnostic types: `launches`, `hangs`, `diskwrites`, and `energy`.
- **GetFieldPerformanceIssueLogs**: Retrieves detailed diagnostics for a specific performance issue: stack traces, timeline data, and expert triage guidance. Use after GetTopFieldPerformanceIssues.

## Build Settings & Compiler Flags

- **GetTargetBuildSettings**: Returns all build settings for a given target. The canonical way to inspect build settings instead of parsing `project.pbxproj` directly.
- **UpdateTargetBuildSetting**: Updates, appends, or deletes a named build setting for a target. Same caveat: always use this tool instead of editing `project.pbxproj` directly.
- **GetFileCompilerFlags**: Gets the per-file compiler flags for a single source file in a target: the value shown in the Compiler Flags column of Build Phases > Compile Sources.
- **UpdateFileCompilerFlags**: Updates, appends, or deletes per-file compiler flags for a single source file.

## Schemes & Run Destinations

- **XcodeListSchemes**: Lists all schemes in the current workspace with their sharing status and container. Active scheme is listed first. Full list is written to a file for grep-friendly access.
- **XcodeSwitchScheme**: Switches the active scheme by name or disambiguated name.
- **XcodeListRunDestinations**: Lists available run destinations for the active scheme, grouped the same way the Xcode picker does (Devices, Simulators, Build, Incompatible). Identifies the active destination. Incompatible destinations are omitted by default.
- **XcodeSwitchRunDestination**: Changes the active run destination for the current scheme. Pass the destination's `displayTitle` from XcodeListRunDestinations. Refuses destinations that aren't eligible for the active scheme.

## Project Configuration

- **AddEntitlement**: Adds a new entitlement to the project's entitlements file for a given target. Only for restricted system capabilities gated by code signing—push notifications, app groups, iCloud, hardware access, etc. Not for standard frameworks, privacy descriptions, or general feature flags. Use AddInfoPlist for privacy descriptions.
- **AddInfoPlist**: Adds or updates an Info.plist key (privacy usage descriptions, URL schemes, background modes, orientation settings, app metadata, etc.) Not for entitlements.

## Localization

- **StringCatalogRead**: Returns string keys grouped by translation state for a requested locale. Requires the `xcode-integration:translation-coordinator` skill to be active before calling.
- **StringCatalogContext**: Returns the source language value and context for a given string in the String Catalog. Requires the `xcode-integration:translation` skill.
- **StringCatalogEdit**: Inserts a translation for a given locale into the String Catalog. Requires the `xcode-integration:translation` skill.
- **LocalizationPlanner**: Ensures the project is ready for translations to be added. Call this each time you're adding a new language or translating an entire project. Requires the `xcode-integration:translation-coordinator` skill.


Whether the agent runs standalone or inside Xcode through [ACP](https://agentclientprotocol.com/get-started/introduction), the new tools close the loop that previously required reaching out to `simctl` and friends just to run and poke at the app to verify their work. `DeviceInteractionSynthesize` alone eliminates a whole class of workarounds. `GetConsoleOutput` is similarly welcome, since pulling logs directly instead of switching windows and copy-pasting saves more time than it sounds once you're doing it dozens of times a session.
