import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/**
 * http://airbnb.io/enzyme/docs/installation/index.html#working-with-react-16
 */
configure({ adapter: new Adapter() });

/**
* https://github.com/facebookincubator/create-react-app/issues/3199
*/
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0);
};

/**
 * https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#initializing-test-environment
 */
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
