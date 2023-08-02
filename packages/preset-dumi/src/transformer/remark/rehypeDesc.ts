import path from 'path';
import visit from 'unist-util-visit';
import toString from 'hast-util-to-string';
import is from 'hast-util-is-element';
import type { IDumiElmNode, IDumiUnifiedTransformer } from '.';

function isRelativeUrl(url) {
  return typeof url === 'string' && !/^(?:(?:blob:)?\w+:)?\/\//.test(url) && !path.isAbsolute(url);
}

/**
 * rehype plugin to handle img source from local
 */
export default function rehypeDesc(): IDumiUnifiedTransformer {
  return (ast, vFile) => {
    visit<IDumiElmNode>(ast, 'element', node => {
      if (is(node, 'p')) {
        const text = toString(node).trim();

        if (text) {
          vFile.data.description = text.replace(/\r?\n|\r/g, '');
          return visit.EXIT;
        }
      }
    });
  };
}
