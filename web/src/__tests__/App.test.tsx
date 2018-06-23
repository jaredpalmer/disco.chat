/** global it, describe */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders without crashing', () => {
  shallow(<App />);
});
