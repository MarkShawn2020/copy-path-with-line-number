# Release Workflow Troubleshooting Guide

## Quick Diagnosis

### Check if workflow ran

1. Go to GitHub repository
2. Click **Actions** tab
3. Look for "Automated Release" workflow runs

### Common Scenarios

#### Scenario 1: No workflow appears in Actions tab

**Problem**: Workflow file not recognized or has syntax errors

**Solutions:**
```bash
# Validate workflow syntax locally
cat .github/workflows/release.yml | grep -A 2 "on:"

# Check GitHub Actions is enabled
# Go to: Settings → Actions → General → Actions permissions
# Ensure "Allow all actions and reusable workflows" is selected
```

#### Scenario 2: Workflow runs but shows "No release published"

**Problem**: Commits don't match release criteria

**Explanation**: semantic-release only creates releases for specific commit types:
- `feat:` → New minor release
- `fix:` → New patch release
- `BREAKING CHANGE:` → New major release

Commits with `chore:`, `docs:`, `style:`, `refactor:`, `test:` do NOT trigger releases.

**Solution**: Check your commit messages
```bash
# View recent commits
git log --oneline -5

# If last commit was chore/docs/etc, make a fix or feat commit
git commit --allow-empty -m "fix: trigger release for testing"
git push
```

#### Scenario 3: Workflow fails with "VSCE_PAT is not set"

**Problem**: This is now just a warning, not a failure

**Current behavior**:
- Workflow continues
- Skips marketplace publishing
- Creates GitHub release only
- Logs warning message

**To enable full publishing:**
1. Add `VSCE_PAT` secret (see GITHUB_SETUP.md)
2. Add `OVSX_PAT` secret
3. Push another commit or re-run workflow

#### Scenario 4: Workflow fails at "Release" step

**Possible causes:**

**A. Git push permission denied**
```
Error: Command failed: git push
Permission to user/repo.git denied
```

**Solution:**
1. Go to Settings → Actions → General
2. Workflow permissions → Select "Read and write permissions"
3. Save and re-run workflow

**B. Version already exists**
```
Error: version X.Y.Z already exists
```

**Solution:**
- semantic-release detected version was already released
- Make another commit with feat/fix
- Version will auto-increment

**C. Checkout with wrong credentials**
```
Error: The process '/usr/bin/git' failed with exit code 128
```

**Solution:** Already fixed in latest workflow (uses `token: ${{ secrets.GITHUB_TOKEN }}`)

## Debugging Steps

### Step 1: Check GitHub Actions Status

```bash
# Using GitHub CLI (if installed)
gh run list --limit 5

# Or visit manually
# https://github.com/YOUR_USERNAME/better-copy-path-with-lines/actions
```

### Step 2: View Detailed Logs

1. Click on failed workflow run
2. Click on "Release" job
3. Expand each step to see error messages
4. Look for red X marks

### Step 3: Check semantic-release output

In the "Release" step, look for:
```
✔  Allowed to push to the Git repository
✔  Loaded plugin "commit-analyzer"
✔  Loaded plugin "release-notes-generator"
```

If you see:
```
✖  Skip release because there are no relevant changes
```
→ Your commits don't trigger a release (see Scenario 2)

### Step 4: Verify Configuration Files

```bash
# Check .releaserc.json syntax
cat .releaserc.json | jq .

# Check workflow syntax
cat .github/workflows/release.yml
```

## Manual Testing

### Test semantic-release locally

```bash
# Install semantic-release globally (optional)
npm install -g semantic-release-cli

# Dry-run (doesn't publish anything)
GITHUB_TOKEN=dummy npx semantic-release --dry-run

# Check what would be released
npx semantic-release --dry-run | grep "next release version"
```

### Test publishing script

```bash
# Test publish script without tokens
bash .github/scripts/publish.sh

# Should output warnings but not fail
```

## Configuration Checklist

- [ ] `.github/workflows/release.yml` exists
- [ ] `.releaserc.json` exists
- [ ] Workflow has `on: push: branches: [main]`
- [ ] Workflow permissions include `contents: write`
- [ ] Actions has "Read and write permissions"
- [ ] Last commit follows conventional format
- [ ] Last commit is `feat:` or `fix:` (not `chore:`)
- [ ] GITHUB_TOKEN is automatically available (no setup needed)
- [ ] VSCE_PAT added to secrets (optional, for marketplace publish)
- [ ] OVSX_PAT added to secrets (optional, for Open VSX publish)

## Release Flow Overview

```
Push to main
    ↓
GitHub Actions triggers
    ↓
Checkout code (full history)
    ↓
Install dependencies (pnpm)
    ↓
Run linter
    ↓
Compile TypeScript
    ↓
semantic-release analyzes commits
    ↓
    ├─ No feat/fix commits → Skip release ✋
    │
    └─ feat/fix found → Continue ✅
        ↓
    Determine next version
        ↓
    Update package.json
        ↓
    Generate CHANGELOG.md
        ↓
    Build .vsix package
        ↓
    Publish to marketplaces
        ├─ VS Code (if VSCE_PAT set)
        └─ Open VSX (if OVSX_PAT set)
        ↓
    Create GitHub Release
        ↓
    Commit version bump
        ↓
    Push to main [skip ci]
```

## Force a Test Release

If you want to test the release workflow without making real changes:

```bash
# Create empty commit with release trigger
git commit --allow-empty -m "fix: test automated release workflow"
git push origin main

# Watch Actions tab for workflow execution
```

## Getting Help

1. **Check Actions logs**: Most issues are visible in the logs
2. **Review this guide**: Most scenarios are covered above
3. **Check semantic-release docs**: https://semantic-release.gitbook.io/
4. **Open an issue**: Include error logs and workflow run URL

## Emergency Manual Release

If automated release is completely broken:

```bash
# 1. Update version manually
npm version patch  # or minor, or major

# 2. Build
pnpm run compile
pnpm run package

# 3. Publish manually
export VSCE_PAT="your-token"
export OVSX_PAT="your-token"
pnpm run publish:all

# 4. Tag and push
git tag v$(node -p "require('./package.json').version")
git push --tags

# 5. Create GitHub release manually
gh release create v0.2.0 *.vsix --title "v0.2.0" --notes "Manual release"
```

## Common Error Messages Decoded

| Error Message | Meaning | Solution |
|---------------|---------|----------|
| "No release published" | No feat/fix commits | Use conventional commit format |
| "ENOAUTH" | Missing authentication | Add GITHUB_TOKEN or PAT |
| "already exists" | Version collision | semantic-release handles this automatically |
| "Command failed: git push" | No write permission | Enable Actions write permissions |
| "VSCE_PAT is not set" | Missing token (warning only) | Add secret or ignore (creates GitHub release only) |

## Best Practices

1. **Always use conventional commits**: Commit messages drive the release process
2. **Test locally first**: Use `--dry-run` before pushing
3. **Watch the Actions tab**: First time setup often needs iteration
4. **Start without tokens**: GitHub releases work without VSCE_PAT/OVSX_PAT
5. **Add tokens later**: Once workflow succeeds, add marketplace tokens
6. **Read the logs**: Error messages are usually very helpful

## Reference

- Conventional Commits: https://www.conventionalcommits.org/
- semantic-release: https://semantic-release.gitbook.io/
- GitHub Actions: https://docs.github.com/en/actions
- CONTRIBUTING.md (this repo)
- GITHUB_SETUP.md (this repo)
