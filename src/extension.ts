import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';

function getActiveFilePath(uri?: vscode.Uri): string | undefined {
    if (uri) {
        return uri.fsPath;
    }
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        return editor.document.fileName;
    }
    return undefined;
}

function runP4Command(command: string, filePath: string) {
    const cwd = path.dirname(filePath);
    const p4Cmd = `p4 ${command} "${filePath}"`;

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: `Running ${p4Cmd}...`,
        cancellable: false
    }, async (progress) => {
        return new Promise<void>((resolve) => {
            exec(p4Cmd, { cwd }, (error, stdout, stderr) => {
                if (error) {
                    vscode.window.showErrorMessage(`Perforce Error: ${stderr || error.message}`);
                    resolve();
                } else {
                    vscode.window.showInformationMessage(`Perforce: ${stdout.trim() || 'Success'}`);
                    resolve();
                }
            });
        });
    });
}

export function activate(context: vscode.ExtensionContext) {
    let editDisposable = vscode.commands.registerCommand('p4-vscode-helper.edit', (uri?: vscode.Uri) => {
        const filePath = getActiveFilePath(uri);
        if (filePath) {
            runP4Command('edit', filePath);
        } else {
            vscode.window.showErrorMessage('No active file to checkout.');
        }
    });

    let addDisposable = vscode.commands.registerCommand('p4-vscode-helper.add', (uri?: vscode.Uri) => {
        const filePath = getActiveFilePath(uri);
        if (filePath) {
            runP4Command('add', filePath);
        } else {
            vscode.window.showErrorMessage('No active file to add.');
        }
    });

    let revertDisposable = vscode.commands.registerCommand('p4-vscode-helper.revert', (uri?: vscode.Uri) => {
        const filePath = getActiveFilePath(uri);
        if (filePath) {
            vscode.window.showWarningMessage(`Are you sure you want to revert ${path.basename(filePath)}?`, 'Yes', 'No').then(selection => {
                if (selection === 'Yes') {
                    runP4Command('revert', filePath);
                }
            });
        } else {
            vscode.window.showErrorMessage('No active file to revert.');
        }
    });

    context.subscriptions.push(editDisposable, addDisposable, revertDisposable);
}

export function deactivate() { }
