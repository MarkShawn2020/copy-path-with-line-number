# Publishing Guide

This extension is published to both:
- **VS Code Marketplace** - https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines
- **Open VSX Registry** - https://open-vsx.org/extension/MarkShawn2020/better-copy-path-with-lines

Publisher ID: `MarkShawn2020`

## One-Time Setup

### 1. VS Code Marketplace Setup

#### Create Publisher Account

1. Visit [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account (create one if needed)
3. Click "Create Publisher"
4. Fill in the form:
   - **Publisher ID**: `MarkShawn2020` (must match package.json)
   - **Display Name**: Your preferred display name
   - **Description**: Brief description about you

#### Generate Personal Access Token (PAT)

1. Visit [Azure DevOps Personal Access Tokens](https://dev.azure.com/_usersSettings/tokens)
2. Click "New Token"
3. Configure:
   - **Name**: `vsce-publish-token` (or any name)
   - **Organization**: All accessible organizations
   - **Expiration**: Custom defined (recommend 90 days)
   - **Scopes**:
     - Select "Marketplace" → **Check "Manage"**
4. Click "Create" and **COPY THE TOKEN** (you won't see it again!)
5. Store it securely (password manager recommended)

#### Login with vsce

```bash
# Option 1: Login and cache token
npx vsce login MarkShawn2020
# Enter your PAT when prompted

# Option 2: Use token directly in publish commands
npx vsce publish -p YOUR_VSCE_PAT
```

### 2. Open VSX Registry Setup

#### Create Namespace

1. Visit [Open VSX Publisher Management](https://open-vsx.org/)
2. Sign in with GitHub account
3. Go to Settings → Namespaces
4. Create namespace: `MarkShawn2020` (must match package.json publisher)

#### Generate Access Token

1. In Open VSX, go to Settings → Access Tokens
2. Click "Generate New Token"
3. Configure:
   - **Description**: `ovsx-publish-token`
   - **Scope**: Leave as default (publishing permissions)
4. Click "Generate" and **COPY THE TOKEN**
5. Store it securely

#### Save Token

```bash
# Store token in environment variable (recommended)
export OVSX_PAT="your-open-vsx-token-here"

# Or use directly in publish commands
ovsx publish -p YOUR_OVSX_PAT
```

## Publishing Workflow

> **⚠️ IMPORTANT**: This project uses **automated releases** via semantic-release.
>
> Releases are triggered automatically when you push commits with [Conventional Commit](https://www.conventionalcommits.org/) messages to `main`.

### Automated Release (Recommended)

Push commits with conventional format to trigger automatic releases:

```bash
# Feature (triggers 0.1.4 → 0.2.0)
git commit -m "feat: add new feature"
git push origin main

# Bug fix (triggers 0.1.4 → 0.1.5)
git commit -m "fix: resolve bug"
git push origin main

# Breaking change (triggers 0.1.4 → 1.0.0)
git commit -m "feat: major refactor

BREAKING CHANGE: API has changed"
git push origin main
```

**What happens automatically:**
1. ✅ Analyzes commits since last release
2. ✅ Determines next version (MAJOR.MINOR.PATCH)
3. ✅ Updates package.json version
4. ✅ Generates CHANGELOG.md
5. ✅ Builds and packages extension
6. ✅ Publishes to VS Code Marketplace
7. ✅ Publishes to Open VSX Registry
8. ✅ Creates GitHub Release with .vsix
9. ✅ Commits version bump back to repo

**See [CONTRIBUTING.md](./CONTRIBUTING.md) for commit message conventions.**

### Manual Publishing (Emergency Only)

> **Note**: This project uses `pnpm`. All publish commands include `--no-dependencies` flag for pnpm compatibility.

If automated release fails, use manual commands:

```bash
# Publish to VS Code Marketplace only
pnpm publish

# Publish to Open VSX only
pnpm publish:ovsx

# Publish to BOTH marketplaces
pnpm publish:all
```

### Manual Publishing (Detailed)

#### First-time Publish

```bash
# 1. Ensure code is compiled
pnpm compile

# 2. Run linter and tests
pnpm lint
pnpm test

# 3. Package locally to verify
pnpm package

# 4. Publish to VS Code Marketplace
pnpm publish
# OR with version bump:
pnpm publish:patch  # 0.1.4 → 0.1.5
pnpm publish:minor  # 0.1.4 → 0.2.0

# 5. Publish to Open VSX
pnpm publish:ovsx
```

#### Update Existing Extension

**Option 1: Version bump + dual publish**
```bash
# Bump version in package.json, then:
pnpm publish:all
```

**Option 2: Auto version increment**
```bash
# For VS Code Marketplace (auto-increments version):
pnpm publish:patch  # Bug fixes (0.1.4 → 0.1.5)
pnpm publish:minor  # New features (0.1.4 → 0.2.0)

# Then publish to Open VSX with the new version:
pnpm publish:ovsx
```

**Option 3: Manual control**
```bash
# 1. Update version in package.json manually
# 2. Publish to both:
pnpm publish        # VS Code Marketplace
pnpm publish:ovsx   # Open VSX
```

### Automated Publishing (GitHub Actions)

See `.github/workflows/publish.yml` for automated release workflow.

**Current workflow publishes to VS Code Marketplace only.**

To enable Open VSX in CI/CD:
1. Add `OVSX_PAT` to GitHub repository secrets
2. Update workflow file to include Open VSX publish step

Trigger by creating a git tag:
```bash
git tag v0.2.0
git push --tags
```

## Pre-Publish Checklist

- [ ] Code compiles without errors (`npm run compile`)
- [ ] Linter passes (`npm run lint`)
- [ ] README.md is up-to-date with latest features
- [ ] CHANGELOG.md is updated
- [ ] Version number incremented in package.json
- [ ] Test locally with F5 (Extension Development Host)
- [ ] Package builds successfully (`npm run package`)
- [ ] Old .vsix files cleaned up (optional)

## Post-Publish Verification

### VS Code Marketplace

1. Visit: https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines
2. Verify:
   - Description displays correctly
   - Screenshots/GIFs load properly
   - README renders correctly
   - Install button works
3. Test installation:
   ```bash
   code --install-extension MarkShawn2020.better-copy-path-with-lines
   ```

### Open VSX Registry

1. Visit: https://open-vsx.org/extension/MarkShawn2020/better-copy-path-with-lines
2. Verify:
   - Extension appears in search results
   - Version number is correct
   - README and metadata display properly
3. Test installation in VSCodium:
   ```bash
   codium --install-extension MarkShawn2020.better-copy-path-with-lines
   ```

## Troubleshooting

### VS Code Marketplace Issues

**"Publisher not found"**
- Ensure you created the publisher at marketplace.visualstudio.com/manage
- Publisher ID must exactly match package.json

**"Authentication failed"**
- Token may have expired - generate a new one
- Ensure token has "Marketplace (Manage)" scope
- Try re-login: `npx vsce logout && npx vsce login MarkShawn2020`

**"Extension already exists"**
- You're trying to republish the same version
- Increment version number in package.json first

### Open VSX Issues

**"Namespace not found"**
- Create namespace at https://open-vsx.org/ (Settings → Namespaces)
- Namespace must match publisher ID in package.json

**"Invalid token"**
- Generate new token at https://open-vsx.org/ (Settings → Access Tokens)
- Ensure token has publishing permissions
- Set in environment: `export OVSX_PAT="your-token"`

**"Version already exists"**
- Cannot republish same version
- Bump version in package.json before publishing

### General Issues

**Package size too large**
- Review `npx vsce ls --tree` output
- Add unnecessary files to `.vscodeignore`
- Consider removing large demo files

**Token not recognized**
- VS Code: Use `VSCE_PAT` (Azure DevOps token)
- Open VSX: Use `OVSX_PAT` (Open VSX token)
- These are different tokens for different registries!

## Security Best Practices

1. **Never commit tokens to git**
   - Store `VSCE_PAT` and `OVSX_PAT` in environment variables
   - Use GitHub Secrets for CI/CD
   - Add token files to .gitignore

2. **Rotate tokens regularly**
   - Set expiration dates (recommend 90 days)
   - Generate new tokens periodically
   - Update GitHub Secrets when rotating

3. **Limit token scope**
   - VS Code: Only "Marketplace (Manage)" permission
   - Open VSX: Default publishing scope only
   - Don't use all-access tokens

4. **Use separate tokens**
   - Different token for each registry
   - Different tokens for local vs CI/CD

## Version Management Strategy

Follow [Semantic Versioning](https://semver.org/):

- **PATCH** (0.1.x): Bug fixes, typos, minor tweaks
- **MINOR** (0.x.0): New features, backwards-compatible changes
- **MAJOR** (x.0.0): Breaking changes

Current version: `0.1.3`

Recommended next releases:
- `0.1.4` - Bug fixes for line gutter
- `0.2.0` - New features (e.g., custom format templates)
- `1.0.0` - When API is stable and production-ready

## Useful Commands

### Package Inspection

```bash
# Check what will be packaged
npx vsce ls
npx vsce ls --tree

# Package without publishing
pnpm package

# Show package info from marketplace
npx vsce show MarkShawn2020.better-copy-path-with-lines
```

### Publishing Commands

```bash
# VS Code Marketplace
pnpm publish              # Publish current version
pnpm publish:patch        # Auto-increment patch (0.1.4 → 0.1.5)
pnpm publish:minor        # Auto-increment minor (0.1.4 → 0.2.0)

# Open VSX
pnpm publish:ovsx         # Publish to Open VSX

# Both registries
pnpm publish:all          # Publish to both at once
```

### Token Management

```bash
# VS Code Marketplace
npx vsce login MarkShawn2020
npx vsce logout

# Open VSX (uses environment variable)
export OVSX_PAT="your-token"
```

### Unpublish (use with caution!)

```bash
# VS Code Marketplace
npx vsce unpublish MarkShawn2020.better-copy-path-with-lines

# Open VSX (not recommended - contact support)
```

## Resources

### VS Code Marketplace
- [Publishing Extensions Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [Publisher Portal](https://marketplace.visualstudio.com/manage)
- [Azure DevOps PAT Management](https://dev.azure.com/_usersSettings/tokens)

### Open VSX Registry
- [Open VSX Homepage](https://open-vsx.org/)
- [Publishing Guide](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions)
- [Publisher Documentation](https://github.com/eclipse/openvsx/wiki)
- [ovsx CLI Documentation](https://github.com/eclipse/openvsx/tree/master/cli)

### Tools
- [vsce (VS Code Extensions)](https://github.com/microsoft/vscode-vsce)
- [ovsx (Open VSX CLI)](https://github.com/eclipse/openvsx/tree/master/cli)
