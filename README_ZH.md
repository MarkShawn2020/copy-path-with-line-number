# copy-path-with-line-number

[英文介绍](https://github.com/qishan233/copy-path-with-line-number/blob/main/README.md)

此扩展提供了在资源管理器、标签标题和编辑器上下文中复制文件路径和行号的功能。

它支持自定义文件路径分隔符、范围连接符和选择分隔符。

它还支持中文和英文（安装此扩展后需要重新加载窗口以激活效果）。

## 用法

### 使用自定义路径分隔符复制路径

![资源管理器上下文](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/explorer-context.gif)

![标题上下文](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/title-context.gif)

### 复制带行号的路径

![编辑器上下文](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/editor-context.gif)

### 复制选定行范围信息

![选定行范围](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/selected-lines-info.gif)

### 设置

![设置](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/settings.gif)

### 复制多个文件路径

![复制多个文件路径](https://raw.githubusercontent.com/qishan233/images/main/vscode-extension/copy%20multiple%20file%20path.gif)

**享受吧！**

## 发布说明

### 0.1.2

**关键 Bug 修复**：
- 修复行号区域右键菜单无法正常工作的问题（VSCode 从行号区域传递 `{lineNumber, uri}` 对象）
- 正确处理 VSCode 行号上下文菜单 API

### 0.1.1

**重大重构 - 聚焦核心价值**：
- 移除不带行号的命令（不带行号的路径请使用 VSCode 原生的"复制路径"功能）
- 扁平化菜单结构 - 移除子菜单，更快访问（2次点击而非3次）
- 简化命令标签为"复制相对路径:行号"和"复制绝对路径:行号"
- 仅在编辑器和行号区域右键菜单中显示带行号的路径命令

### 0.1.0

新增行号区域右键菜单支持 - 用户现在可以在行号区域右键复制带行号的路径。

### 0.0.7

从代码仓库里移除gif图片以减小插件大小；

### 0.0.6

添加了在资源管理器上下文和编辑器标题上下文中复制多个文件路径的功能。

### 0.0.5

修复了通过命令面板或快捷键调用命令时显示错误的问题。

### 0.0.4

修复了复制绝对路径时未使用配置的问题。

### 0.0.3

添加了设置自定义文件路径分隔符、范围连接符和选择分隔符的功能。

### 0.0.2

添加了在编辑器上下文中复制多个选择行号信息的功能。

### 0.0.1

添加了复制带行号的路径（相对路径和绝对路径）的功能。
