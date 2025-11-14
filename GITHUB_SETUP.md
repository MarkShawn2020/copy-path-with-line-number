# GitHub Repository Setup for Automated Releases

This guide explains how to configure GitHub repository secrets for automated publishing.

## Required Secrets

You need to add three secrets to your GitHub repository:

### 1. VSCE_PAT (VS Code Marketplace Token)

**Purpose**: Publish to VS Code Marketplace

**How to generate:**

1. Visit [Azure DevOps Personal Access Tokens](https://dev.azure.com/_usersSettings/tokens)
2. Click "New Token"
3. Configure:
   - **Name**: `vsce-publish-token`
   - **Organization**: All accessible organizations
   - **Expiration**: 90 days (recommended)
   - **Scopes**: Select "Marketplace" → **Check "Manage"**
4. Click "Create" and **COPY THE TOKEN**

**How to add to GitHub:**

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `VSCE_PAT`
5. Value: Paste your Azure DevOps token
6. Click **Add secret**

### 2. OVSX_PAT (Open VSX Token)

**Purpose**: Publish to Open VSX Registry

**How to generate:**

1. Visit [Open VSX](https://open-vsx.org/)
2. Sign in with GitHub account
3. Go to **Settings** → **Access Tokens**
4. Click **Generate New Token**
5. Configure:
   - **Description**: `ovsx-publish-token`
   - **Scope**: Default (publishing permissions)
6. Click **Generate** and **COPY THE TOKEN**

**How to add to GitHub:**

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `OVSX_PAT`
5. Value: Paste your Open VSX token
6. Click **Add secret**

### 3. GITHUB_TOKEN (Automatic)

**Purpose**: Create GitHub releases

**Setup**: This is automatically provided by GitHub Actions. No setup needed!

## Verification Checklist

After adding secrets, verify:

- [ ] `VSCE_PAT` appears in repository secrets
- [ ] `OVSX_PAT` appears in repository secrets
- [ ] Both tokens are valid and not expired
- [ ] Repository has write permissions enabled for Actions
- [ ] GitHub Actions is enabled for the repository

## Enable GitHub Actions Write Permissions

For semantic-release to commit version bumps back to the repo:

1. Go to repository **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"**
5. Click **Save**

## Branch Protection (Optional but Recommended)

To prevent accidental commits breaking the release process:

1. Go to **Settings** → **Branches**
2. Click **Add rule** for `main` branch
3. Configure:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - Select: `release` workflow
4. Click **Create**

## Testing the Setup

### Dry Run (Recommended First)

Test without actually publishing:

```bash
# In your local repository
npm install -g semantic-release-cli

# Dry run
VSCE_PAT=dummy OVSX_PAT=dummy npx semantic-release --dry-run
```

### Live Test

Push a commit with conventional format:

```bash
git commit -m "feat: test automated release"
git push origin main
```

Check GitHub Actions:
1. Go to **Actions** tab
2. Watch the **Automated Release** workflow
3. Verify all steps complete successfully

## Troubleshooting

### "VSCE_PAT is not set"

**Solution:**
1. Verify secret name is exactly `VSCE_PAT` (case-sensitive)
2. Check token hasn't expired
3. Regenerate token if needed

### "OVSX_PAT is not set"

**Solution:**
1. Verify secret name is exactly `OVSX_PAT` (case-sensitive)
2. Ensure you created namespace in Open VSX
3. Regenerate token if needed

### "Permission denied" when committing version bump

**Solution:**
1. Enable "Read and write permissions" in Actions settings
2. Check if branch protection blocks Actions bot

### Workflow doesn't trigger

**Possible causes:**
- Commit message doesn't follow conventional format
- Commit is marked `[skip ci]`
- GitHub Actions is disabled
- Workflow file syntax error

**Solution:**
- Check commit message format (must be `type: description`)
- View Actions tab for error messages
- Validate `.github/workflows/release.yml` syntax

## Security Best Practices

1. **Rotate tokens regularly** (every 90 days)
2. **Use minimal scopes** (only what's needed)
3. **Monitor secret usage** (GitHub provides audit logs)
4. **Never commit tokens to git** (use secrets only)
5. **Revoke immediately** if exposed

## Token Expiration Handling

When tokens expire:

1. Generate new token (same steps as above)
2. Update GitHub secret with new value
3. No need to change workflow files
4. Next push will use new token

## Additional Resources

- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [semantic-release Documentation](https://semantic-release.gitbook.io/)
- [VS Code Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Open VSX Publishing Guide](https://github.com/eclipse/openvsx/wiki/Publishing-Extensions)

## Questions?

If you encounter issues:

1. Check GitHub Actions logs (Actions tab → Failed workflow → View logs)
2. Review [CONTRIBUTING.md](./CONTRIBUTING.md) for commit format
3. Open an issue with error logs
