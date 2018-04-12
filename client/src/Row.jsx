import React from 'react';
import PropTypes from 'prop-types';

const Row = props => (
  <tr>
    <td>{props.variant.gene}</td>
    <td>
      {props.variant.nucleotideChanges.map((nucleotideChange, i) => (
        <div key={`${nucleotideChange} + ${i}`}>{nucleotideChange}</div>
      ))}
    </td>
    <td>{props.variant.proteinChange}</td>
    <td>{props.variant.alias || '-'}</td>
    <td>{props.variant.region || '-'}</td>
    <td>{props.variant.reportedClassification}</td>
    <td>{props.variant.lastEvaluated || '-'}</td>
    <td>{props.variant.lastUpdated || '-'}</td>
    <td><a href={props.variant.url}>{props.variant.source}</a></td>
  </tr>
);

Row.propTypes = {
  variant: PropTypes.shape({
    gene: PropTypes.string.isRequired,
    nucleotideChanges: PropTypes.arrayOf(PropTypes.string).isRequired,
    proteinChange: PropTypes.string.isRequired,
    alias: PropTypes.string,
    region: PropTypes.string,
    reportedClassification: PropTypes.string.isRequired,
    lastEvaluated: PropTypes.string,
    lastUpdated: PropTypes.string,
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default Row;
