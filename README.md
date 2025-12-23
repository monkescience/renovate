# Renovate Configuration

Shared [Renovate](https://docs.renovatebot.com/) configuration for monkescience repositories.

## Configuration

The configuration extends Renovate best practices with:

- **Semantic commits** - PRs use conventional commit format
- **Auto-merge major updates** - Major version updates are auto-merged
- **14-day minimum release age** - Updates wait 14 days before being proposed
- **OpenTofu registry** - Terraform providers/modules use the OpenTofu registry
- **Argo CD support** - Scans Argo CD Application manifests for image updates

## Usage

This configuration runs via GitHub Actions on a schedule. Renovate will automatically create PRs in managed repositories when dependency updates are available.

See [renovate-config.js](renovate-config.js) for the full configuration including managed repositories.
