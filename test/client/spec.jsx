import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';

import Table from '../../client/src/Table';
import Row from '../../client/src/Row';

import { variants } from '../apiFixtures';

Enzyme.configure({ adapter: new Adapter() });
const { shallow } = Enzyme;

chai.should();

describe('<Table />', () => {
  it('should render a row for every gene variant', (done) => {
    const wrapper = shallow(<Table variants={variants} />);
    wrapper.find(Row).should.have.length(variants.length);
    done();
  });
});

describe('<Row />', () => {
  it('should render info for a gene variant', (done) => {
    const wrapper = shallow(<Row variant={variants[0]} />);
    const rows = wrapper.find('td');
    rows.should.have.length(9);
    done();
  });
});
