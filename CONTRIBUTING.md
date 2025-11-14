# Contributing Guide

## Commit Message Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/) for automated release management.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature → triggers MINOR version bump (0.1.4 → 0.2.0)
- **fix**: Bug fix → triggers PATCH version bump (0.1.4 → 0.1.5)
- **docs**: Documentation only changes → no release
- **style**: Code style changes (formatting, etc.) → no release
- **refactor**: Code refactoring → no release
- **perf**: Performance improvements → triggers PATCH version bump
- **test**: Adding or updating tests → no release
- **chore**: Maintenance tasks → no release

### Breaking Changes

For MAJOR version bumps (0.1.4 → 1.0.0), include `BREAKING CHANGE:` in the footer:

```
feat: change command structure

BREAKING CHANGE: The command names have been updated. Users need to update their keybindings.
```

### Examples

**Feature (triggers 0.1.4 → 0.2.0):**
```
feat: add support for custom line number formats

Users can now configure custom separators for line numbers.
```

**Bug Fix (triggers 0.1.4 → 0.1.5):**
```
fix: resolve line number gutter context menu issue

The context menu now correctly appears when right-clicking line numbers.
```

**Documentation (no release):**
```
docs: update README with installation instructions
```

**Chore (no release):**
```
chore: update dependencies
```

## Automated Release Process

When you push commits to `main` with conventional commit messages:

1. **Commit Analysis**: CI analyzes commits since last release
2. **Version Bump**: Determines next version based on commit types
3. **Changelog**: Generates CHANGELOG.md automatically
4. **Build**: Compiles TypeScript and packages extension
5. **Publish**: Releases to VS Code Marketplace and Open VSX
6. **GitHub Release**: Creates GitHub release with .vsix file
7. **Version Commit**: Commits version bump back to repo

### What Triggers a Release?

- ✅ `feat:` commits → New minor version
- ✅ `fix:` commits → New patch version
- ✅ `BREAKING CHANGE:` → New major version
- ❌ `chore:`, `docs:`, `style:`, `test:` → No release

### What Gets Published?

- VS Code Marketplace (https://marketplace.visualstudio.com/)
- Open VSX Registry (https://open-vsx.org/)
- GitHub Releases (with .vsix file)

## Development Workflow

### 1. Clone and Setup

```bash
git clone https://github.com/MarkShawn2020/better-copy-path-with-lines.git
cd better-copy-path-with-lines
pnpm install
```

### 2. Make Changes

```bash
# Run in watch mode during development
pnpm run watch

# Test in VSCode Extension Development Host (F5)
```

### 3. Test

```bash
pnpm run lint
pnpm run compile
pnpm run test
```

### 4. Commit with Conventional Format

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push to Main

```bash
git push origin main
```

### 6. Automated Release

The GitHub Actions workflow will:
- Analyze your commit
- Determine if a release is needed
- Calculate the new version
- Publish to marketplaces
- Create GitHub release

## Manual Release (Emergency)

If automated release fails, you can manually release:

```bash
# 1. Update version in package.json
# 2. Build and package
pnpm run compile
pnpm run package

# 3. Publish manually
export VSCE_PAT="your-vscode-token"
export OVSX_PAT="your-openvsx-token"
pnpm run publish:all

# 4. Create git tag
git tag v0.2.0
git push --tags
```

## Release Checklist

Before pushing to main:

- [ ] Commits follow conventional commit format
- [ ] Code passes linter (`pnpm run lint`)
- [ ] TypeScript compiles (`pnpm run compile`)
- [ ] Extension works in development host (F5)
- [ ] Commit message accurately describes changes
- [ ] Breaking changes are documented with `BREAKING CHANGE:`

## Troubleshooting

### "No release published"

Your commits didn't trigger a release. Possible reasons:
- All commits were `chore:`, `docs:`, etc.
- Version hasn't changed
- Check GitHub Actions logs

### "VSCE_PAT is not set"

The VS Code Marketplace token is missing:
1. Go to repository Settings → Secrets
2. Ensure `VSCE_PAT` is configured
3. Re-run the workflow

### "OVSX_PAT is not set"

The Open VSX token is missing:
1. Go to repository Settings → Secrets
2. Ensure `OVSX_PAT` is configured
3. Re-run the workflow

## Questions?

Open an issue: https://github.com/MarkShawn2020/better-copy-path-with-lines/issues
