import type { ReactElement, ReactNode } from 'react';
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

type HandleTick = () => void;

interface TimerProps {
  onTick?: () => void;
}

interface TimerProps2 {
  onTick?: HandleTick;
}

interface TimerState {
  seconds: number;
}

class Timer extends Component<TimerProps, TimerState> {
  state: TimerState;
  initialValue = 0;
  interval: ReturnType<typeof setInterval>;

  constructor(readonly props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));
    if (this.props.onTick) this.props.onTick();
  }

  componentDidMount(): void {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render() {
    return <div>Secondes : {this.state.seconds}</div>;
  }
}

ReactDOM.render(<Timer />, document.getElementById('timer-example'));

const Layout = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}): ReactElement => {
  return (
    <main>
      <div>{title}</div>
      {children}
    </main>
  );
};

// https://reactjs.org/docs/hooks-intro.html

function Example(): ReactElement {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <Layout title={<div>Layout ({count})</div>}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </Layout>
  );
}

ReactDOM.render(<Example />, document.getElementById('second-example'));
