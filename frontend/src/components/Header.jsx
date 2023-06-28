/** @format */

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>CV Builder</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/user-info'>
                    <Nav.Link>Personal Information</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title='Resume'>
                    <LinkContainer to='/create-art-resume'>
                      <NavDropdown.Item>Art Resume</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/create-cs-resume'>
                      <NavDropdown.Item>
                        Computer Science Resume
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/create-law-resume'>
                      <NavDropdown.Item>Law Resume</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/create-sport-resume'>
                      <NavDropdown.Item>Sports Resume</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to='/portfolio'>
                    <Nav.Link>Portfolio</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
