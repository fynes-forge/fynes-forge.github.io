---
slug: why-i-created-fynes-forge
title: "Why I Created a GitHub Organisation (And Why You Probably Should Too)"
authors: [tomfynes]
date: 2026-03-26
tags: [misc, github, open-source]
---

I've had a personal GitHub account for years. It does what it needs to do — it holds my repos, tracks my contributions, and occasionally embarrasses me with commits from 2018 that I'd rather not think about.

So why did I go and create a GitHub organisation?

Honestly, the trigger was a conversation I was having with an AI assistant while planning a rebrand of my portfolio site. It asked me where I wanted everything to live. I said my personal account. It pushed back and asked whether that was actually what I wanted long term. I thought about it for a few minutes, and the answer turned out to be no.

This is the post I wish had existed when I was making that decision.

<!-- truncate -->

## What Even Is a GitHub Organisation?

If you've never used one, a GitHub organisation is essentially a shared namespace that sits above individual accounts. Instead of `github.com/tom-fynes/some-project`, you get `github.com/fynes-forge/some-project`. Repositories live under the org rather than under you personally.

That's the basic mechanical difference. But the implications are bigger than they first appear.

## Why I Did It

A few things pushed me over the line.

**I wanted a brand, not just a username.** My personal account is fine for personal things. But I've been building courses, writing blog posts, putting out tools and projects — that's starting to feel like something with a name. Fynes Forge isn't a company. It's just a clean way to group everything I make under a single identity that isn't tied to `Tom-Fynes` as a GitHub handle.

**It separates the personal from the professional.** Experimental repos, half-finished projects, things I'm tinkering with — those can stay on my personal account. Anything I'd actually want someone else to use, learn from, or contribute to lives under the org. That distinction matters when someone is looking at your work.

**It scales better.** Right now I'm the only person in Fynes Forge. That might not always be the case. If I ever want to bring in a collaborator — someone to help with a course, contribute to a tool, review a PR — an org gives me the infrastructure to do that properly. I can grant them access to specific repos without touching anything else. On a personal account, that's a much messier arrangement.

**The name was available.** Not a small thing. If you've got an idea for a brand name, check the availability across GitHub, npm, and domain registrars early. Names disappear.

## The Benefits, Properly

Let me be more specific about what you actually get.

**A separate profile page.** GitHub organisations get their own profile with a README, pinned repos, and a public presence that's distinct from your personal account. Mine shows Fynes Forge front and centre, with the courses and projects I want people to find. It reads like a studio rather than a personal homepage.

**Cleaner repo naming.** Everything under `fynes-forge` has an implicit context. Someone landing on `fynes-forge/sql-101` immediately understands where they are and what else might be there.

**Granular permissions.** When the time comes to add collaborators, I can give them access to exactly the repos they need. Teams, roles, repo-level permissions — all of that is available at the org level in ways it isn't on a personal account.

**Separate billing context.** If you ever start using paid GitHub features — Actions minutes, Copilot seats, Packages — you can track org costs separately from your personal account. Useful if you want to understand what you're actually spending on your projects.

**Namespace protection.** Claiming `fynes-forge` means nobody else can. If you're building anything with any public traction, that matters.

## The Downsides, Because There Are Some

I'm not going to pretend it's all upside.

**Context switching is mildly annoying.** You'll find yourself clicking between your personal account and the org more than you'd expect. GitHub's UI handles this reasonably well, but it's a small friction that wasn't there before.

**Free plan means public repos for Pages.** If you want to host a GitHub Pages site through an org on the free tier, the source repo has to be public. That's fine for a portfolio or open source project, but worth knowing before you assume you can keep things private.

**There's some setup overhead.** You need to configure the org settings properly — default branch names, security policies, Dependabot, Actions permissions. None of it is complex, but it's more to think about than a personal repo where you just start pushing code.

**It can feel like overkill if you're early.** If you've got two repos and no clear direction, an organisation might be more structure than you need. It's most useful once you have a coherent body of work that benefits from a shared identity.

## Would I Recommend It?

For a senior engineer who's building things publicly and wants to take their open source presence seriously — yes, without much hesitation.

The overhead is low. The upside on branding, structure, and future-proofing is real. And the cost on the free tier is zero, which makes the risk of trying it essentially nothing.

If you've been putting it off because it felt like unnecessary ceremony, I'd push back on that. It took me about an hour to set up properly — create the org, configure the settings, set up the profile README, start migrating repos. The main thing that took longer was picking a name, and that's a good problem to have.

---

Fynes Forge is at [github.com/fynes-forge](https://github.com/fynes-forge) if you want to see how it looks in practice. The profile README and repo structure are all there. If you want to see the branding itself — colours, logo variants, typography, and UI elements — the full reference can be seen [here](
/branding-pack-v2.html).
