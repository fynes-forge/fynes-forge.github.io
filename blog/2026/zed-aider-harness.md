---
slug: zed-and-aider-workflow
title: "Less Config, More Context: Zed and Aider as a Lightweight Agent Harness"
authors: [tomfynes]
tags: [ai]
date: 2026-10-24
---

Models have come a long way. A year or two ago, getting decent results from a coding agent meant a lot of scaffolding: long prompt files, rigid workflows, elaborate rules to stop it wandering off. These days a good model with the right context, a few real tools, and some well-written documents will get you most of the way there.

What hasn't kept up is the config sprawl. Every agent tool wants its own instructions file. `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `CONVENTIONS.md`, `copilot-instructions.md`. Same rules, different filenames, and a slow drift between all of them.

I've been avoiding that by pairing **Zed** with **Aider** and treating Aider as a thin harness rather than a platform. This post is how that works and why I prefer it.

<!--truncate-->

## What I Mean by a Harness

A harness is the bit of software that sits around the model and gives it something to work with. Some of them are very heavy, with their own orchestration, their own memory, and their own opinions about how you should work.

Aider is the opposite. It does a small number of things well:

- builds a map of your repo so the model knows what exists
- lets you add the files that matter and mark others as read-only
- applies edits straight to disk
- commits to git as it goes
- runs your tests and lint, and feeds failures back to the model

That's it. No agent framework to learn, and nothing that needs its own rulebook. The model does the thinking, and Aider keeps it grounded in your code.

Zed sits alongside as the place I actually read things: file tree, definitions, diffs. Between the two I get a decent setup without much to maintain.

## Context, Tools, and Documents

When I think about what an agent needs, it comes down to three things. Handily, I already had all three.

**Context.** Aider's repo map plus the files I add to the chat give the model what it needs to work on a task. A capable model doesn't need me to hand-write a summary of the codebase; it can read the code.

**Tools.** Git, the test runner, the linter. Aider can run your test and lint commands after every change and hand failures back to the model. This is the closest thing to a feedback loop, and it's made of tools that were already in the project.

```yaml
# ~/.aider.conf.yml
auto-test: true
# test-cmd: your test runner here
```

**Documents.** This is the one people over-engineer. If your project already has clear docs on architecture, conventions and typing rules, that's what the agent should read. I'd rather have one good document than five copies of it in different formats.

## One Set of Files

So both tools read from the same place:

```
┌─────────────────────────────────────────────────────────┐
│                       ZED EDITOR                        │
│                                                         │
│  [ Visual IDE ]        [ Integrated Terminal Panel ]    │
│  • File editing        • Runs Aider CLI                 │
│  • Visual diffs        • Auto-tests                     │
│  • Skill import        • Architect → Editor handoff     │
└───────────────────────────┬─────────────────────────────┘
                            │
               Reads the same files on disk
                            │
                            ▼
     ~/.agents/skills/   &   .github/copilot-instructions.md
```

### Skills

Zed has a neat command for importing agent skills: `agent: create skill from url`. Point it at a remote `SKILL.md` and it drops the file into `~/.agents/skills/`.

Rather than importing the same skills again for Aider, I pointed Aider's global config at that directory:

```yaml
# ~/.aider.conf.yml
read:
  - ~/.agents/skills/*/SKILL.md
```

Grab a new skill in Zed and Aider picks it up the next time it starts. No second copy, no second import.

### Project Guardrails

Same idea per repo. I already keep project instructions in `.github/copilot-instructions.md`, so I point Aider at that rather than writing a separate file just for it.

Zed's inline assistant and Aider now work to the same rules, and there's one file to update when those rules change. That's the whole trick. I'm not maintaining instructions for each tool, I'm maintaining documents about my project, and the tools read them.

## Who Does What

Neither tool does anything the other can't technically do. Each one is just nicer for certain jobs.

### Zed: Where I Read Things

An editor is still the best place for the high-bandwidth, eyes-on-it work:

- **Navigating:** scanning the file tree and jumping to definitions across a few files.
- **Reviewing diffs:** looking over a multi-file change properly before it gets committed.
- **Small fixes:** a two-line tweak is quicker to type than to explain in a prompt.

### Aider: Where the Work Gets Done

Aider runs in Zed's integrated terminal panel (`` Ctrl + ` ``), and that's where I hand over the bigger jobs:

- **Architect → Editor handoff:** planning and editing are split into separate model passes, so one model can think about the approach and another can write the code.
- **Test loops:** with `auto-test: true`, Aider runs your tests and tries to fix its own failures without me prompting it again.
- **Git commits:** edits land on disk as small, granular commits, so anything it gets wrong is easy to roll back.

## Watching It Work

This is the part I enjoy most. Aider writes straight to disk and Zed notices.

While Aider runs in the terminal panel, the open editor pane updates, modified lines show up in the git gutter, and the diff panel fills in as it goes. I can follow what the agent is doing in a proper visual diff instead of scrolling terminal output and hoping I'm keeping up.

I haven't hit any file-locking weirdness between the two either, which is more than I can say for some setups I've tried.

## What a Session Looks Like

1. **Docs first.** Make sure the project's instructions and any skills I want enforced (TDD, security checks, keeping bloat out) are in the shared locations.
2. **Hand it over.** Open the terminal panel, run `aider`, and let it plan and work through the task.
3. **Review in Zed.** Go through the changes in the git diff panel with the full context around them.
4. **Iterate.** Fix the small stuff by hand, or give Aider a follow-up prompt for another pass.

## The Honest Caveats

This works because the models are good enough to do it. A weaker model would need more hand-holding, and then the extra scaffolding starts earning its keep again. That's worth knowing before you strip everything out.

A shared config also cuts both ways. A vague or wrong document now misleads every tool at once, so the documents have to be good. And you're still responsible for reading the diff.

But I'd rather spend my time writing one decent document about my project than keeping five tool-specific copies in sync. The model reads it, the tools run your tests, and I review the result in an editor I like.
