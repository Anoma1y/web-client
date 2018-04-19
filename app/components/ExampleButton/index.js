import React, { Component } from 'react';
import './style.scss';

type ExampleButtonProps = {
  text: string,
  onClick: () => void
}

class ExampleButton extends Component<ExampleButtonProps> {
  render() {
    return (
      <button onClick={this.props.onClick.bind(this)} className={'ExampleButton'}>
        { this.props.text }
      </button>
    );
  }
}

export default ExampleButton;

