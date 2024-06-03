import assert from 'node:assert';
import Clean from 'clean-css';

export default (data, userOptions) => {
    assert(data);
    
    const options = userOptions?.css || {};
    
    const {styles, errors} = new Clean(options).minify(data);
    
    const [error] = errors;
    
    if (error)
        throw error;
    
    return styles;
};
