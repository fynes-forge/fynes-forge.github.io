---
id: Sensitive Data
sidebar_position: 5
---

Accidentally committing secrets — API keys, passwords, tokens, private keys — is one of the most common and serious mistakes in Git. This lesson covers how to prevent it and what to do if it happens.

## Why Sensitive Data in Git is Dangerous

Once a secret is committed and pushed, it's in the history. Even if you delete the file in a later commit, the secret is still retrievable from the old commit. Anyone with repository access — or anyone who ever cloned or forked it — may have a copy.

GitHub's secret scanning also monitors public repositories for known credential patterns and notifies both you and the affected service provider.

## Prevent Secrets from Being Committed

The first line of defence is `.gitignore`. Add patterns for files that typically hold secrets:

```
.env
.env.local
*.pem
*.key
secrets.json
config/credentials.yml
```

Use environment variables instead of storing secrets in files:

```bash
export DATABASE_URL="postgres://user:password@host/db"
```

For local development, use a `.env` file that is listed in `.gitignore` and never committed. Load it with a library like `python-dotenv` (Python) or `dotenv` (Node.js).

## Check for Secrets Before Committing

Review staged changes before committing:

```bash
git diff --staged
```

Use a pre-commit scanning tool to block accidental secret commits. `git-secrets` and `truffleHog` are popular options.

## What To Do If a Secret Is Committed

Act immediately — assume the secret is compromised the moment it's pushed.

1. **Revoke the secret** — rotate or delete the exposed credential in the service that issued it (AWS, GitHub, etc.) before doing anything else.

2. **Remove from history** — use `git filter-repo` (the recommended tool) to permanently rewrite history and remove the file:

```bash
pip install git-filter-repo
git filter-repo --path secrets.env --invert-paths
```

3. **Force push the cleaned history**:

```bash
git push origin --force --all
git push origin --force --tags
```

4. **Notify collaborators** — anyone who has cloned the repository needs to re-clone or reset their local copy, as their history still contains the secret.

:::warning
Force pushing rewrites the shared history. Co-ordinate with your team before doing this. Everyone needs to re-clone or rebase off the new history.
:::

## GitHub Secret Scanning

GitHub automatically scans repositories for known secret patterns and alerts you. Enable it in:

**Settings → Code security → Secret scanning**

For private repositories on GitHub Enterprise, secret scanning is available as a paid feature.

## Use a Secret Manager

For production applications, store secrets in a dedicated secret manager rather than environment variables or files:

* **GitHub Secrets** — for values used in GitHub Actions workflows.
* **AWS Secrets Manager**, **HashiCorp Vault**, **Azure Key Vault** — for application runtime secrets.

:::tip
Add a `.env.example` file to your repository with placeholder values. This documents what environment variables are needed without exposing real credentials.

```
DATABASE_URL=postgres://user:password@host/db
API_KEY=your-api-key-here
```
:::

## Common Mistakes

**Assuming a deleted file is gone from history** — deleting a file in a commit doesn't remove it from earlier commits. Use `git filter-repo` to truly purge it.

**Rotating credentials but not cleaning history** — rotating the credential is the most urgent step, but clean the history too to prevent confusion and future accidental use.

**Not adding `.env` to `.gitignore` before creating it** — create the `.gitignore` entry before you create the `.env` file, not after. Git may have already started tracking it.

---

**Next Steps:** [Signing Commits with GPG](/git_101/Grade%208/Signing%20Commits)
