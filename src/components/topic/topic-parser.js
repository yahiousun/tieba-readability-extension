const TOPIC_REGEX = {
  HR: /^(\*{3,}|-{3,}|(\*\s){2,}\*||(-\s){2,}-)$/,
  BLOCKQUOTE: /^>\s(.+)$/,
  HEADING: /^(#{1,6})([^#]+)/,
  IMG: /^!\[([^\]]*)\]\(([^\s]+\s?([^)]*)?)\)$/
}

export class TopicParser {
  static jsonify(source) {
    const lines = source.split(/\n/);
    return lines.map((line) => {
      let text = line.trim(), type = 'p', match, src, alt, title;
      if (!text) {
        return undefined;
      }
      if (TOPIC_REGEX.HR.test(text)) {
        type = 'hr';
      } else if (TOPIC_REGEX.BLOCKQUOTE.test(text)) {
        text = text.replace(TOPIC_REGEX.BLOCKQUOTE, '$1').trim();
        type = 'blockquote';
      } else if (TOPIC_REGEX.HEADING.test(text)) {
        type = `h${text.replace(TOPIC_REGEX.HEADING, '$1').length}`;
        text = text.replace(TOPIC_REGEX.HEADING, '$2').trim();
      } else if (TOPIC_REGEX.IMG.test(text)) {
        type = 'img';
        match = TOPIC_REGEX.IMG.exec(text);
        src = match[2].trim();
        alt = (match[1] && match[1].trim()) || undefined;
        title = (match[3] && match[3].trim()) || undefined;
      }

      switch (type) {
        case 'hr': {
          return { type };
        }
        case 'img': {
          return src && { type, src, alt, title };
        }
        default: {
          return text && { type, text };
        }
      }
    }).filter(line => typeof line !== 'undefined');
  }
}
