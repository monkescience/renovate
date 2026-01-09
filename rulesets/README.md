# GitHub Repository Rulesets

Reusable rulesets for monkescience repositories.

## Rulesets

| Ruleset | Description | Tier |
|---------|-------------|------|
| `branch-protection.json` | Protects default branch: requires PRs, linear history, squash-only merges | Free |
| `conventional-commits.json` | Enforces conventional commit message format | Enterprise |
| `branch-naming.json` | Enforces `<type>/<description>` branch naming | Enterprise |

## Usage

Apply rulesets to one or more repositories:

```bash
./apply.sh <repo> [repo2] [repo3] ...
```

Examples:

```bash
./apply.sh gitops-mixin
./apply.sh phasor vital testastic
```

The script will:
- Create new rulesets if they don't exist
- Update existing rulesets if they do (matched by name)
- Skip gracefully if Enterprise-only rulesets fail on Free tier

Requires: `gh` CLI and `jq`.

## Ruleset Details

### branch-protection

- No branch deletion
- No force push
- Linear history required
- PRs required (0 approvals, thread resolution required)
- Squash merge only

### conventional-commits

Enforces commit messages match:

```
<type>(<scope>)!: <description>
```

Types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`

Examples:
- `feat: add user authentication`
- `fix(auth): resolve login redirect`
- `chore(deps): update dependencies`
- `feat!: breaking change`

### branch-naming

Enforces branch names match:

```
<type>/<description>
```

Examples:
- `feat/user-authentication`
- `fix/login-redirect`
- `chore/update-deps`

Excludes:
- Default branch
- `renovate/*` (Renovate bot)
- `release-please--*` (Release Please bot)
