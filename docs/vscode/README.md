# VS Code

## Settings

```json
{
    "[python]": {
        "editor.formatOnType": true
    },
    "workbench.colorTheme": "One Dark Pro Darker",
    "workbench.settings.useSplitJSON": true,
    "terminal.integrated.profiles.linux": {
        "bash": {
            "path": "bash",
            "icon": "terminal-bash",
            "args": ["--login"]
        },
        "zsh": {
            "path": "zsh"
        },
        "fish": {
            "path": "fish"
        },
        "tmux": {
            "path": "tmux",
            "icon": "terminal-tmux"
        },
        "pwsh": {
            "path": "pwsh",
            "icon": "terminal-powershell"
        }
    },
    "terminal.integrated.defaultProfile.linux": "bash",
    "git.autofetch": true,
    "editor.inlineSuggest.enabled": true,
    "git.confirmSync": false,
    "files.associations": {
        "*.mdx": "markdown"
    },
    "local-history.path": "/home/balz/.local-history/",
    "eslint.options": {
        "quotes": ["single", { "allowTemplateLiterals": true, "avoidEscape": true }],
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".mdx"]
    },
    "eslint.validate": [
        "markdwon",
        "mdx",
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "eslint.packageManager": "yarn",
    "eslint.alwaysShowStatus": true,
    "eslint.format.enable": true,
    "terminal.integrated.scrollback": 10000,
    "editor.accessibilitySupport": "off",
    "auto-close-tag.activationOnLanguage": [
        "xml",
        "php",
        "blade",
        "ejs",
        "jinja",
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "plaintext",
        "markdown",
        "vue",
        "liquid",
        "erb",
        "lang-cfml",
        "cfml",
        "HTML (EEx)",
        "HTML (Eex)",
        "plist",
        "mdx"
    ],
    "editor.tabSize": 4,
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/.pytest_cache": true,
        "**/__pycache__": true,
        "**/.vscode": true
    },
    "[scss]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[css]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "editor.suggest.matchOnWordStartOnly": false
}
```

## Keybindings
```json
// Place your key bindings in this file to override the defaultsauto[]
[
    {
        "key": "ctrl+oem_8",
        "command": "workbench.action.terminal.focus"
    },
    {
        "key": "ctrl+oem_8",
        "command": "workbench.action.focusActiveEditorGroup",
        "when": "terminalFocus"
    },
    {
        "key": "alt+right",
        "command": "workbench.action.terminal.focusNextPane",
        "when": "terminalFocus"
    },
    {
        "key": "alt+left",
        "command": "workbench.action.terminal.focusPreviousPane",
        "when": "terminalFocus"
    },
    {
        "key": "ctrl+w ctrl+d",
        "command": "workbench.action.moveEditorToRightGroup"
    },
    {
        "key": "ctrl+w ctrl+s",
        "command": "workbench.action.moveEditorToBelowGroup"
    },
    {
        "key": "ctrl+w ctrl+w",
        "command": "workbench.action.moveEditorToAboveGroup"
    },
    {
        "key": "ctrl+w ctrl+a",
        "command": "workbench.action.moveEditorToLeftGroup"
    },
    {
        "key": "alt+right",
        "command": "workbench.action.focusRightGroup",
        "when": "editorFocus"
    },
    {
        "key": "alt+left",
        "command": "workbench.action.focusLeftGroup",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+w ctrl+d",
        "command": "workbench.action.terminal.split",
        "when": "terminalFocus && terminalProcessSupported || terminalFocus && terminalWebExtensionContributedProfile"
    },    
    {
        "key": "ctrl+enter",
        "command": "vscode-postgres.runQuery",
        "when": "editorLangId == 'postgres'"
    },
    {
        "key": "ctrl+shift+down",
        "command": "cursorColumnSelectDown",
        "when": "textInputFocus"
    },
    {
        "key": "ctrl+shift+up",
        "command": "cursorColumnSelectUp",
        "when": "textInputFocus"
    }
]
```
