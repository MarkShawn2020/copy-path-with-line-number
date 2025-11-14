# VSCode Marketplace Publishing Guide

## Prerequisites

This extension is configured to publish under the publisher ID: `MarkShawn2020`

## One-Time Setup

### 1. Create Publisher Account

1. Visit [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account (create one if needed)
3. Click "Create Publisher"
4. Fill in the form:
   - **Publisher ID**: `MarkShawn2020` (must match package.json)
   - **Display Name**: Your preferred display name
   - **Description**: Brief description about you

### 2. Generate Personal Access Token (PAT)

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

### 3. Login with vsce

```bash
# Option 1: Login and cache token
npx vsce login MarkShawn2020
# Enter your PAT when prompted

# Option 2: Use token directly in publish commands
npx vsce publish -p YOUR_PAT_HERE
```

## Publishing Workflow

### Manual Publishing

#### First-time Publish
```bash
# 1. Ensure code is compiled
npm run compile

# 2. Run tests (if any)
npm test

# 3. Package locally to verify
npm run package

# 4. Publish to marketplace
npm run publish
# OR with explicit version bump:
npm run publish:patch  # 0.1.3 → 0.1.4
npm run publish:minor  # 0.1.3 → 0.2.0
```

#### Update Existing Extension
```bash
# Update version in package.json first, then:
npm run publish

# Or let vsce auto-increment:
npm run publish:patch  # Bug fixes
npm run publish:minor  # New features
```

### Automated Publishing (GitHub Actions)

See `.github/workflows/publish.yml` for automated release workflow.

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

1. Visit your extension page:
   - https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines
2. Verify:
   - Description displays correctly
   - Screenshots/GIFs load properly
   - README renders correctly
   - Install button works
3. Test installation:
   ```bash
   code --install-extension MarkShawn2020.better-copy-path-with-lines
   ```

## Troubleshooting

### "Publisher not found"
- Ensure you created the publisher at marketplace.visualstudio.com/manage
- Publisher ID must exactly match package.json

### "Authentication failed"
- Token may have expired - generate a new one
- Ensure token has "Marketplace (Manage)" scope
- Try re-login: `npx vsce logout && npx vsce login MarkShawn2020`

### "Extension already exists"
- You're trying to republish the same version
- Increment version number in package.json first

### Package size too large
- Review `npx vsce ls --tree` output
- Add unnecessary files to `.vscodeignore`
- Consider removing large demo files

## Security Best Practices

1. **Never commit PAT to git**
   - Use environment variables or GitHub Secrets
   - Add to .gitignore if stored locally

2. **Rotate tokens regularly**
   - Set expiration dates
   - Generate new tokens every 90 days

3. **Limit token scope**
   - Only grant "Marketplace (Manage)" permission
   - Don't use all-access tokens

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

```bash
# Check what will be packaged
npx vsce ls
npx vsce ls --tree

# Package without publishing
npm run package

# Show package info
npx vsce show MarkShawn2020.better-copy-path-with-lines

# Unpublish (use with caution!)
npx vsce unpublish MarkShawn2020.better-copy-path-with-lines
```

## Resources

- [Publishing Extensions - Official Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [Marketplace Publisher Portal](https://marketplace.visualstudio.com/manage)
- [Azure DevOps PAT Management](https://dev.azure.com/_usersSettings/tokens)
