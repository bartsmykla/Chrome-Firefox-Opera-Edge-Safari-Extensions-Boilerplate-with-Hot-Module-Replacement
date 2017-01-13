import React from 'react';

type Props = { message: string };

const Basia = (props: Props) => (
  <div style={{ backgroundColor: 'goldenrod', marginTop: 15 }}> Łobuziunia {props.message}<br /></div>
);

const Component = () => (
  <div>
    <h1>182!</h1>
    <Basia message="111" />
    <Basia message="Muahahahahahahu" />
  </div>
);

export default Component;
