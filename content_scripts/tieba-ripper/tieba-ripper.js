import Embeddeb from '../embeddeb';
import TiebaReadability from '../tieba-readability';

export class TiebaRipper extends Embeddeb {
  constructor(url) {
    super(url);
    this.attribute.id = chrome.runtime.id;
    this.parser = new TiebaReadability();
  }
  onactivate() {
    document.body.style.overflow = 'hidden';
  }
  ondeactivate() {
    document.body.style.overflow = null;
  }
}
