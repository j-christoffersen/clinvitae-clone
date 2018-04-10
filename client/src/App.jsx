import React, { Component } from 'react';
import axios from 'axios';

import Table from './Table';
import Search from './Search';

class App extends Component {
  constructor() {
    super();

    this.state = {
      variants: [],
    };

    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(geneName) {
    axios.get(`/api/variants?geneName=${geneName}`)
      .then((res) => {
        this.setState({
          variants: res.data,
        });
      });
  }

  render() {
    return (
      <div>
        <Table variants={this.state.variants} />
        <Search onClick={this.onSearch} />
      </div>
    );
  }
}

export default App;
