import { MEDIA_REQUEST, MEDIA_LOAD, MEDIA_FAILURE} from '../reducers/media';
import channel, { IframeChannel } from '../iframe-channel';

class Media {
  static preload(url) {
    return function (dispatch) {
      dispatch({ type: MEDIA_REQUEST });
      const request = IframeChannel.request('media', { url });
      channel.call(request, (result, error) => {
        if (result) {
          dispatch({ type: MEDIA_LOAD, payload: result });
        } else {
          dispatch({ type: MEDIA_FAILURE, payload: error, error: true });
        }
      });
    };
  }
}

export default Media;
