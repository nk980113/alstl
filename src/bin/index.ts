#!/usr/bin/env node

import { existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { Command } from 'commander';
import * as rls from 'readline-sync';
import { CompilerOptions } from '../utils';
import { compile } from '../compiler';
interface pj {
    name: string;
    author: string;
    description: string;
    version: string;
    compilerOptions: CompilerOptions;
}

const pg = new Command;
pg
    .command('init')
    .description('Initialize the program.')
    .action(() => {
        if (existsSync(join(process.cwd(), 'alsp.json'))) {
            if (!rls.keyInYN('Do you want to override the file?')) return;
        }
        const alsp: pj = {
            name: '',
            author: '',
            description: '',
            version: '',
            compilerOptions: {
                main: '',
                easilyRead: false,
                oneFile: true,
                code: 'js-cjs',
            }
        };
        const dir = basename(process.cwd());
        alsp.name = rls.question(`Project name: (${dir})`) || dir;
        alsp.author = rls.question('Author: ');
        alsp.description = rls.question('Description: ');
        console.log('Version: [Z/X, space to continue]');
        console.log('');
        let major: number;
        for (let current = 1; true;) {
            console.log(`\x1B[1A\x1B[KMajor |${'-'.repeat(current)}O${'-'.repeat(20 - current)}| ${current}`);
            const k = rls.keyIn('', {
                hideEchoBack: true,
                mask: '',
                limit: 'zx ',
            });
            if (k === 'z') {
                if (current > 0) current--; 
            } else if (k === 'x') { 
                if (current < 20) current++; 
            } else {
                major = current;
                break;
            }
        }
        alsp.version += `${major}.`;
        console.log('');
        let minor: number;
        for (let current = 0; true;) {
            console.log(`\x1B[1A\x1B[KMinor |${'-'.repeat(current)}O${'-'.repeat(10 - current)}| ${' '.repeat(10)}${current}`);
            const k = rls.keyIn('', {
                hideEchoBack: true,
                mask: '',
                limit: 'zx ',
            });
            if (k === 'z') {
                if (current > 0) current--; 
            } else if (k === 'x') { 
                if (current < 10) current++; 
            } else {
                minor = current;
                break;
            }
        }
        alsp.version += `${minor}.`;
        console.log('');
        let patch: number;
        for (let current = 0; true;) {
            console.log(`\x1B[1A\x1B[KPatch |${'-'.repeat(current)}O${'-'.repeat(20 - current)}| ${current}`);
            const k = rls.keyIn('', {
                hideEchoBack: true,
                mask: '',
                limit: 'zx ',
            });
            if (k === 'z') {
                if (current > 0) current--; 
            } else if (k === 'x') { 
                if (current < 20) current++; 
            } else {
                patch = current;
                break;
            }
        }
        alsp.version += patch;
        console.log(alsp.version);
        console.log('\nCompiler options');
        alsp.compilerOptions.main = rls.question('Main file and the entry point: (index.alstl)');
        alsp.compilerOptions.oneFile = <boolean>rls.keyInYN('Compile into a file?');
        alsp.compilerOptions.easilyRead = <boolean>rls.keyInYN('Make the result easy to read?');
        {
            const k = rls.keyIn('Program type: [J]S-cjs/JS-[e]sm/[T]S ', { limit: 'jet' });
            if (k === 'j') alsp.compilerOptions.code = 'js-cjs';
            else if (k === 'e') alsp.compilerOptions.code = 'js-esm';
            else if (k === 't') alsp.compilerOptions.code = 'ts';
        }
        
        writeFileSync(join(process.cwd(), 'alsp.json'), JSON.stringify(alsp));
    });
pg
    .command('compile')
    .description('Compile the project.')
    .action(() => {
        if (existsSync(join(process.cwd(), 'alsp.json'))) return console.log('Please use `alstl init` to initialize the project.');
        const { compilerOptions: options } = <pj>JSON.parse(readFileSync(join(process.cwd(), 'alsp.json'), { encoding: 'utf-8' }));
        compile(options);
    });

pg.parse();