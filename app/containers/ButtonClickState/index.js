import React, { Component } from 'react';
import ExampleButton from 'components/ExampleButton';

type HomeState = {
  clicks: number
}

class Home extends Component<{}, HomeState> {
  state = {
    clicks: 0
  };

  handleButtonClick = () => {
    const { clicks } = this.state;
    this.setState({
      clicks: clicks + 1
    });
  };

  render() {
    return (
      <div>
        <h1>Button click counter via state</h1>
        <h3>Button clicked { this.state.clicks } time(s)</h3>
        <ExampleButton
          text={'Click me!'}
          onClick={this.handleButtonClick}
        />
      </div>
    );
  }
}

export default Home;
