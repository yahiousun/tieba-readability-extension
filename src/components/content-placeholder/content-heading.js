import React, { Component } from 'react';

export class ContentHeading extends Component {
  static style = {
    margin: '1.618em auto',
    fontSize: '2em',
    height: '2em',
    lineHeight: '1.618',
    backgroundColor: '#CCCCCC',
  }
  shouldComponentUpdate() {
    return false;
  }
  compile() {
    const width = (Math.random() * 40 + 40).toFixed();
    return { ...ContentHeading.style, width: `${width}%` };
  }
  render() {
    const style = this.compile();
    return (
      <div style={style}></div>
    );
  }
}
