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

permissions: {}

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
        uses: actions/create-github-app-token@bcd2ba49218906704ab6c1aa796996da409d3eb1 # v3
        with:
          owner: ${{ github.repository_owner }}
          client-id: ${{ vars.RENOVATE_APP_ID }}
          private-key: ${{ secrets.RENOVATE_APP_PRIVATE_KEY }}
          repositories: ${{ github.event.repository.name }}

      - name: Renovate
        uses: renovatebot/github-action@f0f41e5f2e706165f6814b1d0f0d0e319de7d1d9 # v46.3.8
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
- **Auto-merge non-major updates** - Minor and patch updates of stable (>= 1.0) packages, digest, pin, and lock file maintenance updates are auto-merged. Major updates and all 0.x version updates require manual review
- **6-day minimum release age** - Updates wait 6 days before being proposed. Security fixes and lock file maintenance skip the wait
- **Trusted registries without release timestamps** - Updates for `ghcr.io/monkescience/**`, `cgr.dev/chainguard/**`, and `gcr.io/distroless/**` are proposed without a release age check, since these registries do not report publish dates
- **Lock file maintenance** - Runs on every Renovate run
- **Grouped tool updates** - golangci-lint and goreleaser updates from mise and workflow variables land in one PR per tool
- **OpenTofu registry** - Terraform providers/modules use the OpenTofu registry
- **Argo CD support** - Scans Argo CD Application manifests for image updates
- **Version comments** - Updates `_VERSION` variables in workflows and Makefiles that carry a `# renovate:` comment

## Version Comments

The preset extends Renovate's built-in [`customManagers:githubActionsVersions` and `customManagers:makefileVersions`](https://docs.renovatebot.com/presets-customManagers/) presets. Put a `# renovate:` comment on the line above a variable whose name ends in `_VERSION`:

```yaml
env:
  # renovate: datasource=github-releases depName=helm/helm
  HELM_VERSION: v3.19.0
```

```makefile
# renovate: datasource=go depName=github.com/vladopajic/go-test-coverage/v2
GO_TEST_COVERAGE_VERSION := v2.20.0
```

Inline comments after the value (`HELM_VERSION: v3.19.0 # renovate: ...`) are not supported and get paired with the wrong variable.
