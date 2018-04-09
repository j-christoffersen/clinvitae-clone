import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const Table = props => (
  <table>
    <thead>
      <tr>
        <th>Gene</th>
        <th>Nucleotide Change</th>
        <th>Protein Change</th>
        <th>Alias</th>
        <th>Region</th>
        <th>Reported Classification</th>
        <th>Last Evaluated</th>
        <th>Last Updated</th>
        <th>More Info</th>
      </tr>
    </thead>
    <tbody>
      { props.variants.map(variant => (
        <Row variant={variant} key={variant.proteinChange} />
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  variants: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
