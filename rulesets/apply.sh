#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <repo> [repo2] [repo3] ..."
  echo "Example: $0 gitops-mixin phasor vital"
  exit 1
fi

apply_ruleset() {
  local repo=$1
  local file=$2
  local name
  name=$(jq -r '.name' "$file")

  # Check if ruleset already exists
  local existing_id
  existing_id=$(gh api "/repos/monkescience/$repo/rulesets" --jq ".[] | select(.name == \"$name\") | .id" 2>/dev/null || echo "")

  if [[ -n "$existing_id" ]]; then
    # Update existing ruleset
    gh api -X PUT "/repos/monkescience/$repo/rulesets/$existing_id" \
      --input "$file" > /dev/null \
      && echo "  ✓ $name ruleset updated" \
      || echo "  ✗ $name ruleset update failed"
  else
    # Create new ruleset
    gh api -X POST "/repos/monkescience/$repo/rulesets" \
      --input "$file" > /dev/null \
      && echo "  ✓ $name ruleset created" \
      || echo "  ✗ $name ruleset creation failed"
  fi
}

for REPO in "$@"; do
  echo "Applying rulesets to monkescience/$REPO..."
  apply_ruleset "$REPO" "$SCRIPT_DIR/branch-protection.json"
  apply_ruleset "$REPO" "$SCRIPT_DIR/conventional-commits.json"
  apply_ruleset "$REPO" "$SCRIPT_DIR/branch-naming.json"
  echo ""
done

echo "Done!"
