import React from 'react';

type Props = { message: string };

const Basia = (props: Props) => (
  <div style={{ backgroundColor: 'goldenrod', marginTop: 15 }}> Popup {props.message}<br /></div>
);

const Component = () => (
  <div>
    <h1>test!</h1>
    <Basia message="test" />
    <Basia message="new test" />
  </div>
);

export default Component;
