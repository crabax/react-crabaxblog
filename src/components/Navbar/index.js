import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavgationBar = () => (
  <>
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand>CrabaxBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/local">
              <Nav.Link>Local Posts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/remote">
              <Nav.Link>Remote Posts</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/remotePlus">
              <Nav.Link>Remote Posts+</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
);
export default NavgationBar;
