import { join, isAbsolute } from 'node:path';
import { existsSync } from 'node:fs';
import { CompilerOptions } from '../utils';
import { globalScope } from './scope';
import { CompilerError } from './errors';

export function compile(options: CompilerOptions) {
    const {
        main,
    } = options;
    if ((isAbsolute(main) && !existsSync(main)) || (!isAbsolute(main) && !existsSync(join(process.cwd(), main)))) throw new CompilerError(`Can't find main file ${main}`);
}
export default compile;