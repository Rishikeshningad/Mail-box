import { Fragment } from 'react';

import Navigation from '../Layout/Navigation';

const Layout = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;