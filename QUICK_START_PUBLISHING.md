# Quick Start: Publishing to VSCode Marketplace

## ✅ What's Been Configured

All publishing infrastructure is now ready. Here's what has been set up:

### 1. Project Metadata ✓
- **Publisher ID**: `MarkShawn2020`
- **Display Name**: `Copy Path:Line - Enhanced`
- **Package Name**: `copy-path-with-line-number`
- **SEO Keywords**: Optimized with 12 relevant keywords
- **Repository URLs**: Updated to MarkShawn2020 fork

### 2. Build System ✓
- `@vscode/vsce` installed (v3.7.0)
- Package scripts added:
  - `npm run package` - Create .vsix locally
  - `npm run publish` - Publish to marketplace
  - `npm run publish:patch` - Auto-increment patch version
  - `npm run publish:minor` - Auto-increment minor version

### 3. CI/CD Pipeline ✓
- GitHub Actions workflow: `.github/workflows/publish.yml`
- Triggers:
  - On git tags: `v*` (e.g., `v0.2.0`)
  - Manual: via workflow_dispatch
- Automated steps:
  - Lint → Compile → Test → Package → Publish → Create GitHub Release

### 4. Documentation ✓
- `PUBLISHING.md` - Complete publishing guide
- `README.md` - Updated with Marketplace badges and installation
- `README_ZH.md` - Chinese version updated

### 5. Quality Assurance ✓
- `.vscodeignore` updated to exclude dev files
- Package size optimized (~946 KB)
- All metadata validated

## 🚀 Next Steps: First-Time Publishing

### Step 1: Create Publisher Account (5 minutes)

1. Visit: https://marketplace.visualstudio.com/manage
2. Sign in with Microsoft account
3. Create publisher with ID: `MarkShawn2020`

### Step 2: Generate Personal Access Token (2 minutes)

1. Visit: https://dev.azure.com/_usersSettings/tokens
2. Click "New Token"
3. Configure:
   - Name: `vsce-marketplace-publish`
   - Organization: All accessible organizations
   - Expiration: 90 days
   - Scopes: **Marketplace → Manage** ✓
4. **SAVE THE TOKEN** (you won't see it again!)

### Step 3: Test Publishing Locally (3 minutes)

```bash
# Login to vsce (one-time)
npx vsce login MarkShawn2020
# Paste your PAT when prompted

# Test package creation
npm run package

# Verify package contents
npx vsce ls

# Publish! (this will push to marketplace)
npm run publish
```

### Step 4: Verify Extension on Marketplace (2 minutes)

Visit: https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines

Check:
- [ ] Extension appears
- [ ] Description renders correctly
- [ ] GIFs display properly
- [ ] Install button works

### Step 5: Setup GitHub Actions Secret (2 minutes)

For automated publishing on git tags:

1. Go to: https://github.com/MarkShawn2020/copy-path-with-line-number/settings/secrets/actions
2. Click "New repository secret"
3. Name: `VSCE_PAT`
4. Value: Your Personal Access Token
5. Click "Add secret"

Now publishing is automated! Just create a git tag:
```bash
git tag v0.2.0
git push --tags
```

## 📦 Publishing Workflow

### Manual Publishing (Quick Updates)

```bash
# Make your code changes...

# Bump version and publish
npm run publish:patch  # 0.1.3 → 0.1.4

# Or manually update package.json version, then:
npm run publish
```

### Automated Publishing (Recommended)

```bash
# 1. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 2. Update version in package.json
# Edit package.json: "version": "0.2.0"

# 3. Commit version bump
git add package.json
git commit -m "chore: bump version to 0.2.0"

# 4. Create tag and push
git tag v0.2.0
git push origin main --tags

# GitHub Actions will automatically:
# - Build and test
# - Publish to marketplace
# - Create GitHub release with .vsix
```

## 🔧 Useful Commands

```bash
# Package without publishing
npm run package

# View what will be packaged
npx vsce ls --tree

# Check extension info
npx vsce show MarkShawn2020.better-copy-path-with-lines

# Force re-login
npx vsce logout
npx vsce login MarkShawn2020
```

## ⚠️ Common Issues

### "Publisher 'MarkShawn2020' not found"
→ You need to create the publisher at marketplace.visualstudio.com/manage first

### "Authentication failed"
→ Your PAT may be expired or lacks the "Marketplace (Manage)" scope

### "Extension already exists with this version"
→ Increment version in package.json before republishing

### Package too large
→ Check `.vscodeignore` to exclude unnecessary files

## 📊 What Changed

Files modified for publishing:
- `package.json` - Updated metadata, publisher, scripts
- `README.md` - Added badges, updated installation
- `README_ZH.md` - Added badges, updated installation
- `.vscodeignore` - Excluded GitHub Actions, publishing docs
- `package-lock.json` - Added vsce dependency

Files created:
- `PUBLISHING.md` - Complete publishing guide
- `QUICK_START_PUBLISHING.md` - This file
- `.github/workflows/publish.yml` - CI/CD automation

## 🎯 Checklist: Before First Publish

- [ ] Created publisher account with ID: `MarkShawn2020`
- [ ] Generated Personal Access Token with Marketplace scope
- [ ] Logged in with `npx vsce login MarkShawn2020`
- [ ] Tested packaging with `npm run package`
- [ ] Reviewed package contents with `npx vsce ls`
- [ ] Updated CHANGELOG.md with version notes
- [ ] Ready to run `npm run publish`

## 📚 Resources

- **Official Guide**: https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Marketplace Portal**: https://marketplace.visualstudio.com/manage
- **PAT Management**: https://dev.azure.com/_usersSettings/tokens
- **Extension Page**: https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines

---

**You're all set!** The extension is ready to publish. Follow the "Next Steps" above to go live on VSCode Marketplace.
