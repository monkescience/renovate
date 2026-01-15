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
    inputs:
      log_level:
        description: Log level
        default: info
        type: choice
        options:
          - info
          - debug
          - trace
          - warn
          - error
          - fatal

jobs:
  renovate:
    runs-on: ubuntu-latest
    steps:
      - name: Generate GitHub App token
        id: generate-token
        uses: actions/create-github-app-token@29824e69f54612133e76f7eaac726eef6c875baf # v2
        with:
          owner: monkescience
          app-id: ${{ vars.RENOVATE_APP_ID }}
          private-key: ${{ secrets.RENOVATE_APP_PRIVATE_KEY }}

      - name: Renovate
        uses: renovatebot/github-action@f7fad228a053c69a98e24f8e4f6cf40db8f61e08 # v44.2.1
        with:
          token: ${{ steps.generate-token.outputs.token }}
        env:
          RENOVATE_REPOSITORIES: ${{ github.repository }}
          LOG_LEVEL: ${{ inputs.log_level || 'info' }}
```

## Required Configuration

Configure these at the organization level (Settings > Secrets and variables > Actions):

| Type | Name | Description |
|------|------|-------------|
| Variable | `RENOVATE_APP_ID` | GitHub App ID |
| Secret | `RENOVATE_APP_PRIVATE_KEY` | GitHub App private key |

## Preset Configuration

The shared preset in [default.json](default.json) includes:

- **Semantic commits** - PRs use conventional commit format
- **Auto-merge major updates** - Major version updates are auto-merged
- **14-day minimum release age** - Updates wait 14 days before being proposed
- **OpenTofu registry** - Terraform providers/modules use the OpenTofu registry
- **Argo CD support** - Scans Argo CD Application manifests for image updates
- **Workflow variables** - Updates variables with inline renovate comments

## Inline Version Comments

The preset includes a custom regex manager for GitHub workflow variables. Add a `# renovate:` comment to any variable in `.github/workflows/*.yaml`:

```yaml
env:
  HELM_VERSION: v3.19.0 # renovate: datasource=github-releases depName=helm/helm
  TOOL_VERSION: v1.2.3 # renovate: datasource=github-releases depName=owner/repo
```

Renovate will automatically create PRs when new versions are available.
