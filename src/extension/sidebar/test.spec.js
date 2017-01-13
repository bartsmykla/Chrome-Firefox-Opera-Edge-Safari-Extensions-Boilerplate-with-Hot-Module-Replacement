import index from './index.jsx';
import Sidebar from './Sidebar.jsx';
// import Popup from '../popup/Popup.jsx';

const basiaToBasia = (str) => str;

/**
 * @test {MyClass}
 */
describe('test', () => {
  /**
   * @test {MyClass#sayMyName}
   */
  it('works', () => {
    true.should.be.true;
  });

  it('Basia to Basia', () => {
    basiaToBasia('Basia').should.be.equal('Basia');
  });

});
