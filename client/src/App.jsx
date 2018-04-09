import React, { Component } from 'react';
import Table from './Table';
import Search from './Search';
import dummyData from './dummyData';

class App extends Component {
  constructor() {
    super();

    this.state = {
      // gene: null,
      variants: dummyData,
    };
  }

  render() {
    return (
      <div>
        <Table variants={this.state.variants} />
        <Search onClick={() => {}} />
      </div>
    );
  }
}

export default App;
