import { connect } from 'react-redux';
import Reader from '../components/reader';
import { requestTopic } from '../actions/topic';

export default connect(
  state => ({
    media: state.media,
    topic: state.topic
  }),
  {
    request: requestTopic
  }
)(Reader);
