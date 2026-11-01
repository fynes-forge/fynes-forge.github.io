---
slug: github-agentic-workflows-ga
title: "Writing Repo Automation in Markdown: A Look at GitHub Agentic Workflows (gh-aw)"
authors: [tomfynes]
tags: [ai]
date: 2026-11-01
---

GitHub announced general availability of Agentic Workflows (gh-aw) at Universe this year. It's been in preview from GitHub Next for a while, and the idea is simple: you write your repository automation in Markdown, and it compiles down to a normal GitHub Actions workflow.

I'm cautious about anything that lets an LLM loose in a repo unsupervised. So this post covers how gh-aw works, what I tried, and where I'd be careful.

## The Problem It's Aiming At

Actions has always been good at deterministic work: run the tests, lint the code, build the image. The YAML is rigid, but that's the point.

It's much less good at the fuzzy recurring jobs. Triaging new issues, checking whether docs have drifted from the code, reading a failed pipeline log and working out what went wrong. If you wanted an agent to do those, you had to wire up webhooks, run your own workers, or host a standing bot.

gh-aw tries to close that gap without adding a second runtime.

## How It Works

A workflow is one Markdown file with two parts:

- **YAML frontmatter:** the triggers, the permissions, the budget limits and the outputs the agent is allowed to produce.
- **A Markdown body:** plain-English instructions telling the agent what to look at and what to do.

Running `gh aw compile` turns that file into a locked `.lock.yml` that runs on standard Actions runners. There's no hidden orchestrator in the middle, and you commit both files, so the thing that actually runs is in version control where you can read it.

The agent runs in a sandbox with read-only access by default. If it wants to write anything (a comment, a label, a PR), that has to be declared up front as a "safe output". I think that's the most important design decision in the whole thing, and I'll come back to it.

It also isn't tied to one model. The engine can be GitHub Copilot, Claude Code, OpenAI Codex or Gemini, so you can swap backends without rewriting the workflow.

## Trying It Out

Install the CLI extension:

```bash
gh extension install github/gh-aw
```

Then create `.github/workflows/issue-triage.md`:

```markdown
---
on:
  issues:
    types: [opened]
permissions:
  contents: read
  issues: write
engine: copilot
safe-outputs:
  create-issue-comment:
    max: 1
  add-label:
    max: 2
---

# Automated Issue Triage Agent

Analyse newly opened issues and triage them according to project standards:

1. Read the issue title and body carefully.
2. Check if the issue reports a data pipeline failure, schema drift, or SQL syntax error.
3. Apply the appropriate labels (`bug`, `data-quality`, or `documentation`).
4. Leave a polite comment acknowledging the issue and outlining the steps the team needs to reproduce it.
```

Compile it and commit both files:

```bash
gh aw compile

git add .github/workflows/issue-triage.*
git commit -m "ci: add agentic issue triage workflow"
git push
```

I picked issue triage for an initial test because it's low stakes. The worst outcome is a wrong label, which is easy to spot and easy to fix.

To test how it performed, I opened a dummy test issue describing a pipeline schema drift. The workflow picked it up in about 15 seconds, accurately applied the `bug` and `data-quality` labels, and left a polite comment asking for the specific log trace. The trial run took about 35 seconds total. The only minor bump was that `gh aw compile` rejected my first attempt due to strict YAML indentation under `safe-outputs`, but once that was fixed, compilation was instant.

## Why the Safe Outputs Matter

Look at the frontmatter again. The agent can leave one comment and add up to two labels, and that's all it can do. It can't push code, close the issue or touch anything else, however the issue text is worded.

That matters because issue bodies are untrusted input. Anyone can open an issue and write whatever they like in it, including instructions aimed at the agent. Limiting what the agent can *do*, rather than relying on it to behave, is the sensible way to deal with that.

## Where I'd Use It

I'm a data engineer, so I'm looking at this through that lens. A few jobs look like a good fit:

- **Docs drift:** on each push, check whether dbt model descriptions or `schema.yml` still match the latest migrations.
- **Pipeline failure triage:** feed failure logs to an agent that reads the stack trace, finds the failing model and drafts a PR with a suggested fix.
- **Housekeeping:** the small recurring jobs that never make it to the top of the backlog.

While I've only evaluated this in an isolated test setup so far, automated issue triage is definitely something I look to implement properly outside of this initial trial. For pipeline failures, drafting a PR with a proposed dbt fix is another test I'd like to try next—keeping the safe outputs strictly capped at draft PR creation.

## The Honest Caveats

This isn't a replacement for your existing Actions workflows, and I wouldn't use it that way.

- **It isn't deterministic.** Run the same workflow twice and you may get different results. That's fine for triage and a bad fit for anything that has to be exactly right, like deployments.
- **It costs money.** Every run uses model credits. There's a budget limit in the frontmatter (`max-ai-credits`), but you still need to keep an eye on it, and a noisy trigger like `push` on a busy repo could add up.
- **The prompt is now part of your codebase.** A vague instruction produces vague behaviour. Review changes to the Markdown as carefully as you'd review code.
- **You still need to read what it does.** Especially at the start, check its comments, labels and PRs before you trust it.

## Final Thoughts

What I like about gh-aw is that it doesn't introduce a new place for automation to live. It's Markdown you can read, a compiled file you can review, and a normal Actions run. The restrictions are declared up front rather than hoped for.

Having tested it out, issue triage is definitely something I look to implement as a proper workflow outside of this initial test run. I'd recommend starting with a similar low-risk trial, keeping the safe outputs tight, and seeing how it behaves on your repo before giving it broader scope.