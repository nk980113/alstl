export interface CompilerOptions {
    main: string;
    out?: string;
    easilyRead: boolean;
    oneFile: boolean;
    code: 'js-cjs' | 'js-esm' | 'ts';
}

export type ScannedResult = Token[];

interface Token {
    type: string;
    value: string;
}