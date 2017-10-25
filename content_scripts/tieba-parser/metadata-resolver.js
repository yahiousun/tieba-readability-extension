const TIEBA_THREAD_METADATA_REGEX = {
  THREAD_TITLE: /<h3[^>]*class="core_title_txt[^>]*?>(.*?)<\/h3>/,
  NUMBER_OF_PAGES: /<li[^>]*class="l_reply_num.*?<\/span>[^<]*?<span[^>]*?>(.*?)<\/span>/,
  CURRENT_PAGE_NUMBER: /<span[^>]*class="tP">([^<]*)<\/span>/,
  CANONICAL_URL: /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/,
  NEXT_PAGE_URL: /<span[^>]*class="tP">[^<]*<\/span>\n?<a\shref="([^>]*)">\d+<\/a>/i,
  THREAD_ID: /<a\sid="lzonly_cntn"\shref="\/p\/(\d+)/,
  ABSOLUTE_URL: /(https?)?\/\/:/
};

export function getThreadTitle(html) {
  const title = TIEBA_THREAD_METADATA_REGEX.THREAD_TITLE.exec(html);
  return title && title[1].trim();
}

export function getTotalNumberOfPages(html) {
  const totalNumberOfPages = TIEBA_THREAD_METADATA_REGEX.NUMBER_OF_PAGES.exec(html);
  return totalNumberOfPages && +totalNumberOfPages[1];
}

export function getCurrentPageNumber(html) {
  const currentPageNumber = TIEBA_THREAD_METADATA_REGEX.CURRENT_PAGE_NUMBER.exec(html);
  return currentPageNumber && +currentPageNumber[1];
}

export function getCanonicalUrl(html) {
  const canonicalUrl = TIEBA_THREAD_METADATA_REGEX.CANONICAL_URL.exec(html);
  return canonicalUrl && canonicalUrl[1];
}

export function getThreadId(html) {
  const threadId = TIEBA_THREAD_METADATA_REGEX.THREAD_ID.exec(html);
  return threadId && +threadId[1];
}

export function getNextPageUrl(html) {
  let nextPageUrl: any = TIEBA_THREAD_METADATA_REGEX.NEXT_PAGE_URL.exec(html);
  // Fix relative link
  if (nextPageUrl && !TIEBA_THREAD_METADATA_REGEX.ABSOLUTE_URL.test(nextPageUrl[1])) {
    nextPageUrl = `//tieba.baidu.com${nextPageUrl[1]}`
  }
  return nextPageUrl;
}

export class TiebaThreadMetadataResolver {
  resolve(html): TiebaThreadMetadata {
    const totalNumberOfPages = getTotalNumberOfPages(html);
    const metadata: TiebaThreadMetadata = {
      title: getThreadTitle(html),
      page_count: totalNumberOfPages,
      id: getThreadId(html),
      link: getCanonicalUrl(html),
      next_link: getNextPageUrl(html)
    };

    if (!metadata.title || !metadata.id) {
      return;
    }
    return metadata;
  }
}
