import React from 'react';
import styles from './HelloWorld.less';

export class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'HelloWorld',
    };
  }

  render() {
    return (<div className={styles.HelloWorld}>{this.state.text}</div>);
  }
}
