import {minify} from '@putout/minify';
import assert from 'node:assert';

export default async (data, userOptions) => {
    assert(data);
    
    const options = userOptions?.js || {};
    
    if (options.type === 'terser') {
        const {terser} = options;
        const {minify} = await import('terser');
        const {code} = await minify(data, terser);
        
        return code;
    }
    
    return await minify(data, options);
};
