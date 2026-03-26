---
id: Automating Deployments
sidebar_position: 4
---

Automated deployments remove manual steps from your release process. With GitHub Actions, you can deploy your application automatically when code is merged to `main` or a release tag is pushed.

## What is Continuous Deployment?

Continuous Deployment (CD) extends CI by automatically releasing passing code to an environment — staging or production — without manual intervention. You define the deployment logic once as a workflow, and every qualifying push triggers it.

## Deploy to GitHub Pages

GitHub Pages is a free hosting service for static sites. Here's a workflow that builds and deploys a static site on every push to `main`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Deploy on a Tag Push

Trigger deployment only when a release tag is pushed:

```yaml
on:
  push:
    tags:
      - "v*"
```

## Deploy to a Custom Server via SSH

```yaml
- name: Deploy via SSH
  uses: appleboy/ssh-action@v1.0.3
  with:
    host: ${{ secrets.SERVER_HOST }}
    username: ${{ secrets.SERVER_USER }}
    key: ${{ secrets.SSH_PRIVATE_KEY }}
    script: |
      cd /var/www/myapp
      git pull origin main
      npm ci
      npm run build
      pm2 restart app
```

## Use Repository Secrets for Credentials

Never hard-code API keys or passwords in workflow files. Store them as repository secrets:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Reference them in your workflow as `${{ secrets.MY_SECRET }}`.

:::caution
Always use secrets for credentials, tokens, and SSH keys. Workflow YAML files are committed to your repository and visible to anyone with access. A secret in a YAML file is a security incident.
:::

:::tip
Use deployment environments (Settings → Environments) to require manual approval before deploying to production. This gives you a human checkpoint even in a fully automated pipeline.
:::

## Common Mistakes

**Committing secrets directly in the workflow file** — rotate any exposed credentials immediately and use GitHub Secrets instead.

**Not testing the deployment workflow before pointing it at production** — test against a staging environment or a separate repository first.

**Missing permissions for GitHub Pages** — the `permissions` block in the workflow must include `pages: write` and `id-token: write` or the deployment will fail with a permissions error.

---

**Next Steps:** [Managing Sensitive Data and .gitignore](/git_101/Grade%208/Sensitive%20Data)
