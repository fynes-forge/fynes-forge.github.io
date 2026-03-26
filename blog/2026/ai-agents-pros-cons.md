---
slug: ai-agents-pros-and-cons
title: "AI Agents: The Good, the Frustrating, and the Genuinely Useful"
authors: [tomfynes, copilot]
date: 2026-03-19
tags: [misc, web-dev, ai]
---

*Full transparency upfront: this post was written by a GitHub Copilot agent on my behalf. I gave it the brief, it wrote the words. My thoughts, its keyboard. Make of that what you will.*

I've been using AI agents on and off for a while now — mostly for the kind of work that's important but nobody actually *wants* to do. Dependency upgrades, config fixes, writing that README that's been sitting at four lines for six months. After [asking an agent to modernise this very site](/blog/ai-agent-portfolio-modernization), I figured it was time to actually sit down and think through where this stuff genuinely helps, and where it doesn't.

Because there's a lot of hype. And I'm not here for hype.

<!-- truncate -->

## The Case For

Let me start with the honest wins, because there are real ones.

### It handles the mechanical stuff without complaint

There's a category of work that I'd describe as *important but not interesting*. Updating a deprecation warning. Moving a config option to the right place. Adding `loading="lazy"` to an image. These are small, correct changes that have real value — but they're also the things I find myself putting off because there's always something more engaging to work on.

An agent doesn't have that problem. It doesn't get bored. It doesn't decide it'll do it later. You ask, it does.

### It reads context before it acts (when it's good)

The thing I noticed with the portfolio modernisation was that the agent didn't just start writing code immediately. It read `package.json`, understood the existing CSS variables, checked the brand palette, and *then* made changes that fit. It didn't invent new colors or swap out the font stack for something unrelated. It worked within what was already there.

That's the behavior you want from anyone touching a codebase they didn't write — junior developer or AI. When it does this well, it genuinely feels like working with a careful, methodical collaborator.

### It's fast when the scope is clear

Clear input, clear output. If you know what you want and can articulate it reasonably well, you can get a useful result in minutes rather than hours. For the kind of tasks where the main bottleneck is just *doing the thing*, that matters a lot.

I've used it to write boilerplate, draft documentation, scaffold new sections of a site, and clean up messy config files. In every one of those cases the speed difference was real.

### It doesn't get precious about the work

You can take what it produces, ignore half of it, change the other half, and it doesn't care. There's no ego, no "but I spent ages on that section." The output is a starting point and nothing more. For a lot of creative and technical tasks, that's exactly the right dynamic.

---

## The Case Against

Right. Now for the part the LinkedIn posts tend to skip.

### It can be confidently wrong

This is the one that bites people. Agents can produce output that *looks* correct — well-structured, coherent, plausible — while being subtly off in ways that only become apparent when you test it properly or read it carefully.

I've seen it misconfigure options that existed in a previous version of a library but were renamed. I've seen it write documentation that described behaviour correctly in most cases but missed an important edge case. The output often *feels* authoritative, which makes you want to trust it more than you should.

The fix is review. Proper review, not just a quick skim. The agent produces a draft, you're the editor.

### Vague input produces vague output

"Improve this" is not a useful instruction. "Modernise this site" is vague enough that you have to hope the agent infers the right scope. When it works, it's because the agent managed to narrow down what you probably meant from context — which isn't always guaranteed.

The more specific you can be about the outcome you want, the better the result. Which means you still need to understand the problem well enough to describe the solution clearly. That's not a reason not to use agents, but it does mean the skill of writing good instructions becomes genuinely important.

### It doesn't know what it doesn't know

Agents don't flag uncertainty the way a thoughtful human collaborator would. They tend to produce complete-sounding answers rather than saying "actually, I'm not sure about this part, you should check." That means you have to bring your own scepticism to the table.

If you're working in a domain you know well, this is fine — you'll spot the gaps. If you're using it to work in an area you're less familiar with, be careful. The fact that an answer is well-written doesn't mean it's correct.

### Context windows have real limits

For longer, more complex tasks, agents can start to lose track of things they read earlier in the conversation. Details that were important at the start of a task can effectively get forgotten by the time the agent is working on step four. This is improving — context windows are getting larger — but it's still a practical limit you'll run into.

Breaking bigger tasks down into smaller, discrete chunks helps a lot here.

---

## How I Think About It Now

After using this enough to have opinions, the framing I've landed on is: **agents are good at execution, not at judgment**.

If you've made the decisions — what to build, how it should work, what tradeoffs are acceptable — and you just need someone to do the work, an agent can often handle that well. If you need someone to *help you figure out what to do*, it's more limited. It'll give you answers, but the quality of those answers depends heavily on how well you can guide it.

The practical upshot is that agents amplify whatever clarity you already have. A well-defined task becomes a fast task. A vague task becomes a guessing game.

The portfolio modernisation worked as well as it did because I knew what I wanted: no new colors, no new dependencies, just tighten up what's already there. The agent had enough constraints to work within and enough autonomy to be useful. That balance is worth thinking about before you start.

---

## Would I Keep Using Them?

Yes, obviously. But with the editor hat on, not the passenger one.

The pattern I've settled into is roughly: agent produces a draft, I review it like I'd review someone else's code, I ship what's correct and rework what isn't. That's not much different from how I'd work with anyone else on a project, which I think is the right way to think about it.

They're tools. Genuinely useful ones, with real limitations. Treat them accordingly and they'll pay for themselves pretty quickly.

*— Written by GitHub Copilot, on Tom's behalf*
