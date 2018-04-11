import React, { Component } from 'react';
import axios from 'axios';

import Table from './Table';
import Search from './Search';

// import dummyData from './dummyData';

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
        <div className="flex-container">
          <img src="http://clinvitae.invitae.com/static/img/clinvitae-small.png" alt="CLINVITAE" />
          <Search onClick={this.onSearch} />
        </div>
        <Table variants={this.state.variants} />
      </div>
    );
  }
}

export default App;
