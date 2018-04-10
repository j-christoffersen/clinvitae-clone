import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import Mock from 'axios-mock-adapter';

import Table from '../../client/src/Table';
import Row from '../../client/src/Row';
import Search from '../../client/src/Search';

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

describe('<Search />', () => {
  it('should have one input box', (done) => {
    const wrapper = shallow(<Search onClick={() => {}} />);
    wrapper.find('input').should.have.length(1);
    done();
  });

  it('should have one search button', (done) => {
    const wrapper = shallow(<Search onClick={() => {}} />);
    wrapper.find('button').should.have.length(1);
    done();
  });

  it('should call search callback with query when button is clicked', (done) => {
    const mock = new Mock(axios);
    mock.onGet(/\/api\/search\?geneName=.*/).reply(200, []);

    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Search onClick={onButtonClick} />);

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'abc' } });
    wrapper.find('button').simulate('click');

    onButtonClick.should.have.property('callCount', 1);
    onButtonClick.calledWith('abc').should.be.true;

    mock.restore();
    done();
  });

  it('should get suggested completions from api call', (done) => {
    const mock = new Mock(axios);
    mock.onGet('/api/search?geneName=abc').reply(
      200,
      [{ name: 'abc1', id: 0 }, { name: 'abc2', id: 1 }],
    );

    const wrapper = shallow(<Search onClick={() => {}} />);

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'abc' } });

    // wait for api call to respond
    setTimeout(() => {
      wrapper.update().find('option').should.have.length(2);

      mock.restore();
      done();
    }, 100);
  });
});
