---
slug: jevons-paradox-ai-code
title: "Cheap Code Doesn't Mean Less Work: Jevons' Paradox and AI Coding"
authors: [tomfynes]
tags: [ai]
date: 2026-11-07
---

There's an assumption I keep hearing: if AI makes writing code faster and cheaper, teams will need less time to ship the same things. That hasn't been my experience. It definitely takes less time to ship any individual feature, but overall, it leaves you with more work.

I think it's Jevons' Paradox.

## What Jevons' Paradox Is

In the 1860s, William Stanley Jevons noticed that as steam engines got more efficient with coal, Britain didn't use less coal. It used more. Cheaper energy meant more things were worth powering.

The same pattern shows up whenever something gets cheaper. We don't bank the saving, we find more uses for it.

## How It Plays Out With Code

If writing code gets cheap, the saving doesn't turn into early finishes. From what I've seen, it turns into three things:

- **Bigger projects.** Things that were once "too big for the team" start to look possible.
- **More of everything.** More features, more services, more integrations, shipped faster.
- **Scope with no natural limit.** "The AI can build it" is now an answer to almost any request, so the scope grows to match.

I'm living in that third one. For me the extra work looks like this:

- **Faster deadlines.** If the code is quick to write, the timeline shrinks to match. Most of that pressure comes from me. I know I can do more, so I plan for more.
- **More features per project.** The scope grows because each addition looks cheap.
- **Work that used to wait is pulled forward.** Something like setting up telemetry wrappers or metric pipelines might once have been pushed to phase two. Now an agent can instrument a service in an afternoon, so it gets pulled into sprint one.

None of that is unreasonable on its own. Together, it means the time I save writing code gets spent on a bigger, faster version of the same project.

## Expectations Move Faster Than the Work

The observability example is the one that stuck with me. Adding boilerplate instrumentation early is good practice, and I'm glad it's happening. But once setting up full telemetry is possible in an afternoon instead of a week, it stops being a nice extra and becomes the baseline. The same goes for tests, docs and monitoring.

So the bar goes up for everything at once, and a lot of the time it's me raising it.

## The Part That Doesn't Get Cheaper

Generating code got fast. AI shrinks the time it takes to ship code, but it inflates the total work required to keep the system running.

More code means more to integrate, more to debug and more to maintain. A service that took a day to generate still has to be deployed, monitored, understood and eventually changed by someone. Generating telemetry code is cheap now, but storing log noise and filtering un-tuned alerts at 3am definitely isn't. As a data engineer, I think about this in terms of pipelines: every new one is another thing that can break in production, however quickly it was written.

So the outcome isn't less complexity. It's the same teams looking after a lot more code, with more integration friction, harder debugging and a longer tail of technical debt.

## What I'd Do About It

I don't think the answer is to avoid AI tools. I use them. But I'd treat the speed as a reason to be pickier, not looser:

- **Ask "should we?" before "can we?"** The fact that something is quick to build is no longer a reason to build it.
- **Count the cost of keeping it.** Before adding a service or a pipeline, ask who will own it a year from now.
- **Put the saved time into the slow parts.** Tests, docs and review are where the extra code gets absorbed. If those don't grow with the codebase, the debt does.
- **Delete things.** If code is cheap to write, it should also be easy to remove, and we rarely do it.

I also invest in the tooling around the work: agents, skills and automation. If I'm going to be looking after more, I'd rather build things that take some of it off me than just work longer. That's partly why I've been writing about [gh-aw](/blog/github-agentic-workflows-ga).

## The Honest Caveats

- **This is my experience, not data.** I haven't measured it, and "twice as much" is a feeling rather than a number. Your team may see something different.
- **Some of this is my own doing.** Nobody told me to take on twice as much. I did it because I could.
- **Jevons' Paradox isn't a law.** It only holds when demand is elastic. For some work, cheaper code may really mean finishing sooner.
- **Some of this is good.** Getting observability in early is something I'd always wanted. The problem isn't the work being better, it's that it arrives on top of everything else.
- **I'm not neutral here.** I use these tools every day and benefit from them.

## Final Thoughts

I think the efficiency is real. What I doubt is that it turns into free time. Shipping code takes less time than ever, but it turns into more software, faster deadlines, and a higher baseline—and someone still has to look after all of it.

I spend far less time typing out raw syntax and far more time deciding what code actually deserves to exist. That hasn't made the work any easier.
