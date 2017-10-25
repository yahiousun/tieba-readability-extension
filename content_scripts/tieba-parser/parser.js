import { TiebaThreadMetadataResolver } from './metadata-resolver';
import { TiebaThreadContentHandler } from './content-handler';
import { TiebaThreadParserException } from './parser-exception';

const TIEBA_PARSER_REGEX = {
  SPECIAL: /<(script|style)\b[^<]*(?:(?!<\/(script|style)>)<[^<]*)*<\/(script|style)>/g,
  LINE_FEED: /(\n|\r)/g,
  POST: /<div\sclass="l_post[^>]*>(.*?)j_lzl_container/g
};

const MAX_ENTRY_COUNT = 100;

export type TIEBA_PARSER_HANDLER = (data?: any) => void;

export class TiebaParser {
  parse(input) {
    // Preprocess html string, remove style and script tags
    const html = input.replace(TIEBA_PARSER_REGEX.SPECIAL, '').replace(TIEBA_PARSER_REGEX.LINE_FEED, '');
    // Resolve metadata
    const metadata = this.metadata.resolve(html);

    let count = 0, post, entry;

    if (!metadata) {
      this.throw(TiebaThreadParserException.threadNotFound());
    }

    this.handler.metadata = { ...metadata }
    if (this.onmetadata) {
      this.onmetadata({ ...metadata });
    }

    // Get all posts
    while (count < MAX_ENTRY_COUNT) {
      post = TIEBA_PARSER_REGEX.POST.exec(html);
      count ++;
      if (post && post[1]) {
        entry = this.handler.resolve(post[1]);
        // Drop contentless entry
        if (entry && entry.content && this.onentry) {
          this.onentry(entry);
        }
      } else {
        break;
      }
    }

    // End process, ready to parse
    if (this.onend) {
      this.onend();
    }
  }
  throw(error) {
    this.error = { ...error };
    if (this.onerror && typeof this.onerror === 'function') {
      this.onerror(error);
    }
    throw new Error(error.message);
  }
  set src(html) {
    this.html = html;
    this.parse(html);
  }
  get src() {
    return this.html;
  }
  constructor(handler, metadata) {
    this.handler = handler || new TiebaThreadContentHandler();
    this.metadata = metadata || new TiebaThreadMetadataResolver();
  }
}
