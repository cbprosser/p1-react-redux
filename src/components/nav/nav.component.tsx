import React from 'react';
import { Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Collapse, } from 'reactstrap';
import logo from '../../assets/logo-bw.png';
import { Link } from 'react-router-dom';

interface INavProps {

}

interface INavState {
  isOpen: boolean
}

export default class Example extends React.Component<INavProps, INavState> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="dark" dark text-light expand="sm">
        <NavbarBrand><Link to="/"><img src={logo} width="auto" height="25px" /></Link></NavbarBrand>
        <NavbarToggler onClick={this.toggle} className="mr-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link to="/users">Users</Link>
            </NavItem>
            <NavItem>
              <Link to="/reimbursements">Reimbursements</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
