const TIEBA_THREAD_CONTENT_HANDLER_REGEX = {
  LINK: /<a.*?>([^>]*)<\/a>/g,
  ENTRY_ID: /<div\sid="post_content_(\d+)"/,
  ENTRY_CONTENT: /<cc>.*?<div\sid="post_content_.*?>(.*?)<\/div>.*?<\/cc>/i,
  ENTRY_UPDATED: /<span[^>]*class="tail-info">(\d{4}-\d{2}-\d{2}[^/d]*?\d{2}:\d{2})<\/span>/,
  STICKER: /<img[^>]*class="BDE_Smiley"[^>]*src="([^"]*)"[^>]*>/g,
  IMG: /<img[^>]*class="BDE_Image"[^>]*src="([^"]*)"[^>]*>/g
};

export function getEntryLink(topicUrl, entryId: number) {
  if (!topicUrl || !entryId) {
    return;
  }
  return `${topicUrl}#post_content_${topicUrl}`;
}
export function getEntryId(html) {
  const match = TIEBA_THREAD_CONTENT_HANDLER_REGEX.ENTRY_ID.exec(html);
  let entryId;
  if (match && match[1]) {
    entryId = +match[1];
  }
  return entryId;
}

export function getEntryContent(html) {
  const match = html.match(TIEBA_THREAD_CONTENT_HANDLER_REGEX.ENTRY_CONTENT);
  let content;
  // Remove all links
  content = match[1].replace(TIEBA_THREAD_CONTENT_HANDLER_REGEX.LINK, '$1').trim();
  // Strip all stickers
  content = content.replace(TIEBA_THREAD_CONTENT_HANDLER_REGEX.STICKER, '');
  // Strip all image attributes
  content = content.replace(TIEBA_THREAD_CONTENT_HANDLER_REGEX.IMG, '<img src="$1">');
  return content;
}

export function getEntryUpdated(html) {
  const match = html.match(TIEBA_THREAD_CONTENT_HANDLER_REGEX.ENTRY_UPDATED);
  let updated;
  if (match && match[1]) {
    updated = new Date(match[1]).toISOString();
  }
  return updated;
}

export class TiebaThreadContentHandler {
  resolve(html): TiebaThreadEntry {
    const entryId = getEntryId(html);
    const entry = {
      id: entryId,
      link: this.metadata ? getEntryLink(this.metadata.link, entryId) : undefined,
      content: getEntryContent(html),
      updated: getEntryUpdated(html)
    };
    if (!entry.id) {
      return;
    }
    return entry;
  }
}
