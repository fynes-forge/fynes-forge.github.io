---
slug: local-agent-dependabot-emoji-gaps
title: Turning the Local Agent Loose on Real Feedback
authors: [tomfynes]
date: 2026-08-14
tags: [flutter, dependabot, cline, ollama, qwen, local-llm, phonics-journey]
description: I pointed my offline coding agent — Ollama, Cline, and Qwen2.5-Coder:14b — at a real backlog from Phonics Journey. Nine Dependabot PRs and a pile of words falling back to a sparkle emoji.
---

Last post was the setup: Ollama, Jan, and Cline, wired together into a coding agent that never touches the internet once the model's loaded. This post is the part that actually matters — pointing it at a real backlog.

Two pieces of feedback had been sitting on [Phonics Journey](https://github.com/fynes-forge/phonics-journey) for a few weeks:

1. A stack of open Dependabot PRs, several of them major version bumps I'd been quietly ignoring.
2. A note from actual usage: some words in the game were showing a sparkle (✨) instead of a picture, and kids can't sound out a word from a sparkle.

Neither is glamorous. Both are exactly the shape of task I wanted this setup for.

## Problem One: Nine Dependabot PRs, Several Not Trivial

- `audioplayers` 6.6.0 → 6.7.1 (patch)
- `go_router` 14.8.1 → 17.3.0 (**three major versions**)
- `permission_handler` 11.4.0 → 12.0.3 (major)
- `record` 6.2.0 → 7.0.0 (major)
- `bloc` / `flutter_bloc` bump
- `actions/checkout` 4 → 7 (major, CI)
- `codecov/codecov-action` 4 → 7 (major, CI)
- `softprops/action-gh-release` 2 → 3 (major, CI)

Dependabot's honest about what changed in the diff. It says nothing about whether [go_router](https://pub.dev/packages/go_router) rewrote its routing API across three major versions in a way that breaks my nested navigator setup, or whether [record](https://pub.dev/packages/record)'s 7.0.0 dropped a platform I still support. That's the actual work, and it's exactly the kind of contained, well-specified reading task a 14b model handles well.

I pointed Cline at the repo with a narrow brief — not "upgrade everything," but one dependency at a time:

```
Check the changelog for go_router between 14.8.1 and 17.3.0.
List any breaking changes relevant to GoRouter, ShellRoute, or
redirect logic used in lib/router/. Don't touch any files yet —
just summarise the risk.
```

For the CI action bumps, this was almost a non-event — `actions/checkout` and `codecov-action` major version jumps are typically about dropping old runner support, not changing behaviour I depend on. Cline flagged them as low-risk, I merged them without a second thought, and that's three PRs gone in the time it takes to read a commit message.

`go_router` was the one that earned its keep. The agent's summary correctly flagged that versions in the 15.x line changed how redirect functions receive `BuildContext`, which mattered because [Phonics Journey](https://github.com/fynes-forge/phonics-journey) gates a couple of routes behind a "which phase are you on" redirect. It proposed the updated redirect signature, I ran `flutter test`, and it passed on the first try. Not because the model is magic — because reading a changelog and adapting one function signature is squarely inside what a code-specialised 14b model can do reliably.

`permission_handler` and `record` I handled the same way, one PR at a time, agent-summarised risk first, human merge decision second. That's the actual workflow: the agent removes the "reading three changelogs on a Tuesday evening" tax, it doesn't remove the judgment call.

## Problem Two: Words Falling Back to a Sparkle

The second piece of feedback was more interesting, because it's a data problem wearing a code problem's clothes.

`EmojiDictionaryService` is deliberately boring — no dependencies, no network, a hardcoded `Map<String, String>` with a fallback:

```dart
class EmojiDictionaryService {
  EmojiDictionaryService._();

  static String getEmoji(String word) {
    return _map[word.toLowerCase().trim()] ?? '✨';
  }

  static const Map<String, String> _map = {
    'sat': '🪑',
    'sun': '☀️',
    // ...several hundred more
  };
}
```

The fallback is correct engineering — never throw, never return null, a kid mid-game should never see a crash. But it also means a gap in the map is silent. Nobody gets an error. A word just quietly shows a sparkle instead of a picture, and a five-year-old has no way to know that's a bug rather than the game being weird on purpose.

First step wasn't the agent at all — it was a five-line script to find the actual gap, because I wanted ground truth before I trusted a model's opinion of one:

```dart
import 'dart:convert';
import 'dart:io';

void main() {
  final curriculum = jsonDecode(File('assets/curriculum.json').readAsStringSync());
  final allWords = <String>{
    for (final phase in curriculum['phases']) ...(phase['words'] as List).cast<String>(),
  };

  final mapped = EmojiDictionaryService.mappedWords; // exposed the map's keys for this check

  final missing = allWords.difference(mapped);
  print('${missing.length} words with no emoji mapping:');
  missing.forEach(print);
}
```

That surfaced a real, finite list — a few dozen words scattered across later phases, mostly ones that snuck into `curriculum.json` after the emoji map was last updated. When adding words to the curriculum, I hadn't been checking whether they had a corresponding emoji in the map. That was a human error, and it was easy to fix.

This is where the local agent actually earned the "agent" label rather than "assistant." I fed it the missing word list and the existing map as context and asked it to propose emoji for each word, following the pattern already in the file:

```
Here's a list of words with no entry in _map. Suggest a single emoji
for each, matching the concrete, kid-recognisable style already used
in the map (see: 'sun': '☀️', 'duck': '🦆'). Flag any word where no
single emoji captures it clearly, rather than guessing.
```

The results were a genuinely mixed bag, and I think the mix is the interesting part. Concrete nouns — animals, objects, colours — it nailed without hesitation. Abstract or multi-sense words were where it got shaky: a couple of suggestions technically matched the word's *most common* meaning while missing the meaning used in *this* curriculum phase, which is exactly the kind of context a local 14b model doesn't hold as reliably as I'd like. It correctly flagged three words as "no clean single-emoji fit" rather than forcing a bad guess, which is the answer I actually wanted from a fallback-shaped problem — a clear "I don't know" instead of confident nonsense.

Every suggestion went into the map as a draft, and every single one got eyeballed by a human before merging — specifically the human who watches the actual five-year-old play the actual game. For a kids' literacy app, that review step isn't optional caution, it's the whole point.

## What This Actually Proves

Neither of these tasks needed a frontier cloud model. Reading a changelog and adapting a function signature, or matching a word to an emoji from an existing style — that's contained, well-specified work, which is exactly the category I flagged last post as the sweet spot for a local 14b model on 16GB of memory. The backlog that had been sitting there for weeks got worked through in an evening, offline, without a single API call.

The honest caveat stands too: the moment a task needed genuine judgment about *which* sense of a word the curriculum meant, the model's confidence dropped and mine had to pick up the slack. That's not a complaint. That's the setup working as intended — a local agent clearing the mechanical backlog so the time I actually have goes toward the ten words that needed a human's ear, not the two hundred that didn't.

`EmojiDictionaryService` is a little more complete now. The Dependabot queue is no more. And I've got a much better sense of where the line sits between "let the agent handle this" and "put the coffee down and think about it yourself."

## What's Next

Next up in the final part of this series: local models might not send you a monthly invoice, but "free" doesn't mean free of constraints. I’ll be diving into why you still need to log, manage, and visualize your token usage—and how building a lightweight observability pipeline could help catch the silent context-window truncation bug before it could ruin another evening.