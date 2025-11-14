import { Uri, window, workspace, commands, env } from "vscode";
import {
    ISymbolStrategy,
    GetSymbolStrategyFactory,
} from './symbol_strategy';
import path from "path";

interface IUriResolver {
    GetPath(uri: Uri | any): string;
    GetPaths(uri: Uri | any): Promise<string[]>;
}

interface UriResolverDecorator extends IUriResolver {
}


class UriResolver implements IUriResolver {
    GetPath(uri: Uri | any): string {
        // Handle line number context: VSCode passes {lineNumber: number, uri: Uri}
        if (uri && typeof uri === 'object' && 'uri' in uri && 'lineNumber' in uri) {
            uri = uri.uri;
        }

        if (uri === undefined) {
            if (window.activeTextEditor) {
                uri = window.activeTextEditor.document.uri;
            } else {
                throw new Error("Cannot copy path without an active editor or uri");
            }
        }

        return uri.fsPath;
    }
    async GetPaths(uri: Uri | any): Promise<string[]> {
        // Handle line number context: VSCode passes {lineNumber: number, uri: Uri}
        if (uri && typeof uri === 'object' && 'uri' in uri && 'lineNumber' in uri) {
            uri = uri.uri;
        }

        await env.clipboard.writeText('');

        await commands.executeCommand("copyFilePath", uri);

        const content = await env.clipboard.readText();

        await env.clipboard.writeText('');

        return content.split('\n');
    }
}

const symbolStrategyFactory = GetSymbolStrategyFactory();

class RelativeUriResolver implements UriResolverDecorator {
    pathSeparatorStrategy: ISymbolStrategy;
    uriResolver: IUriResolver;
    constructor(UriResolver: IUriResolver) {
        this.pathSeparatorStrategy = symbolStrategyFactory.GetPathSeparatorStrategy();
        this.uriResolver = UriResolver;
    }
    GetPath(uri: Uri | any): string {
        var p = this.uriResolver.GetPath(uri);

        const relativePath = workspace.asRelativePath(p);

        // asRelativePath can return string | RelativePattern
        let pathStr: string;
        if (typeof relativePath === 'string') {
            pathStr = relativePath;
            // If asRelativePath returns empty string, use original path
            if (!pathStr || pathStr.length === 0) {
                pathStr = p;
            }
        } else {
            // RelativePattern case - use original path
            pathStr = p;
        }

        return pathStr.replace(/\//g, this.pathSeparatorStrategy.GetSymbol());
    }
    async GetPaths(uri: Uri | any): Promise<string[]> {
        var paths = await this.uriResolver.GetPaths(uri);
        return paths.map(p => {
            const relativePath = workspace.asRelativePath(p);
            const pathStr = typeof relativePath === 'string' ? relativePath : p;
            return pathStr.replace(/\//g, this.pathSeparatorStrategy.GetSymbol());
        });
    }
}

class AbsoluteUriResolver implements UriResolverDecorator {
    pathSeparatorStrategy: ISymbolStrategy;
    uriResolver: IUriResolver;
    constructor(UriResolver: IUriResolver) {
        this.uriResolver = UriResolver;
        this.pathSeparatorStrategy = symbolStrategyFactory.GetPathSeparatorStrategy();
    }
    GetPath(uri: Uri | any): string {
        var content = this.uriResolver.GetPath(uri);

        var targetSep = this.pathSeparatorStrategy.GetSymbol();

        content = content.replace(new RegExp(path.sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), targetSep);

        return content;
    }
    async GetPaths(uri: Uri | any): Promise<string[]> {
        var paths = await this.uriResolver.GetPaths(uri);
        var targetSep = this.pathSeparatorStrategy.GetSymbol();
        return paths.map(p => p.replace(new RegExp(path.sep.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), targetSep));
    }
}

const uriResolver = new UriResolver();
const relativeUriResolver = new RelativeUriResolver(uriResolver);
const absoluteUriResolver = new AbsoluteUriResolver(uriResolver);


class UriResolverFactory {
    static CreateUriResolver(isAbsolute: boolean): IUriResolver {
        return isAbsolute ? absoluteUriResolver : relativeUriResolver;
    }
}

class Range {
    start: number;
    end: number;
    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
    }
}


interface ILineInfoMaker {
    GetLineInfo(): string;
}

class LineInfoMakerFactory {
    static CreateLineInfoMaker(): ILineInfoMaker {
        return new LineInfoMaker();
    }
}

class LineInfoMaker implements ILineInfoMaker {
    rangeConnectorStrategy: ISymbolStrategy;
    rangeSeparatorStrategy: ISymbolStrategy;

    constructor() {
        this.rangeConnectorStrategy = symbolStrategyFactory.GetRangeConnectorStrategy();
        this.rangeSeparatorStrategy = symbolStrategyFactory.GetRangeSeparatorStrategy();

    }

    GetLineInfo(): string {
        var editor = window.activeTextEditor;
        if (!editor) {
            return "1";
        }

        var isSingleLine = editor.selections.length === 1 && editor.selections[0].isSingleLine;
        var lineNumber = editor.selection.active.line + 1;

        if (isSingleLine) {
            return lineNumber.toString();
        }

        var selectedLines: string;
        var selectionRanges: Range[] = new Array<Range>();

        editor.selections.forEach(selection => {
            selectionRanges.push(new Range(selection.start.line + 1, selection.end.line + 1));
        });

        var rangeConnector = this.rangeConnectorStrategy.GetSymbol();
        var rangeSeparator = this.rangeSeparatorStrategy.GetSymbol();

        if (rangeSeparator !== ' ') {
            rangeSeparator += ' ';
        }

        selectedLines = selectionRanges.map(range => {
            if (range.start === range.end) {
                return range.start;
            }
            return `${range.start}${rangeConnector}${range.end}`;
        }).join(rangeSeparator);

        return selectedLines;
    }
}


export {
    UriResolverFactory,
    LineInfoMakerFactory,

    IUriResolver,
    ILineInfoMaker
};