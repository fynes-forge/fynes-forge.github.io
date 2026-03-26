---
id: SSH Keys
sidebar_position: 2
---

SSH keys let you authenticate with GitHub without entering your password every time you push or pull. Setting them up once means secure, seamless access from your terminal.

## What is an SSH Key?

An SSH key is a pair of cryptographic keys:

* **Private key** — stays on your machine. Never share this.
* **Public key** — uploaded to GitHub. This is safe to share.

When you connect to GitHub, your machine proves it holds the private key that matches the public key on GitHub. No password needed.

## Generate an SSH Key

1. Open a terminal.

2. Run the following command, replacing the email with the one linked to your GitHub account:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

3. When prompted for a file location, press Enter to accept the default:

```bash
Enter file in which to save the key (/home/you/.ssh/id_ed25519):
```

4. Optionally set a passphrase for extra security, or press Enter to skip.

5. Your keys are now saved. The public key is at `~/.ssh/id_ed25519.pub`.

## Add the SSH Key to GitHub

1. Copy your public key to the clipboard:

```bash
cat ~/.ssh/id_ed25519.pub
```

2. Go to [github.com](https://github.com) and sign in.

3. Click your profile picture → **Settings**.

4. In the left sidebar, click **SSH and GPG keys**.

5. Click **New SSH key**.

6. Give it a descriptive title (e.g., `Work Laptop`).

7. Paste your public key into the **Key** field.

8. Click **Add SSH key**.

## Test the Connection

Run this to confirm GitHub accepts your key:

```bash
ssh -T git@github.com
```

You should see:

```bash
Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

:::tip
If you're on Windows and don't have `ssh-keygen`, install Git for Windows — it includes Git Bash with full SSH support.

If you already have an SSH key at `~/.ssh/id_rsa.pub`, you can use that instead of generating a new one.
:::

## Common Mistakes

**Permission denied (publickey)** — the SSH agent isn't running or your key isn't loaded. Fix it:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

**Wrong email address** — if you used a different email to the one on your GitHub account, the key may not link to your profile. Delete the key from GitHub and regenerate with the correct email.

**Copied the private key instead of the public key** — always use the `.pub` file. The private key file has no extension and must never leave your machine.

---

**Next Steps:** [Connecting Your Local Repository to GitHub](/git_101/Grade%203/Connecting%20to%20GitHub)
