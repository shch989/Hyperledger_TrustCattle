import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../public/images/logo.png';
import LogInButton from './LogInButton';
import LogOutButton from './LogOutButton';

const MenuItem = styled.li.attrs((props) => ({
  isActive: props.isActive,
}))`
  margin-left: 1rem;
  a {
    display: inline-block;
    padding: 0.5rem;
    font-size: 25px;
    font-weight: 600;
    color: ${(props) => (props.isActive ? '#000' : '#a2a2a2')};
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      color: #000;
    }
  }
`;

MenuItem.shouldForwardProp = (prop) => prop !== 'isActive';

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  height: 80px;
  padding: 5px 0;
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.a.attrs({})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  .main_logo {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    transition: all 0.2s;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  margin-right: auto;
`;

const User = styled.div`
  margin-left: auto;
  display: flex;
`;

const UserProfile = styled.a.attrs({})`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: #a2a2a2;
  text-decoration: none;
  transition: all 0.2s;
`;

const Navbar = () => {
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  return (
    <Container>
      <MainNav>
        <Logo href="/">
          <img src={logo} alt="logo" className="main_logo" />
        </Logo>
        <Menu>
          <MenuItem isActive={pathname === '/'}>
            <a href="/">Home</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/login'}>
            <a href="/login">가축등록</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/registerCattle'}>
            <a href="/control">가축거래</a>
          </MenuItem>
        </Menu>
        <User>
          {token ? (
            <Fragment>
              <UserProfile>Welcome {userName}(님)</UserProfile>
              <LogOutButton />
            </Fragment>
          ) : (
            <Fragment>
              <LogInButton />
            </Fragment>
          )}
        </User>
      </MainNav>
    </Container>
  );
};

export default Navbar;