#!/bin/bash
set -e

# Publish to VS Code Marketplace
if [ -n "${VSCE_PAT}" ]; then
  echo "📦 Publishing to VS Code Marketplace..."
  npx vsce publish --no-dependencies -p "${VSCE_PAT}"
  echo "✅ Published to VS Code Marketplace"
else
  echo "⚠️  VSCE_PAT not set, skipping VS Code Marketplace publish"
  echo "   To publish to VS Code Marketplace, add VSCE_PAT secret to GitHub repository"
fi

# Publish to Open VSX
if [ -n "${OVSX_PAT}" ]; then
  echo "📦 Publishing to Open VSX Registry..."
  npx ovsx publish --no-dependencies -p "${OVSX_PAT}"
  echo "✅ Published to Open VSX Registry"
else
  echo "⚠️  OVSX_PAT not set, skipping Open VSX publish"
  echo "   To publish to Open VSX, add OVSX_PAT secret to GitHub repository"
fi

# Check if at least one publish succeeded
if [ -z "${VSCE_PAT}" ] && [ -z "${OVSX_PAT}" ]; then
  echo ""
  echo "⚠️  WARNING: No tokens configured, no publishing occurred"
  echo "   This is a dry-run release. To enable publishing:"
  echo "   1. Add VSCE_PAT secret (VS Code Marketplace)"
  echo "   2. Add OVSX_PAT secret (Open VSX Registry)"
  echo "   See GITHUB_SETUP.md for instructions"
  exit 0
fi

echo ""
echo "🎉 Release published successfully!"
