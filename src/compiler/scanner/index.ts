import { ScannedResult } from '../../utils';
import { ScannerError } from '../errors';

export function scan(code: string): ScannedResult {
    let 
        index = 0,
        result: ScannedResult = [],
        char = code[0],
        peek = code[1],
        last = '';
    const nextChar = (step = 1) => {
        if (step > 1) for (let i = 0; i < step; i++) nextChar();
        index++;
        [last, char, peek = ''] = [char, peek, code[index + 1]];
    };

    while (index < code.length) {
        if (!peek) break;
        // string
        if (char === '\'') {
            let str = '';
            nextChar();
            while (char !== '\'' && last !== '\\') {
                str += char;
                nextChar();
                if (!peek) throw new ScannerError('A string with no end');
            }
        }
        
    }

    return result;
}