---
slug: local-coding-agent-macbook-air-m4
title: Going Fully Local! A Coding Agent on a MacBook Air M4 with Ollama, Jan, and Qwen2.5-Coder
authors: [tomfynes]
date: 2026-08-09
tags: [ollama, jan, qwen, local-llm, vscode, ai]
description: I wanted a coding agent that doesn't phone home. Here's how I got Qwen2.5-Coder:14b running entirely on a 16GB MacBook Air M4, using Ollama and Jan, wired into VS Code as an actual agent.
---

I've written before about handing the keys to a cloud coding agent and watching it modernise a portfolio site. That's still a good workflow. But it has a dependency I don't love: it needs the internet, an API key, and a running meter.

So I asked a different question. How far can I get with a coding agent that never leaves my laptop? No API costs, no data leaving the machine, no "the model has been deprecated" email six months from now. Just a MacBook Air M4 with 16GB of RAM, doing the work itself.

Turns out — further than I expected, with three pieces of open source software and one afternoon of fighting with context windows.

## The Requirements

Same instinct as always: understand the constraints before writing a line of config.

1. **Fully offline.** If Wi-Fi drops, the agent keeps working.
2. **No cloud dependency.** Nothing leaves the machine, ever.
3. **Realistic on 16GB unified memory.** This isn't a Mac Studio. Whatever I run has to leave headroom for VS Code, Chrome, and my sanity.
4. **Usable inside VS Code**, not just a chat window I copy-paste from.

The fourth one is what turns "a local chatbot" into "a coding agent."

## The Stack

- **[Ollama](https://github.com/ollama/ollama)** — runs the model and exposes it as a local server. This is the engine room.
- **[Jan](https://github.com/janhq/jan)** — an open source, Apache-2.0 desktop app that gives you a proper chat interface over local (or remote) models, plus its own OpenAI-compatible API server. I use it to sanity-check the model before trusting it inside my editor.
- **[Qwen2.5-Coder:14b](https://ollama.com/library/qwen2.5-coder)** — the model doing the actual thinking. Alibaba's code-specialised release, and the 14b-parameter, 4-bit quantised version is the sweet spot for a 16GB machine — it fits with room to spare for everything else running alongside it.
- **[Cline](https://github.com/cline/cline)** — the open source, Apache-2.0 VS Code extension that turns a local model endpoint into an actual autonomous agent inside the editor: it reads your repo, proposes a plan, edits files, runs terminal commands, and iterates — with your approval at each step.

Four projects, all open source, none of them asking for a card number.

## Step One: Get Ollama Running

Install it, then pull the model.

```bash
brew install ollama
ollama serve
```

In a second terminal:

```bash
ollama pull qwen2.5-coder:14b
```

That's roughly a 9GB download. On the Air M4 with 16GB unified memory, the quantised model sits comfortably in RAM alongside a browser and an editor — this is the config I'd actually recommend for this hardware. Don't reach for the 32b variant unless you enjoy watching your machine swap to disk.

Quick sanity check that it's alive:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5-coder:14b",
  "prompt": "Write a Python function that returns the nth Fibonacci number.",
  "stream": false
}'
```

If that returns actual code and not a timeout, Ollama is doing its job.

## Step Two: Wire Up Jan

Jan isn't strictly required to make this work — you could point VS Code straight at Ollama's endpoint and skip it. I keep it in the loop anyway, for the same reason I don't push straight to a production database: I want an interface to poke at the model, check its reasoning, and compare it against other local or remote models before I let it touch a repo.

Install Jan, then under **Settings → Model Providers**, add Ollama as a provider pointing at `http://localhost:11434`. Jan will pick up `qwen2.5-coder:14b` automatically since it's already pulled. From here it behaves like any other chat interface — except every token of it stays on your machine.

## Step Three: Make It a Coding Agent in VS Code

This is the part that turns a local model from "a novelty" into "something I use daily." Install [Cline](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) from the VS Code marketplace, then in its settings choose **Ollama** as the API provider, point the base URL at `http://localhost:11434`, and select `qwen2.5-coder:14b` from the detected model list. No API key, no account, no request routed anywhere except back to itself.

Here's the gotcha that cost me an evening: Ollama ships models with a tiny default context window — 2,048 tokens on older builds, 4,096 on newer ones — regardless of what the model can actually handle. Cline is an agent, not a chat box. Its system prompt, file contents, and tool-call history fill that window almost immediately, and once it's full, Ollama silently truncates. The agent doesn't error out. It just starts "forgetting" the task halfway through, which looks a lot like the model being bad when it's actually the plumbing being wrong.

The fix is a custom Modelfile that bakes a larger context size in permanently:

```bash
cat <<'EOF' > Modelfile
FROM qwen2.5-coder:14b
PARAMETER num_ctx 32768
EOF

ollama create qwen2.5-coder-agent -f Modelfile
```

Point Cline at `qwen2.5-coder-agent` instead of the base tag, and it stops losing the plot mid-task. On a 16GB machine, 32K is about as far as I'd push it — the KV cache for a larger context competes with the model weights for the same unified memory pool, and that's before VS Code and Chrome take their share.

## What Actually Works

For scoped tasks — writing a function against a clear spec, explaining a stack trace, refactoring a widget, generating boilerplate — Qwen2.5-Coder:14b running locally is genuinely good. Fast enough that it doesn't feel like a downgrade from a cloud model for these tasks, and there's something quietly satisfying about watching an agent reason through your code with the Wi-Fi switched off.

## Where It Struggles

Full transparency: this isn't a like-for-like replacement for a frontier cloud model yet. Context window is the main constraint — 14b models running locally are typically configured with a smaller context than you'd get from a hosted API, so very large multi-file refactors need to be broken into smaller asks. It's also noticeably weaker on tasks that require holding a lot of unrelated context in mind at once — the kind of "understand this entire fifteen-file feature" request that a bigger model handles more gracefully.

The honest framing: this is the right tool for contained, well-specified coding tasks. It is not yet the tool for "figure out why this distributed system is misbehaving across six services."

## Current State

Ollama, Jan, and Cline are all sitting on this MacBook Air right now, and the setup above is what I reach for whenever a coding task doesn't need to leave the laptop. It's not replacing my cloud agent workflow — it's sitting alongside it, for the tasks where privacy or offline-first matters more than raw capability.

Which brings me to the thing I'm actually excited about. Phonics Journey — the app I've been [building for my daughter](/blog/data-engineer-builds-an-app) — has a growing pile of feedback and small bugs that are exactly the "contained, well-specified" shape this setup is good at. My next post is going to be about pointing this exact local agent at that repo and seeing how much of that feedback backlog it can clear on its own, entirely offline, while my daughter is testing the app on a tablet with no internet at all.

Watch this space.
