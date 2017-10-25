import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  status: {}
});

export const MEDIA_LOAD = 'media/load';
export const MEDIA_REQUEST = 'media/request';
export const MEDIA_FAILURE = 'media/failure';
// export const MEDIA_TIMEOUT = 'media/timeout';

export function media(state = initialState, action) {
  switch(action.type) {
    case MEDIA_LOAD: {
      return state.setIn(['status', action.payload], 'loaded');
    }
    case MEDIA_REQUEST: {
      return state.setIn(['status', action.payload], 'loading');
    }
    case MEDIA_FAILURE: {
      return state.setIn(['status', action.payload], 'failed');
    }
    default: {
      return state;
    }
  }
}
