import TiebaParser from '../tieba-parser';

const TIEBA_READABILITY_REGEX = {
  HTML_TAGS: /(<([^>]+)>)/ig,
  H3: /^\u7b2c.{1,4}\u7ae0/,
  H4: /^\d{1,2}$/,
  BLOCKQUOTE: /([^@]*@.*?)/,
  BLOCKQUOTE_AND_HR: /={3,}([^=]*)={3,}/,
  IMG: /<img[^>]*src="([^"]*)"[^>]*>/g,
  HR: /={3,}/
};

const MIN_CONTENT_LENGTH = 50;

export class TiebaReadability {
  static count(html) {
    const text = TiebaReadability.text(html);
    return text.length;
  }
  static text(html) {
    return html.replace(TIEBA_READABILITY_REGEX.HTML_TAGS, '');
  }
  constructor() {
    this.entries = [];
    this.parser = new TiebaParser();
    this.parser.onmetadata = (metadata) => {
      this.metadata = { ...metadata };
    };
    this.parser.onentry = (entry) => {
      // Filter contentless post
      if (entry && typeof entry.content !== 'undefined' && entry.content.length > MIN_CONTENT_LENGTH) {
        this.entries.push(entry);
      }
    };
  }
  parse(html) {
    this.entries = [];
    this.parser.src = html;
    const content = this.entries.reduce((previous, next, index) => {
      const section = [];
      next.content.split('<br>').forEach((item, index, array) => {
        const line = item.trim();
        if (line !== '') {
          if (
            section.length > 0
            && TIEBA_READABILITY_REGEX.BLOCKQUOTE.test(array[index - 1])
            && TIEBA_READABILITY_REGEX.HR.test(line)
          ) {
            const last = section.pop();
            section.push(`> ${last}`);
            section.push('- - -');
          } else if (TIEBA_READABILITY_REGEX.BLOCKQUOTE_AND_HR.test(line)) {
            section.push(`> ${line.replace(TIEBA_READABILITY_REGEX.BLOCKQUOTE_AND_HR, '$1').trim()}`);
            section.push('- - -');
          } else if (TIEBA_READABILITY_REGEX.H3.test(line)) {
            section.push(`### ${line}`);
          } else if (TIEBA_READABILITY_REGEX.H4.test(line)) {
            section.push(`#### ${line}`);
          } else if (TIEBA_READABILITY_REGEX.IMG.test(line)) {
            section.push(`![](${line.replace(TIEBA_READABILITY_REGEX.IMG, '$1')})`);
          } else {
            section.push(line);
          }
        }
      });

      if (index !== 0) {
        return `${previous}\n${section.join('\n')}`;
      }
      return section.join('\n');
    }, '');
    if (!content) {
      throw new Error('Content not found');
    }
    return {
      ...this.metadata,
      content,
      word_count: TiebaReadability.count(content)
    };
  }
}
