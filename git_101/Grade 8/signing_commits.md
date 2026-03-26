---
id: Signing Commits
sidebar_position: 6
---

Signing commits with GPG proves that a commit was made by you and hasn't been tampered with. GitHub displays a "Verified" badge on signed commits, giving your project and collaborators confidence in the commit's authenticity.

## What is GPG Commit Signing?

GPG (GNU Privacy Guard) uses public-key cryptography. You sign commits with your private key. Anyone can verify the signature using your public key, which you upload to GitHub.

## Install GPG

On macOS:

```bash
brew install gnupg
```

On Ubuntu/Debian:

```bash
sudo apt install gnupg
```

On Windows, download [Gpg4win](https://gpg4win.org/).

## Generate a GPG Key

```bash
gpg --full-generate-key
```

At the prompts:
* Key type: `RSA and RSA` (option 1)
* Key size: `4096`
* Expiry: `0` (does not expire) or set a duration
* Name and email: use the email address associated with your GitHub account

## List Your GPG Keys

```bash
gpg --list-secret-keys --keyid-format=long
```

Output:

```bash
sec   rsa4096/3AA5C34371567BD2 2025-01-15 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid   [ultimate] Tom Fynes <tom@example.com>
```

The key ID is the part after `rsa4096/` — in this example, `3AA5C34371567BD2`.

## Export Your Public Key

```bash
gpg --armor --export 3AA5C34371567BD2
```

This outputs a block starting with `-----BEGIN PGP PUBLIC KEY BLOCK-----`.

## Add the Public Key to GitHub

1. Copy the full output of the export command.
2. Go to GitHub → **Settings** → **SSH and GPG keys**.
3. Click **New GPG key**.
4. Paste the key and click **Add GPG key**.

## Configure Git to Use Your GPG Key

Tell Git which key to use for signing:

```bash
git config --global user.signingkey 3AA5C34371567BD2
```

## Sign Commits

Sign a single commit with `-S`:

```bash
git commit -S -m "Add payment processing"
```

## Sign All Commits Automatically

```bash
git config --global commit.gpgsign true
```

After this, every commit is signed without needing `-S`.

## Sign Tags

```bash
git tag -s v1.0.0 -m "Release 1.0.0"
```

Verify a signed tag:

```bash
git tag -v v1.0.0
```

## Verify a Signed Commit

```bash
git verify-commit HEAD
```

Or view signature information in the log:

```bash
git log --show-signature -1
```

:::tip
Set `commit.gpgsign true` globally so you never forget to sign. Once GitHub shows "Verified" badges on your commits, collaborators and CI systems can trust the commit's origin.

If you use multiple machines, export your GPG key and import it on each machine, or generate a separate key per machine and add all public keys to GitHub.
:::

## Common Mistakes

**GPG agent not running** — on Linux and some macOS setups, the GPG agent needs to be running for signing to work. Add `export GPG_TTY=$(tty)` to your shell profile (`.bashrc` or `.zshrc`).

**Email mismatch** — the email on your GPG key must match the email in your Git config (`user.email`) and your GitHub account. If they don't match, GitHub won't show the "Verified" badge.

**Key expired** — if your GPG key has an expiry date and it's passed, signing will fail. Extend the key expiry with `gpg --edit-key <key-id>`, then `expire`, `save`.
