import Tiebaripper from './tieba-ripper';
import { preload } from './utilities';
let app, url;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'toggle') {
    if (typeof app === 'undefined') {
      url = `chrome-extension://${chrome.runtime.id}/index.html#reader/${request.params.id}`;
      app = new Tiebaripper(url);
      app
        .on('topic/request', function(params, respond) {
          try {
            const topic = this.parser.parse(document.documentElement.innerHTML);
            respond(topic);
          } catch (e) {
            respond(null, e);
          }
        })
        .on('media/request', function(params, respond) {
          preload(params.url).then((url) => {
            respond(url, null);
          }, (error) => {
            respond(null, error);
          })
        });
    }
    if (app.state === 'inactive') {
      app.activate();
      sendResponse('App activated');
    } else {
      app.deactivate();
      sendResponse('App deactivated');
    }
  } else {
    sendResponse('Unknown request');
  }
});
