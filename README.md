# Renovate Configuration

Shared [Renovate](https://docs.renovatebot.com/) preset for monkescience repositories.

## Usage

1. Add a `renovate.json` to your repository:

```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": ["github>monkescience/renovate"]
}
```

2. Add the workflow to `.github/workflows/renovate.yaml`:

```yaml
name: Renovate

on:
  schedule:
    - cron: '0 6 * * 5' # Every Friday at 6:00 AM UTC
  workflow_dispatch:

jobs:
  renovate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate GitHub App token
        id: generate-token
        uses: actions/create-github-app-token@v2
        with:
          owner: monkescience
          app-id: ${{ vars.RENOVATE_APP_ID }}
          private-key: ${{ secrets.RENOVATE_APP_PRIVATE_KEY }}

      - name: Renovate
        uses: renovatebot/github-action@v44
        with:
          token: ${{ steps.generate-token.outputs.token }}
        env:
          LOG_LEVEL: info
```

## Preset Configuration

The shared preset in [default.json](default.json) includes:

- **Semantic commits** - PRs use conventional commit format
- **Auto-merge major updates** - Major version updates are auto-merged
- **14-day minimum release age** - Updates wait 14 days before being proposed
- **OpenTofu registry** - Terraform providers/modules use the OpenTofu registry
- **Argo CD support** - Scans Argo CD Application manifests for image updates
