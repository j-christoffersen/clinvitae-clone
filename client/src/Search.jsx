import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      query: '',
      suggestions: [],
    };

    this.onInputUpdate = this.onInputUpdate.bind(this);
  }

  onInputUpdate(e) {
    const query = e.target.value;

    this.setState({
      query,
    });

    axios.get(`/api/search?geneName=${query}`)
      .then((res) => {
        const suggestions = res.data;
        this.setState({
          suggestions,
        });
      });
  }

  render() {
    return (
      <div>
        <input list="items" onChange={this.onInputUpdate} />
        <datalist id="items">
          {
            this.state.suggestions.map(item => (
              <option value={item.name} key={item.id} />
            ))
          }
        </datalist>
        <button onClick={() => { this.props.onClick(this.state.query); }}>
          Search
        </button>
      </div>
    );
  }
}

Search.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Search;
