import {readFile} from 'node:fs/promises';
import path from 'node:path';
import tryToCatch from 'try-to-catch';
import debug from 'debug';
import js from './js.js';
import html from './html.js';
import css from './css.js';
import img from './img.js';
import auto from './auto.js';

const log = debug('minify');

const minifiers = {
    js,
    html,
    css,
    img,
    auto,
};

const {assign} = Object;

assign(minify, minifiers);

function check(name) {
    if (!name)
        throw Error('name could not be empty!');
}

export async function minify(name, userOptions) {
    const EXT = [
        'js',
        'html',
        'css',
    ];
    
    check(name);
    
    const ext = path
        .extname(name)
        .slice(1);
    
    const is = EXT.includes(ext);
    
    if (!is)
        throw Error(`File type "${ext}" not supported.`);
    
    log('optimizing ' + path.basename(name));
    return await optimize(name, userOptions);
}

async function optimize(file, userOptions) {
    check(file);
    
    log('reading file ' + path.basename(file));
    
    const data = await readFile(file, 'utf8');
    
    return await onDataRead(file, data, userOptions);
}

async function onDataRead(filename, data, userOptions) {
    log(`file ${path.basename(filename)} read`);
    
    const ext = path
        .extname(filename)
        .replace(/^\./, '');
    
    const optimizedData = await minifiers[ext](data, userOptions);
    
    let b64Optimize;
    
    if (ext === 'css')
        [, b64Optimize] = await tryToCatch(minifiers.img, filename, optimizedData, userOptions);
    
    return b64Optimize || optimizedData;
}
