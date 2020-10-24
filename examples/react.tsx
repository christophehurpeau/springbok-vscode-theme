import type { ReactElement } from 'react';
import React, { ReactElement, Component, useState } from 'react';
import ReactDOM from 'react-dom';

interface TimerState {
  seconds: number;
}

class Timer extends Component {
  state: TimerState;
  initialValue = 0;

  constructor(readonly props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Secondes : {this.state.seconds}</div>;
  }
}

ReactDOM.render(<Timer />, document.getElementById('timer-example'));

// https://reactjs.org/docs/hooks-intro.html

function Example(): ReactElement {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('second-example'));
