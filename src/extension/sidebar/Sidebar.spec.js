import index from './index.jsx';
import Sidebar from './Sidebar.jsx';

const stringIsString = (str) => str;

describe('true', () => {
  it('should be true', () => {
    true.should.be.true;
  });

  it('String should be string', () => {
    stringIsString('string').should.be.equal('string');
  });

});
