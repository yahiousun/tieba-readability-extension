import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TopicParser } from './topic-parser';
import './topic.css';

export class Topic extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  }
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.content === this.props.content
      && nextProps.title === this.props.title
    ) {
      return false;
    }
    return true;
  }
  render() {
    const { title, content } = this.props;
    const article = TopicParser.jsonify(content);
    const lines = [];
    article.forEach((line, i) => {
      switch (line.type) {
        case 'hr': {
          lines.push(<hr id={`topic-line-${i}`} key={i} />);
          break;
        }
        case 'img': {
          lines.push(<figure id={`topic-line-${i}`} key={i}><img src={line.src} alt={line.alt}/></figure>);
          break;
        }
        case 'blockquote': {
          lines.push(<blockquote id={`topic-line-${i}`} key={i}>{line.text}</blockquote>);
          break;
        }
        case 'h1': {
          lines.push(<h1 id={`topic-line-${i}`} key={i}>{line.text}</h1>);
          break;
        }
        case 'h2': {
          lines.push(<h2 id={`topic-line-${i}`} key={i}>{line.text}</h2>);
          break;
        }
        case 'h3': {
          lines.push(<h3 id={`topic-line-${i}`} key={i}>{line.text}</h3>);
          break;
        }
        case 'h4': {
          lines.push(<h4 id={`topic-line-${i}`} key={i}>{line.text}</h4>);
          break;
        }
        case 'h5': {
          lines.push(<h5 id={`topic-line-${i}`} key={i}>{line.text}</h5>);
          break;
        }
        case 'h6': {
          lines.push(<h6 id={`topic-line-${i}`} key={i}>{line.text}</h6>);
          break;
        }
        default: {
          lines.push(<p id={`topic-line-${i}`} key={i}>{line.text}</p>);
        }
      }
    });
    return (
      <article className="topic">
        <h1 id="topic-title">{title}</h1>
        {lines}
      </article>
    );
  }
}
