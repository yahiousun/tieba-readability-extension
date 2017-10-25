import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  state: 'unset',
  title: 'OVERLORD 第12卷【圣王国的圣骑士丨上】',
  content: '',
  error: undefined
});

export const TOPIC_REQUEST = 'topic/request';
export const TOPIC_LOAD = 'topic/load';
export const TOPIC_FAILURE = 'topic/failure';

export function topic(state = initialState, action) {
  switch(action.type) {
    case TOPIC_REQUEST: {
      return state
        .set('state', 'loading')
        .delete('content')
        .delete('error');
    }
    case TOPIC_LOAD: {
      return state
        .set('state', 'complete')
        .set('content', action.payload.content)
        .set('title', action.payload.title)
        .delete('error');
    }
    case TOPIC_FAILURE: {
      return state
        .set('state', 'complete')
        .set('error', action.payload);
    }
    default: {
      return state;
    }
  }
}
