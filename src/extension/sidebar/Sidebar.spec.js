import React from 'react';
import { shallow, mount, render } from 'enzyme';

import index from './index.jsx';
import Sidebar from './Sidebar.jsx';

describe('<Sidebar />', () => {
  it('should contain a#Sidebar', () => {
    const wrapper = shallow(<Sidebar />);
    wrapper.find('#Sidebar').should.have.length(1);
  });

  it('simulates click events', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
      <Sidebar onClick={onClick} />
    );
    wrapper.find('a').simulate('click');
    onClick.calledOnce.should.be.true;
  });

});
