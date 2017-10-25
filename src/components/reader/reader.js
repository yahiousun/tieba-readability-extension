import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Topic from '../topic';
import ContebtPlaceholder from '../content-placeholder';
import './reader.css';

export class Reader extends Component {
  static propTypes = {
    topic: PropTypes.object,
    request: PropTypes.func.isRequired,
    media: PropTypes.object
  }
  componentDidMount() {
    const state = this.props.topic.get('state');
    const tabId = this.props.match.params.id;
    if (state === 'unset') {
      this.props.request(+tabId);
    }
  }
  render() {
    const state = this.props.topic.get('state');
    const { topic } = this.props;
    const title = topic.get('title');
    const content = topic.get('content');
    return (
      <div className="reader">
        <div className="reader-inner">
          { content ? <Topic content={ content } title={title} /> : null }
          { state === 'complete' ? null : <ContebtPlaceholder rows={16} /> }
        </div>
      </div>
    );
  }
}
