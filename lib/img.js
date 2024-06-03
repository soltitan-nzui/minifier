import path from 'node:path';
import assert from 'node:assert';
import {promisify} from 'node:util';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const fromString = promisify(require('css-b64-images').fromString);

const ONE_KB = 2 ** 10;

const defaultOptions = {
    maxSize: 100 * ONE_KB,
};

export default (name, data, userOptions) => {
    const dir = path.dirname(name);
    const dirRelative = `${dir}/../`;
    
    const options = {
        ...defaultOptions,
        ...userOptions?.img || {},
    };
    
    assert(name);
    assert(data);
    
    return fromString(data, dir, dirRelative, options);
};
