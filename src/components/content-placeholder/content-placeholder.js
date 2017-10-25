import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ContentHeading } from './content-heading';
import { ContentTextRow } from './content-text-row';

export class ContentPlaceholder extends Component {
  static propTypes = {
    rows: PropTypes.number
  };
  static defaultProps = {
    rows: 3
  };
  static style = {
    boxSizing: 'border-box',
    border: '1px solid #CCCCCC',
    padding: '16px',
    margin: '0.618em 0',
    fontSize: '2em',
    height: '2em',
    lineHeight: '1.618',
    backgroundColor: '#FFFFFF'
  };
  shouldComponentUpdate(nextProps) {
    if (nextProps.rows !== this.props.rows) {
      return false;
    }
    return true;
  }
  render() {
    const style = { ...ContentPlaceholder };
    const rows = [];
    let i;
    for (i = 0; i < this.props.rows; i++) {
      rows.push(<ContentTextRow key={i} />)
    }
    return (
      <div style={style} { ...this.props }>
        <ContentHeading />
        {rows}
      </div>
    );
  }
}
