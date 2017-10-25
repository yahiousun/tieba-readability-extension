import { TOPIC_REQUEST, TOPIC_LOAD, TOPIC_FAILURE} from '../reducers/topic';
import channel, { IframeChannel } from '../iframe-channel';

export function requestTopic(tabId) {
  return function (dispatch) {
    dispatch({ type: TOPIC_REQUEST });
    const request = IframeChannel.request('topic/request', { id: tabId });
    channel.call(request, (result, error) => {
      if (result) {
        dispatch({ type: TOPIC_LOAD, payload: result });
      } else {
        dispatch({ type: TOPIC_FAILURE, payload: error, error: true });
      }
    });
  };
}
