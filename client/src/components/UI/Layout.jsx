import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
// Common
import Navbar from '../common/NavBar/NavBar';
import Footer from '../common/Footer/Footer';


const Layout = (props) => {
  const { pathname } = useLocation();

  if (pathname === '/login') {
    return <main>{props.children}</main>;
  }

  return (
    <Fragment>
      <Navbar />
      {props.children}
      <Footer />
    </Fragment>
  );
};

export default Layout;