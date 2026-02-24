# Perforce VS Code Helper

A lightweight VS Code extension that integrates essential Perforce (p4) commands directly into your editor, allowing you to quickly check out, add, and revert files without leaving your workflow.

## Features

This extension adds Perforce commands to the Command Palette, keyboard shortcuts, and right-click context menus.

* **Checkout (Edit) Current File**: Check out the active file to your default changelist.
  * **Shortcut:** `Ctrl+K E` (Windows/Linux) or `Cmd+K E` (Mac)
  * **Context Menu:** Right-click inside a file or on a file in the explorer.
* **Add Current File**: Mark a newly created file for add in Perforce.
  * **Context Menu:** Right-click inside a file.
* **Revert Current File**: Revert the active file (includes a safety confirmation prompt).
  * **Context Menu:** Right-click inside a file.

## Requirements

* You must have the Perforce CLI (`p4`) installed and available in your system's PATH.
* You must have a valid Perforce workspace and be logged into your Perforce server.

## Extension Settings

This extension currently relies on your machine's global Perforce configuration (e.g., `P4PORT`, `P4USER`, `P4CLIENT` environment variables or a `.p4enviro` file). It executes standard `p4 <command> <filepath>` commands.

## Installation from source

If you want to build and install this extension from the source code:

1. Clone this repository.
2. Open the directory in your terminal.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Package the extension (requires `vsce` installed globally via `npm install -g @vscode/vsce`):
   ```bash
   vsce package --allow-missing-repository
   ```
5. Install the generated `.vsix` file in VS Code (Extensions Sidebar > `...` > Install from VSIX...).

## Project Structure Explained

Curious how this works under the hood? Check out the included [EXPLANATION.md](EXPLANATION.md) for a detailed, beginner-friendly breakdown of every file and concept used in this project!

## Architecture

This extension executes `child_process.exec()` to run the Perforce CLI in the background. It determines the correct file path using the active text editor or the URI provided by right-click context menus.

## Release Notes

### 0.0.1
Initial release with `edit`, `add`, and `revert` commands.
