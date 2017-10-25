import React, { Component } from 'react';

export class ContentTextRow extends Component {
  static style = {
    margin: '0.618em 0',
    fontSize: '2em',
    height: '1em',
    lineHeight: '1.618',
    backgroundColor: '#CCCCCC',
  };
  shouldComponentUpdate() {
    return false;
  }
  compile() {
    const width = (Math.random() * 60 + 40).toFixed();
    return { ...ContentTextRow.style, width: `${width}%` };
  }
  render() {
    const style = this.compile();
    return (
      <div style={style}></div>
    );
  }
}
