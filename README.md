# Copy Path with Line Number

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/MarkShawn2020.better-copy-path-with-lines?style=flat&label=VS%20Code%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/MarkShawn2020.better-copy-path-with-lines?style=flat)](https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/MarkShawn2020.better-copy-path-with-lines?style=flat)](https://marketplace.visualstudio.com/items?itemName=MarkShawn2020.better-copy-path-with-lines)
[![GitHub](https://img.shields.io/github/license/MarkShawn2020/better-copy-path-with-lines?style=flat)](https://github.com/MarkShawn2020/better-copy-path-with-lines/blob/main/LICENSE.md)

> 🚀 VSCode extension for copying file paths with line numbers | [中文文档](./README_ZH.md)

## 💡 What is This?

A VSCode extension that copies file paths **with line numbers** in a single click. Perfect for:
- 📝 Sharing code references in GitHub issues/PRs
- 💬 Discussing specific code lines in Slack/Teams
- 📚 Writing documentation with precise code locations
- 🐛 Reporting bugs with exact line numbers

## ✨ Features

**Quick Copy from Anywhere**
- Right-click in **line number area** → Get `src/app.ts:42`

![alt text](./images/copy-filepath-with-line-number_gutter.gif)

- Right-click in **editor** → Get path with current line

![alt text](./images/copy-filepath-with-line-number_non-selected.gif)

- Works with **single line**, **range** (`10-20`), or **multiple selections** (`5, 10, 15`)

![alt text](./images/copy-filepath-with-line-number_selected.gif)
**Two Formats**
- 📂 **Relative Path**: `src/components/Button.tsx:42`
- 📁 **Absolute Path**: `/Users/me/project/src/components/Button.tsx:42`

**Customizable**
- 🔧 Path separator: `/` or `\` or system default
- 🔧 Range connector: `-` or `~` (e.g., `10-20` vs `10~20`)
- 🔧 Selection separator: `,` or `;` or space

## 🎯 Why This Fork?

> This is an **enhanced fork** of [qishan233/copy-path-with-line-number](https://github.com/qishan233/copy-path-with-line-number)

### ✨ Key Improvements

| Feature | Original | This Fork |
|---------|----------|-----------|
| **Menu Speed** | 3 clicks (submenu) | **2 clicks** (direct) |
| **Menu Options** | 4 options | **2 focused options** |
| **Line Gutter** | ❌ Broken | **✅ Working** |
| **Command Format** | Verbose labels | **Clean `Path:Line` format** |
| **Focus** | Mixed features | **Line numbers only** |

### 🚀 What's Different

**Speed & Simplicity**
- ⚡ **33% faster** - Removed submenus for direct access
- 🧠 **50% less cognitive load** - Only 2 relevant options
- 🎯 **Clear focus** - Line number context is the core value

**Fixed Critical Issues**
- ✅ **Line number gutter now works** - Fixed VSCode API handling
- ✅ **Cleaner UX** - Removed redundant non-line commands (use VSCode's native "Copy Path" instead)

**Better Design**
- 📝 Commands use clean format: `Copy Relative Path:Line` / `Copy Absolute Path:Line`
- 🎨 Appears only in relevant contexts (editor & line gutter)
- 🔧 Same powerful configuration options (separators, connectors, etc.)

## 📥 Installation

### From VSCode Marketplace (Recommended)

1. Open VSCode
2. Go to Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
3. Search for "Copy Path:Line"
4. Click Install

Or install via command line:
```bash
code --install-extension MarkShawn2020.better-copy-path-with-lines
```

### From GitHub Release

1. Download the latest `.vsix` from [Releases](https://github.com/MarkShawn2020/better-copy-path-with-lines/releases)
2. In VSCode: `Extensions` → `...` → `Install from VSIX`

### From Source

```bash
git clone https://github.com/MarkShawn2020/better-copy-path-with-lines.git
cd better-copy-path-with-lines
npm install
npm run compile
# Press F5 to launch Extension Development Host
```

## 🎬 Usage

### Quick Start

**Right-click in line number area or editor:**

```
└─ Copy Relative Path:Line     → src/app.ts:42
└─ Copy Absolute Path:Line     → /Users/me/project/src/app.ts:42
```

**Multi-line selection:**
```
Select lines 10-20 → Copy → src/app.ts:10-20
Multiple selections → Copy → src/app.ts:5, 10, 15
```

### Configuration

Customize separators and connectors in VSCode settings:

```json
{
  "copyPathWithLineNumber.path.separator": "slash",      // "/" or "\" or "system"
  "copyPathWithLineNumber.range.connector": "dash",      // "-" or "~"
  "copyPathWithLineNumber.selection.separator": "comma", // "," or ";" or " "
  "copyPathWithLineNumber.show.message": true            // Show notification
}
```

**Examples:**
```
Default:     src/components/Button.tsx:42-55
With tilde:  src/components/Button.tsx:42~55
With space:  src/components/Button.tsx:10 20 30
```

## 🔄 Comparison with Original

For a complete feature list of the original extension, see the [original repository](https://github.com/qishan233/copy-path-with-line-number).

**What we kept:**
- ✅ Line number copying with ranges
- ✅ Custom separators and connectors
- ✅ Multi-line selection support
- ✅ i18n (English & Chinese)

**What we changed:**
- 🎯 **Removed**: Non-line commands (explorer/tab contexts) - use VSCode's native "Copy Path"
- 🎯 **Removed**: Submenus - direct command access
- 🎯 **Fixed**: Line number gutter context menu
- 🎯 **Simplified**: Command labels to `Path:Line` format

## 📊 Technical Details

### Architecture Highlights

- **Pattern**: Decorator + Strategy + Command
- **Type Safety**: Full TypeScript with strict mode
- **Performance**: Zero dependencies (except VSCode API)
- **Size**: ~194 KB packaged

### Key Technical Improvements

**v0.1.2** - Fixed VSCode line number context API
```typescript
// VSCode passes {lineNumber: number, uri: Uri} from gutter
// Added proper detection and extraction
```

**v0.1.1** - Focused refactoring
- Removed 2 commands (kept only line-enabled)
- Flattened menu structure
- Simplified all code paths

## 🐛 Known Issues

None currently. Report issues at: https://github.com/MarkShawn2020/better-copy-path-with-lines/issues

## 🤝 Contributing

Contributions welcome! This is a focused fork - we prioritize:
1. Speed and simplicity
2. Line number context use cases
3. Clean, maintainable code

## 📜 License

MIT License - Same as original project

## 🙏 Credits

- **Original Author**: [qishan233](https://github.com/qishan233/copy-path-with-line-number)
- **Fork Maintainer**: [MarkShawn2020](https://github.com/MarkShawn2020)
- **Improvements**: Focused refactoring + critical bug fixes

---

## 📝 Release Notes

### 0.1.3 (Latest)

**⚡ Improved Defaults**
- Changed default range connector from `~` to `-` (industry standard: `10-20` instead of `10~20`)
- Matches GitHub, GitLab, grep, and most developer tools
- Easier to type (no Shift key needed)
- `~` still available as configuration option

### 0.1.2

**🐛 Critical Bug Fix**
- Fixed line number gutter context menu (VSCode API `{lineNumber, uri}` handling)
- Removed debug logging

### 0.1.1

**🚀 Major Refactoring**
- Removed non-line commands (use VSCode native "Copy Path")
- Flattened menu structure (2 clicks vs 3)
- Simplified labels to `Path:Line` format
- Only show in editor & line gutter contexts

### 0.1.0

- Added line number gutter support

### Earlier Versions

See [original repository](https://github.com/qishan233/copy-path-with-line-number) for versions 0.0.1 - 0.0.7

---

**Made with ❤️ for developers who share code references frequently**
