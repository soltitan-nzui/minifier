import assert from 'node:assert';
import Minifier from 'html-minifier-terser';

const defaultOptions = {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    
    minifyJS: true,
    minifyCSS: true,
};

export default (data, userOptions) => {
    assert(data);
    
    const options = {
        ...defaultOptions,
        ...userOptions?.html || {},
    };
    
    return Minifier.minify(data, options);
};
