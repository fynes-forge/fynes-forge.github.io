---
slug: data-engineer-builds-an-app
title: "The Accidental App Dev: When a Phonics Request Becomes a Full-Stack Journey"
authors: [tomfynes]
date: 2026-05-10
tags: [flutter, dart, hive, mobile-dev]
---

I'm a Data Engineer. My day usually involves wrangling SQLMesh models, optimising ETL pipelines, and making sure data stays intact across distributed systems. I think in batches, streams, and schemas.

I do not, typically, think in widget trees.

But then my daughter asked me for a phonics app. Something aligned to the "Little Wandle" curriculum she uses at school — specific phoneme progressions, offline-first, no accounts, no ads. Simple enough brief. Completely underestimated scope.

What I thought would take a weekend has, at time of writing, taken the better part of two weeks. And counting.

<!-- truncate -->

## The Requirements

The brief from my daughter was simple. The brief I set for myself was not.

1. **Offline first.** No loading spinners because the Wi-Fi dropped in the car.
2. **Privacy first.** Zero tracking. No cloud. No accounts. Nothing.
3. **Curriculum aligned.** It has to follow the exact phoneme progression of Little Wandle Letters and Sounds Revised — 100 levels across four phases.
4. **Snappy UI.** It needs to feel like a game, not a spreadsheet.

The fourth requirement is the one that humbled me.

## The Stack

Coming from a world of Python and SQL, I landed on **Flutter** with **Dart**. Cross-platform, performant, and the animation primitives are genuinely good — which matters when you're building something children are supposed to find engaging.

For persistence, I chose **Hive**. It's a lightweight, key-value database written in pure Dart with no native dependencies. Since there's no cloud backend and never will be, I needed something that lives entirely on the device. Hive fits that cleanly — you define typed "Boxes", register adapters, and you have a local source of truth that survives app restarts without any of the ceremony of SQLite.

Here's how level progress is modelled:

```dart
@HiveType(typeId: 1)
class LevelProgressModel extends HiveObject {
  @HiveField(0)
  final String profileId;

  @HiveField(1)
  final int levelId;

  @HiveField(2)
  int stars; // 0–3

  @HiveField(3)
  bool isUnlocked;

  LevelProgressModel({
    required this.profileId,
    required this.levelId,
    this.stars = 0,
    this.isUnlocked = false,
  });
}
```

Nothing clever. The constraint is the point — if a level has three stars, the next one unlocks. If it has fewer, it stays locked. That rule is enforced at the repository layer, not scattered across the UI.

## What a Data Engineer Gets Right Immediately

The curriculum itself. I modelled the entire 100-level Little Wandle progression as a `curriculum.json` file — phases, GPCs, word lists, tricky words, distractor letters, and now emoji mappings for a word-peek feature. Structuring hierarchical educational content as a versioned JSON schema is, it turns out, exactly the kind of problem I've been solving for years in a different context. That part took an afternoon.

State management also clicked relatively quickly. `flutter_bloc` treats UI events as a stream of data that produces a new state. Once I stopped thinking "this is a UI problem" and started thinking "this is a real-time transformation of an underlying event stream," it became approachable. Events come in, states come out, the widget rebuilds. It's not so different from a streaming pipeline — the sink just happens to be a screen rather than a data warehouse.

## What Humbled Me

**Assets are the new source systems.** I spent longer than I'd like to admit debugging why a tap sound wouldn't play in Chrome. In a data pipeline, a 404 on a source file is a P0 incident. In Flutter web, it's often a silent failure that halts your downstream logic entirely — in this case, the "save progress" step that runs after a level completes. The fix was to decouple audio from save logic entirely, wrapping every audio call in `unawaited()` so a missing MP3 can never prevent a child's stars from being written to Hive.

The root cause was subtler: Flutter's `rootBundle.load()` and `AssetSource()` have different expectations about path prefixes. One needs `assets/audio/...`, the other must not have it, because Flutter prepends it automatically. Treating them the same causes a double-path that produces a 404 with no stack trace. In SQL, a misconfigured source path is an error on line one. In mobile, it's a ghost.

**Layout is a constraint satisfaction problem.** Flutter has a charming way of showing you exactly where your UI is broken — yellow and black striped overflow tape, like someone cordoned off a crime scene inside your widget tree. My `planet_node.dart` widget kept overflowing by 13 pixels. A `Column` inside a `SizedBox` that was 130px tall, with contents that totalled 143px. In SQL, if a column is wider than expected, the warehouse doesn't care. In mobile, the rendering library files an exception and draws the tape.

The fix was straightforward — `ConstrainedBox`, `mainAxisSize.min`, a few adjusted heights — but finding it required understanding how Flutter's layout algorithm resolves constraints from parent to child, which is a mental model that doesn't exist anywhere in data engineering.

**The platform matrix is real.** The app targets Android, iOS, Linux desktop, and web. Each platform handles audio differently. Each platform handles file paths differently. The parental voice recorder feature — which lets a parent record custom phoneme pronunciations to replace the TTS fallback — requires microphone access on mobile, means nothing on web, and needs graceful degradation on both. Every feature has to be written with `kIsWeb` and `Platform.isLinux` guards, or it breaks somewhere in the matrix.

## Current State

The app has a working planet-path level map, a drag-and-drop spelling engine with a 3-star gate, a three-tier audio system (bundled MP3 → UK English TTS → custom parental recording), and a word-peek feature that shows a large emoji representation of the target word on long-press. It runs on Chrome and Android. The Pixel build is next.

What's still open:

- Rendering fixes on smaller screens
- Audio on Android with the real TTS pipeline (web TTS is a different beast)
- Play Store and App Store submission — which I'm told is the final boss of app development and which I'm choosing not to think about yet

The repo is at [fynes-forge/phonics-journey](https://github.com/fynes-forge/phonics-journey) if you want to watch someone who knows how to build data pipelines figure out why their `pubspec.yaml` was missing a package that was clearly in the dependencies.

---

The honest reflection: the core engineering principle held. Understand your constraints before you write the first line of code. The constraints here — offline, private, curriculum-aligned, 4-year-olds as end users — shaped every technical decision. What I underestimated was how different the failure modes are when the "pipeline" is a UI running on five different platforms and the "data" is a child trying to spell "sat".

It's been a good two weeks. Ask me again when I'm through App Store review.

