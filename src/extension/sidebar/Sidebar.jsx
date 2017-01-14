import React from 'react';

/* istanbul ignore next */

type Props = {
  onClick: () => void
}

const Sidebar = (props:Props) => (
  <div>
    <a href="" id="Sidebar" onClick={props.onClick}>Sidebar</a>
  </div>
);

Sidebar.styleguide = {
  index: '5.3',
  category: 'Features!',
  title: 'Stateless function components',
  code: '<Button>Stateless Function Support!</Button>',
};

export default Sidebar;
